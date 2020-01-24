using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Sharp_Witted_Plantation_Genie.applicationLogic.password

{
    public class PasswordHasher
    {

        /// <param name="password">the plain text password that will be hashed</param>
        /// <returns>the hashed password and the salt used to generate the hashed password</returns>
        public static PasswordResult HashPassword(string password){
            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (var randomNumberGenerator = RandomNumberGenerator.Create())
            {
                randomNumberGenerator.GetBytes(salt);
            }

            return HashPassword(password, salt);
        }

        /// <param name="plainTextPassword">the plain text password to verify </param>
        /// <param name="salt">the salt that will be used to hash the plain text password</param>
        /// <param name="hashedPassword">the hashed password to compare to</param>
        /// <returns>true if the hashing of the plain text password combined with the salt is equal to the given 
        /// hashed password, and false if otherwise</returns>
        public static bool VerifyPassword(string plainTextPassword, string salt, string hashedPassword){
            byte [] saltConvertedToBytes = Convert.FromBase64String(salt);
            PasswordResult passwordResult = HashPassword(plainTextPassword, saltConvertedToBytes);

            return passwordResult.HashedPassword.Equals(hashedPassword);
        }

        private static PasswordResult HashPassword(string password, byte [] salt){

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return new PasswordResult{
                HashedPassword = hashed,
                SaltedText = Convert.ToBase64String(salt)
            };
        }

    }
}