using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SocketCanvas.Api.Controllers
{
    public class FooController : ControllerBase
    {
        [Route("api/foo")]
        public string Foo()
        {
            return "foo";
        }
    }
}
