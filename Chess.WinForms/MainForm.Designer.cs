namespace Chess.WinForms;

partial class MainForm
{
    /// <summary>
    ///  Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    ///  Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    ///  Required method for Designer support - do not modify
    ///  the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
            this.pMain = new System.Windows.Forms.Panel();
            this.pBoard = new System.Windows.Forms.Panel();
            this.splitter1 = new System.Windows.Forms.Splitter();
            this.pRight = new System.Windows.Forms.Panel();
            this.cbBlack = new System.Windows.Forms.ComboBox();
            this.cbWhite = new System.Windows.Forms.ComboBox();
            this.lblBlack = new System.Windows.Forms.Label();
            this.lblWhite = new System.Windows.Forms.Label();
            this.rtbMessage = new System.Windows.Forms.RichTextBox();
            this.lvMoves = new System.Windows.Forms.ListView();
            this.chNumber = new System.Windows.Forms.ColumnHeader();
            this.chMove = new System.Windows.Forms.ColumnHeader();
            this.msMenu = new System.Windows.Forms.MenuStrip();
            this.gameToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.tsmiNewGame = new System.Windows.Forms.ToolStripMenuItem();
            this.separator1 = new System.Windows.Forms.ToolStripSeparator();
            this.tsmiLoadGame = new System.Windows.Forms.ToolStripMenuItem();
            this.tsmiSaveGame = new System.Windows.Forms.ToolStripMenuItem();
            this.separator2 = new System.Windows.Forms.ToolStripSeparator();
            this.tsmiExit = new System.Windows.Forms.ToolStripMenuItem();
            this.saveFileDialog = new System.Windows.Forms.SaveFileDialog();
            this.openFileDialog = new System.Windows.Forms.OpenFileDialog();
            this.chTime = new System.Windows.Forms.ColumnHeader();
            this.pMain.SuspendLayout();
            this.pRight.SuspendLayout();
            this.msMenu.SuspendLayout();
            this.SuspendLayout();
            // 
            // pMain
            // 
            this.pMain.Controls.Add(this.pBoard);
            this.pMain.Controls.Add(this.splitter1);
            this.pMain.Controls.Add(this.pRight);
            this.pMain.Controls.Add(this.msMenu);
            this.pMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pMain.Location = new System.Drawing.Point(0, 0);
            this.pMain.Name = "pMain";
            this.pMain.Size = new System.Drawing.Size(800, 493);
            this.pMain.TabIndex = 1;
            // 
            // pBoard
            // 
            this.pBoard.BackColor = System.Drawing.Color.LightBlue;
            this.pBoard.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pBoard.Location = new System.Drawing.Point(0, 24);
            this.pBoard.Name = "pBoard";
            this.pBoard.Size = new System.Drawing.Size(597, 469);
            this.pBoard.TabIndex = 3;
            this.pBoard.Paint += new System.Windows.Forms.PaintEventHandler(this.PBoard_Paint);
            this.pBoard.MouseClick += new System.Windows.Forms.MouseEventHandler(this.PBoard_MouseClick);
            // 
            // splitter1
            // 
            this.splitter1.Dock = System.Windows.Forms.DockStyle.Right;
            this.splitter1.Location = new System.Drawing.Point(597, 24);
            this.splitter1.Name = "splitter1";
            this.splitter1.Size = new System.Drawing.Size(3, 469);
            this.splitter1.TabIndex = 2;
            this.splitter1.TabStop = false;
            // 
            // pRight
            // 
            this.pRight.Controls.Add(this.cbBlack);
            this.pRight.Controls.Add(this.cbWhite);
            this.pRight.Controls.Add(this.lblBlack);
            this.pRight.Controls.Add(this.lblWhite);
            this.pRight.Controls.Add(this.rtbMessage);
            this.pRight.Controls.Add(this.lvMoves);
            this.pRight.Dock = System.Windows.Forms.DockStyle.Right;
            this.pRight.Location = new System.Drawing.Point(600, 24);
            this.pRight.Name = "pRight";
            this.pRight.Size = new System.Drawing.Size(200, 469);
            this.pRight.TabIndex = 1;
            // 
            // cbBlack
            // 
            this.cbBlack.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cbBlack.FormattingEnabled = true;
            this.cbBlack.Location = new System.Drawing.Point(69, 36);
            this.cbBlack.Name = "cbBlack";
            this.cbBlack.Size = new System.Drawing.Size(128, 23);
            this.cbBlack.TabIndex = 5;
            this.cbBlack.SelectedIndexChanged += new System.EventHandler(this.CbBlack_SelectedIndexChanged);
            // 
            // cbWhite
            // 
            this.cbWhite.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cbWhite.FormattingEnabled = true;
            this.cbWhite.Location = new System.Drawing.Point(69, 8);
            this.cbWhite.Name = "cbWhite";
            this.cbWhite.Size = new System.Drawing.Size(128, 23);
            this.cbWhite.TabIndex = 4;
            this.cbWhite.SelectedIndexChanged += new System.EventHandler(this.CbWhite_SelectedIndexChanged);
            // 
            // lblBlack
            // 
            this.lblBlack.AutoSize = true;
            this.lblBlack.Location = new System.Drawing.Point(6, 39);
            this.lblBlack.Name = "lblBlack";
            this.lblBlack.Size = new System.Drawing.Size(35, 15);
            this.lblBlack.TabIndex = 3;
            this.lblBlack.Text = "Black";
            // 
            // lblWhite
            // 
            this.lblWhite.AutoSize = true;
            this.lblWhite.Location = new System.Drawing.Point(6, 11);
            this.lblWhite.Name = "lblWhite";
            this.lblWhite.Size = new System.Drawing.Size(38, 15);
            this.lblWhite.TabIndex = 2;
            this.lblWhite.Text = "White";
            // 
            // rtbMessage
            // 
            this.rtbMessage.Location = new System.Drawing.Point(3, 65);
            this.rtbMessage.Name = "rtbMessage";
            this.rtbMessage.Size = new System.Drawing.Size(194, 51);
            this.rtbMessage.TabIndex = 1;
            this.rtbMessage.Text = "";
            // 
            // lvMoves
            // 
            this.lvMoves.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lvMoves.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.chNumber,
            this.chMove,
            this.chTime});
            this.lvMoves.Location = new System.Drawing.Point(3, 122);
            this.lvMoves.Name = "lvMoves";
            this.lvMoves.Size = new System.Drawing.Size(194, 344);
            this.lvMoves.TabIndex = 0;
            this.lvMoves.UseCompatibleStateImageBehavior = false;
            this.lvMoves.View = System.Windows.Forms.View.Details;
            // 
            // chNumber
            // 
            this.chNumber.Text = "#";
            this.chNumber.Width = 30;
            // 
            // chMove
            // 
            this.chMove.Text = "Move";
            this.chMove.Width = 80;
            // 
            // msMenu
            // 
            this.msMenu.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.gameToolStripMenuItem});
            this.msMenu.Location = new System.Drawing.Point(0, 0);
            this.msMenu.Name = "msMenu";
            this.msMenu.Size = new System.Drawing.Size(800, 24);
            this.msMenu.TabIndex = 0;
            this.msMenu.Text = "Main menu";
            // 
            // gameToolStripMenuItem
            // 
            this.gameToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsmiNewGame,
            this.separator1,
            this.tsmiLoadGame,
            this.tsmiSaveGame,
            this.separator2,
            this.tsmiExit});
            this.gameToolStripMenuItem.Name = "gameToolStripMenuItem";
            this.gameToolStripMenuItem.Size = new System.Drawing.Size(50, 20);
            this.gameToolStripMenuItem.Text = "Game";
            // 
            // tsmiNewGame
            // 
            this.tsmiNewGame.Name = "tsmiNewGame";
            this.tsmiNewGame.Size = new System.Drawing.Size(133, 22);
            this.tsmiNewGame.Text = "New game";
            this.tsmiNewGame.Click += new System.EventHandler(this.TsmiNewGame_Click);
            // 
            // separator1
            // 
            this.separator1.Name = "separator1";
            this.separator1.Size = new System.Drawing.Size(130, 6);
            // 
            // tsmiLoadGame
            // 
            this.tsmiLoadGame.Name = "tsmiLoadGame";
            this.tsmiLoadGame.Size = new System.Drawing.Size(133, 22);
            this.tsmiLoadGame.Text = "Load game";
            this.tsmiLoadGame.Click += new System.EventHandler(this.TsmiLoadGame_Click);
            // 
            // tsmiSaveGame
            // 
            this.tsmiSaveGame.Name = "tsmiSaveGame";
            this.tsmiSaveGame.Size = new System.Drawing.Size(133, 22);
            this.tsmiSaveGame.Text = "Save game";
            this.tsmiSaveGame.Click += new System.EventHandler(this.TsmiSaveGame_Click);
            // 
            // separator2
            // 
            this.separator2.Name = "separator2";
            this.separator2.Size = new System.Drawing.Size(130, 6);
            // 
            // tsmiExit
            // 
            this.tsmiExit.Name = "tsmiExit";
            this.tsmiExit.Size = new System.Drawing.Size(133, 22);
            this.tsmiExit.Text = "Exit";
            this.tsmiExit.Click += new System.EventHandler(this.TsmiExit_Click);
            // 
            // saveFileDialog
            // 
            this.saveFileDialog.Filter = "Chess game save|*.cgs";
            // 
            // openFileDialog
            // 
            this.openFileDialog.Filter = "Chess game save|*.cgs";
            // 
            // chTime
            // 
            this.chTime.Text = "Time";
            this.chTime.Width = 80;
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 493);
            this.Controls.Add(this.pMain);
            this.Name = "MainForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Knight\'s Tale";
            this.pMain.ResumeLayout(false);
            this.pMain.PerformLayout();
            this.pRight.ResumeLayout(false);
            this.pRight.PerformLayout();
            this.msMenu.ResumeLayout(false);
            this.msMenu.PerformLayout();
            this.ResumeLayout(false);

    }

    private System.Windows.Forms.Panel pMain;

    #endregion

    private MenuStrip msMenu;
    private ToolStripMenuItem gameToolStripMenuItem;
    private ToolStripMenuItem tsmiNewGame;
    private ToolStripSeparator separator1;
    private ToolStripMenuItem tsmiLoadGame;
    private ToolStripMenuItem tsmiSaveGame;
    private ToolStripSeparator separator2;
    private ToolStripMenuItem tsmiExit;
    private Panel pRight;
    private Panel pBoard;
    private Splitter splitter1;
    private ListView lvMoves;
    private ColumnHeader chMove;
    private SaveFileDialog saveFileDialog;
    private OpenFileDialog openFileDialog;
    private RichTextBox rtbMessage;
    private Label lblBlack;
    private Label lblWhite;
    private ComboBox cbBlack;
    private ComboBox cbWhite;
    private ColumnHeader chNumber;
    private ColumnHeader chTime;
}