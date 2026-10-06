using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WishlistController : ControllerBase
{
    private readonly AppDbContext _db;

    public WishlistController(AppDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> GetWishlist()
    {
        var userId = GetUserId();

        var items = await _db.WishlistItems
            .AsNoTracking()
            .Where(w => w.UserId == userId)
            .Include(w => w.Product)
            .OrderBy(w => w.Id)
            .Select(w => new
            {
                w.Id,
                w.ProductId,
                Product = w.Product
            })
            .ToListAsync();

        return Ok(items);
    }

    [HttpPost("{productId}")]
    public async Task<IActionResult> AddToWishlist(string productId)
    {
        var userId = GetUserId();
        productId = productId.Trim();

        var product = await _db.Products
            .FirstOrDefaultAsync(p => p.Id == productId);

        if (product == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet." });
        }

        var existingItem = await _db.WishlistItems
            .FirstOrDefaultAsync(w =>
                w.UserId == userId &&
                w.ProductId == productId);

        if (existingItem != null)
        {
            return Ok(new
            {
                existingItem.Id,
                existingItem.ProductId,
                Product = product
            });
        }

        var wishlistItem = new WishlistItem
        {
            UserId = userId,
            ProductId = productId
        };

        _db.WishlistItems.Add(wishlistItem);
        await _db.SaveChangesAsync();

        return Ok(new
        {
            wishlistItem.Id,
            wishlistItem.ProductId,
            Product = product
        });
    }

    [HttpDelete("{productId}")]
    public async Task<IActionResult> RemoveFromWishlist(string productId)
    {
        var userId = GetUserId();

        var item = await _db.WishlistItems
            .FirstOrDefaultAsync(w =>
                w.UserId == userId &&
                w.ProductId == productId);

        if (item == null)
        {
            return NotFound(new { message = "Produkti nuk u gjet në wishlist." });
        }

        _db.WishlistItems.Remove(item);
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
