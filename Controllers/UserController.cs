using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic;
using Sharp_Witted_Plantation_Genie.dataTransferObjects;

namespace PlantationGenie.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly sendesContext _sendesContext;
        private readonly UserRetriever _userRetriever;

        public UserController(UserRetriever userRetriever, sendesContext sendesContext)
        {
            _userRetriever = userRetriever;
            _sendesContext = sendesContext;
        }

        [HttpGet("{username}")]
        public UserDTO GetUser(string username)
        {
            UserDTO user = _userRetriever.GetUser(username);
            return user;
        }
    }
}
