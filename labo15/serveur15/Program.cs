using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using serveur15.Data;
using serveur15.Services;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<serveur15Context>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("serveur15Context") ?? throw new InvalidOperationException("Connection string 'serveur15Context' not found."));
    options.UseLazyLoadingProxies();
});


// Add services to the container.
builder.Services.AddScoped<DinosaurService>();
builder.Services.AddScoped<ZookeeperService>();
builder.Services.AddScoped<IncidentService>();



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
