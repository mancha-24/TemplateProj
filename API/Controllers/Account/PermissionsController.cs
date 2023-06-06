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
    public class PermissionsController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ProgresaDataContext _context;
        public PermissionsController(UserManager<AppUser> userManager, ProgresaDataContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<PermissionDto>>> GetPermissions()
        {
            var user = await _userManager.GetUserAsync(User);
            var roleId = _context.UserRoles.Where(r => r.UserId == user.Id).Select(r => r.RoleId).FirstOrDefault();
            if (user == null) return NotFound();

            var permissions = await (from permission in _context.Permissions.AsNoTracking()
                                        join userRole in _context.UserRoles.AsNoTracking() on permission.IdRole equals userRole.RoleId
                                        where userRole.UserId == user.Id 
                                        group permission by permission.Name into permissionGroup
                                        select new PermissionDto { PermissionName = permissionGroup.Key }
                                    ).ToListAsync();
                            
            if (permissions.Count < 1) return NotFound();

            return permissions;
        }
    }
}