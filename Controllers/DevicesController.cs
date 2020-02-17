using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("[controller]")]
    public class DevicesController : Controller
    {

        private readonly sendesContext _context;
        public DevicesController(sendesContext context)
        {
            _context = context;
        }
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<responseDevice> Get()
        {
            string authenticatedUser = HttpContext.User.FindFirst(ClaimTypes.Name).Value;

            var devices = from d in _context.Device where d.RegisteredUser == authenticatedUser select d;
            List<responseDevice> deviceList = new List<responseDevice>();

            foreach (Device d in devices)
            {
                deviceList.Add(new responseDevice
                {
                    ID = d.Id,
                    deviceType = d.DeviceType,
                    plantMonitoring = d.PlantMonitering,
                    waterLevel = d.WaterLevel,
                    moistureLevel = d.MoistureLevel,
                    deviceName = d.DeviceName
                });
            }
            return deviceList;
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        [HttpPost("editDevice")]
        public responseEdit PostEditDevice(editDevice values)
        {
            string authenticatedUser = HttpContext.User.FindFirst(ClaimTypes.Name).Value;

            Device device = _context.Find<Device>(values.ID);

            if (device.RegisteredUser == authenticatedUser)
            {
                device.DeviceName = values.deviceName;
                device.PlantMonitering = values.plantName;
                _context.SaveChanges();
                return new responseEdit { Failed = false };
            }


            return new responseEdit { Failed = true};

        }

        [HttpPost("registerDevice")]
        [Authorize]
        public responseEdit PostRegisterDevice(editDevice values)
        {
            string authenticatedUser = HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            Device device = _context.Find<Device>(values.ID);
            if (device == null) {
                return new responseEdit { Failed = true, ErrorMessage = "That device does not exist" };
            }
            if (device.RegisteredUser != null) {
                return new responseEdit { Failed = true, ErrorMessage = "That device is already registered by another user" };
            }
            System.Console.WriteLine("registering device...");
            device.RegisteredUser = authenticatedUser;
            device.DeviceName = values.deviceName;
            device.PlantMonitering = values.plantName;
            _context.SaveChanges();
            return new responseEdit { Failed = false, ErrorMessage = "none" };
        }

        public struct responseDevice
        {
            public int ID { get; set; }
            public string deviceType { get; set; }
            public string plantMonitoring { get; set; }
            public decimal waterLevel { get; set; }
            public int moistureLevel { get; set; }
            public string deviceName {get;set;}
        }

        public struct editDevice
        {
            public int ID { get; set; }
            public string deviceName { get; set; }
            public string plantName { get; set; }
        }

        public struct responseEdit
        {
            public bool Failed { get; set; }
            public string ErrorMessage { get; set;}
        }
    }
}
