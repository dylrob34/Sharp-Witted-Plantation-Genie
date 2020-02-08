using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic.password;
using static PlantationGenie.Controllers.UserController;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Sharp_Witted_Plantation_Genie.applicationLogic
{
    public class UserCreator
    {
        private readonly sendesContext _sendesContext;

        public UserCreator(sendesContext sendesContext)
        {
            _sendesContext = sendesContext;
        }

        public bool CreateUser(CreateUser createUserObject, ModelStateDictionary modelState){
            if (_sendesContext.User.Find(createUserObject.Username) != null){
                modelState.AddModelError("Username", "That username is already taken");
            }
            bool emailIsTaken = (from u in _sendesContext.User where u.Email == createUserObject.Email select u).Any();
            if (emailIsTaken){
                modelState.AddModelError("Email", "That email is already taken");
            }
            if (modelState.ErrorCount != 0) return false;

            PasswordResult passwordResult = PasswordHasher.HashPassword(createUserObject.Password);
            User user = new User{
                UserName = createUserObject.Username,
                Email = createUserObject.Email,
                Password = passwordResult.HashedPassword,
                Salt = passwordResult.SaltedText
            };
            _sendesContext.User.Add(user);
            _sendesContext.SaveChanges();
            
            return true;
        }
    }
}