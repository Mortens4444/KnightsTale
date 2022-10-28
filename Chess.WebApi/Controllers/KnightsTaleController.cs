using Chess.Table;
using Chess.WebApi.Dto;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace Chess.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KnightsTaleController : ControllerBase
    {
        private readonly ILogger<KnightsTaleController> logger;
        private readonly ChessGame chessGame;

        public KnightsTaleController(ILogger<KnightsTaleController> logger)
        {
            this.logger = logger;
            chessGame = new ChessGame();
        }

        [HttpGet]
        [Route("api/game/new")]
        public IActionResult NewGame()
        {
            chessGame.NewGame();
            return Ok();
        }

        [HttpPost]
        [Route("api/game/load")]
        public IActionResult LoadGame([FromForm] IFormFile file)
        {
            using var stream = file.OpenReadStream();
            using var binaryReader = new BinaryReader(stream);
            if (file.Length != chessGame.ChessTable.Squares.Count)
            {
                return BadRequest($"Invalid file has been uploaded: {file.FileName}.");
            }

            var bytes = new byte[file.Length];
            binaryReader.Read(bytes, 0, bytes.Length);
            chessGame.ChessTable.LoadByteArray(bytes);

            var stringBuilder = new StringBuilder();
            foreach (var square in chessGame.ChessTable.Squares)
            {
                var squareInfo = square.State.GetSquareInfo();
                stringBuilder.Append(squareInfo.DisplayChar);
            }
            var result = new KnightsTaleDto
            {
                States = stringBuilder.ToString(),
                StateValues = bytes
            };
            return Ok(result);
        }

        [HttpPut]
        [Route("api/game/save")]
        public IActionResult SaveGame()
        {
            return Ok("Save succeeded");
        }

        [HttpPut]
        [Route("api/game/move")]
        public IActionResult Move([FromBody] string move)
        {
            return Ok(new KnightsTaleDto());
        }
    }
}