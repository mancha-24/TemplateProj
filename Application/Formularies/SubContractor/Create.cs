using Application.Core;
using Domain.Entities.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Formularies.SubContractor
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Entities.SubContractor SubContractor { get; set; }
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
                request.SubContractor.CreationDate = DateTime.Now;
                _context.SubContractors.Add(request.SubContractor);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create subcontractor data");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}