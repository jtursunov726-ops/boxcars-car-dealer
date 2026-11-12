import { Link } from 'react-router-dom'
import InnerLayout from './InnerLayout'
import Icon from '../components/Icon'
import { useApp } from '../context/AppContext'
import { cars, carById, money, miles } from '../data/cars'
import { t } from '../i18n'

const rows = [
  ['Price', (c) => money(c.price), (c) => -c.price],
  ['Year', (c) => c.year, (c) => c.year],
  ['Mileage', (c) => miles(c.mileage), (c) => -c.mileage],
  ['Condition', (c) => c.condition],
  ['Body', (c) => c.body],
  ['Brand', (c) => c.brand],
  ['Fuel Type', (c) => c.fuel],
  ['Transmission', (c) => c.transmission],
  ['Engine Size', (c) => c.engine],
  ['Cylinders', (c) => c.cylinders],
  ['Drive Type', (c) => c.drive],
  ['Doors', (c) => c.doors],
  ['Seats', (c) => c.seats],
  ['Color', (c) => c.color],
]

export default function Compare() {
  const { compare, toggleCompare, clearCompare } = useApp()
  const list = compare.map(carById).filter(Boolean)
  const others = cars.filter((c) => !compare.includes(c.id))

  return (
    <InnerLayout title={t('Compare Cars')} crumbs={[['Listings', '/listings'], ['Compare']]} search={false}>
      <div className="container">
        {list.length === 0 ? (
          <div className="empty">
            <Icon name="compare" className="empty-icon" />
            <h3>{t('No cars to compare yet')}</h3>
            <p>{t('Tap the')} <Icon name="compare" /> {t('button on any car to add it here. You can compare up to 3 cars.')}</p>
            <Link to="/listings" className="btn btn-primary">{t('Browse Cars')} <Icon name="arrow" /></Link>
          </div>
        ) : (
          <>
            <div className="compare-tools">
              <p className="small">{t('Comparing {n} of 3 cars. The best value in each row is highlighted.', { n: list.length })}</p>
              <div className="compare-tools-right">
                {list.length < 3 && (
                  <label className="sort">Add a car:
                    <select value="" onChange={(e) => e.target.value && toggleCompare(e.target.value)}>
                      <option value="">{t('Choose…')}</option>
                      {others.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </label>
                )}
                <button type="button" className="link-btn" onClick={clearCompare}>{t('Clear all')}</button>
              </div>
            </div>
            <div className="compare-scroll">
              <table className={`compare-table cols-${list.length}`}>
                <thead>
                  <tr>
                    <th />
                    {list.map((c) => (
                      <th key={c.id}>
                        <div className="compare-car">
                          <button type="button" className="remove-x" aria-label={`Remove ${c.title}`} onClick={() => toggleCompare(c.id)}><Icon name="close" /></button>
                          <Link to={`/listings/${c.id}`}><img src={c.image} alt={c.title} /></Link>
                          <Link to={`/listings/${c.id}`} className="compare-title">{c.title}</Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, value, score]) => {
                    const scores = score ? list.map(score) : []
                    // highlight only when the cars actually differ in this row
                    const best = scores.length > 1 && new Set(scores).size > 1 ? Math.max(...scores) : null
                    return (
                      <tr key={label}>
                        <th scope="row">{t(label)}</th>
                        {list.map((c) => <td key={c.id} className={best !== null && score(c) === best ? 'best' : ''}>{value(c)}</td>)}
                      </tr>
                    )
                  })}
                  <tr>
                    <th scope="row" />
                    {list.map((c) => (
                      <td key={c.id}><Link to={`/listings/${c.id}`} className="btn btn-primary sm">{t('View Details')} <Icon name="arrow" /></Link></td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </InnerLayout>
  )
}
