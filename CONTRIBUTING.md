# General
---------
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
- Move.Promotion should not be automatic

# Chess.WebApi
--------------
- Get response from AI
- Add moves list
- Move.Promotion should not be automatic

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
- Move.Promotion should not be automatic

# Chess.Wpf
-----------
- Move code behind into XAML, where possible

# Chess.WinForms
----------------
- Delete figures (png files - draw figures like in Chess.WPF)
- Fix not recognizing checkmate
- Create a presenter class, which can be used with Chess.WPF also
