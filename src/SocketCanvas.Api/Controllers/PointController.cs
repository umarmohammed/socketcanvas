using Microsoft.AspNetCore.Mvc;
using SocketCanvas.Api.WebSockets;
using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SocketCanvas.Api.Controllers
{
    public class PointController : ControllerBase
    {
        private readonly WebSocketConnectionManager _socketConnectionManager;

        public PointController(WebSocketConnectionManager socketConnectionManager)
        {
            _socketConnectionManager = socketConnectionManager;
        }

        [Route("api/point")]
        public async Task Point()
        {
            var context = ControllerContext.HttpContext;
            if (context.WebSockets.IsWebSocketRequest)
            {
                var socket = await context.WebSockets.AcceptWebSocketAsync();
                _socketConnectionManager.AddSocket(socket);

                await Receive(socket, async (socket, data) => await HandleMessage(socket, data));
            }
            else
            {
                context.Response.StatusCode = 400;
            }
        }

        private async Task Receive(WebSocket socket, Action<WebSocket, WebSocketData> handleMessage)
        {
            var buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(buffer: new ArraySegment<byte>(buffer),
                                                       cancellationToken: CancellationToken.None);

                handleMessage(socket, new WebSocketData { Buffer = buffer, Result = result });
            }
        }

        private async Task HandleMessage(WebSocket socket, WebSocketData webSocketData)
        {
            switch(webSocketData.Result.MessageType)
            {
                case WebSocketMessageType.Text:
                    await SendToAll(webSocketData);
                    break;
                case WebSocketMessageType.Close:
                    await HandleCloseMessage(socket);
                    break;
                default:
                    break;
            }
        }

        private async Task HandleCloseMessage(WebSocket socket)
        {
            _socketConnectionManager.RemoveSocket(socket);
            await socket.CloseAsync(closeStatus: WebSocketCloseStatus.NormalClosure,
                              statusDescription: "Closed by the WebSocketManager",
                              cancellationToken: CancellationToken.None);
        }

        private async Task SendToAll(WebSocketData webSocketData)
        {
            foreach (var socket in _socketConnectionManager.GetSockets())
            {
                if (socket.State == WebSocketState.Open)
                {
                    await SendMessageAsync(socket, webSocketData.ToString());
                }
            }
        }

        private async Task SendMessageAsync(WebSocket socket, string message)
        {
            if (socket.State != WebSocketState.Open)
                return;

            await socket.SendAsync(buffer: new ArraySegment<byte>(array: Encoding.ASCII.GetBytes(message),
                                                                  offset: 0,
                                                                  count: message.Length),
                                   messageType: WebSocketMessageType.Text,
                                   endOfMessage: true,
                                   cancellationToken: CancellationToken.None);
        }

    }
}