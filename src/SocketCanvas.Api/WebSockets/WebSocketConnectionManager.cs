using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Net.WebSockets;

namespace SocketCanvas.Api.WebSockets
{
    public class WebSocketConnectionManager
    {
        private ConcurrentDictionary<WebSocket, int> _viewerSockets = new ConcurrentDictionary<WebSocket, int>();

        public ICollection<WebSocket> GetSockets()
        {
            return _viewerSockets.Keys;
        }

        public void AddSocket(WebSocket socket)
        {
            _viewerSockets.TryAdd(socket, 0);
        }

        public void RemoveSocket(WebSocket socket)
        {
            _viewerSockets.TryRemove(socket, out var _);
        }
    }
}
