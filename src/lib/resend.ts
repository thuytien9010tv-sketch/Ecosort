export interface SendReminderPayload {
  email: string;
  userName?: string;
  language?: string;
  customMessage?: string;
}

export interface SendReminderResponse {
  success: boolean;
  id?: string;
  message?: string;
  error?: string;
}

export const sendReminderEmail = async (
  payload: SendReminderPayload
): Promise<SendReminderResponse> => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email.trim())) {
    throw new Error('Địa chỉ email không hợp lệ. Vui lòng kiểm tra lại!');
  }

  const response = await fetch('/api/send-reminder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: payload.email.trim(),
      userName: payload.userName || 'Chiến Binh Xanh',
      language: payload.language || 'vi',
      customMessage: payload.customMessage,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      data.error ||
      data.message ||
      `Lỗi gửi email (mã trạng thái ${response.status})`;
    throw new Error(errorMsg);
  }

  return {
    success: true,
    id: data.id,
    message: data.message || 'Đã gửi lời nhắc phân loại rác qua email thành công!',
  };
};

