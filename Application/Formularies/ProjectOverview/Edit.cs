using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Formularies.ProjectOverview
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Entities.ProjectOverview ProjectOverview { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ProgresaDataContext _context;
            private readonly IMapper _mapper;
            public Handler(ProgresaDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var record = await _context.ProjectOverviews.FindAsync(request.ProjectOverview.Id);
                if (record == null) return null;

                request.ProjectOverview.CompanyId = record.CompanyId;
                _mapper.Map(request.ProjectOverview, record);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result) return Result<Unit>.Failure("Failed to update project overview");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}