using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public static class ProductSeeder
{
    public static async Task SeedAsync(
        AppDbContext db,
        IWebHostEnvironment environment)
    {
        if (await db.Products.AnyAsync())
        {
            return;
        }

        var path = Path.Combine(
            environment.ContentRootPath,
            "Data",
            "products.seed.json"
        );

        if (!File.Exists(path))
        {
            throw new FileNotFoundException(
                "products.seed.json nuk u gjet.",
                path
            );
        }

        var json = await File.ReadAllTextAsync(path);

        var products = JsonSerializer.Deserialize<List<Product>>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }
        );

        if (products == null || products.Count == 0)
        {
            return;
        }

        await db.Products.AddRangeAsync(products);
        await db.SaveChangesAsync();
    }
}