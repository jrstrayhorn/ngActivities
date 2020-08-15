using System;
using System.Threading.Tasks;
using ngActivities.API.Core.Models;

namespace ngActivities.API.Core
{
    public interface IActivityRepository
    {
        void Add(Activity activity);
        Task<Activity> GetActivity(Guid id);
    }
}