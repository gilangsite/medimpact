// Config Variables
var EVENT_NAME = "Literasi Finansial, untuk Calon Dokter, Peta jalan menuju PPDS";
var ADMIN_EMAIL = "medimpact.official@gmail.com"; // Replace with actual Medimpact admin email

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var timestamp = new Date();
  
  // Extract form data, with fallback for empty or malformed requests
  var nama = (e && e.parameter && e.parameter.nama) ? e.parameter.nama : "Tanpa Nama";
  var email = (e && e.parameter && e.parameter.email) ? e.parameter.email : "";
  var wa = (e && e.parameter && e.parameter.whatsapp) ? e.parameter.whatsapp : "";
  var domisili = (e && e.parameter && e.parameter.domisili) ? e.parameter.domisili : "";
  var status = (e && e.parameter && e.parameter.status) ? e.parameter.status : "";
  var informasi = (e && e.parameter && e.parameter.informasi) ? e.parameter.informasi : "";
  var consent = (e && e.parameter && e.parameter.consent) ? e.parameter.consent : "";

  // 1. Save to Google Sheets
  // Assume columns: Timestamp | Nama | Email | WhatsApp | Domisili | Status | Sumber Info | Consent
  sheet.appendRow([timestamp, nama, email, wa, domisili, status, informasi, consent]);

  // 2. Send Confirmation Email to User (only if email exists)
  if (email && email !== "") {
    sendConfirmationEmail(nama, email);
  }
  
  // 3. Send Notification Email to Admin
  sendAdminNotification(nama, email, wa, status);

  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmail(userName, userEmail) {
  var subject = "Konfirmasi Pendaftaran Berhasil: Literasi Finansial";
  
  var htmlBody = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Konfirmasi Pendaftaran</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
    body {
      font-family: 'Garet', 'Montserrat', Arial, sans-serif;
      background-color: #f4f7f6;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .email-wrapper {
      width: 100%;
      background-color: #f4f7f6;
      padding: 40px 0;
    }
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }
    .header {
      background-color: #1c6657;
      padding: 30px;
      text-align: center;
    }
    .header img {
      max-height: 50px;
      display: inline-block;
    }
    .poster-container {
      width: 100%;
      background-color: #ffffff;
    }
    .poster-container img {
      width: 100%;
      height: auto;
      display: block;
    }
    .content {
      padding: 40px;
      color: #333333;
      line-height: 1.6;
      text-align: justify;
    }
    .headline {
      color: #1c6657;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-top: 0;
      margin-bottom: 25px;
    }
    .greeting {
      font-size: 16px;
      margin-bottom: 15px;
    }
    .event-details {
      background-color: rgba(28, 102, 87, 0.05);
      border-radius: 12px;
      margin: 30px 0;
      border: 1px solid rgba(28, 102, 87, 0.1);
      width: 100%;
    }
    .event-details td {
      padding: 12px 20px;
      font-size: 15px;
      text-align: left;
    }
    .event-details tr:not(:last-child) td {
      border-bottom: 1px solid rgba(28, 102, 87, 0.1);
    }
    .detail-label {
      color: #1c6657;
      font-weight: bold;
      width: 100px;
    }
    .info-box {
      background-color: #e8f4f1;
      padding: 15px 20px;
      border-left: 4px solid #1c6657;
      border-radius: 0 8px 8px 0;
      margin: 25px 0;
      color: #1c6657;
      font-size: 14.5px;
      text-align: left;
    }
    .footer {
      text-align: center;
      padding: 30px;
      background-color: #f9f9f9;
      border-top: 1px solid #eeeeee;
    }
    .footer-text {
      font-size: 13px;
      color: #777777;
      margin-bottom: 12px;
      display: block;
    }
    .footer img {
      height: 35px;
      object-fit: contain;
    }
    @media only screen and (max-width: 600px) {
      .content {
        padding: 25px;
      }
      .email-wrapper {
        padding: 20px 10px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <!--[if (gte mso 9)|(IE)]>
    <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
    <tr>
    <td align="center" valign="top" width="600">
    <![endif]-->
    <div class="email-container">
      
      <!-- Header -->
      <div class="header">
        <img src="https://drive.google.com/uc?export=view&id=1hKg0Yc6fiGFhrQaYOrotuJMfMkcOxIlC" alt="Medimpact Logo">
      </div>

      <!-- Poster -->
      <div class="poster-container">
        <img src="https://drive.google.com/uc?export=view&id=1GPkRcZhIqSND8pwJQVpzp07fGDPH4Yha" alt="Poster Webinar">
      </div>
      
      <!-- Content -->
      <div class="content">
        <h1 class="headline">Konfirmasi Pendaftaran</h1>
        
        <div class="greeting">
          Halo, <strong>${userName}</strong>!
        </div>
        
        <p>Terima kasih telah mendaftar untuk menghadiri acara bersama kami. Data pendaftaran Anda telah berhasil kami terima dan tersimpan dengan aman di sistem Medimpact.</p>
        
        <p>Kami sangat antusias menyambut kehadiran Anda dalam webinar ini, yang dirancang khusus untuk memberikan wawasan penting seputar literasi finansial sebagai bekal bagi calon dokter.</p>
        
        <!-- Details Box -->
        <table class="event-details" cellpadding="0" cellspacing="0">
          <tr>
            <td class="detail-label">Webinar</td>
            <td>Literasi Finansial : Peta Menuju PPDS</td>
          </tr>
          <tr>
            <td class="detail-label">Speaker</td>
            <td>dr. Stellon Salim, MKK, AIFO-K</td>
          </tr>
          <tr>
            <td class="detail-label">Tanggal</td>
            <td>14 Maret 2026</td>
          </tr>
          <tr>
            <td class="detail-label">Waktu</td>
            <td>10.00 WIB - Selesai</td>
          </tr>
        </table>
        
        <div class="info-box">
          <strong>Perhatian:</strong> Link akses webinar (Zoom/Platform) beserta instruksi lebih lanjut akan dibagikan ke email ini paling lambat H-1 sebelum event digelar.
        </div>
        
        <p>Apabila Anda memiliki pertanyaan lebih lanjut atau mengalami kendala, silakan membalas email ini secara langsung.</p>
        
        <p style="margin-top: 40px; text-align: left;">
          Salam hangat,<br><br>
          <strong style="color: #1c6657;">Tim Medimpact</strong>
        </p>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <span class="footer-text">Powered by :</span>
        <img src="https://drive.google.com/uc?export=view&id=1iJr3mf3L2EX5rhrJqtDPPapvzDkAV9EF" alt="Logo Medimpact-medtools">
      </div>
      
    </div>
    <!--[if (gte mso 9)|(IE)]>
    </td>
    </tr>
    </table>
    <![endif]-->
  </div>
</body>
</html>
  `;

  try {
    MailApp.sendEmail({
      to: userEmail,
      subject: subject,
      body: "Pendaftaran Anda berhasil. Harap aktifkan HTML pada email client Anda untuk melihat detail pendaftaran.",
      htmlBody: htmlBody,
      name: "Medimpact Webinar"
    });
  } catch (error) {
    Logger.log("Error sending email to user: " + error);
  }
}

function sendAdminNotification(nama, email, wa, status) {
  var subject = "Pendaftar Baru: " + EVENT_NAME;
  var body = `
    Ada pendaftar baru untuk webinar!
    
    Nama: ${nama}
    Email: ${email}
    WhatsApp: ${wa}
    Status: ${status}
    
    Silakan cek Google Spreadsheet untuk detail lengkap.
  `;
  
  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: subject,
      body: body,
      name: "Medimpact System"
    });
  } catch (error) {
    Logger.log("Error sending email to admin: " + error);
  }
}
