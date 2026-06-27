import { Outlet } from "react-router";
import { Providers } from "./providers";

export default function RootLayout() {
  return (
    <Providers>
      <Outlet />
    </Providers>
  );
}
