import { createServer as createNetServer } from "node:net";

const isPortAvailable = (port: number, host: string) =>
  new Promise<boolean>((resolve) => {
    const server = createNetServer();
    server.once("error", () => {
      server.close();
      resolve(false);
    });
    server.once("listening", () => {
      server.close(() => resolve(true));
    });
    server.listen(port, host);
  });

export const findAvailablePort = async (startPort: number, host: string, attempts: number) => {
  for (let i = 0; i < attempts; i += 1) {
    const port = startPort + i;
    const available = await isPortAvailable(port, host);
    if (available) {
      return port;
    }
  }
  throw new Error(`No available port found in range ${startPort}-${startPort + attempts - 1}`);
};
