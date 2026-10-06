using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class UpdateCartItemDto
{
    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
} 