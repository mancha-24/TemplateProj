using Application.Companies;
using Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Company
{
    [Authorize]
    public class CompaniesController : BaseApiController
    {
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