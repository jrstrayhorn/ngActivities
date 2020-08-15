using System.Threading.Tasks;

namespace ngActivities.API.Core
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}