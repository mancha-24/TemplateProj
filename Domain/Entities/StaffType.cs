namespace Domain.Entities
{
    public class StaffType
    {
        public Guid Id { get; set; }
        public string TypeName { get; set; }
        public bool IsAdmissionMandatory { get; set; }
        public ICollection<CurrentStaff> CurrentStaff { get; set; }
    }
}