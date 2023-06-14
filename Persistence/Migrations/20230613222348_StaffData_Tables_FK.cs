using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class StaffData_Tables_FK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 23, 48, 688, DateTimeKind.Local).AddTicks(7452),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 18, 23, 4, DateTimeKind.Local).AddTicks(7849));

            migrationBuilder.CreateTable(
                name: "StaffData",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Training = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SalaryMonth = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DaysWeek = table.Column<double>(type: "float", nullable: false),
                    HoursWeek = table.Column<double>(type: "float", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FunctionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StaffData_CompanyUsers_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "CompanyUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StaffData_Functions_FunctionId",
                        column: x => x.FunctionId,
                        principalTable: "Functions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_StaffData_CompanyId",
                table: "StaffData",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_StaffData_FunctionId",
                table: "StaffData",
                column: "FunctionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StaffData");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 18, 23, 4, DateTimeKind.Local).AddTicks(7849),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 23, 48, 688, DateTimeKind.Local).AddTicks(7452));
        }
    }
}
