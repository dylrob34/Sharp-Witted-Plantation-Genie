namespace Sharp_Witted_Plantation_Genie.dataTransferObjects
{
    public class DeviceDTO
    {
        public int Id { get; set; }
        public string DeviceType { get; set; }
        public string RegisteredUser { get; set; }
        public string PlantMonitering { get; set; }
        public decimal WaterLevel { get; set; }
    }
}