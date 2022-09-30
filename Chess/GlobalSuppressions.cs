// This file is used by Code Analysis to maintain SuppressMessage
// attributes that are applied to this project.
// Project-level suppressions either have no target or are given
// a specific target and scoped to a namespace, type, member, etc.

using System.Diagnostics.CodeAnalysis;

[assembly: SuppressMessage("Design", "CA1008:Enums should have zero value", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Rules.Moves.MoveType")]
[assembly: SuppressMessage("Design", "CA1008:Enums should have zero value", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Table.TableSquare.Column")]
[assembly: SuppressMessage("Design", "CA1008:Enums should have zero value", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Table.TableSquare.Rank")]
[assembly: SuppressMessage("Design", "CA1019:Define accessors for attribute arguments", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.SquareInfoAttribute.#ctor(System.Char,System.Char,System.Byte)")]
[assembly: SuppressMessage("Design", "CA1043:Use Integral Or String Argument For Indexers", Justification = "<Pending>", Scope = "member", Target = "~P:Chess.Table.SquareList.Item(Chess.Table.TableSquare.SquareBase)")]
[assembly: SuppressMessage("Globalization", "CA1304:Specify CultureInfo", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.TableSquare.Square.ToString~System.String")]
[assembly: SuppressMessage("Globalization", "CA1304:Specify CultureInfo", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.TableSquare.SquareBase.#ctor(System.String)")]
[assembly: SuppressMessage("Globalization", "CA1304:Specify CultureInfo", Justification = "<Pending>", Scope = "member", Target = "~M:Chess.Table.TableSquare.SquareBase.ToString~System.String")]
[assembly: SuppressMessage("Naming", "CA1707:Identifiers should not contain underscores", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.Table.TableSquare.Rank")]
[assembly: SuppressMessage("Naming", "CA1707:Identifiers should not contain underscores", Justification = "<Pending>", Scope = "namespaceanddescendants", Target = "Chess.AI")]
[assembly: SuppressMessage("Naming", "CA1712:Do not prefix enum values with type name", Justification = "<Pending>", Scope = "type", Target = "~T:Chess.AI.Level")]
