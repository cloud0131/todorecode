using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todorecode.Models;

namespace todorecode.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoitemController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoitemController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Todoitem
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todoitems>>> GetTodoItems()
        {
            if (_context.TodoItems == null)
            {
                return NotFound();
            }
            return await _context.TodoItems.ToListAsync();
        }

        // GET: api/Todoitem/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Todoitems>> GetTodoitems(int id)
        {
            if (_context.TodoItems == null)
            {
                return NotFound();
            }
            var todoitems = await _context.TodoItems.FindAsync(id);

            if (todoitems == null)
            {
                return NotFound();
            }

            return todoitems;
        }

        // PUT: api/Todoitem/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodoitems(int id, Todoitems todoitems)
        {
            if (id != todoitems.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoitems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoitemsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Todoitem
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Todoitems>> PostTodoitems(Todoitems todoitems)
        {
            if (_context.TodoItems == null)
            {
                return Problem("Entity set 'TodoContext.TodoItems'  is null.");
            }
            _context.TodoItems.Add(todoitems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoitems", new { id = todoitems.Id }, todoitems);
        }

        // DELETE: api/Todoitem/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoitems(int id)
        {
            if (_context.TodoItems == null)
            {
                return NotFound();
            }
            var todoitems = await _context.TodoItems.FindAsync(id);
            if (todoitems == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoitems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TodoitemsExists(int id)
        {
            return (_context.TodoItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
