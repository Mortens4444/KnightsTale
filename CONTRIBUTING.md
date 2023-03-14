# General
---------
- Bad moves (NoMoreCastle, Let enemy to hit my figure, tie)
	In chess, a move can be considered "bad" if it results in a disadvantageous position for the player who makes it. Some examples of bad moves in chess include:
	- Moving a piece to a square where it can be easily captured by the opponent.
	- Developing pieces slowly, allowing the opponent to control the center of the board and gain an advantage.
	- Moving a piece multiple times in the opening, instead of developing it to a more active square.
	- Moving the King too early in the opening, making it vulnerable to attack.
	- Failing to protect important pieces, such as the Queen or Rooks, which can lead to their capture.
	- Moving a piece to a square where it can be attacked by multiple pieces, which can lead to its capture.
	- Failing to consider the opponent's threats, and making a move that allows them to gain an advantage.
	- Moving a piece to a square where it is blocked by other pieces and unable to participate in the game.
	It's important to note that chess is a complex game and what can be considered as a bad move in one situation may not be in another. A player's ability to evaluate the position, anticipate the opponent's threats and make the best move available is crucial to the game, and that's why the best chess players can make their opponents to fall into traps and make a bad move.

- Tie
	- 50 moves -> tie (The 50-move draw rule, which today states that a draw can be claimed if no capture is made and no pawn is moved for 50 consecutive moves)
	- Two king with one bishop/knight => Tie
- Fix tests
	- Get better check value calulation (FigureValueCalculator.GetCheckValue)	
- CLSCompliant(false) -> CLSCompliant(true) + eliminate warnings

# Chess.Console
---------------
- Fix two AI play
- Move.Promotion should not be automatic - Check in Chess.WinForms or Chess.Wpf

# Chess.WebApi
--------------
- Add moves list
	In HTML/JavaScript, you can create a list view by using the <ul> (unordered list) or <ol> (ordered list) element. Each list item should be placed within a <li> (list item) element. Here is an example of an ordered list:
```html
	<ol id="moves" class="chess-moves">
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
	</ol>
```

	You can also use CSS to style the list and the list items. For example, you can use the list-style-type property to change the bullet points to numbers or other symbols.

```css
.chess-moves {
	font-size: 16px;
	font-weight: bold;
	color: black;
	background-color: white;
	list-style-type: decimal;
	line-height: 1.5;
	text-align: left;
	padding: 10px;
	margin: 20px;
	border: 1px solid gray;
}

.chess-moves li:nth-child(odd) {
	background-color: lightgray;
}

.chess-moves li:hover {
	background-color: #f2f2f2;
}
```	
	
	You can also create a listview using JavaScript, for example using the for loop to create and append the list items to the list element. Here's an example:
```javascript
	let myList: HTMLElement = document.getElementById("myList") as HTMLElement;
	let items: string[] = ["Item 1", "Item 2", "Item 3"];

	for (let i: number = 0; i < items.length; i++) {
		let item: HTMLElement = document.createElement("li") as HTMLElement;
		item.innerHTML = items[i];
		myList.appendChild(item);
	}
```
	
- Move.Promotion should not be automatic - Check in Chess.WinForms or Chess.Wpf

# Chess.UWP
-----------
- Create project
	Sure, here are the steps to create a basic blank UWP project using Visual Studio:
	1. Open Visual Studio and select "Create a new project" from the start page or File > New > Project.
	2. In the "Create a new project" window, select "Windows Universal" from the list of templates, and then select "Blank App (Universal Windows)".
	3. Give your project a name and choose a location to save it.
	4. In the next window, select the "Minimum Version" of the Windows 10 operating system that your app will support.
	5. Click "Create" to create the project.
	6. Once the project is created, you should see the MainPage.xaml file open in the main editor window. This is the starting point for the user interface of your app.
	7. You can now start building your UWP app by adding controls, code-behind, and other resources to the project.
	8. When you're ready to test your app, you can press the "Start" button in the Visual Studio toolbar to launch the app in the local machine or a connected device.
	It's worth noting that there are other ways to create a UWP application, like using other development environments or using other programming languages. If you're new to UWP development, I recommend looking into tutorials and online resources to help you understand the basics of the platform and how to build a UWP app.

- Show chessboard
	Reuse some of the XAML code from a WPF project in a UWP project.
	The best way to reuse your WPF code in UWP app is to create a separate class library project that contains the XAML and code-behind files and then reference that library in the UWP app. This way you can share the code across the two projects and make the necessary adjustments to make it work in the UWP environment.

- New game - Check in Chess.WinForms or Chess.Wpf
- Load game - Check in Chess.WinForms or Chess.Wpf
- Save game - Check in Chess.WinForms or Chess.Wpf
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
