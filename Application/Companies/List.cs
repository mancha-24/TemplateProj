using Application.Core;
using Application.DTOs;
using Application.Parameters;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Companies
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<CompanyDto>>> 
        { 
            public CompanyParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<CompanyDto>>>
        {
            private readonly ProgresaDataContext _context;
            private readonly IMapper _mapper;
            public Handler(ProgresaDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<CompanyDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.CompanyUsers
                            .WhereIf(request.Params.Id != null, c => c.Id == request.Params.Id)
                                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                                    .AsQueryable();

                return Result<PagedList<CompanyDto>>.Success(
                    await PagedList<CompanyDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }

    }
}