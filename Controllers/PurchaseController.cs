using System;
using System.ComponentModel.DataAnnotations;
using System.Net.Mail;
using Microsoft.AspNetCore.Mvc;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.helpers;

namespace Sharp_Witted_Plantation_Genie.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PurchaseController
    {
        private readonly EmailClient _emailClient;
        private readonly sendesContext _sendesContext;
        public PurchaseController(EmailClient emailClient, sendesContext sendesContext)
        {
            _sendesContext = sendesContext;
            _emailClient = emailClient;
        }

        [HttpPost("")]
        public bool MakePurchase(PurchaseRequest purchaseRequest)
        {
            Device device = new Device
            {
                DeviceType = purchaseRequest.DeviceType
            };
            _sendesContext.Device.Add(device);
            _sendesContext.SaveChanges();
            int deviceId = device.Id; // id is created after saveChanges is called
            System.Console.WriteLine(deviceId);
            MailMessage message = new MailMessage();
            message.To.Add(purchaseRequest.EmailAddress);
            message.Subject = "Purchase confirmation";
            message.Body = $"Your device ID is {deviceId} {Environment.NewLine}If you have not done so already, please create account. After your account has been created, head over to the dashboard and use the device ID to register your new device.";
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

    public class PurchaseRequest
    {

        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
        [Required]
        public string DeviceType { get; set; }
    }
}