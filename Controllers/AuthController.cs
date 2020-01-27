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
        public UserDTO PostLogin([FromBody] AuthObject values)
        {
            UserDTO user = _authenticator.Authenticate(values.username, values.password);
            return user;
        }
    }

    public class AuthObject
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
