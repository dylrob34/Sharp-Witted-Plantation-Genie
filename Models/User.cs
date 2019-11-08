using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantationGenie.Models
{
    public class User
    {
        private UserContext context;

        public string employee_id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public char mid_initial { get; set; }
        public string job_title { get; set; }
        public string email { get; set; }
        public bool is_manager { get; set; }
        public bool is_admin { get; set; }
        public string phone { get; set; }
        public string password { get; set; }
    }
}
