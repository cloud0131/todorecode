namespace todorecode.Models
{
    public class Todoitems
    {
        public int Id { get; set; }
        public string Todo { get; set; }
        public DateTime Limittime { get; set; }
        public DateTime? Comptime { get; set; }
    }
}
