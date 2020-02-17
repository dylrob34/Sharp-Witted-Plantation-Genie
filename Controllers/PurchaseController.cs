using System.ComponentModel.DataAnnotations;
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

        [HttpPost("")]
        public bool MakePurchase(PurchaseRequest purchaseRequest){
            MailMessage message = new MailMessage();
            message.To.Add(purchaseRequest.EmailAddress);
            message.Subject = "Purchase confirmation";
            message.Body = "Still need to add this.....";
            _emailClient.SendEmail(message);
            return true;
        }

        [HttpGet("")]
        public string TestEmailSending()
        {
            MailMessage message = new MailMessage();
            message.To.Add("dmanna@my.bridgeport.edu");
            message.Subject = "Test Mail";
            message.Body = "testing email sending...";
            _emailClient.SendEmail(message);
            return "it worked!";
        }
    }

    public class PurchaseRequest{

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
        [Required]
        public string DeviceType { get; set; }
    }
}