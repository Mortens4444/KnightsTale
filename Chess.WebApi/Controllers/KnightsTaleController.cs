using Chess.Rules.Moves;
using Chess.Table;
using Chess.WebApi.Dto;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Net.Mime;
using System.Buffers.Text;

namespace Chess.WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KnightsTaleController : ControllerBase
    {
        private readonly ChessGame chessGame;

        public KnightsTaleController(ChessGame chessGame)
        {
            this.chessGame = chessGame;
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

            return Ok(KnightsTaleDto.CreateFromGame(chessGame));
        }

        [HttpPost]
        [Route("api/game/save")]
        public IActionResult SaveGame()
        {
            var content = chessGame.ChessTable.GetSquareStates();
            return Ok(Convert.ToBase64String(content));
        }

        [HttpPost]
        [Route("api/game/move/{move}")]
        public IActionResult Move(string move)
        {
            if (chessGame.Execute(new Move(move)))
            {
                return Ok(KnightsTaleDto.CreateFromGame(chessGame));
            }

            return BadRequest();
        }
    }
}