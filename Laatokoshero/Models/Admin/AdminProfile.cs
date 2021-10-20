using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Laatokoshero.Models.Admin
{
    public class AdminProfile
    {
        public int Id { get; set; }
        public byte[] ProfileLogo { get; set; }
        public string ContactNumber { get; set; }
        public string ContactAddress { get; set; }
        public string ContactNumberAvailable { get; set; }
        public string FacebookUrl { get; set; }
        public string YoutubeUrl { get; set; }
        public string TwitterUrl { get; set; }
        public string InstagramUrl { get; set; }
    }
}
