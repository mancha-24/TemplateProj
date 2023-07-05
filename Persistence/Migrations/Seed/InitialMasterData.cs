using Domain.Entities;
using Domain.Shared;

namespace Persistence.Migrations.Seed
{
    public static class InitialMasterData
    {
        public static async Task Create(ProgresaDataContext context)
        {
            await CreateSector(context);
        }

        private static async Task CreateSector(ProgresaDataContext context)
        {
            var general = context.Sectors.FirstOrDefault(s => s.SectorName == "Algemeen");
            if (general == null)
            {
                general = context.Sectors.Add(new Sector { SectorName = "Algemeen" }).Entity;
                await context.SaveChangesAsync();
            }

            var construction = context.Sectors.FirstOrDefault(s => s.SectorName == "Bouw");
            if (construction == null)
            {
                construction = context.Sectors.Add(new Sector { SectorName = "Bouw" }).Entity;
                await context.SaveChangesAsync();
            }

            var hotel = context.Sectors.FirstOrDefault(s => s.SectorName == "Hotel");
            if (hotel == null)
            {
                hotel = context.Sectors.Add(new Sector { SectorName = "Hotel" }).Entity;
                await context.SaveChangesAsync();
            }

            var cleaning = context.Sectors.FirstOrDefault(s => s.SectorName == "Schoonmaak");
            if (cleaning == null)
            {
                cleaning = context.Sectors.Add(new Sector { SectorName = "Schoonmaak" }).Entity;
                await context.SaveChangesAsync();
            }

            var garden = context.Sectors.FirstOrDefault(s => s.SectorName == "Tuin");
            if (garden == null)
            {
                garden = context.Sectors.Add(new Sector { SectorName = "Tuin" }).Entity;
                await context.SaveChangesAsync();
            }

            var security = context.Sectors.FirstOrDefault(s => s.SectorName == "Bewaking");
            if (security == null)
            {
                security = context.Sectors.Add(new Sector { SectorName = "Bewaking" }).Entity;
                await context.SaveChangesAsync();
            }
            
            var consultancy = context.Sectors.FirstOrDefault(s => s.SectorName == "Consultancy");
            if (consultancy == null)
            {
                consultancy = context.Sectors.Add(new Sector { SectorName = "Consultancy" }).Entity;
                await context.SaveChangesAsync();
            }

            // ******* Initializing forms by sectors
            var staffFormHotel = context.Forms.FirstOrDefault(f => f.Name == StaticFormNames.StaffForm && f.SectorId == hotel.Id);
            if (staffFormHotel == null)
            {
                staffFormHotel = context.Forms.Add(
                    new Form 
                    {
                        Name = StaticFormNames.StaffForm,
                        SectorId = hotel.Id,
                        Title = "Personnel Overview / Staffing Needs Form",
                        Description = "This form should be used to provide an overview of the current personnel (expressed in job roles and quantities) and the staffing needs for the year 2023."
                    }
                ).Entity;
                await context.SaveChangesAsync();
            }
            var staffFormBouw = context.Forms.FirstOrDefault(f => f.Name == StaticFormNames.StaffForm && f.SectorId == construction.Id);
            if (staffFormBouw == null)
            {
                staffFormBouw = context.Forms.Add(
                    new Form 
                    {
                        Name = StaticFormNames.StaffForm,
                        SectorId = construction.Id,
                        Title = "Personnel Overview / Staffing Needs Form",
                        Description = "This form should be used to provide an overview of the current personnel (expressed in job roles and quantities) and the staffing needs for the year 2023."
                    }
                ).Entity;
                await context.SaveChangesAsync();
            }

            var subContractorFormHotel = context.Forms.FirstOrDefault(f => f.Name == StaticFormNames.SubContractorForm && f.SectorId == hotel.Id);
            if (subContractorFormHotel == null)
            {
                subContractorFormHotel = context.Forms.Add(
                    new Form 
                    {
                        Name = StaticFormNames.SubContractorForm,
                        SectorId = hotel.Id,
                        Title = "Sub contractor Overview",
                        Description = "Functions that performed by subcontractors"
                    }
                ).Entity;
                await context.SaveChangesAsync();
            }

            var projectOverviewFormBouw = context.Forms.FirstOrDefault(f => f.Name == StaticFormNames.ProjectOverviewForm && f.SectorId == construction.Id);
            if (projectOverviewFormBouw == null)
            {
                projectOverviewFormBouw = context.Forms.Add(
                    new Form 
                    {
                        Name = StaticFormNames.ProjectOverviewForm,
                        SectorId = construction.Id,
                        Title = "Project Overview Form",
                        Description = "This form should be used to provide an overview of ongoing projects."
                    }
                ).Entity;
                await context.SaveChangesAsync();
            }
        }
    }
}