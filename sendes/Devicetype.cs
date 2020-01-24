using System;
using System.Collections.Generic;

namespace PlantationGenie.sendes
{
    public partial class Devicetype
    {
        public Devicetype()
        {
            Device = new HashSet<Device>();
        }

        public string Size { get; set; }
        public decimal? TankSize { get; set; }

        public virtual ICollection<Device> Device { get; set; }
    }
}
