import { Outlet } from "@tanstack/react-router";

import { SessionProvider } from "@/state/session-context";
import { ThemeProvider } from "@/state/theme-context";

const App = () => {
  return (
    <ThemeProvider>
      <SessionProvider>
        <Outlet />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
