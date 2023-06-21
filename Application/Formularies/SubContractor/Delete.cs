using Application.Core;
using MediatR;
using Persistence;

namespace Application.Formularies.SubContractor
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>        
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ProgresaDataContext _context;
            public Handler(ProgresaDataContext context)
            {
                _context = context;
            }
            
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var id = Guid.Parse(request.Id);
                var record = await _context.SubContractors.FindAsync(id);

                if (record == null) return Result<Unit>.Failure("Record does not exist.");

                var result = _context.SubContractors.Remove(record);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleting record from API");
            }
        }
    }
}