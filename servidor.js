const dgram = require('dgram');
const PORT = 54222;
const server = dgram.createSocket('udp4');

const packet_type = Object.freeze(
{ 
  LOBBY_CREATION:0,
  LOBBYS_REQUEST:1,
  LOBBY_REQUEST_CONNECTION:2
});

lobbys={};
lobbys_rinfo={};

function parse_buffer(msg,rinfo) {
	let offset = 1;

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

		lobbys_rinfo[id] = {
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
function parse_lobbys_info(rinfo){

	console.log("Sending lobbys")
	
	const buffer = Buffer.from(JSON.stringify(lobbys));

	socket.send(buffer, rinfo.port, rinfo.address, (err) => {
  	if (err) console.error(err);
	});
}

server.on("error", (err) => {
  console.error("SERVER ERROR:", err);
});

server.on("message", (msg, rinfo) => {
	let type = msg.readUInt8( 0 );

	switch(type){
		case packet_type.LOBBY_CREATION:
			parse_buffer(msg,rinfo);
			break;
		case packet_type.LOBBYS_REQUEST:
			parse_lobbys_info(rinfo);
			break;
		case packet_type.LOBBY_REQUEST_CONNECTION:
			break;
	}
});

server.bind(PORT, () => {
	console.log(`I NEED MORE THAN ${PORT} MARES`);
});

process.on("SIGINT", () => {
  server.close(() => {
    process.exit(0);
  });
});