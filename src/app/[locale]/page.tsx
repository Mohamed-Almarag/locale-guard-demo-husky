import { useFormatter, useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { use } from 'react'
import { products } from '@/products'
import styles from './page.module.css'

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params)
  setRequestLocale(locale)

  const t = useTranslations()
  const format = useFormatter()
  const price = (amount: number) =>
    format.number(amount, { style: 'currency', currency: 'EUR' })

  return (
    <>
      <h1>{t('Home.title')}</h1>
      <p>{t('Home.subtitle', { amount: price(50) })}</p>
      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            <h2>{product.name}</h2>
            <p>{price(product.price)}</p>
            <p>{t('Product.inStock', { count: product.stock })}</p>
            <p>{t('Product.rating', { rating: product.rating, count: product.reviews })}</p>
            <button type="button" disabled={product.stock === 0}>
              {t('Product.addToCart')}
            </button>
          </article>
        ))}
      </div>
      <footer>
        {t.rich('Footer.terms', { link: (chunks) => <a href="/terms">{chunks}</a> })}
      </footer>
    </>
  )
}
