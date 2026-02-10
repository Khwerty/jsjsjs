const dgram = require('dgram');
const PORT = 54222;
const server = dgram.createSocket('udp4');

server.on('message', (msg, rinfo) => {
    console.log(`Paquete de ${rinfo.address}:${rinfo.port}`);
    console.log(`Tamaño del paquete: ${msg.length} bytes`);
    console.log('-------------------------------');
});

server.bind(PORT, () => {
    console.log(`Servidor UDP escuchando en puerto ${PORT}`);
});
