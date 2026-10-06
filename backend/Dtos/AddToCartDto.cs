using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class AddToCartDto
{
    [Required]
    [MaxLength(150)]
    public string ProductId { get; set; } = "";

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; } = 1;
}