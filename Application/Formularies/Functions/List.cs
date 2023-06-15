using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Formularies.Functions
{
    public class List
    {
        public class Query : IRequest<Result<List<FunctionsToDropDownDto>>> 
        { 
            public int SectorId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<FunctionsToDropDownDto>>>
        {
            private readonly ProgresaDataContext _context;
            private readonly IMapper _mapper;
            public Handler(ProgresaDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            
            public async Task<Result<List<FunctionsToDropDownDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var functions = await _context.Functions
                                .Include(t => t.FunctionType)
                                    .WhereIf(request.SectorId > 0, c => c.SectorId == request.SectorId)
                                        .ProjectTo<FunctionsToDropDownDto>(_mapper.ConfigurationProvider)
                                            .ToListAsync();

                return Result<List<FunctionsToDropDownDto>>.Success(functions);
            }
        }
    }
}