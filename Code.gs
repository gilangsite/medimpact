// Config Variables
var EVENT_NAME = "Literasi Finansial, untuk Calon Dokter, Peta jalan menuju PPDS";
var ADMIN_EMAIL = "medimpact.official@gmail.com"; // Replace with actual Medimpact admin email

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var timestamp = new Date();
  
  // Extract form data
  var nama = e.parameter.nama;
  var email = e.parameter.email;
  var wa = e.parameter.whatsapp;
  var domisili = e.parameter.domisili;
  var status = e.parameter.status;
  var informasi = e.parameter.informasi;
  var consent = e.parameter.consent;

  // 1. Save to Google Sheets
  // Assume columns: Timestamp | Nama | Email | WhatsApp | Domisili | Status | Sumber Info | Consent
  sheet.appendRow([timestamp, nama, email, wa, domisili, status, informasi, consent]);

  // 2. Send Confirmation Email to User
  sendConfirmationEmail(nama, email);
  
  // 3. Send Notification Email to Admin
  sendAdminNotification(nama, email, wa, status);

  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendConfirmationEmail(userName, userEmail) {
  var subject = "Konfirmasi Pendaftaran Berhasil: " + EVENT_NAME;
  
  // Define Logo URL. 
  // It's recommended to host the logo online and use its direct URL in the email template.
  var logoUrl = "https://raw.githubusercontent.com/username/repo/main/Logo-MedImpact.png"; // Replace with actual hosted logo URL if needed, or use text header
  
  var htmlBody = `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background-color: #f4f7f6; padding: 20px; text-align: center; border-bottom: 2px solid #1c6657;">
        <!-- <img src="${logoUrl}" alt="Medimpact Logo" style="height: 50px;"> -->
        <h2 style="color: #1c6657; margin: 10px 0 0 0;">Medimpact</h2>
      </div>
      
      <!-- Content -->
      <div style="padding: 30px; color: #333333; line-height: 1.6;">
        <p style="font-size: 16px;">Hai, <strong>${userName}</strong>!</p>
        
        <p>Terimakasih sudah mendaftar untuk menghadiri event <strong>${EVENT_NAME}</strong>.</p>
        
        <p>Saat ini data kamu sudah masuk dan tersimpan dengan aman oleh tim Medimpact. Kami sangat antusias menyambut kehadiranmu dalam webinar ini, yang akan membahas wawasan penting seputar literasi finansial khusus untuk calon dokter.</p>
        
        <div style="background-color: rgba(28, 102, 87, 0.05); padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #1c6657;">
          <h4 style="margin-top: 0; color: #1c6657;">Detail Pelaksanaan:</h4>
          <ul style="padding-left: 20px; margin-bottom: 0;">
            <li><strong>Tanggal:</strong> 14 Maret 2026</li>
            <li><strong>Waktu:</strong> 11.00 WIB - Selesai</li>
          </ul>
        </div>
        
        <p><strong>Langkah Selanjutnya:</strong><br>
        Tim Medimpact akan secara otomatis mengirimkan link akses Zoom/Platform beserta instruksi lebih lanjut melalui email secara terpisah paling lambat H-1 sebelum webinar dimulai.</p>
        
        <p>Jika ada pertanyaan atau kendala, jangan ragu untuk membalas email ini.</p>
        
        <p style="margin-top: 30px;">
          Salam hangat,<br><br>
          <strong>Gilang</strong><br>
          <em>Medimpact Community Leader</em>
        </p>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #1c6657; color: #ffffff; padding: 15px; text-align: center; font-size: 12px;">
        <p style="margin: 0;">&copy; 2026 Medimpact. All rights reserved.</p>
        <p style="margin: 5px 0 0 0;">Literasi Finansial, untuk Calon Dokter, Peta jalan menuju PPDS</p>
      </div>
      
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: userEmail,
      subject: subject,
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
