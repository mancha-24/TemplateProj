namespace Application.DTOs
{
    public class LaborMarketDto
    {
        public Guid? Id { get; set; }
        public Guid FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int SubAquantity { get; set; }
        public int SubBquantity { get; set; }
        public int SubCquantity { get; set; }
        public int SubDquantity { get; set; }
        public int AutoAdmissionQuantity { get; set; }
        public int VtvQuantity { get; set; }
        public int VvQuantity { get; set; }
        public string Training { get; set; }
        public decimal SalaryMonth { get; set; }
        public double DaysWeek { get; set; }
        public double HoursWeek { get; set; }
        public int NeedCount { get; set; }
        public string TimeDetail { get; set; }
        public string TrainingFuture { get; set; }
        public decimal SalaryMonthFuture { get; set; }
        public double DaysWeekFuture { get; set; }
        public double HoursWeekFuture { get; set; }
        public int NeedCountFuture { get; set; }
        public string TimeDetailFuture { get; set; }
        public DateTime CreationDate { get; set; }
        public int Quantity { get; set; }
    }
}