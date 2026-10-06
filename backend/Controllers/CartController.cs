using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Dtos;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly AppDbContext _db;

    public CartController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        var userId = GetUserId();

        var items = await _db.CartItems
            .AsNoTracking()
            .Where(c => c.UserId == userId)
            .Include(c => c.Product)
            .OrderBy(c => c.Id)
            .Select(c => new
            {
                c.Id,
                c.ProductId,
                c.Quantity,
                Product = c.Product
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost]
    public async Task<IActionResult> AddToCart(AddToCartDto dto)
    {
        var userId = GetUserId();
        var productId = dto.ProductId.Trim();

        var product = await _db.Products
            .FirstOrDefaultAsync(p => p.Id == productId);

        if (product == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet." });
        }

        if (product.Stock <= 0)
        {
            return BadRequest(new { message = "Produkti nuk është në stok." });
        }

        if (dto.Quantity > product.Stock)
        {
            return BadRequest(new
            {
                message = $"Në stok janë vetëm {product.Stock} copë."
            });
        }

        var existingItem = await _db.CartItems
            .FirstOrDefaultAsync(c =>
                c.UserId == userId &&
                c.ProductId == productId);

        if (existingItem != null)
        {
            var newQuantity = existingItem.Quantity + dto.Quantity;

            if (newQuantity > product.Stock)
            {
                return BadRequest(new
                {
                    message = $"Nuk mund të shtosh më shumë se {product.Stock} copë."
                });
            }

            existingItem.Quantity = newQuantity;

            await _db.SaveChangesAsync();

            return Ok(new
            {
                existingItem.Id,
                existingItem.ProductId,
                existingItem.Quantity,
                Product = product
            });
        }

        var cartItem = new CartItem
        {
            UserId = userId,
            ProductId = productId,
            Quantity = dto.Quantity
        };

        _db.CartItems.Add(cartItem);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            cartItem.Id,
            cartItem.ProductId,
            cartItem.Quantity,
            Product = product
        });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCartItem(
        int id,
        UpdateCartItemDto dto)
    {
        var userId = GetUserId();

        var cartItem = await _db.CartItems
            .Include(c => c.Product)
            .FirstOrDefaultAsync(c =>
                c.Id == id &&
                c.UserId == userId);

        if (cartItem == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet në shportë." });
        }

        if (dto.Quantity > cartItem.Product.Stock)
        {
            return BadRequest(new
            {
                message = $"Në stok janë vetëm {cartItem.Product.Stock} copë."
            });
        }

        cartItem.Quantity = dto.Quantity;

        await _db.SaveChangesAsync();

        return Ok(new
        {
            cartItem.Id,
            cartItem.ProductId,
            cartItem.Quantity,
            Product = cartItem.Product
        });
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> RemoveFromCart(int id)
    {
        var userId = GetUserId();

        var cartItem = await _db.CartItems
            .FirstOrDefaultAsync(c =>
                c.Id == id &&
                c.UserId == userId);

        if (cartItem == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet në shportë." });
        }

        _db.CartItems.Remove(cartItem);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> ClearCart()
    {
        var userId = GetUserId();

        var items = await _db.CartItems
            .Where(c => c.UserId == userId)
            .ToListAsync();

        if (items.Count == 0)
        {
            return NoContent();
        }

        _db.CartItems.RemoveRange(items);
        await _db.SaveChangesAsync();

        return NoContent();
    }

    private int GetUserId()
    {
        var value = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (!int.TryParse(value, out var userId))
        {
            throw new UnauthorizedAccessException();
        }

        return userId;
    }
}