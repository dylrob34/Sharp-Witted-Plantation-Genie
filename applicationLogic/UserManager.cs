using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.dataTransferObjects;
using System.Collections.Generic;
using System.Linq;

namespace Sharp_Witted_Plantation_Genie.applicationLogic
{
    public class UserManager
    {
        private readonly sendesContext _sendesContext;

        public UserManager(sendesContext sendesContext)
        {
            _sendesContext = sendesContext;
        }

        
        public UserDTO GetUser(string username){
            User user = _sendesContext.User.Find(username);
            List<Device> userDevices = (from device in _sendesContext.Device
                                    where device.RegisteredUser == username
                                    select device).ToList();
            return new UserDTO{
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Devices = user.Device.ToList()
            };
        }
    }
}