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
            this.components = new System.ComponentModel.Container();
            this.pMain = new System.Windows.Forms.Panel();
            this.pBoard = new System.Windows.Forms.Panel();
            this.splitter1 = new System.Windows.Forms.Splitter();
            this.pRight = new System.Windows.Forms.Panel();
            this.cbBlack = new System.Windows.Forms.ComboBox();
            this.cbWhite = new System.Windows.Forms.ComboBox();
            this.lblBlack = new System.Windows.Forms.Label();
            this.lblWhite = new System.Windows.Forms.Label();
            this.lvMoves = new System.Windows.Forms.ListView();
            this.chNumber = new System.Windows.Forms.ColumnHeader();
            this.chMove = new System.Windows.Forms.ColumnHeader();
            this.chTime = new System.Windows.Forms.ColumnHeader();
            this.cmsMovesContextMenu = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.tsmiRollback = new System.Windows.Forms.ToolStripMenuItem();
            this.msMenu = new System.Windows.Forms.MenuStrip();
            this.tsmiGame = new System.Windows.Forms.ToolStripMenuItem();
            this.tsmiNewGame = new System.Windows.Forms.ToolStripMenuItem();
            this.separator1 = new System.Windows.Forms.ToolStripSeparator();
            this.tsmiLoadGame = new System.Windows.Forms.ToolStripMenuItem();
            this.tsmiSaveGame = new System.Windows.Forms.ToolStripMenuItem();
            this.separator2 = new System.Windows.Forms.ToolStripSeparator();
            this.tsmiExit = new System.Windows.Forms.ToolStripMenuItem();
            this.tsmiOptions = new System.Windows.Forms.ToolStripMenuItem();
            this.tsmiPlayingAsBlack = new System.Windows.Forms.ToolStripMenuItem();
            this.saveFileDialog = new System.Windows.Forms.SaveFileDialog();
            this.openFileDialog = new System.Windows.Forms.OpenFileDialog();
            this.pMain.SuspendLayout();
            this.pRight.SuspendLayout();
            this.cmsMovesContextMenu.SuspendLayout();
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
            // lvMoves
            // 
            this.lvMoves.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.lvMoves.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.chNumber,
            this.chMove,
            this.chTime});
            this.lvMoves.ContextMenuStrip = this.cmsMovesContextMenu;
            this.lvMoves.FullRowSelect = true;
            this.lvMoves.Location = new System.Drawing.Point(3, 65);
            this.lvMoves.MultiSelect = false;
            this.lvMoves.Name = "lvMoves";
            this.lvMoves.Size = new System.Drawing.Size(194, 401);
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
            // chTime
            // 
            this.chTime.Text = "Time";
            this.chTime.Width = 80;
            // 
            // cmsMovesContextMenu
            // 
            this.cmsMovesContextMenu.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsmiRollback});
            this.cmsMovesContextMenu.Name = "cmsMovesContextMenu";
            this.cmsMovesContextMenu.Size = new System.Drawing.Size(120, 26);
            // 
            // tsmiRollback
            // 
            this.tsmiRollback.Name = "tsmiRollback";
            this.tsmiRollback.Size = new System.Drawing.Size(119, 22);
            this.tsmiRollback.Text = "Rollback";
            this.tsmiRollback.Click += new System.EventHandler(this.TsmiRollback_Click);
            // 
            // msMenu
            // 
            this.msMenu.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsmiGame,
            this.tsmiOptions});
            this.msMenu.Location = new System.Drawing.Point(0, 0);
            this.msMenu.Name = "msMenu";
            this.msMenu.Size = new System.Drawing.Size(800, 24);
            this.msMenu.TabIndex = 0;
            this.msMenu.Text = "Main menu";
            // 
            // tsmiGame
            // 
            this.tsmiGame.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsmiNewGame,
            this.separator1,
            this.tsmiLoadGame,
            this.tsmiSaveGame,
            this.separator2,
            this.tsmiExit});
            this.tsmiGame.Name = "tsmiGame";
            this.tsmiGame.Size = new System.Drawing.Size(50, 20);
            this.tsmiGame.Text = "Game";
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
            // tsmiOptions
            // 
            this.tsmiOptions.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsmiPlayingAsBlack});
            this.tsmiOptions.Name = "tsmiOptions";
            this.tsmiOptions.Size = new System.Drawing.Size(61, 20);
            this.tsmiOptions.Text = "Options";
            // 
            // tsmiPlayingAsBlack
            // 
            this.tsmiPlayingAsBlack.CheckOnClick = true;
            this.tsmiPlayingAsBlack.Name = "tsmiPlayingAsBlack";
            this.tsmiPlayingAsBlack.Size = new System.Drawing.Size(180, 22);
            this.tsmiPlayingAsBlack.Text = "Playing as black";
            this.tsmiPlayingAsBlack.CheckedChanged += new System.EventHandler(this.TsmiPlayingAsBlack_CheckedChanged);
            // 
            // saveFileDialog
            // 
            this.saveFileDialog.Filter = "Chess game save|*.cgs";
            // 
            // openFileDialog
            // 
            this.openFileDialog.Filter = "Chess game save|*.cgs";
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
            this.cmsMovesContextMenu.ResumeLayout(false);
            this.msMenu.ResumeLayout(false);
            this.msMenu.PerformLayout();
            this.ResumeLayout(false);

    }

    private System.Windows.Forms.Panel pMain;

    #endregion

    private MenuStrip msMenu;
    private ToolStripMenuItem tsmiGame;
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
    private Label lblBlack;
    private Label lblWhite;
    private ComboBox cbBlack;
    private ComboBox cbWhite;
    private ColumnHeader chNumber;
    private ColumnHeader chTime;
    private ContextMenuStrip cmsMovesContextMenu;
    private ToolStripMenuItem tsmiRollback;
    private ToolStripMenuItem tsmiOptions;
    private ToolStripMenuItem tsmiPlayingAsBlack;
}