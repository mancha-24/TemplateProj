using System.Security.Claims;
using Application.DTOs;
using Application.Formularies.Functions;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Formularies
{
    [Authorize]
    public class FunctionsController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public FunctionsController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult<List<FunctionsToDropDownDto>>> GetFunctions()
        {
            var user = await _userManager.Users
                                .Include(c => c.Company)
                                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            
            return HandleResult(await Mediator.Send(new List.Query{SectorId = user.Company.SectorId}));
        }
    }
}