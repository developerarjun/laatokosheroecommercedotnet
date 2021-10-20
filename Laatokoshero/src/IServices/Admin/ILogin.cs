using Laatokoshero.Dto.Admin;
using Laatokoshero.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Laatokoshero.src.IServices.Admin
{
    public interface ILogin
    {
        Task<Response> Login(LoginDto login);
        Task<Response> RegisterUser(RegisterUser rs);
    }
}
