using System.Security.Claims;
using Application.Companies;
using Application.DTOs;
using Application.Parameters;
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

        [HttpGet]
        public async Task<ActionResult<CompanyDto>> GetCompanies()
        {
             var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

             return HandleResult(await Mediator.Send(new Details.Query{Id = user.IdCompany ?? Guid.Empty}));
        }

        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<CompanyDto>> GetCurrentCompany([FromQuery]CompanyParams param)
        {
             return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }
        
        [AllowAnonymous]
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


    }
}