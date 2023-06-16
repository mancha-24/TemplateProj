using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class FunctionType_table_int_FK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FunctionTypeId",
                table: "Functions",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 55, 2, 471, DateTimeKind.Local).AddTicks(4776),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 54, 17, 800, DateTimeKind.Local).AddTicks(2959));

            migrationBuilder.CreateTable(
                name: "FunctionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FunctionTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Functions_FunctionTypeId",
                table: "Functions",
                column: "FunctionTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Functions_FunctionTypes_FunctionTypeId",
                table: "Functions",
                column: "FunctionTypeId",
                principalTable: "FunctionTypes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Functions_FunctionTypes_FunctionTypeId",
                table: "Functions");

            migrationBuilder.DropTable(
                name: "FunctionTypes");

            migrationBuilder.DropIndex(
                name: "IX_Functions_FunctionTypeId",
                table: "Functions");

            migrationBuilder.DropColumn(
                name: "FunctionTypeId",
                table: "Functions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 54, 17, 800, DateTimeKind.Local).AddTicks(2959),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 55, 2, 471, DateTimeKind.Local).AddTicks(4776));
        }
    }
}
