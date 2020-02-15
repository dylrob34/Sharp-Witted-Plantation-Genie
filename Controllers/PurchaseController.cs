using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using Sharp_Witted_Plantation_Genie.helpers;

namespace Sharp_Witted_Plantation_Genie.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PurchaseController
    {
        private readonly EmailClient _emailClient;
        public PurchaseController(EmailClient emailClient)
        {
            _emailClient = emailClient;
        }

        [HttpGet("")]
        public string TestEmailSending()
        {
            MailMessage email = new MailMessage();
            email.To.Add("dmanna@my.bridgeport.edu");
            email.Subject = "Test Mail";
            email.Body = "testing email sending...";
            _emailClient.SendEmail(email);
            return "it worked!";
        }
    }
}