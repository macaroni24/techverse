using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Dtos;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        var products = await _db.Products
            .AsNoTracking()
            .ToListAsync();

        return Ok(products);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProduct(string id)
    {
        var product = await _db.Products
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet." });
        }

        return Ok(product);
    }

    [Authorize]
    [HttpPost]
    public async Task<ActionResult<Product>> CreateProduct(CreateProductDto dto)
    {
        var id = dto.Id.Trim();

        var exists = await _db.Products.AnyAsync(p => p.Id == id);

        if (exists)
        {
            return Conflict(new { message = "Një produkt me këtë ID ekziston tashmë." });
        }

        var product = new Product
        {
            Id = id,
            Title = dto.Title.Trim(),
            Brand = dto.Brand.Trim(),
            Category = dto.Category.Trim(),
            Section = dto.Section.Trim(),
            Price = dto.Price,
            OldPrice = dto.OldPrice,
            Stock = dto.Stock,
            Badge = dto.Badge.Trim(),
            Image = dto.Image.Trim()
        };

        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetProduct),
            new { id = product.Id },
            product
        );
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<Product>> UpdateProduct(
        string id,
        UpdateProductDto dto)
    {
        var product = await _db.Products
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet." });
        }

        product.Title = dto.Title.Trim();
        product.Brand = dto.Brand.Trim();
        product.Category = dto.Category.Trim();
        product.Section = dto.Section.Trim();
        product.Price = dto.Price;
        product.OldPrice = dto.OldPrice;
        product.Stock = dto.Stock;
        product.Badge = dto.Badge.Trim();
        product.Image = dto.Image.Trim();

        await _db.SaveChangesAsync();

        return Ok(product);
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(string id)
    {
        var product = await _db.Products
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet." });
        }

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();

        return NoContent();
    }
}