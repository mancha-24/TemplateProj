using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Update_SectorColumn_CompanyTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sector",
                table: "CompanyUsers");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 19, 5, 23, 276, DateTimeKind.Local).AddTicks(8651),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 18, 8, 50, 305, DateTimeKind.Local).AddTicks(4804));

            migrationBuilder.AddColumn<int>(
                name: "SectorId",
                table: "CompanyUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyUsers_SectorId",
                table: "CompanyUsers",
                column: "SectorId");

            migrationBuilder.AddForeignKey(
                name: "FK_CompanyUsers_Sectors_SectorId",
                table: "CompanyUsers",
                column: "SectorId",
                principalTable: "Sectors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CompanyUsers_Sectors_SectorId",
                table: "CompanyUsers");

            migrationBuilder.DropIndex(
                name: "IX_CompanyUsers_SectorId",
                table: "CompanyUsers");

            migrationBuilder.DropColumn(
                name: "SectorId",
                table: "CompanyUsers");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 18, 8, 50, 305, DateTimeKind.Local).AddTicks(4804),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 19, 5, 23, 276, DateTimeKind.Local).AddTicks(8651));

            migrationBuilder.AddColumn<string>(
                name: "Sector",
                table: "CompanyUsers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
