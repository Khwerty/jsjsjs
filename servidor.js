const dgram = require('dgram');
const PORT = 54222;
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`Paquete de ${rinfo.address}:${rinfo.port} ${msg.length} bytes`);
    console.log([...msg]);
    console.log('-------------------------------');
});

server.bind(PORT, () => {
    console.log(`I NEED MORE THAN ${PORT} MARES`);
});
