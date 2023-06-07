using Application.Companies;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
            IConfiguration config)
            {
                services.AddEndpointsApiExplorer();
                services.AddSwaggerGen();

                services.AddDbContext<ProgresaDataContext>(opt =>
                {
                    opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
                });

                services.AddCors(opt =>
                {
                    opt.AddPolicy("CorsPolicy", policy =>
                    {
                        policy.AllowAnyMethod()
                                .AllowAnyHeader()
                                .AllowCredentials()
                                .WithOrigins("http://127.0.0.1:5173");
                    });
                });
                services.AddMediatR(typeof(Create.Handler));
                services.AddAutoMapper(typeof(MappingProfiles).Assembly);
                
                return services;
            }
    }
}