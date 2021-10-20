using Laatokoshero.Dto.Admin;
using Laatokoshero.Models;
using Laatokoshero.Models.Admin;
using Laatokoshero.src.IServices.Admin;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Laatokoshero.src.Services.Admin
{
    public class AdminServices : ILogin
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AdminServices(UserManager<ApplicationUser> userManager
            , RoleManager<IdentityRole> roleManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        public async Task<Response> Login(LoginDto login)
        {
            var user = await _userManager.FindByNameAsync(login.UserName);
            var res = new Response();
            if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );
                res.ResponseData = token;
                res.Status = ReturnStatus.OK;
                res.Message = new JwtSecurityTokenHandler().WriteToken(token);
                res.Expiration = token.ValidTo;
            }
            return res;
        }

        public async Task<Response> RegisterUser(RegisterUser rs)
        {
            try
            {
                var userExists = await _userManager.FindByNameAsync(rs.UserName);
                if (userExists != null)
                    return new Response
                    {
                        Status = ReturnStatus.DUPLICATE,
                        Message = "User already exists!"
                    };
                ApplicationUser user = new ApplicationUser()
                {
                    Email = rs.Email,
                    SecurityStamp = Guid.NewGuid().ToString(),
                    UserName = rs.UserName
                };
                var result = await _userManager.CreateAsync(user, rs.Password);
                if (!result.Succeeded)
                    return new Response
                    {
                        Status = ReturnStatus.INTERNALSERVERERROR,
                        Message = "User creation failed! Please check user details and try again."
                    };

                return new Response
                {
                    Status = ReturnStatus.OK,
                    Message = "User created successfully!"
                };
            }
            catch(Exception ex)
            {
                return new Response
                {
                    Status = ReturnStatus.INTERNALSERVERERROR,
                    Message = ex.Message
                };
            }
        }
    }
}
