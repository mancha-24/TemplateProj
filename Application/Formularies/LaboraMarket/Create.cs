using Application.Core;
using Domain.Entities;
using Domain.Entities.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Formularies.LaboraMarket
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public StaffData LaboraMarket { get; set; }
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
                _context.StaffData.Add(request.LaboraMarket);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create staff data");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}