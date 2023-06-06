using System.Security.Claims;
using API.Services;
using Application.DTOs;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers.Account
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly ProgresaDataContext _context;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService, ProgresaDataContext context)
        {
            _context = context;
            _tokenService = tokenService;
            _userManager = userManager;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email taken");
                return ValidationProblem();
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("Username is already taken");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };
            
            var result = await _userManager.CreateAsync(user, registerDto.Password);

            foreach (var role in registerDto.Roles)
            {
                var appRole = await _context.Roles.FindAsync(role.UserRoleId);
                if(appRole != null)
                {
                    _context.UserRoles.Add(new IdentityUserRole<string> { RoleId = role.UserRoleId, UserId =  user.Id});
                    _context.SaveChanges();
                }
            }
            
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            
            if (user == null) return Unauthorized();
            
            //if (await _userManager.IsLockedOutAsync(user)) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

            if (result) return CreateUserObject(user);
            
            return Unauthorized();
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            var listRolesDto = (from role in _context.Roles.AsNoTracking()
                             join userRole in _context.UserRoles.AsNoTracking() on role.Id equals userRole.RoleId
                             where userRole.UserId == user.Id
                             select new UserRolesDto
                             {
                                UserRoleId = role.Id,
                                UserRoleName = role.Name
                             })
                        .ToList();

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName,
                Roles = listRolesDto
            };
        }
    }
}