using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSubcontractor_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 21, 11, 22, 47, 910, DateTimeKind.Local).AddTicks(4230),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 16, 16, 50, 44, 316, DateTimeKind.Local).AddTicks(1505));

            migrationBuilder.CreateTable(
                name: "SubContractors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FunctionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Since = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmployeesNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubContractors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubContractors_CompanyUsers_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "CompanyUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SubContractors_Functions_FunctionId",
                        column: x => x.FunctionId,
                        principalTable: "Functions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubContractors_CompanyId",
                table: "SubContractors",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_SubContractors_FunctionId",
                table: "SubContractors",
                column: "FunctionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubContractors");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 16, 16, 50, 44, 316, DateTimeKind.Local).AddTicks(1505),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 21, 11, 22, 47, 910, DateTimeKind.Local).AddTicks(4230));
        }
    }
}
