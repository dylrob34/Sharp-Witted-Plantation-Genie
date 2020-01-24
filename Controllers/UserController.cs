using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlantationGenie.sendes;

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly sendesContext _sendesContext;

        public UserController(sendesContext sendesContext)
        {
            _sendesContext = sendesContext;
        }

        [HttpGet("{username}")]
        public User GetUser(string username)
        {
            User user = _sendesContext.User.Find(username);
            return user;
        }
    }
}
