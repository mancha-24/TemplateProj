using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                                .WithOrigins("http://localhost:3000");
                    });
                });

                return services;
            }
    }
}