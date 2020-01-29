using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly sendesContext _context;
        private readonly Authenticator _authenticator;

        public AuthController(sendesContext context, Authenticator authenticator)
        {
            _context = context;
            _authenticator = authenticator;
        }

        // auth/login
        [HttpPost("login")]
        [AllowAnonymous]
        public TokenResponseObject PostLogin(AuthObject values)
        {
            string token = _authenticator.Authenticate(values.username, values.password);

            if (string.IsNullOrEmpty(token)){
                return new TokenResponseObject{ Failed = true, Token = "" };
            }

            return new TokenResponseObject { Failed = false, Token = token};
        }
    }

    public class AuthObject
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class TokenResponseObject
    {
        public bool Failed { get; set; }
        public string Token { get; set; }
    }
}
