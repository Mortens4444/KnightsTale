// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("Design", "CA1008:Enums should have zero value", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Rules.Moves.MoveType")]
[assembly: SuppressMessage("Design", "CA1008:Enums should have zero value", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Table.TableSquare.Column")]
[assembly: SuppressMessage("Design", "CA1008:Enums should have zero value", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Table.TableSquare.Rank")]
[assembly: SuppressMessage("Design", "CA1019:Define accessors for attribute arguments", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.SquareInfoAttribute.#ctor(System.Char,System.Char,System.Byte)")]
[assembly: SuppressMessage("Globalization", "CA1304:Specify CultureInfo", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.TableSquare.Square.ToString~System.String")]
[assembly: SuppressMessage("Naming", "CA1707:Identifiers should not contain underscores", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Table.TableSquare.Rank")]
[assembly: SuppressMessage("Naming", "CA1707:Identifiers should not contain underscores", Justification = "<Pending>", Scope = "namespaceanddescendants", Target = "~N:Chess.AI")]
[assembly: SuppressMessage("Naming", "CA1712:Do not prefix enum values with type name", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.AI.Level")]
[assembly: SuppressMessage("Minor Code Smell", "S101:Types should be named in PascalCase", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.AI.Lvl1_KamikazeMoves")]
[assembly: SuppressMessage("Major Code Smell", "S1066:Mergeable \"if\" statements should be combined", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.AI.ArtificalIntelligence.GetGoodMoves(Chess.Table.ChessTable,Chess.FigureValues.FigureValueCalculator,System.Collections.Generic.IEnumerable{Chess.Rules.Moves.Move},System.Func{Chess.Table.ChessTable,Chess.Rules.Moves.Move},System.Boolean)~System.Collections.Generic.List{Chess.Rules.Moves.MoveWithGainInfo}")]
[assembly: SuppressMessage("Major Code Smell", "S3358:Ternary operators should not be nested", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.ChessTable.GetValidMoves~System.Collections.Generic.IList{Chess.Rules.Moves.Move}")]
[assembly: SuppressMessage("Major Code Smell", "S3358:Ternary operators should not be nested", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.ChessTable.HasValidMove(Chess.Table.SquareState)~System.Boolean")]
[assembly: SuppressMessage("Minor Code Smell", "S3267:Loops should be simplified with \"LINQ\" expressions", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.ChessTable.HasValidMove(Chess.Table.SquareState)~System.Boolean")]
[assembly: SuppressMessage("Design", "CA1002:Do not expose generic lists", Justification = "<Pending>", Scope = "member", Target = "~P:Chess.Table.ChessTable.PreviousMoves")]
