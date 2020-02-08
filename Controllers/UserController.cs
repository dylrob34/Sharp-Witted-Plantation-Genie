using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic;

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Produces("application/json")]
    [Route("[controller]")]
    public class UserController : Controller
    {

        private readonly sendesContext _sendesContext;
        private readonly UserCreator _userCreator;

        public UserController(sendesContext sendesContext, UserCreator userCreator)
        {
            _userCreator = userCreator;
            _sendesContext = sendesContext;
        }

        [HttpGet]
        [Authorize]
        public JsonResult GetUser()
        {
            string authenticatedUser = HttpContext.User.Identity.Name;
            // if (authenticatedUser != username) // do something if the authenticated user is trying to make a get request
            // for a different user...
            User user = _sendesContext.Find<User>(authenticatedUser);
            var response = new ResponseUser { firstName = user.FirstName, lastName = user.LastName };
            return Json(response);
        }

        [HttpPost("register")]
        public ActionResult PostRegister(CreateUser user)
        {
            bool userWasCreatedSuccesfully = _userCreator.CreateUser(user, ModelState);
            if (!userWasCreatedSuccesfully){
                string json = JsonConvert.SerializeObject(new
                {
                    errors = ModelState.ToDictionary(x => x.Key, x => x.Value.Errors)
                });
                return Content(json, "application/json");
            }
            return Json(userWasCreatedSuccesfully);
        }

        public struct ResponseUser
        {
            public string firstName { get; set; }
            public string lastName { get; set; }
        }

        public struct CreateUser
        {
            [Required(ErrorMessage = "Username is required")]
            public string Username { get; set; }

            [Required(ErrorMessage = "Password is required")]
            public string Password { get; set; }

            [Required(ErrorMessage = "Confirmed password is required")]
            [Compare("Password")]
            public string Confirm { get; set; }

            [Required(ErrorMessage = "Email is required")]
            [EmailAddress]
            public string Email { get; set; }
        }
    }
}
