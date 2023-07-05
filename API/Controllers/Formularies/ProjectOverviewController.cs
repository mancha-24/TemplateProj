using System.Security.Claims;
using Application.DTOs;
using Application.Formularies.ProjectOverview;
using Application.Parameters;
using Domain.Entities;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Formularies
{
    public class ProjectOverviewController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        public ProjectOverviewController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        
        [HttpGet]
        public async Task<ActionResult<ProjectOverviewDto>> GetProjectOverviewRecords([FromQuery]ProjectOverviewParams param)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param, CompanyId = user.IdCompany ?? Guid.Empty}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProjectOverview(ProjectOverview projectOverview)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            projectOverview.CompanyId = user.IdCompany ?? Guid.Empty;

            return HandleResult(
                await Mediator.Send(
                    new Create.Command 
                    {
                        ProjectOverview = projectOverview
                    }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditProjectOverview(Guid id, ProjectOverview projectOverview)
        {
            projectOverview.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command {ProjectOverview = projectOverview}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectOverview(string id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}