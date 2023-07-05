using System.Security.Claims;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities.Account;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers.Formularies
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ProgresaDataContext _context;
        private readonly IMapper _mapper;
        public FormController(UserManager<AppUser> userManager, ProgresaDataContext context, IMapper mapper)
        {
            _context = context;
            _userManager = userManager;
            _mapper = mapper;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<FormDto>>> GetForms()
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));
            var company = await _context.CompanyUsers.FindAsync(user.IdCompany);

            var forms = await (from frm in _context.Forms.AsNoTracking()
                               join sector in _context.Sectors.AsNoTracking() on frm.SectorId equals sector.Id
                               where sector.Id == company.SectorId
                               select frm)
                               .ProjectTo<FormDto>(_mapper.ConfigurationProvider)
                               .ToListAsync();
            
            if (forms.Count < 1) return NotFound();

            return forms;
        }
    }
}