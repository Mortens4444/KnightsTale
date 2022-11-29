# General
---------
- Save game should be able to load move history if available
- Move.Promotion should not be automatic
- Bad moves (NoMoreCastle, Let enemy to hit my figure, tie)
- Tie
	- 50 moves -> tie (The 50-move draw rule, which today states that a draw can be claimed if no capture is made and no pawn is moved for 50 consecutive moves), 2 king +[knight | bishop] -> tie
	- Two king with one bishop/knight => Tie
- Fix tests
	- Get better check value calulation (FigureValueCalculator.GetCheckValue)	
- CLSCompliant(false) -> CLSCompliant(true) + eliminate warnings

# Chess.Console
---------------
- Fix two AI play

# Chess.WebApi
--------------
- Set AI and get response in Chess.WebApi
- Fix switching side

# Chess.UWP
-----------
- Create project
- Show chessboard
- New game
- Load game
- Save game
- Move with figures
- Set AI for enemy
- Show move history

# Chess.Wpf
-----------
- Set AI for enemy
- Switch side (BoardPainter, MainWindow.GetSquare, MainWindow.GetActualColumn, MainWindow.GetActualRank)

# Chess.WinForms
----------------
- Switch side (BoardPainter, MainForm.GetSquare, MainForm.GetActualColumn, MainForm.GetActualRank)
- Delete figures (png files - draw figures like in Chess.WPF)
- Fix not recognizing checkmate
- Create a presenter clas, which can be used with Chess.WPF also
- Delete rtbMessage -> Use MessageBoxes