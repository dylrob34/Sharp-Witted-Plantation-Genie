using Microsoft.AspNetCore.Mvc;
using PlantationGenie.sendes;
using System.Collections.Generic;
using System.Linq;

namespace Sharp_Witted_Plantation_Genie.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DeviceTypeController
    {
        private readonly sendesContext _sendesContext;

        public DeviceTypeController(sendesContext sendesContext)
        {
            _sendesContext = sendesContext;
        }

        [HttpGet("")]
        public List<ResponseDeviceType> GetDeviceTypes()
        {
            List<ResponseDeviceType> responseDeviceTypes = _sendesContext.Devicetype.ToList()
                                                            .Select(d => new ResponseDeviceType{
                                                                Size = d.Size,
                                                                TankSize = d.TankSize,
                                                                IsInStock = d.IsInStock
                                                            })
                                                            .OrderBy(d => d.TankSize)
                                                            .ToList();       
            return responseDeviceTypes;
        }

        public class ResponseDeviceType{
            public string Size { get; set; }
            public decimal? TankSize { get; set; }
            public bool? IsInStock { get; set; }

        }
    }
}