using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Laatokoshero.Models
{
    public class Response
    {
        public int Status { get; set; }
        public object ResponseData { get; set; }
        public string Message { get; set; }
        public object Expiration { get; set; }
    }
}
