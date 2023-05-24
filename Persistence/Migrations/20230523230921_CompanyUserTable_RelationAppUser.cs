using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class CompanyUserTable_RelationAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "IdCompany",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CompanyUser",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Trade = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RegName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KvkNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Director = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SvbNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sector = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyUser", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_IdCompany",
                table: "AspNetUsers",
                column: "IdCompany",
                unique: true,
                filter: "[IdCompany] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_CompanyUser_IdCompany",
                table: "AspNetUsers",
                column: "IdCompany",
                principalTable: "CompanyUser",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_CompanyUser_IdCompany",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "CompanyUser");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_IdCompany",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "IdCompany",
                table: "AspNetUsers");
        }
    }
}
