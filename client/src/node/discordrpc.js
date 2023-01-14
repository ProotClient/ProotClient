module.exports = function(client, process, console) {
	
	client.login({ clientId: "1061041345382322227" }).catch(console.error);
	
	client.on('ready', () => {
		console.log('Discord Rich Presence now active!');
		client.request('SET_ACTIVITY', {
			pid: process.pid,
			activity: {
				details: "Playing Minecraft 1.19.3",
				state: "Developing the client",
				timestamps: {
					start: Date.now()
				},
				assets: {
					large_image: "prootclient",
					large_text: "ProotClient"
				},
				buttons: [
					{
						label: "Join Game",
						url: "https://www.youtube.com/watch?v=jKdM6MhiSyo"
					}
				]
			}
		});
	});
}
