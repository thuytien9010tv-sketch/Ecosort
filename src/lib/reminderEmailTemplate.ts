export interface ReminderEmailParams {
  userName?: string;
  language?: string;
  appUrl?: string;
}

export function generateReminderEmailHtml({
  userName = 'Chiến Binh Xanh',
  language = 'vi',
  appUrl = 'https://ecosort.vercel.app',
}: ReminderEmailParams): { subject: string; html: string } {
  const lang = (language || 'vi').toLowerCase();

  const subjects: Record<string, string> = {
    vi: '🌱 [EcoSort] Nhắc nhở phân loại rác tối nay!',
    en: '🌱 [EcoSort] Waste Sorting Reminder for Tonight!',
    zh: '🌱 [EcoSort] 今晚垃圾分类提醒！',
    ko: '🌱 [EcoSort] 오늘 저녁 분리수거 알림!',
  };

  const subject = subjects[lang] || subjects.vi;

  const content: Record<
    string,
    {
      greeting: string;
      lead: string;
      binsTitle: string;
      binOrganic: { name: string; desc: string };
      binRecycle: { name: string; desc: string };
      binInorganic: { name: string; desc: string };
      binHazardous: { name: string; desc: string };
      tipTitle: string;
      tips: string[];
      actionBtn: string;
      footerNote: string;
    }
  > = {
    vi: {
      greeting: `Xin chào ${userName},`,
      lead: 'Đã đến 19:00 - thời điểm lý tưởng để phân loại và dọn dẹp rác thải trong ngày! Hãy dành 2 phút để phân loại chính xác, vừa giữ sạch nhà cửa, vừa tích lũy điểm thưởng xanh trên EcoSort nhé.',
      binsTitle: 'Hướng dẫn nhanh 4 loại thùng rác:',
      binOrganic: {
        name: '🟢 Thùng Xanh Lá (Rác Hữu Cơ)',
        desc: 'Thức ăn thừa, rau củ quả hỏng, vỏ trái cây, bã trà, lá cây rụng.',
      },
      binRecycle: {
        name: '🔵 Thùng Xanh Dương (Rác Tái Chế)',
        desc: 'Chai nhựa, lon kim loại, giấy báo, thùng carton (tráng sạch và ép dẹp).',
      },
      binInorganic: {
        name: '🟡 Thùng Vàng / Xám (Rác Còn Lại / Vô Cơ)',
        desc: 'Túi nilon bẩn, hộp xốp dính dầu mỡ, tã lót, đồ gốm sứ vỡ.',
      },
      binHazardous: {
        name: '🔴 Thùng Đỏ / Cam (Rác Nguy Hại)',
        desc: 'Pin cũ, bóng đèn hư, pin sạc dự phòng, chai lọ đựng hóa chất tẩy rửa.',
      },
      tipTitle: 'Mẹo sống xanh tối nay:',
      tips: [
        'Tráng sơ chai lọ nhựa hoặc hộp sữa trước khi bỏ vào thùng tái chế để tránh bốc mùi.',
        'Để riêng pin đã qua sử dụng vào một hộp nhỏ, không vứt chung vào túi rác sinh hoạt.',
        'Buộc chặt miệng túi rác hữu cơ để giữ vệ sinh chung cho khu dân cư.',
      ],
      actionBtn: 'Mở ứng dụng EcoSort để nhận điểm',
      footerNote: 'Email này được gửi tự động từ tính năng Nhắc Nhở của ứng dụng EcoSort.',
    },
    en: {
      greeting: `Hello ${userName},`,
      lead: "It's 19:00 — the perfect time to sort and clear today's household waste! Spend just 2 minutes sorting correctly to keep your home tidy and earn Green XP on EcoSort.",
      binsTitle: 'Quick 4-Bin Sorting Guide:',
      binOrganic: {
        name: '🟢 Green Bin (Organic Waste)',
        desc: 'Food scraps, fruit peels, vegetable leftovers, tea bags, garden leaves.',
      },
      binRecycle: {
        name: '🔵 Blue Bin (Recyclable Waste)',
        desc: 'Plastic bottles, cans, paper, cartons (rinse and flatten beforehand).',
      },
      binInorganic: {
        name: '🟡 Yellow / Grey Bin (General / Inorganic)',
        desc: 'Greasy foam containers, soiled plastic bags, broken ceramics, wrappers.',
      },
      binHazardous: {
        name: '🔴 Red Bin (Hazardous Waste)',
        desc: 'Batteries, CFL bulbs, e-waste, spray cans, chemical bottles.',
      },
      tipTitle: 'Eco Tip for Tonight:',
      tips: [
        'Rinse containers quickly so they do not contaminate clean paper recyclables.',
        'Keep used batteries in a dedicated dry container for safe community recycling.',
        'Tie up organic waste bags tightly to maintain household hygiene.',
      ],
      actionBtn: 'Open EcoSort to Claim XP',
      footerNote: 'This automated reminder was sent by your EcoSort reminder schedule.',
    },
    zh: {
      greeting: `您好 ${userName}，`,
      lead: '现在是晚上19:00，正是分类清理生活垃圾的最佳时间！花2分钟准确分类，守护环境的同时还能在 EcoSort 获取绿色积分。',
      binsTitle: '4类垃圾桶快速指南：',
      binOrganic: {
        name: '🟢 绿色桶（厨余/易腐垃圾）',
        desc: '剩饭剩菜、果皮菜叶、茶渣、植物残枝。',
      },
      binRecycle: {
        name: '🔵 蓝色桶（可回收物）',
        desc: '塑料瓶、易拉罐、废纸箱、玻璃瓶（请清洗干净并压扁）。',
      },
      binInorganic: {
        name: '🟡 黄/灰色桶（其他垃圾）',
        desc: '油污塑料袋、污染泡沫盒、破损陶瓷、纸巾湿巾。',
      },
      binHazardous: {
        name: '🔴 红色桶（有害垃圾）',
        desc: '废旧电池、荧光灯管、过期药品、化学清洁剂瓶。',
      },
      tipTitle: '今晚环保小贴士：',
      tips: [
        '将牛奶盒与饮料瓶简单冲洗后再投入回收桶，避免产生异味。',
        '废电池请单独收纳在小盒子里，切勿混入日常垃圾。',
      ],
      actionBtn: '打开 EcoSort 领取积分',
      footerNote: '此邮件由 EcoSort 垃圾分类提醒功能自动发送。',
    },
    ko: {
      greeting: `안녕하세요 ${userName} 님,`,
      lead: '저녁 7시입니다! 오늘의 분리배출을 실천할 시간입니다. 2분만 투자하여 올바르게 분리수거하고 EcoSort에서 그린 포인트를 적립해보세요.',
      binsTitle: '4가지 분리수거함 가이드:',
      binOrganic: {
        name: '🟢 초록색 함 (음식물 쓰레기)',
        desc: '음식물 찌꺼기, 과일 껍질, 채소 잔재 (물기 제거 후 배출).',
      },
      binRecycle: {
        name: '🔵 파란색 함 (재활용품)',
        desc: '페트병, 캔, 종이박스 (라벨 제거 및 깨끗이 헹군 후 배출).',
      },
      binInorganic: {
        name: '🟡 노랑/회색 함 (일반 종량제)',
        desc: '기름 묻은 비닐, 오염된 스티로폼, 깨진 도자기, 휴지.',
      },
      binHazardous: {
        name: '🔴 빨간색 함 (유해 폐기물)',
        desc: '폐건전지, 형광등, 소형 가전, 화학세제 용기.',
      },
      tipTitle: '오늘의 친환경 팁:',
      tips: [
        '음식물이 묻은 용기는 물로 헹궈서 배출해야 재활용률이 올라갑니다.',
        '폐건전지는 전용 수거함에 따로 모아 배출해주세요.',
      ],
      actionBtn: 'EcoSort 앱 열기',
      footerNote: '본 메일은 EcoSort 분리수거 알림 설정에 의해 발송되었습니다.',
    },
  };

  const c = content[lang] || content.vi;

  const html = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3fdf6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f3fdf6; padding: 24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.08); border: 1px solid #d1fae5;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #059669 0%, #10b981 50%, #14b8a6 100%); padding: 32px 28px; text-align: center;">
              <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); border-radius: 16px; padding: 8px 16px; margin-bottom: 12px;">
                <span style="font-size: 28px; vertical-align: middle;">🌱</span>
                <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; vertical-align: middle; margin-left: 6px;">Eco<span style="color: #a7f3d0;">Sort</span></span>
              </div>
              <h1 style="margin: 8px 0 0 0; color: #ffffff; font-size: 20px; font-weight: 800; line-height: 1.3;">
                ${subject}
              </h1>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 32px 28px;">
              <p style="font-size: 16px; font-weight: 700; color: #065f46; margin: 0 0 12px 0;">
                ${c.greeting}
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #374151; margin: 0 0 24px 0;">
                ${c.lead}
              </p>

              <!-- 4 Bins Guide Card -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 18px; padding: 20px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 14px 0; font-size: 15px; font-weight: 800; color: #047857;">
                  ${c.binsTitle}
                </h3>
                
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; vertical-align: top;">
                      <strong style="color: #15803d;">${c.binOrganic.name}</strong>
                      <div style="color: #4b5563; margin-top: 2px;">${c.binOrganic.desc}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; vertical-align: top; border-top: 1px dashed #cbd5e1;">
                      <strong style="color: #0369a1;">${c.binRecycle.name}</strong>
                      <div style="color: #4b5563; margin-top: 2px;">${c.binRecycle.desc}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; vertical-align: top; border-top: 1px dashed #cbd5e1;">
                      <strong style="color: #854d0e;">${c.binInorganic.name}</strong>
                      <div style="color: #4b5563; margin-top: 2px;">${c.binInorganic.desc}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; vertical-align: top; border-top: 1px dashed #cbd5e1;">
                      <strong style="color: #b91c1c;">${c.binHazardous.name}</strong>
                      <div style="color: #4b5563; margin-top: 2px;">${c.binHazardous.desc}</div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Tips Box -->
              <div style="background-color: #fefce8; border: 1px solid #fef08a; border-radius: 16px; padding: 16px 20px; margin-bottom: 28px;">
                <div style="font-size: 13px; font-weight: 800; color: #854d0e; margin-bottom: 8px;">
                  💡 ${c.tipTitle}
                </div>
                <ul style="margin: 0; padding-left: 20px; font-size: 12.5px; color: #713f12; line-height: 1.6;">
                  ${c.tips.map((t) => `<li style="margin-bottom: 4px;">${t}</li>`).join('')}
                </ul>
              </div>

              <!-- Call To Action Button -->
              <div style="text-align: center; margin: 28px 0 12px 0;">
                <a href="${appUrl}" style="display: inline-block; background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 28px; border-radius: 14px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);">
                  ${c.actionBtn} →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; border-top: 1px solid #f3f4f6; padding: 20px 28px; text-align: center; font-size: 12px; color: #9ca3af;">
              <p style="margin: 0 0 6px 0;">
                🌱 <strong>EcoSort</strong> — Sort Waste Accurately, Save Earth Together.
              </p>
              <p style="margin: 0; font-size: 11px;">
                ${c.footerNote}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  return { subject, html };
}

