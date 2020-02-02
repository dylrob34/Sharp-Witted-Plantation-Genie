using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PlantationGenie.sendes;

namespace Sharp_Witted_Plantation_Genie.Controllers
{
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    [Route("[controller]")]
    public class PlantsController : Controller
    {
        private readonly sendesContext _context;

        public PlantsController(sendesContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        [AllowAnonymous]
        public IEnumerable<string> GetAllUniquePlantNames()
        {
            return _context.Plant.Select(plant => plant.Name).ToList();
        }
    }
}