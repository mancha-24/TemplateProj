using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Companies
{
    public class Details
    {
        public class Query : IRequest<Result<CompanyDto>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<CompanyDto>>
        {
            private readonly ProgresaDataContext _context;
            private readonly IMapper _mapper;
            public Handler(ProgresaDataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<CompanyDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var company = await _context.CompanyUsers
                .ProjectTo<CompanyDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == request.Id);

                return Result<CompanyDto>.Success(company);
            }
        }
    }
}