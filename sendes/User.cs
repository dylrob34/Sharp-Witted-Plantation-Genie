using System;
using System.Collections.Generic;

namespace PlantationGenie.sendes
{
    public partial class User
    {
        public User()
        {
            Device = new HashSet<Device>();
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Salt { get; set; }

        public virtual ICollection<Device> Device { get; set; }
    }
}
