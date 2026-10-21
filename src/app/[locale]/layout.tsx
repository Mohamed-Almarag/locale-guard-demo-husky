import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('Nav')

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider>
          <header>
            <Link href="/">{t('shop')}</Link>
            <nav>
              {routing.locales.map((code) => (
                <Link key={code} href="/" locale={code}>
                  {code.toUpperCase()}
                </Link>
              ))}
            </nav>
          </header>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
