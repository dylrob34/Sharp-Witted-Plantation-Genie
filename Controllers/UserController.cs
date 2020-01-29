using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic;
using Sharp_Witted_Plantation_Genie.dataTransferObjects;

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly sendesContext _sendesContext;
        private readonly UserManager _userManager;

        public UserController(UserManager userRetriever, sendesContext sendesContext)
        {
            _userManager = userRetriever;
            _sendesContext = sendesContext;
        }

        [HttpGet("{username}")]
        public UserDTO GetUser(string username)
        {
            string authenticatedUser = HttpContext.User.FindFirst(ClaimTypes.Name).Value;
            // if (authenticatedUser != username) // do something if the authenticated user is trying to make a get request
                                                  // for a different user...
            UserDTO user = _userManager.GetUser(username);
            return user;
        }

        // TODO: Add validation so user can't have a blank username, must have an email, etc..
        [HttpPost("")]
        [AllowAnonymous] // there is no need to be authenticated to create a new user
        public ValidationResult CreateUser(CreateUserDTO createUserDTO){
            ValidationResult result = _userManager.CreateUser(createUserDTO);
            return result;
        }
    }
}
