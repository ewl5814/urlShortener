const { spawn } = require('child_process');
const path = require('path');

// Start backend server
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'server', 'urlShortenerApp'),
  stdio: 'pipe'
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend]: ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error]: ${data}`);
});

// Start frontend server
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client', 'urlShortenerUI'),
  stdio: 'pipe'
});

frontend.stdout.on('data', (data) => {
  console.log(`[Frontend]: ${data}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`[Frontend Error]: ${data}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('Starting both frontend and backend servers...');
console.log('Backend: http://localhost:3001');
console.log('Frontend: http://0.0.0.0:5000');