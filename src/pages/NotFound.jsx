import InnerLayout from './InnerLayout'
import { Btn } from '../components/sections'
import { t } from '../i18n'

export default function NotFound() {
  return (
    <InnerLayout search={false} docTitle={t('Page not found')}>
      <div className="container not-found">
        <p className="nf-code">404</p>
        <h1 className="page-title">{t('Oh no! This page doesn’t exist')}</h1>
        <p>{t('The page you are looking for may have been moved or deleted.')}</p>
        <Btn to="/">{t('Go Back To Home')}</Btn>
      </div>
    </InnerLayout>
  )
}
