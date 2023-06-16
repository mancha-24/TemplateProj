using Application.Core;
using Application.DTOs;
using Application.Parameters;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Formularies.LaboraMarket
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<LaborMarketDto>>> 
        { 
            public LaborMarketParams Params { get; set; }
            public Guid CompanyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<LaborMarketDto>>>
        {
            private readonly ProgresaDataContext _context;
            private readonly IMapper _mapper;
            public Handler(ProgresaDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<PagedList<LaborMarketDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.StaffData
                            .Include(s => s.Function)
                            .Where(s => s.CompanyId == request.CompanyId)
                            .WhereIf(!string.IsNullOrWhiteSpace(request.Params.FunctionName), s => s.Function.Name == request.Params.FunctionName)
                            .ProjectTo<LaborMarketDto>(_mapper.ConfigurationProvider)
                            .AsQueryable();

                return Result<PagedList<LaborMarketDto>>.Success(
                    await PagedList<LaborMarketDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}