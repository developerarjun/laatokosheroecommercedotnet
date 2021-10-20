using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Laatokoshero.Dto.Admin
{
    public class UserRole
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Name is Required")]
        public string Name { get; set; }
    }
}
