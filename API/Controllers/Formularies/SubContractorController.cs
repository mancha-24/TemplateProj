using System.Security.Claims;
using Application.DTOs;
using Application.Formularies.SubContractor;
using Application.Parameters;
using Domain.Entities;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Formularies
{
    public class SubContractorController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public SubContractorController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<SubContractorDto>> GetSubContractorRecords([FromQuery]SubContractorParams param)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param, CompanyId = user.IdCompany ?? Guid.Empty}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateSubContractor(SubContractor subContractor)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            subContractor.CompanyId = user.IdCompany ?? Guid.Empty;

            return HandleResult(
                await Mediator.Send(
                    new Create.Command 
                    {
                        SubContractor = subContractor
                    }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditSubContractor(Guid id, SubContractor record)
        {
            record.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {SubContractor = record}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubContractor(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}