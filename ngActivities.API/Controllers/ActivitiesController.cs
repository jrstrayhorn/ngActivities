using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ngActivities.API.Controllers.Resources;
using ngActivities.API.Core;
using ngActivities.API.Core.Models;

namespace ngActivities.API.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly IActivityRepository _activityRepo;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ActivitiesController(IMapper mapper, IActivityRepository activityRepo, IUnitOfWork unitOfWork)
        {
            this._mapper = mapper;
            this._unitOfWork = unitOfWork;
            this._activityRepo = activityRepo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var activity = await _activityRepo.GetActivity(id);

            if (activity == null) return NotFound();

            return Ok(activity);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(ActivityResource activityResource)
        {
            var activity = _mapper.Map<Activity>(activityResource);
            this._activityRepo.Add(activity);
            await this._unitOfWork.CompleteAsync();
            return Ok(activity);
        }
    }
}