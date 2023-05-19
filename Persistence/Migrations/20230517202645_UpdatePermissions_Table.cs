using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePermissions_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "AppPermissions");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "AspNetRoles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "IdRole",
                table: "AppPermissions",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppPermissions_IdRole",
                table: "AppPermissions",
                column: "IdRole");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPermissions_AspNetRoles_IdRole",
                table: "AppPermissions",
                column: "IdRole",
                principalTable: "AspNetRoles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppPermissions_AspNetRoles_IdRole",
                table: "AppPermissions");

            migrationBuilder.DropIndex(
                name: "IX_AppPermissions_IdRole",
                table: "AppPermissions");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "AspNetRoles");

            migrationBuilder.DropColumn(
                name: "IdRole",
                table: "AppPermissions");

            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "AppPermissions",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
