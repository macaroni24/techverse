using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class CartItem
{
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    [Required]
    [MaxLength(150)]
    public string ProductId { get; set; } = "";

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; } = 1;

    public User User { get; set; } = null!;

    public Product Product { get; set; } = null!;
}