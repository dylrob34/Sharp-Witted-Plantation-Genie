namespace Sharp_Witted_Plantation_Genie.helpers
{
    public class AppSettings
    {
        public string Secret { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public double AccessExpiration { get; set; }
    }
}