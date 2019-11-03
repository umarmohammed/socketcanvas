using System.Net.WebSockets;
using System.Text;

namespace SocketCanvas.Api.WebSockets
{
    public class WebSocketData
    {
        public byte[] Buffer { get; set; }
        public WebSocketReceiveResult Result { get; set; }

        public override string ToString()
        {
            return Encoding.UTF8.GetString(Buffer, 0, Result.Count);
        }
    }
}
