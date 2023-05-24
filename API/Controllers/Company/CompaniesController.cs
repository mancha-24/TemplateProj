using Application.Companies;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Company
{
    public class CompaniesController : BaseApiController
    {
        [HttpPost]
        public async Task<IActionResult> CreateAccount(CompanyUser company)
        {
            return HandleResult(await Mediator.Send(new Create.Command {Company = company}));
        }
    }
}