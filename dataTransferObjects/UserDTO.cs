using System.Collections.Generic;
using PlantationGenie.sendes;

namespace Sharp_Witted_Plantation_Genie.dataTransferObjects
{
    public class UserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public List<DeviceDTO> Devices { get; set; }
    }
}