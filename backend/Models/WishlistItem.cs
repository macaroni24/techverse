using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class WishlistItem
{
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    [MaxLength(150)]
    public string ProductId { get; set; } = "";

    public User User { get; set; } = null!;

    public Product Product { get; set; } = null!;
}