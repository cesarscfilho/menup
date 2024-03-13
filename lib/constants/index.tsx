import { env } from "@/env"

type RedirectsType = {
  [key: string]: string
}

export const HOME_DOMAIN = `https://${env.NEXT_PUBLIC_ROOT_DOMAIN}`

export const APP_HOSTNAMES = new Set([`app.${env.NEXT_PUBLIC_ROOT_DOMAIN}`])

export const DEFAULT_REDIRECTS: RedirectsType = {
  login: `https://app.menup.com.br/login`,
}
