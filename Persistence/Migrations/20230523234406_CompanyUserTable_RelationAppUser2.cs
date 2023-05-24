using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CompanyUserTable_RelationAppUser2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyUser_IdCompany",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyUser",
                table: "CompanyUser");

            migrationBuilder.RenameTable(
                name: "CompanyUser",
                newName: "CompanyUsers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyUsers",
                table: "CompanyUsers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyUsers_IdCompany",
                table: "AspNetUsers",
                column: "IdCompany",
                principalTable: "CompanyUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyUsers_IdCompany",
                table: "AspNetUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CompanyUsers",
                table: "CompanyUsers");

            migrationBuilder.RenameTable(
                name: "CompanyUsers",
                newName: "CompanyUser");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CompanyUser",
                table: "CompanyUser",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyUser_IdCompany",
                table: "AspNetUsers",
                column: "IdCompany",
                principalTable: "CompanyUser",
                principalColumn: "Id");
        }
    }
}
