using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class RegisterDto
{
    [Required]
    [MinLength(2)]
    [MaxLength(100)]
    public string Name { get; set; } = "";

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = "";
 
    [Required]
    [MinLength(6)]
    [MaxLength(100)]
    public string Password { get; set; } = "";
}