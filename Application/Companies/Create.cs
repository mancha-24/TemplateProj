using Application.Core;
using Domain.Entities;
using Domain.Entities.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Companies
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CompanyUser Company { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ProgresaDataContext _context;
            private readonly UserManager<AppUser> _userManager;
            public Handler(ProgresaDataContext context, UserManager<AppUser> userManager)
            {
                _userManager = userManager;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByEmailAsync(request.Company.Email);

                if (user != null && user.LockoutEnd == null) return Result<Unit>.Failure("Account already exits");
                if (user != null && user.LockoutEnd != null) return Result<Unit>.Failure("Account Pending for activating");

                _context.CompanyUsers.Add(request.Company);
                var companySaved = await _context.SaveChangesAsync() > 0;

                if (companySaved)
                {
                    var newUser = new AppUser 
                    {  
                        UserName = request.Company.Email, 
                        Email = request.Company.Email,
                        IdCompany = request.Company.Id,
                        LockoutEnabled = true,
                        LockoutEnd = DateTimeOffset.MaxValue
                    };
                    
                    var result = await _userManager.CreateAsync(newUser, request.Company.Password);
                }
                else
                {
                    return Result<Unit>.Failure("Account coudn't be created");
                }
                
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}