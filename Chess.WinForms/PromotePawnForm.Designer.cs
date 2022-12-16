namespace Chess.WinForms
{
    partial class PromotePawnForm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.pMain = new System.Windows.Forms.Panel();
            this.btnKnight = new System.Windows.Forms.Button();
            this.btnBishop = new System.Windows.Forms.Button();
            this.btnRook = new System.Windows.Forms.Button();
            this.btnQueen = new System.Windows.Forms.Button();
            this.lblChooseFigure = new System.Windows.Forms.Label();
            this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
            this.pMain.SuspendLayout();
            this.SuspendLayout();
            // 
            // pMain
            // 
            this.pMain.Controls.Add(this.btnKnight);
            this.pMain.Controls.Add(this.btnBishop);
            this.pMain.Controls.Add(this.btnRook);
            this.pMain.Controls.Add(this.btnQueen);
            this.pMain.Controls.Add(this.lblChooseFigure);
            this.pMain.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pMain.Location = new System.Drawing.Point(0, 0);
            this.pMain.Name = "pMain";
            this.pMain.Size = new System.Drawing.Size(210, 206);
            this.pMain.TabIndex = 0;
            // 
            // btnKnight
            // 
            this.btnKnight.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnKnight.Font = new System.Drawing.Font("Segoe UI", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnKnight.Location = new System.Drawing.Point(128, 124);
            this.btnKnight.Name = "btnKnight";
            this.btnKnight.Size = new System.Drawing.Size(70, 70);
            this.btnKnight.TabIndex = 7;
            this.btnKnight.Text = "K";
            this.btnKnight.UseVisualStyleBackColor = true;
            this.btnKnight.Click += new System.EventHandler(this.BtnKnight_Click);
            // 
            // btnBishop
            // 
            this.btnBishop.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnBishop.Font = new System.Drawing.Font("Segoe UI", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnBishop.Location = new System.Drawing.Point(12, 124);
            this.btnBishop.Name = "btnBishop";
            this.btnBishop.Size = new System.Drawing.Size(70, 70);
            this.btnBishop.TabIndex = 6;
            this.btnBishop.Text = "B";
            this.btnBishop.UseVisualStyleBackColor = true;
            this.btnBishop.Click += new System.EventHandler(this.BtnBishop_Click);
            // 
            // btnRook
            // 
            this.btnRook.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnRook.Font = new System.Drawing.Font("Segoe UI", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnRook.Location = new System.Drawing.Point(128, 27);
            this.btnRook.Name = "btnRook";
            this.btnRook.Size = new System.Drawing.Size(70, 70);
            this.btnRook.TabIndex = 5;
            this.btnRook.Text = "R";
            this.btnRook.UseVisualStyleBackColor = true;
            this.btnRook.Click += new System.EventHandler(this.BtnRook_Click);
            // 
            // btnQueen
            // 
            this.btnQueen.DialogResult = System.Windows.Forms.DialogResult.OK;
            this.btnQueen.Font = new System.Drawing.Font("Segoe UI", 20.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.btnQueen.Location = new System.Drawing.Point(12, 27);
            this.btnQueen.Name = "btnQueen";
            this.btnQueen.Size = new System.Drawing.Size(70, 70);
            this.btnQueen.TabIndex = 4;
            this.btnQueen.Text = "Q";
            this.btnQueen.UseVisualStyleBackColor = true;
            this.btnQueen.Click += new System.EventHandler(this.BtnQueen_Click);
            // 
            // lblChooseFigure
            // 
            this.lblChooseFigure.AutoSize = true;
            this.lblChooseFigure.Location = new System.Drawing.Point(12, 9);
            this.lblChooseFigure.Name = "lblChooseFigure";
            this.lblChooseFigure.Size = new System.Drawing.Size(81, 15);
            this.lblChooseFigure.TabIndex = 0;
            this.lblChooseFigure.Text = "Choose figure";
            // 
            // openFileDialog1
            // 
            this.openFileDialog1.FileName = "openFileDialog1";
            // 
            // PromotePawnForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(210, 206);
            this.Controls.Add(this.pMain);
            this.Name = "PromotePawnForm";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Pawn promote";
            this.pMain.ResumeLayout(false);
            this.pMain.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private Panel pMain;
        private Label lblChooseFigure;
        private Button btnKnight;
        private Button btnBishop;
        private Button btnRook;
        private Button btnQueen;
        private OpenFileDialog openFileDialog1;
    }
}