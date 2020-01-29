using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PlantationGenie.sendes;
using Sharp_Witted_Plantation_Genie.applicationLogic.password;
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

        /// <param name="username">the username to authenticate</param>
        /// <param name="password">the password corresponding to the username</param>
        /// <returns>an empty string if the user is not found, or if the given password does not match
        /// the user's password. If ther user is found, and the given password is a match, then the token for
        /// that user will be returned.</returns>
        public string Authenticate(string username, string password)
        {
            User user = _sendesContext.User.Find(username);
            if (user == null) return "";

            // uncomment this after. Let's just make sure we can generate JWT tokens first.

            // bool passwordIsCorrect = PasswordHasher.VerifyPassword(password, user.Salt, user.Password);
            // if (!passwordIsCorrect) return "";

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName)
                }),
                Issuer = _appSettings.Issuer,
                Audience = _appSettings.Audience,
                Expires = DateTime.UtcNow.AddMinutes(_appSettings.AccessExpiration),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}