using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ngActivities.API.Core;
using ngActivities.API.Core.Models;

namespace ngActivities.API.Persistence
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly NgActivitiesDbContext _context;
        public ActivityRepository(NgActivitiesDbContext context)
        {
            this._context = context;

        }
        public void Add(Activity activity)
        {
            this._context.Add(activity);
        }

        public async Task<Activity> GetActivity(Guid id)
        {
            return await _context.Activities.SingleOrDefaultAsync(a => a.Id == id);
        }
    }
}