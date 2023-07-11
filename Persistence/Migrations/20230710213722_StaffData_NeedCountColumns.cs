using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class StaffData_NeedCountColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NeedCount",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NeedCountFuture",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 7, 10, 16, 37, 22, 646, DateTimeKind.Local).AddTicks(7424),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 7, 10, 16, 19, 17, 976, DateTimeKind.Local).AddTicks(4809));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NeedCount",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "NeedCountFuture",
                table: "StaffData");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 7, 10, 16, 19, 17, 976, DateTimeKind.Local).AddTicks(4809),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 7, 10, 16, 37, 22, 646, DateTimeKind.Local).AddTicks(7424));
        }
    }
}
