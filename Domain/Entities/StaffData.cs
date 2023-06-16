namespace Domain.Entities
{
    public class StaffData
    {
        public Guid Id { get; set; }
        public string Training { get; set; }
        public decimal SalaryMonth { get; set; }
        public double DaysWeek { get; set; }
        public double HoursWeek { get; set; }

        public int SubAquantity { get; set; }
        public int SubBquantity { get; set; }
        public int SubCquantity { get; set; }
        public int SubDquantity { get; set; }
        public int AutoAdmissionQuantity { get; set; }
        public int VtvQuantity { get; set; }
        public int VvQuantity { get; set; }
        public DateTime CreationDate { get; set; }

        public Guid CompanyId { get; set; }
        public CompanyUser Company { get; set; }
        public Guid FunctionId { get; set; }
        public Function Function { get; set; }
    }
}