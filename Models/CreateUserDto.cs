public class CreateUserDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }  // Required for creating users
    public DateTime DateOfBirth { get; set; }
    public int Age { get; set; }
    public string Designation { get; set; }
    public string Department { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public string? ImageUrl { get; set; }
}
