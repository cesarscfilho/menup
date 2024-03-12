import { env } from "@/env"

export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`

export const APP_HOSTNAMES = new Set([`app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`])
