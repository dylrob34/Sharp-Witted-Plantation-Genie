using System;
using System.Collections.Generic;

namespace PlantationGenie.sendes
{
    public partial class Plant
    {
        public Plant()
        {
            Device = new HashSet<Device>();
        }

        public string Name { get; set; }
        public decimal? RecommendedMoisture { get; set; }

        public virtual ICollection<Device> Device { get; set; }
    }
}
