using Microsoft.AspNetCore.Mvc;
using Chess.WebApi.Dto;

namespace Chess.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KnightsTaleController : ControllerBase
    {
        private readonly ILogger<KnightsTaleController> logger;

        public KnightsTaleController(ILogger<KnightsTaleController> logger)
        {
            this.logger = logger;
        }

        [HttpGet(Name = "StartNewGame")]
        public KnightsTaleDto Get()
        {
            return new KnightsTaleDto();
        }
    }
}