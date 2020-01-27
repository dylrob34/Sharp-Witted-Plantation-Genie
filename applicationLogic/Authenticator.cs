using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.dataTransferObjects;
using Sharp_Witted_Plantation_Genie.helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Sharp_Witted_Plantation_Genie.applicationLogic
{
    public class Authenticator
    {
        private readonly sendesContext _sendesContext;
        private readonly AppSettings _appSettings;

        public Authenticator(sendesContext sendesContext, IOptions<AppSettings> appSettings)
        {
            _sendesContext = sendesContext;
            _appSettings = appSettings.Value;
        }
        public UserDTO Authenticate(string username, string password)
        {
            User user = _sendesContext.User.SingleOrDefault(x => x.UserName == username && x.Password == password);

            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return new UserDTO{
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Token = tokenHandler.WriteToken(token)
                // get users devices....
            };
        }
    }
}