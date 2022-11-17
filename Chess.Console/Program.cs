// See https://aka.ms/new-console-template for more information

using Chess;
using Chess.AI;
using Chess.Console;
using Chess.FigureValues;
using Chess.Rules.Moves;
using Chess.Table;
using Chess.Table.TableSquare;
using System.Text;

FigureValueCalculationMode whiteFigureValueCalculationMode = FigureValueCalculationMode.General;
FigureValueCalculationMode blackFigureValueCalculationMode = FigureValueCalculationMode.General;
IArtificalIntelligence? whiteArtificalIntelligence = null;
IArtificalIntelligence? blackArtificalIntelligence = null;

Console.OutputEncoding = Encoding.UTF8;
_ = new WindowsConsole();
var chessGame = new ChessGame();
chessGame.ChessTable.TurnControl.TurnChanged += TurnControl_TurnChanged;

string command;
string? loadFile, saveFile;
var errorMessage = String.Empty;
do
{
    Console.Clear();

    ChessTablePresenter.ShowState(chessGame.ChessTable);
    if (!String.IsNullOrEmpty(errorMessage))
    {
        Console.Error.WriteLine(errorMessage);
        errorMessage = String.Empty;
    }

    Console.BackgroundColor = ConsoleColor.Black;
    Console.ForegroundColor = ConsoleColor.White;

    var commands = new Dictionary<string, Action>
    {
        {
            "", () => { }
        },
        {
            "exit", () => { }
        },
        {
            "help", () =>
            {
                Console.WriteLine("help - Shows this screen.");
                Console.WriteLine("exit - Quit from application.");
                Console.WriteLine("e2e4 - Move figure from e2 to e4.");
                Console.WriteLine("set black level_0 - Set the black to Level 0 copmuter. The maximum level is: level_4");
                Console.WriteLine("set white human - Set the white to human player.");
                Console.WriteLine("log - Create a log file from the moves.");
                Console.WriteLine("load - Load game state.");
                Console.WriteLine("save - Save game state.");
                Console.WriteLine("change white calc mortens - Change value calculation to MortensV1.");
                Console.WriteLine();
                Console.WriteLine("Press any key to continue.");
                Console.ReadKey();
            }
        },
        {
            "log", () =>
            {
                Console.WriteLine("Log file:");
                chessGame.SetLogFile(Console.ReadLine());
            }
        },
        {
            "load", () =>
            {
                Console.WriteLine("File to load:");
                loadFile = Console.ReadLine();
                chessGame.ChessTable.LoadFromFile(loadFile);
            }
        },
        {
            "save", () =>
            {
                Console.WriteLine("Save destination:");
                saveFile = Console.ReadLine();
                chessGame.ChessTable.SaveToFile(saveFile);
            }
        },
        {
            "set black level_0", () =>
            {
                blackArtificalIntelligence = new Lvl0_RandomMoves();
            }
        },
        {
            "set white level_0", () =>
            {
                whiteArtificalIntelligence = new Lvl0_RandomMoves();
            }
        },
        {
            "set black level_1", () =>
            {
                blackArtificalIntelligence = new Lvl1_KamikazeMoves(whiteFigureValueCalculationMode);
            }
        },
        {
            "set white level_1", () =>
            {
                whiteArtificalIntelligence = new Lvl1_KamikazeMoves(blackFigureValueCalculationMode);
            }
        },
        {
            "set black level_2", () =>
            {
                blackArtificalIntelligence = new Lvl2_CarefulKamikazeMoves(whiteFigureValueCalculationMode);
            }
        },
        {
            "set white level_2", () =>
            {
                whiteArtificalIntelligence = new Lvl2_CarefulKamikazeMoves(blackFigureValueCalculationMode);
            }
        },
        {
            "set black level_3", () =>
            {
                blackArtificalIntelligence = new Lvl3_NoMoreMoronMoves(whiteFigureValueCalculationMode);
            }
        },
        {
            "set white level_3", () =>
            {
                whiteArtificalIntelligence = new Lvl3_NoMoreMoronMoves(blackFigureValueCalculationMode);
            }
        },
        {
            "set black level_4", () =>
            {
                blackArtificalIntelligence = new Lvl4_NoMoreMoronMoves(whiteFigureValueCalculationMode);
            }
        },
        {
            "set white level_4", () =>
            {
                whiteArtificalIntelligence = new Lvl4_NoMoreMoronMoves(blackFigureValueCalculationMode);
            }
        },
        {
            "set black human", () =>
            {
                blackArtificalIntelligence = null;
            }
        },
        {
            "set white human", () =>
            {
                whiteArtificalIntelligence = null;
            }
        },
        {
            "change white calc mortens", () =>
            {
                whiteFigureValueCalculationMode = FigureValueCalculationMode.MortensV1;
            }
        },
        {
            "change black calc mortens", () =>
            {
                blackFigureValueCalculationMode = FigureValueCalculationMode.MortensV1;
            }
        }
    };

    command = Console.ReadLine() ?? String.Empty;
#if !DEBUG
    try
#endif
    {
        if (commands.ContainsKey(command.ToLower()))
        {
            commands[command].Invoke();
        }
        else
        {
            if (command.Length != 4)
            {
                errorMessage = $"Invalid command: {command}. Try typing: help.";
            }
            else
            {
                chessGame.Execute(command);
            }
        }

        if (chessGame.ChessTable.TurnControl.IsWhiteTurn())
        {
            GetNextMove(whiteArtificalIntelligence, chessGame.ChessTable.Squares.GetWhiteKingSquare);
        }
        if (chessGame.ChessTable.TurnControl.IsBlackTurn())
        {
            GetNextMove(blackArtificalIntelligence, chessGame.ChessTable.Squares.GetBlackKingSquare);
        }
    }
#if !DEBUG
    catch (Exception ex)
    {
        errorMessage = ex.Message;
    }
#endif
} while (command.ToLower() != "exit");

void TurnControl_TurnChanged(object? sender, Chess.Rules.Turns.TurnControlEventArgs e)
{
    if (e.IsWhiteTurn)
    {
        GetNextMove(whiteArtificalIntelligence, chessGame.ChessTable.Squares.GetWhiteKingSquare);
    }
    else
    {
        GetNextMove(blackArtificalIntelligence, chessGame.ChessTable.Squares.GetBlackKingSquare);
    }
}

void GetNextMove(IArtificalIntelligence? artificalIntelligence, Func<Square> kingSquareProvider)
{
    if (chessGame != null && artificalIntelligence != null)
    {
        var move = artificalIntelligence.GetMove(chessGame.ChessTable);
        if (!chessGame.Execute(move))
        {
            var kingSquare = kingSquareProvider();
            if (kingSquare.State.HasWhiteFigure())
            {
                errorMessage = kingSquare.IsInCheck(chessGame.ChessTable) ? "Black won!" : "It's a draw.";
            }
            else
            {
                errorMessage = kingSquare.IsInCheck(chessGame.ChessTable) ? "White won!" : "It's a tie.";
            }
        }
    }
}