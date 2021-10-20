using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Laatokoshero.Models
{
    public static class ReturnStatus
    {
        public const int OK = 200;
        public const int DUPLICATE = 409;
        public const int INTERNALSERVERERROR = 500;
    }
}
