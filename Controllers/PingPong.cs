using Microsoft.AspNetCore.Mvc;

namespace PotentialEngine.Controllers;

public class PingPongController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Ping()
    {
        return Content("Pong");
    }
}
