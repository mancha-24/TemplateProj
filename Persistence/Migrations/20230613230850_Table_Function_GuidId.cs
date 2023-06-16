using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Table_Function_GuidId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrentStaff_Function_FunctionId",
                table: "CurrentStaff");

            migrationBuilder.DropForeignKey(
                name: "FK_Function_FunctionType_FunctionTypeId",
                table: "Function");

            migrationBuilder.DropForeignKey(
                name: "FK_Function_Sectors_SectorId",
                table: "Function");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffData_Function_FunctionId",
                table: "StaffData");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FunctionType",
                table: "FunctionType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Function",
                table: "Function");

            migrationBuilder.RenameTable(
                name: "FunctionType",
                newName: "FunctionTypes");

            migrationBuilder.RenameTable(
                name: "Function",
                newName: "Functions");

            migrationBuilder.RenameIndex(
                name: "IX_Function_SectorId",
                table: "Functions",
                newName: "IX_Functions_SectorId");

            migrationBuilder.RenameIndex(
                name: "IX_Function_FunctionTypeId",
                table: "Functions",
                newName: "IX_Functions_FunctionTypeId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 18, 8, 50, 305, DateTimeKind.Local).AddTicks(4804),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 58, 38, 305, DateTimeKind.Local).AddTicks(3708));

            migrationBuilder.AddPrimaryKey(
                name: "PK_FunctionTypes",
                table: "FunctionTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Functions",
                table: "Functions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrentStaff_Functions_FunctionId",
                table: "CurrentStaff",
                column: "FunctionId",
                principalTable: "Functions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Functions_FunctionTypes_FunctionTypeId",
                table: "Functions",
                column: "FunctionTypeId",
                principalTable: "FunctionTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Functions_Sectors_SectorId",
                table: "Functions",
                column: "SectorId",
                principalTable: "Sectors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffData_Functions_FunctionId",
                table: "StaffData",
                column: "FunctionId",
                principalTable: "Functions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrentStaff_Functions_FunctionId",
                table: "CurrentStaff");

            migrationBuilder.DropForeignKey(
                name: "FK_Functions_FunctionTypes_FunctionTypeId",
                table: "Functions");

            migrationBuilder.DropForeignKey(
                name: "FK_Functions_Sectors_SectorId",
                table: "Functions");

            migrationBuilder.DropForeignKey(
                name: "FK_StaffData_Functions_FunctionId",
                table: "StaffData");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FunctionTypes",
                table: "FunctionTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Functions",
                table: "Functions");

            migrationBuilder.RenameTable(
                name: "FunctionTypes",
                newName: "FunctionType");

            migrationBuilder.RenameTable(
                name: "Functions",
                newName: "Function");

            migrationBuilder.RenameIndex(
                name: "IX_Functions_SectorId",
                table: "Function",
                newName: "IX_Function_SectorId");

            migrationBuilder.RenameIndex(
                name: "IX_Functions_FunctionTypeId",
                table: "Function",
                newName: "IX_Function_FunctionTypeId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 58, 38, 305, DateTimeKind.Local).AddTicks(3708),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 18, 8, 50, 305, DateTimeKind.Local).AddTicks(4804));

            migrationBuilder.AddPrimaryKey(
                name: "PK_FunctionType",
                table: "FunctionType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Function",
                table: "Function",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrentStaff_Function_FunctionId",
                table: "CurrentStaff",
                column: "FunctionId",
                principalTable: "Function",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Function_FunctionType_FunctionTypeId",
                table: "Function",
                column: "FunctionTypeId",
                principalTable: "FunctionType",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Function_Sectors_SectorId",
                table: "Function",
                column: "SectorId",
                principalTable: "Sectors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StaffData_Function_FunctionId",
                table: "StaffData",
                column: "FunctionId",
                principalTable: "Function",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
