using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic.password;
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


        public UserDTO GetUser(string username)
        {
            User user = _sendesContext.User.Find(username);
            // map only the device properties we want to return in the response
            List<DeviceDTO> userDevices = user.Device.Select(device =>
                new DeviceDTO
                {
                    Id = device.Id,
                    DeviceType = device.DeviceType,
                    RegisteredUser = device.RegisteredUser,
                    PlantMonitering = device.PlantMonitering,
                    WaterLevel = device.WaterLevel
                }).ToList();
                
            return new UserDTO
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Devices = userDevices
            };
        }

        public ValidationResult CreateUser(CreateUserDTO createUserDTO){
            if (_sendesContext.User.Find(createUserDTO.UserName) != null){
                return new ValidationResult { Succeeded = false, ErrorMessage = "That username is already taken" };
            }
            PasswordResult passwordResult = PasswordHasher.HashPassword(createUserDTO.Password);
            User user = new User{
                UserName = createUserDTO.UserName,
                FirstName = createUserDTO.FirstName,
                LastName = createUserDTO.LastName,
                Password = passwordResult.HashedPassword,
                Salt = passwordResult.SaltedText
            };
            _sendesContext.User.Add(user);
            _sendesContext.SaveChanges();
            return new ValidationResult { Succeeded = true };
        }
    }
}