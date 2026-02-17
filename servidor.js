const dgram = require('dgram');
const PORT = 54222;
const server = dgram.createSocket('udp4');

function parse_buffer(msg) {
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

	console.log(lobby_name + " #" + id + " ( " + players + " / " + max_players + " )");
}


server.on("message", (msg, rinfo) => {
	parse_buffer(msg)	
});

server.bind(PORT, () => {
	console.log(`I NEED MORE THAN ${PORT} MARES`);
});
