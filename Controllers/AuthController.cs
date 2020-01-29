using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic;
using Sharp_Witted_Plantation_Genie.dataTransferObjects;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class AuthController : Controller
    {
        private readonly sendesContext _context;
        private readonly Authenticator _authenticator;

        public AuthController(sendesContext context, Authenticator authenticator)
        {
            _context = context;
            _authenticator = authenticator;
        }

        [Route("auth/login")]
        [HttpPost]
        public JsonResult PostLogin([FromBody] AuthObject values)
        {
            Console.WriteLine("username: " + values.username + " password: " + values.password);
            //UserDTO user = _authenticator.Authenticate(values.username, values.password);
            var response = new ResponseObject("false", "nothing yet");
            return Json(response);
        }
    }

    public class AuthObject
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class ResponseObject
    {
        public string failed { get; set; }
        public string token { get; set; }

        public ResponseObject(string f, string t)
        {
            failed = f;
            token = t;
        }
    }
}
