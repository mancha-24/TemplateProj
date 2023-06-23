using Application.Core;
using Application.DTOs;
using Application.Parameters;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Formularies.SubContractor
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<SubContractorDto>>> 
        {
            public SubContractorParams Params { get; set; }
            public Guid CompanyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<SubContractorDto>>>
        {
            private readonly ProgresaDataContext _context;
            private readonly IMapper _mapper;
            public Handler(ProgresaDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<PagedList<SubContractorDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.SubContractors
                            .Include(s => s.Function)
                            .Where(s => s.CompanyId == request.CompanyId)
                            .WhereIf(!string.IsNullOrWhiteSpace(request.Params.Name), s => s.Name == request.Params.Name)
                            .ProjectTo<SubContractorDto>(_mapper.ConfigurationProvider)
                            .AsQueryable();

                return Result<PagedList<SubContractorDto>>.Success(
                    await PagedList<SubContractorDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}