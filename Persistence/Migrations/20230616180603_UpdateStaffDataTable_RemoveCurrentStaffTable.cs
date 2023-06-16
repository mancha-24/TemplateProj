using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStaffDataTable_RemoveCurrentStaffTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CurrentStaff");

            migrationBuilder.AddColumn<int>(
                name: "AutoAdmissionQuantity",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubAquantity",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubBquantity",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubCquantity",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SubDquantity",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VtvQuantity",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VvQuantity",
                table: "StaffData",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 16, 13, 6, 3, 181, DateTimeKind.Local).AddTicks(8367),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 14, 17, 30, 0, 692, DateTimeKind.Local).AddTicks(1426));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AutoAdmissionQuantity",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "SubAquantity",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "SubBquantity",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "SubCquantity",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "SubDquantity",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "VtvQuantity",
                table: "StaffData");

            migrationBuilder.DropColumn(
                name: "VvQuantity",
                table: "StaffData");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 14, 17, 30, 0, 692, DateTimeKind.Local).AddTicks(1426),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 16, 13, 6, 3, 181, DateTimeKind.Local).AddTicks(8367));
        }
    }
}
