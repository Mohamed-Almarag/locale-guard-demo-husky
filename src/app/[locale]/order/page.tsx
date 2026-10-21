import { useFormatter, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'

const order = { number: 'A-1042', status: 'shipped', parcels: 2, eta: new Date(2026, 9, 14) }

export default function OrderPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const t = useTranslations('Order')
  const format = useFormatter()

  return (
    <>
      <h1>{t('title', { number: order.number })}</h1>
      <p>{t('status', { status: order.status })}</p>
      <p>{t('eta', { date: format.dateTime(order.eta, { dateStyle: 'long' }) })}</p>
      <p>{t('parcels', { count: order.parcels })}</p>
      <p>{t.rich('help', { link: (chunks) => <a href="mailto:help@example.com">{chunks}</a> })}</p>
    </>
  )
}
