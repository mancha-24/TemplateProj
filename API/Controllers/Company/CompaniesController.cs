using System.Security.Claims;
using Application.Companies;
using Application.DTOs;
using Domain.Entities;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Company
{
    [Authorize]
    public class CompaniesController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public CompaniesController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAccount(CompanyUser company)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Company = company}));
        }
        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpGet]
        public async Task<ActionResult<CompanyDto>> GetCurrentCompany()
        {
             var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

             return HandleResult(await Mediator.Send(new Details.Query{Id = user.IdCompany ?? Guid.Empty}));
        }
    }
}