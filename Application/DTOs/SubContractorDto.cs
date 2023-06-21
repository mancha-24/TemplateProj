namespace Application.DTOs
{
    public class SubContractorDto
    {
        public Guid Id { get; set; }
        public Guid FunctionId { get; set; }
        public string FunctionName { get; set; }
        public string Name { get; set; }
        public string Since { get; set; }
        public int EmployeesNumber { get; set; }
        public DateTime CreationDate { get; set; }
    }
}