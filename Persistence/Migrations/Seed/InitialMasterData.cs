using Domain.Entities;

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
        }
    }
}