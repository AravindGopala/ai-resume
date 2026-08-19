import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// Le point d'entrée racine de @vercel/functions charge son module WebSocket, qui
// dépend du peer optionnel `ws` absent ici ; le sous-chemin `headers` l'évite.
import { geolocation } from '@vercel/functions/headers'
import { resolvePreferredLanguage } from '@/lib/preferred-language'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host')

  if (hostname === 'danielbaez.cl' || hostname === 'www.danielbaez.cl') {
    return NextResponse.redirect(new URL('/es', request.url))
  }

  const { country } = geolocation(request)
  const targetLang = resolvePreferredLanguage({
    acceptLanguage: request.headers.get('accept-language'),
    country,
  })

  return NextResponse.redirect(new URL(`/${targetLang}`, request.url))
}

export const config = {
  matcher: '/',
}
