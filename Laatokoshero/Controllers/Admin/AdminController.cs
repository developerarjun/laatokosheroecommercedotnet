using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Laatokoshero.Controllers.Admin
{
    [Route(ApiUrl.URL + "[Controller]")]
    public class AdminController : Controller
    {
        //index
        [Route("Login")]
        public IActionResult Index()
        {
            return View();
        }
        [Route("Register")]
        //register
        public IActionResult Register()
        {
            return View();
        }
    }
}
