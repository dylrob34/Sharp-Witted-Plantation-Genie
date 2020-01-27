using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlantationGenie.sendes;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantationGenie.Controllers
{
    [ApiController]
    public class AuthController : Controller
    {
        private readonly sendesContext _context;
        public AuthController(sendesContext context)
        {
            _context = context;
        }

        [Route("auth/login")]
        [HttpPost]
        public async Task<JsonResult> PostLogin([FromBody] AuthObject values)
        {
            var user = await _context.FindAsync<User>(values.username);
            if (user != null)
            {
                if (user.Password == values.password)
                {
                    return Json("true");
                }
            }
            return Json("false");
        }
    }

    public class AuthObject
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
