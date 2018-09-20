const childProcess = require('child_process');
const net = require('net');

const port = process.env.PORT
  ? process.env.PORT - 100
  : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();
let startedElectron;

const tryConnection = () =>
  client.connect({ port }, () => {
    client.end();

    if (!startedElectron) {
      const exec = childProcess.exec;
      startedElectron = true;

      exec('yarn electron');
      console.log('Starting electrong');
    }
  });

tryConnection();

client.on('error', () => setTimeout(tryConnection, 1000));
