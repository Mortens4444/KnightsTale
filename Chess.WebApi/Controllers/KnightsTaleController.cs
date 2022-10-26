using Chess.WebApi.Dto;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        [Route("api/game/new")]
        public IActionResult NewGame()
        {
            return Ok();
        }

        [HttpPost]
        [Route("api/game/load")]
        public IActionResult LoadGame([FromForm] IFormFile file)
        {
            return Ok(new KnightsTaleDto());
        }

        [HttpPut]
        [Route("api/game/save")]
        public IActionResult SaveGame()
        {
            return Ok();
        }

        [HttpPut]
        [Route("api/game/move")]
        public IActionResult Move([FromBody] string move)
        {
            return Ok(new KnightsTaleDto());
        }
    }
}