using System.Security.Claims;
using Application.DTOs;
using Application.Formularies.LaboraMarket;
using Application.Parameters;
using Domain.Entities;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Formularies
{
    [Authorize]
    public class LaborMarketController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public LaborMarketController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateLaboraMarket(StaffData laboraMarket)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            laboraMarket.CompanyId = user.IdCompany ?? Guid.Empty;

            return HandleResult(
                await Mediator.Send(
                    new Create.Command 
                    {
                        LaboraMarket = laboraMarket
                    }));
        }

        [HttpGet]
        public async Task<ActionResult<LaborMarketDto>> GetLaboraMarketRecords([FromQuery]LaborMarketParams param)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param, CompanyId = user.IdCompany ?? Guid.Empty}));
        }

    }
}