using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class CreateProductDto
{
    [Required]
    [MaxLength(150)]
    public string Id { get; set; } = "";

    [Required]
    [MaxLength(250)]
    public string Title { get; set; } = "";

    [Required]
    [MaxLength(100)]
    public string Brand { get; set; } = "";

    [Required]
    [MaxLength(100)]
    public string Category { get; set; } = "";

    [Required]
    [MaxLength(100)]
    public string Section { get; set; } = "";

    [Range(0, double.MaxValue)]
    public decimal Price { get; set; }

    [Range(0, double.MaxValue)]
    public decimal OldPrice { get; set; }

    [Range(0, int.MaxValue)]
    public int Stock { get; set; }

    [MaxLength(100)]
    public string Badge { get; set; } = "";

    [Required]
    public string Image { get; set; } = "";
}