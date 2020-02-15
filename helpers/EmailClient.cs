using System.Net.Mail;

namespace Sharp_Witted_Plantation_Genie.helpers
{
    public class EmailClient
    {
        private readonly SmtpClient _smtpClient;

        public EmailClient(SmtpClient smtpClient)
        {
            _smtpClient = smtpClient;
            _smtpClient.Host = "smtp.gmail.com";
            _smtpClient.Port = 587;
            _smtpClient.UseDefaultCredentials = true;
            _smtpClient.Credentials = new System.Net.NetworkCredential("plantationgenie@gmail.com", "Admin123!"); // probably should put this somewhere else
            _smtpClient.EnableSsl = true;
        }

        public void SendEmail(MailMessage mail)
        {
            mail.From = new MailAddress("plantationgenie@gmail.com");
            _smtpClient.Send(mail);
        }
    }
}