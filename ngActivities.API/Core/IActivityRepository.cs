using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ngActivities.API.Core.Models;

namespace ngActivities.API.Core
{
    public interface IActivityRepository
    {
        void Add(Activity activity);
        Task<Activity> GetActivity(Guid id);
        Task<IEnumerable<Activity>> GetActivities();
        void Remove(Activity activity);
    }
}