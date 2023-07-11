using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class StaffData_TimeDetailColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TimeDetail",
                table: "StaffData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TimeDetailFuture",
                table: "StaffData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 7, 10, 19, 34, 33, 38, DateTimeKind.Local).AddTicks(3549),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 7, 10, 16, 37, 22, 646, DateTimeKind.Local).AddTicks(7424));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TimeDetail",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "TimeDetailFuture",
                table: "StaffData");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 7, 10, 16, 37, 22, 646, DateTimeKind.Local).AddTicks(7424),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 7, 10, 19, 34, 33, 38, DateTimeKind.Local).AddTicks(3549));
        }
    }
}
