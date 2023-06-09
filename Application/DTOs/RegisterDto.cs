namespace Application.DTOs
{
    public class RegisterDto
    {
        public string DisplayName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<UserRolesDto> Roles { get; set; }
    }
}