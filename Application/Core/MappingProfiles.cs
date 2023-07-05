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
            
            CreateMap<StaffData, StaffData>();
            CreateMap<StaffData, LaborMarketDto>()
                .ForMember(d => d.Quantity, o => o.MapFrom(f => f.SubAquantity + f.SubBquantity + f.SubCquantity + f.SubDquantity + 
                                                            f.AutoAdmissionQuantity + f.VtvQuantity + f.VvQuantity));
                
            CreateMap<SubContractor, SubContractorDto>();
            CreateMap<SubContractor, SubContractor>();

            CreateMap<Form, FormDto>();

            CreateMap<ProjectOverview, ProjectOverviewDto>();
            CreateMap<ProjectOverview, ProjectOverview>();
        }
    }
}