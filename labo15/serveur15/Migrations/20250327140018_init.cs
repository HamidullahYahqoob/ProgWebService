using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serveur15.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Incident",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NbCasualties = table.Column<int>(type: "int", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incident", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Zookeeper",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zookeeper", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Dinosaur",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Specie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZookeeperId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dinosaur", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Dinosaur_Zookeeper_ZookeeperId",
                        column: x => x.ZookeeperId,
                        principalTable: "Zookeeper",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DinosaurIncident",
                columns: table => new
                {
                    IncidentsId = table.Column<int>(type: "int", nullable: false),
                    InvolvedDinosaursId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DinosaurIncident", x => new { x.IncidentsId, x.InvolvedDinosaursId });
                    table.ForeignKey(
                        name: "FK_DinosaurIncident_Dinosaur_InvolvedDinosaursId",
                        column: x => x.InvolvedDinosaursId,
                        principalTable: "Dinosaur",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DinosaurIncident_Incident_IncidentsId",
                        column: x => x.IncidentsId,
                        principalTable: "Incident",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Dinosaur_ZookeeperId",
                table: "Dinosaur",
                column: "ZookeeperId");

            migrationBuilder.CreateIndex(
                name: "IX_DinosaurIncident_InvolvedDinosaursId",
                table: "DinosaurIncident",
                column: "InvolvedDinosaursId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DinosaurIncident");

            migrationBuilder.DropTable(
                name: "Dinosaur");

            migrationBuilder.DropTable(
                name: "Incident");

            migrationBuilder.DropTable(
                name: "Zookeeper");
        }
    }
}
