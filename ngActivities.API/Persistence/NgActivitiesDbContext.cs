using Microsoft.EntityFrameworkCore;
using ngActivities.API.Core.Models;

namespace ngActivities.API.Persistence
{
    public class NgActivitiesDbContext : DbContext
    {
        public DbSet<Activity> Activities { get; set; }
        public NgActivitiesDbContext(DbContextOptions<NgActivitiesDbContext> options) : base(options)
        {
        }
    }
}