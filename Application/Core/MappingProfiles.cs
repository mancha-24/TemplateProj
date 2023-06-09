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
                .ForMember(d => d.IsActive, o => o.MapFrom(u => u.User.LockoutEnd == null));
        }
    }
}