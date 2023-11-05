using Microsoft.EntityFrameworkCore;

namespace todorecode.Models
{
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options)
            : base(options)
        {
        }

        public DbSet<Todoitems> TodoItems { get; set; } = null!;
    }
}
