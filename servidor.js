const dgram = require('dgram');
const PORT = 54222;
const server = dgram.createSocket('udp4');

lobbys={};

function parse_buffer(msg,rinfo) {
	let offset = 0;

	let len = msg.readUInt8(offset);
	offset += 1;

	let lobby_name = msg.toString("utf8", offset, offset + len);
	offset += len;

	let id = msg.readUInt8(offset);
	offset += 1;

	let players = msg.readUInt8(offset);
	offset += 1;

	let max_players = msg.readUInt8(offset);
	offset += 1;

	let public = msg.readUInt8(offset);
	offset += 1;

	if (!(id in lobbys)) {
    console.log("New Lobby Added >>> "+lobby_name);

		lobbts_rinfo[id] = {
			address: rinfo.address,
			port: rinfo.port,
		};

		lobbys[id] = {
				id,
				lobby_name, 
				players, max_players, 
				public,
		}
	}
};

server.on("error", (err) => {
    console.error("SERVER ERROR:", err);
});

server.on("message", (msg, rinfo) => {
	parse_buffer(msg,rinfo);
});

server.bind(PORT, () => {
	console.log(`I NEED MORE THAN ${PORT} MARES`);
});
