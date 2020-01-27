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
    [Route("auth/[controller]")]
    public class AuthController : Controller
    {
        private readonly DbContext _context;
        public AuthController(DbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostLogin([FromBody] AuthObject values)
        {
            var user = await _context.FindAsync<User>(values.username);
            if (user != null)
            {
                if (user.Password == values.password)
                {
                    return Ok("true");
                }
            }
            return Ok("false");
        }
    }

    public class AuthObject
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
