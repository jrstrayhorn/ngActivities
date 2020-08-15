using System.Threading.Tasks;
using ngActivities.API.Core;

namespace ngActivities.API.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly NgActivitiesDbContext _context;
        public UnitOfWork(NgActivitiesDbContext context)
        {
            this._context = context;

        }
        public async Task CompleteAsync()
        {
            await this._context.SaveChangesAsync();
        }
    }
}