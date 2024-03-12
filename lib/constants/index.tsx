import { env } from "@/env"

export const APP_HOSTNAMES = new Set([`app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`])
