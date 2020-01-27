namespace Sharp_Witted_Plantation_Genie.dataTransferObjects
{
    public class CreateUserDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password {get; set;}
        public string ConfirmedPassword {get; set;}
        public string Email { get; set; }
    }
}