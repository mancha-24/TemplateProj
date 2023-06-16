using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CurrentStaff_Types_Tables_FK : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "StaffTypeId",
                table: "CurrentStaff",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 18, 23, 4, DateTimeKind.Local).AddTicks(7849),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 14, 22, 323, DateTimeKind.Local).AddTicks(1429));

            migrationBuilder.CreateTable(
                name: "StaffTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsAdmissionMandatory = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StaffTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CurrentStaff_StaffTypeId",
                table: "CurrentStaff",
                column: "StaffTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_CurrentStaff_StaffTypes_StaffTypeId",
                table: "CurrentStaff",
                column: "StaffTypeId",
                principalTable: "StaffTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CurrentStaff_StaffTypes_StaffTypeId",
                table: "CurrentStaff");

            migrationBuilder.DropTable(
                name: "StaffTypes");

            migrationBuilder.DropIndex(
                name: "IX_CurrentStaff_StaffTypeId",
                table: "CurrentStaff");

            migrationBuilder.DropColumn(
                name: "StaffTypeId",
                table: "CurrentStaff");

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "CompanyUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 17, 14, 22, 323, DateTimeKind.Local).AddTicks(1429),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 17, 18, 23, 4, DateTimeKind.Local).AddTicks(7849));
        }
    }
}
