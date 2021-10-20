using Laatokoshero.Dto.Admin;
using Laatokoshero.src.IServices.Admin;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Laatokoshero.Controllers.Admin
{
    [Route(ApiUrl.URL + "API/[Controller]")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly ILogin _login;

        public SecurityController(ILogin login)
        {
            _login = login;
        }
        [HttpPost]
        [Route("admin-login")]
        public async Task<IActionResult> Login([FromBody] LoginDto model)
        {
            if (ModelState.IsValid) { 
                var res = await _login.Login(model);
                if (res.Status == 200)
                {
                    return Ok(new
                    {
                        token = res.Message,
                        expiration = res.Expiration
                    });
                }
            }
            return Unauthorized();
        }
        [HttpPost]
        [Route("admin-register")]
        public async Task<IActionResult> Register([FromBody] RegisterUser model)
        {
            if (ModelState.IsValid) { 
                var res = await _login.RegisterUser(model);
                if (res.Status == 200)
                {
                    return Ok(new
                    {
                        token = res.Message,
                        expiration = res.Expiration
                    });
                }
            }
            return Unauthorized();
        }
    }
}
