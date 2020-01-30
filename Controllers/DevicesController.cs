using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
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
                    moistureLevel = d.MoistureLevel
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
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        public struct responseDevice
        {
            public int ID { get; set; }
            public string deviceType { get; set; }
            public string plantMonitoring { get; set; }
            public decimal waterLevel { get; set; }
            public int moistureLevel { get; set; }
        }
    }
}
