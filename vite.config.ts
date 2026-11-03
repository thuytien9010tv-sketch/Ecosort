import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

function resendDevPlugin(env: Record<string, string>) {
  return {
    name: 'resend-dev-middleware',
    configureServer(server: any) {
      server.middlewares.use(async (req: any, res: any, next: any) => {
        if (req.url === '/api/send-reminder' && req.method === 'POST') {
          try {
            let bodyStr = '';
            req.on('data', (chunk: any) => {
              bodyStr += chunk;
            });
            req.on('end', async () => {
              try {
                const body = JSON.parse(bodyStr || '{}');
                const apiKey =
                  process.env.RESEND_API_KEY ||
                  process.env.resend_api_key ||
                  env.RESEND_API_KEY ||
                  env.resend_api_key ||
                  '';

                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error: 'Chưa cấu hình RESEND_API_KEY trong .env',
                    })
                  );
                  return;
                }

                const fromAddress =
                  process.env.RESEND_FROM ||
                  env.RESEND_FROM ||
                  'EcoSort <reminder@studyverse.cloud>';

                const appUrl =
                  process.env.APP_URL ||
                  env.APP_URL ||
                  'http://localhost:3000';

                const { generateReminderEmailHtml } = await import(
                  './src/lib/reminderEmailTemplate.ts'
                );

                const { subject, html } = generateReminderEmailHtml({
                  userName: body.userName,
                  language: body.language,
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
                    to: [body.email],
                    subject,
                    html,
                  }),
                });

                const resendData = await resendResponse.json();
                res.statusCode = resendResponse.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(resendData));
              } catch (parseErr: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: parseErr.message }));
              }
            });
          } catch (e: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: e.message }));
          }
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Support both process.env (CI/CD, Vercel, Netlify) and .env file
  const supabaseUrl =
    process.env.VITE_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    env.VITE_SUPABASE_URL ||
    env.SUPABASE_URL ||
    '';

  const supabaseKey =
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    env.VITE_SUPABASE_ANON_KEY ||
    env.SUPABASE_PUBLISHABLE_KEY ||
    env.SUPABASE_ANON_KEY ||
    '';

  return {
    plugins: [react(), tailwindcss(), resendDevPlugin(env)],
    envPrefix: ['VITE_', 'SUPABASE_URL', 'SUPABASE_PUBLISHABLE_KEY'],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    define: {
      'import.meta.env.SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.SUPABASE_PUBLISHABLE_KEY': JSON.stringify(supabaseKey),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(supabaseKey),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseKey),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
