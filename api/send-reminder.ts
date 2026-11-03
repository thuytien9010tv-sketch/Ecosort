import type { IncomingMessage, ServerResponse } from 'http';
import { generateReminderEmailHtml } from '../src/lib/reminderEmailTemplate';

interface ExtendedRequest extends IncomingMessage {
  body?: any;
  query?: Record<string, string>;
}

interface ExtendedResponse extends ServerResponse {
  status: (statusCode: number) => ExtendedResponse;
  json: (data: any) => void;
}

export default async function handler(req: ExtendedRequest, res: ExtendedResponse) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Phương thức không được hỗ trợ. Vui lòng dùng POST.' }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {};
      }
    } else if (!body) {
      // In case body was not parsed by Vercel middleware, read raw stream
      const rawBody = await new Promise<string>((resolve) => {
        let data = '';
        req.on('data', (chunk) => {
          data += chunk;
        });
        req.on('end', () => {
          resolve(data);
        });
      });
      try {
        body = JSON.parse(rawBody || '{}');
      } catch {
        body = {};
      }
    }

    const { email, userName, language } = body || {};

    if (!email || typeof email !== 'string') {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Thiếu email người nhận' }));
      return;
    }

    const apiKey =
      process.env.RESEND_API_KEY ||
      process.env.resend_api_key ||
      '';

    if (!apiKey) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({
          error:
            'Chưa cấu hình RESEND_API_KEY trong biến môi trường máy chủ (Vercel / .env).',
        })
      );
      return;
    }

    const fromAddress =
      process.env.RESEND_FROM ||
      'EcoSort <reminder@studyverse.cloud>';

    const appUrl =
      process.env.APP_URL ||
      'https://ecosort.vercel.app';

    const { subject, html } = generateReminderEmailHtml({
      userName: userName || 'Chiến Binh Xanh',
      language: language || 'vi',
      appUrl,
    });

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress.trim(),
        to: [email.trim()],
        subject,
        html,
      }),
    });

    const resendData = (await resendResponse.json().catch(() => ({}))) as any;

    if (!resendResponse.ok) {
      const errMsg =
        resendData?.message ||
        resendData?.error ||
        `Lỗi từ dịch vụ Resend (mã lỗi ${resendResponse.status})`;
      res.writeHead(resendResponse.status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: errMsg }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        success: true,
        id: resendData.id,
        message: 'Đã gửi lời nhắc phân loại rác qua email thành công!',
      })
    );
  } catch (err: any) {
    console.error('Lỗi khi gửi email qua Resend:', err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        error: err.message || 'Lỗi máy chủ nội bộ khi gửi email qua Resend',
      })
    );
  }
}

