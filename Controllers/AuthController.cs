using Microsoft.AspNetCore.Mvc;
using PotentialEngine.Models;

namespace PotentialEngine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username))
            {
                return BadRequest("Invalid user data.");
            }

            // Here you would typically validate the user credentials and generate a token
            // For simplicity, we'll assume the user is always valid and return a dummy token

            var token = ""; // Use token from request
            return Ok(new { Token = token });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] UserModel user)
        {
            if (user == null || string.IsNullOrEmpty(user.Username))
            {
                return BadRequest("Invalid user data.");
            }

            // Here you would typically save the user to a database
            // For simplicity, we'll assume the registration is always successful

            return Ok("User registered successfully.");
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Here you would typically invalidate the user's token
            // For simplicity, we'll assume the logout is always successful

            return Ok("User logged out successfully.");
        }
    }
}
