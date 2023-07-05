using Application.Core;
using Domain.Entities.Account;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace Application.Formularies.ProjectOverview
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Entities.ProjectOverview ProjectOverview { get; set; }
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
                request.ProjectOverview.CreationDate = DateTime.Now;
                _context.ProjectOverviews.Add(request.ProjectOverview);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create project overview data");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}