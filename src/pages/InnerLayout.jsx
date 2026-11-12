import { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { SearchPill } from '../components/Search'
import { Breadcrumb } from '../components/sections'
import { t } from '../i18n'

/** Shared shell of every inner page: navy band (header + optional search), white rounded panel, dark footer. */
export default function InnerLayout({ title, crumbs, search = true, children, narrow = false, docTitle }) {
  useEffect(() => {
    document.title = `${docTitle || (typeof title === 'string' ? title : 'BoxCars')} — Boxcars`
  }, [title, docTitle])
  return (
    <div className="page inner">
      <div className="inner-band">
        <Header theme="dark" />
        {search && <div className="container band-search"><SearchPill variant="band" condition button={t('Find Listing')} /></div>}
      </div>
      <main className="rounded-panel inner-panel">
        <div className={`container ${narrow ? 'narrow' : ''}`}>
          {crumbs && <Breadcrumb items={crumbs} />}
          {title && <h1 className="page-title">{t(title)}</h1>}
        </div>
        {children}
      </main>
      <Footer variant="dark" />
    </div>
  )
}
