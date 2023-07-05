using Application.Core;
using Application.DTOs;
using Application.Parameters;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Formularies.ProjectOverview
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ProjectOverviewDto>>> 
        {
            public ProjectOverviewParams Params { get; set; }
            public Guid CompanyId { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ProjectOverviewDto>>>
        {
            private readonly ProgresaDataContext _context;
            private readonly IMapper _mapper;
            public Handler(ProgresaDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }
            public async Task<Result<PagedList<ProjectOverviewDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.ProjectOverviews
                            .Include(p => p.Company)
                            .Where(p => p.CompanyId == request.CompanyId)
                            .WhereIf(!string.IsNullOrWhiteSpace(request.Params.ProjectName), p => p.ProjectName == request.Params.ProjectName)
                            .ProjectTo<ProjectOverviewDto>(_mapper.ConfigurationProvider)
                            .AsQueryable();

                return Result<PagedList<ProjectOverviewDto>>.Success(
                    await PagedList<ProjectOverviewDto>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize)
                );
            }
        }
    }
}