using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic;

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    [Route("[controller]")]
    public class UserController : Controller
    {

        private readonly sendesContext _sendesContext;

        public UserController(sendesContext sendesContext)
        {
            _sendesContext = sendesContext;
        }

        [HttpGet]
        public JsonResult GetUser()
        {
            string authenticatedUser = HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            // if (authenticatedUser != username) // do something if the authenticated user is trying to make a get request
            // for a different user...
            User user = _sendesContext.Find<User>(authenticatedUser);
            var response = new ResponseUser { firstName = user.FirstName, lastName = user.LastName };
            return Json(response);
        }

        public class ResponseUser
        {
            public string firstName { get; set; }
            public string lastName { get; set; }
        }
    }
}
