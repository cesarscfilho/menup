import { env } from "@/env"

import { HOME_DOMAIN } from "@/lib/constants"

export const SITE_CONFIG = {
  title: `${env.NEXT_PUBLIC_APP_NAME} `,
  description: `${env.NEXT_PUBLIC_APP_NAME} é uma plataforma de gerenciamento de restaurantes.`,
  image: `${HOME_DOMAIN}/thumbnail.png`,
  icons: [`${HOME_DOMAIN}/favicon.ico`],
  metadataBase: new URL(HOME_DOMAIN),
}
