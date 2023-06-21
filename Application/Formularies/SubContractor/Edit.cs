using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Formularies.SubContractor
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Domain.Entities.SubContractor SubContractor { get; set; }
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
                var record = await _context.SubContractors.FindAsync(request.SubContractor.Id);
                if (record == null) return null;

                request.SubContractor.CompanyId = record.CompanyId;
                _mapper.Map(request.SubContractor, record);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update subcontractor");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}