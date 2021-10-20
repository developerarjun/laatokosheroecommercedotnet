using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Laatokoshero.config.migrations
{
    public partial class blobimages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "ProfileLogo",
                table: "adminProfiles",
                type: "Blob",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "longblob",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<byte[]>(
                name: "ProfileLogo",
                table: "adminProfiles",
                type: "longblob",
                nullable: true,
                oldClrType: typeof(byte[]),
                oldType: "Blob",
                oldNullable: true);
        }
    }
}
