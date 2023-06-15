using Application.DTOs;
using AutoMapper;
using Domain.Entities;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<CompanyUser, CompanyDto>()
                .ForMember(d => d.IsActive, o => o.MapFrom(u => u.User.LockoutEnd == null))
                .ForMember(d => d.Sector, o => o.MapFrom(u => u.Sector.SectorName));

            CreateMap<Function, FunctionsToDropDownDto>()
                .ForMember(d => d.FunctionType, o => o.MapFrom(f => f.FunctionType.TypeName));
        }
    }
}