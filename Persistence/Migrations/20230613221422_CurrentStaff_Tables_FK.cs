using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CurrentStaff_Tables_FK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 14, 22, 323, DateTimeKind.Local).AddTicks(1429),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 7, 9, 106, DateTimeKind.Local).AddTicks(1798));

            migrationBuilder.CreateTable(
                name: "CurrentStaff",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FunctionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CurrentStaff", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CurrentStaff_CompanyUsers_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "CompanyUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CurrentStaff_Functions_FunctionId",
                        column: x => x.FunctionId,
                        principalTable: "Functions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CurrentStaff_CompanyId",
                table: "CurrentStaff",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CurrentStaff_FunctionId",
                table: "CurrentStaff",
                column: "FunctionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentStaff");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 7, 9, 106, DateTimeKind.Local).AddTicks(1798),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 14, 22, 323, DateTimeKind.Local).AddTicks(1429));
        }
    }
}
