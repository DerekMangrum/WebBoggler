using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR.Hubs;

namespace WebBoggler
{
	[HubName("chatHub")]
	public class ChatHub : Hub
	{
		public void SendMessage(string name, string msg )
		{
			Clients.addMsg(name, msg );
		}
	}

	[HubName("boardHub")]
	public class BoardHub : Hub
	{

	}
}