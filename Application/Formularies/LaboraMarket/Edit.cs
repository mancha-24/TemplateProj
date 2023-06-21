using Application.Core;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Persistence;

namespace Application.Formularies.LaboraMarket
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public StaffData LaborMarket { get; set; }
            
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
                var record = await _context.StaffData.FindAsync(request.LaborMarket.Id);
                if (record == null) return null;
                
                request.LaborMarket.CompanyId = record.CompanyId;
                _mapper.Map(request.LaborMarket, record);

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("Failed to update labor market");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}