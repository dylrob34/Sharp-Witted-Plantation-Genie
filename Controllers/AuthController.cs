using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic;
using System;
using System.Security.Claims;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly Authenticator _authenticator;
        private readonly sendesContext _context;

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
            string token = _authenticator.Login(values.username, values.password);

            if (string.IsNullOrEmpty(token)){
                return new TokenResponseObject{ Failed = true, Token = "" };
            }

            return new TokenResponseObject { Failed = false, Token = token};
        }

        [HttpGet("verify")]
        [Authorize]
        public OkResult GetVerify()
        {
            Console.WriteLine("Succesfuly validated " + HttpContext.User.Identity.Name);
            return Ok();
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
