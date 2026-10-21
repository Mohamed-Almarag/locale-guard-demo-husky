import { useFormatter, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import { Link } from '@/i18n/navigation'
import { products } from '@/products'

const cart = [
  { product: products[0]!, quantity: 1 },
  { product: products[1]!, quantity: 2 }
]

export default function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const t = useTranslations('Cart')
  const format = useFormatter()
  const count = cart.reduce((sum, line) => sum + line.quantity, 0)
  const total = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0)

  if (cart.length === 0) {
    return <p>{t.rich('empty', { link: (chunks) => <Link href="/">{chunks}</Link> })}</p>
  }

  return (
    <>
      <h1>{t('title')}</h1>
      <p>{t('items', { count })}</p>
      <p>{t('shipping', { method: 'express' })}</p>
      <p>{t.rich('promo', { percent: 10, b: (chunks) => <b>{chunks}</b> })}</p>
      <p>{t('total', { total: format.number(total, { style: 'currency', currency: 'EUR' }) })}</p>
      <button type="button">{t('checkout')}</button>
    </>
  )
}
