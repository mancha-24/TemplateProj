using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class StaffData_FuturesColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "DaysWeekFuture",
                table: "StaffData",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "HoursWeekFuture",
                table: "StaffData",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<decimal>(
                name: "SalaryMonthFuture",
                table: "StaffData",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "TrainingFuture",
                table: "StaffData",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 7, 10, 16, 19, 17, 976, DateTimeKind.Local).AddTicks(4809),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 21, 18, 50, 42, 557, DateTimeKind.Local).AddTicks(169));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DaysWeekFuture",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "HoursWeekFuture",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "SalaryMonthFuture",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "TrainingFuture",
                table: "StaffData");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 21, 18, 50, 42, 557, DateTimeKind.Local).AddTicks(169),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 7, 10, 16, 19, 17, 976, DateTimeKind.Local).AddTicks(4809));
        }
    }
}
