import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match every pathname except API routes, Next internals, and any file with
  // an extension (static assets, /team images, icons, og-image, etc.).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
