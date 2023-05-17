namespace Application.DTOs
{
    public class UserDto
    {
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public string UserName { get; set; }
        public List<UserRolesDto> Roles { get; set; }
    }
}