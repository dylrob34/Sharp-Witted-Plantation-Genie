using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PlantationGenie.sendes;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PlantationGenie.Controllers
{
    public class HomeController : Controller
    {
        private readonly sendesContext _sendesContext;

        public HomeController(sendesContext sendesContext)
        {
            _sendesContext = sendesContext;
        }
        // GET: /<controller>/
        public ActionResult Index()
        {
            User user = _sendesContext.User.Find("dylana1998");
            return Ok("the name");
        }
    }
}
