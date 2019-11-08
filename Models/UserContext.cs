using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace PlantationGenie.Models
{
    public class UserContext
    {
        public string ConnectionString { get; set; }

        public UserContext(string connectionString)
        {
            this.ConnectionString = connectionString;
        }

        private MySqlConnection GetConnection()
        {
            Console.WriteLine("connection string is: " + ConnectionString);
            return new MySqlConnection(ConnectionString);
        }

        public String GetUser()
        {
            string response = "error";
            using (MySqlConnection conn = GetConnection())
            {
                conn.Open();
                MySqlCommand cmd = new MySqlCommand("select * from employee where employee_id=1234", conn);

                using (var reader = cmd.ExecuteReader())
                {
                    reader.Read();
                    response = reader["first_name"].ToString();
                }
            }
            return response;
        }
    }
}
