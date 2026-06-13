import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation primitives. Use these `Link`, `redirect`,
 * `usePathname`, `useRouter` everywhere instead of the next/* ones so internal
 * links automatically carry the active locale prefix.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
