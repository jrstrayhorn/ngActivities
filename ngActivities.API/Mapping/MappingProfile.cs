using AutoMapper;
using ngActivities.API.Controllers.Resources;
using ngActivities.API.Core.Models;

namespace ngActivities.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource


            // API Resource to Domain
            CreateMap<ActivityResource, Activity>()
                .ForMember(a => a.Id, opt => opt.Ignore());
        }
    }
}