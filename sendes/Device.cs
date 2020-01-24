using System;
using System.Collections.Generic;

namespace PlantationGenie.sendes
{
    public partial class Device
    {
        public int Id { get; set; }
        public string DeviceType { get; set; }
        public string RegisteredUser { get; set; }
        public string PlantMonitering { get; set; }
        public decimal WaterLevel { get; set; }
    }
}
