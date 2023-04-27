using Microsoft.AspNetCore.SignalR;
using SignalRWebpack.Hubs;
namespace SignalRWebpack.Hubs;

public class ChatHub : Hub
{
    public async Task NewMessage(long username, string message) =>
        await Clients.All.SendAsync("messageReceived", username, message);
}