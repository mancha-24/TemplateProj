namespace Domain.Entities
{
    public class FunctionType
    {
        public int Id { get; set; }
        public string TypeName { get; set; }
        public ICollection<Function> Functions { get; set; }
    }
}