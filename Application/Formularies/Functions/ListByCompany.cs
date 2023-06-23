using Application.Core;
using Application.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Formularies.Functions
{
    public class ListByCompany
    {
        public class Query : IRequest<Result<List<FunctionsToDropDownDto>>> 
        {
            public Guid CompanyId { get; set; }
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
                var functions = await (from function in _context.Functions
                                join staffData in _context.StaffData on function.Id equals staffData.FunctionId
                                join companyUser in _context.CompanyUsers on staffData.CompanyId equals companyUser.Id
                                where companyUser.Id == request.CompanyId
                                select function)
                                .ProjectTo<FunctionsToDropDownDto>(_mapper.ConfigurationProvider)
                                .ToListAsync();

                return Result<List<FunctionsToDropDownDto>>.Success(functions);
            }
        }
    }
}