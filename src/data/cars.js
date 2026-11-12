import { t } from '../i18n'
import { img } from './images'

// Every car has its own photo set (one Unsplash photo shoot of that exact car),
// so the gallery on the details page never mixes in other vehicles.
const list = [
  {
    id: 'mercedes-glc-2023', title: 'Mercedes-Benz GLC Coupe – 2023', brand: 'Mercedes-Benz', model: 'GLC', body: 'SUV',
    year: 2023, mileage: 50, fuel: 'Petrol', transmission: 'Automatic', price: 95000, badge: 'Low Mileage', condition: 'New',
    color: 'White', engine: '2.0', cylinders: 4, drive: 'All-Wheel Drive (4MATIC)', seats: 5, doors: '5 Doors',
    spec: 'GLC 300 4MATIC Coupe, AMG Line',
    gallery: ['1684239845179-0bb0362dfd28', '1684239725236-5f3b6e9f02c3', '1684239750605-059c21edaf66', '1684239784136-324d4d6d4e90', '1684239792720-f00207517e5a'],
  },
  {
    id: 'vw-tiguan-2023', title: 'Volkswagen Tiguan R-Line – 2023', brand: 'Volkswagen', model: 'Tiguan', body: 'SUV',
    year: 2023, mileage: 15, fuel: 'Petrol', transmission: 'Automatic', price: 38000, badge: 'Great Price', condition: 'New',
    color: 'Pure White', engine: '2.0', cylinders: 4, drive: 'All-Wheel Drive (4MOTION)', seats: 5, doors: '5 Doors',
    spec: '2.0 TSI R-Line 4MOTION DSG',
    gallery: ['1655286182008-2a6578c7f487', '1655286203099-916c6f36da48', '1655286167308-55817227e6c8', '1655286236853-b8e376a206cb', '1655286188829-c217895ca9d3', '1655286207354-8124c3de8c53', '1655286197551-c325d396c382'],
  },
  {
    id: 'mazda-cx5-2023', title: 'Mazda CX-5 – 2023', brand: 'Mazda', model: 'CX-5', body: 'SUV',
    year: 2023, mileage: 40, fuel: 'Petrol', transmission: 'Automatic', price: 32000, condition: 'Used',
    color: 'Rhodium White', engine: '2.5', cylinders: 4, drive: 'All-Wheel Drive', seats: 5, doors: '5 Doors',
    spec: '2.5 Skyactiv-G AWD Signature',
    gallery: ['1687292625104-66d0c45f19e3', '1687292625249-acdef3df29a7', '1687292626125-e3917a887935', '1687292624974-e0ac5d44878c', '1687292625389-664f8c39586b', '1687292624385-c34412b31e62'],
  },
  {
    id: 'jeep-wrangler-2022', title: 'Jeep Wrangler Rubicon – 2022', brand: 'Jeep', model: 'Wrangler', body: 'SUV',
    year: 2022, mileage: 320, fuel: 'Petrol', transmission: 'Manual', price: 52000, badge: 'Low Mileage', condition: 'Used',
    color: 'Sting Grey', engine: '3.6', cylinders: 6, drive: 'Four-Wheel Drive (4x4)', seats: 5, doors: '5 Doors',
    spec: '3.6 V6 Rubicon Unlimited 4x4',
    gallery: ['1759428858123-9dfd095c9eb5', '1759429014853-3e03d2fe346e', '1759428915201-7f7c5d80af06', '1759428975028-fb239f944d92'],
  },
  {
    id: 'ford-transit-2021', title: 'Ford Transit Camper – 2021', brand: 'Ford', model: 'Transit', body: 'Van',
    year: 2021, mileage: 2500, fuel: 'Diesel', transmission: 'Manual', price: 22000, badge: 'Great Price', condition: 'Used',
    color: 'Frozen White', engine: '2.0', cylinders: 4, drive: 'All-Wheel Drive', seats: 4, doors: '4 Doors',
    spec: '2.0 EcoBlue AWD High Roof Camper',
    gallery: ['1674935644433-ba2b2ffe87cf', '1674935644316-cb0e60d877a0', '1674935648865-9cdc8d27b09b'],
  },
  {
    id: 'audi-q7-2022', title: 'Audi Q7 – 2022', brand: 'Audi', model: 'Q7', body: 'SUV',
    year: 2022, mileage: 150, fuel: 'Diesel', transmission: 'Automatic', price: 68000, oldPrice: 74000, badge: 'Sale', condition: 'Used',
    color: 'Glacier White', engine: '3.0', cylinders: 6, drive: 'All-Wheel Drive (quattro)', seats: 7, doors: '5 Doors',
    spec: '50 TDI quattro S line tiptronic',
    gallery: ['1632823468851-115e63d81694', '1632823467839-ba8b3f8b5167', '1632823469393-486df1a81060', '1632823469378-3c6d2454b3d7'],
  },
  {
    id: 'ford-ranger-2021', title: 'Ford Ranger Wildtrak – 2021', brand: 'Ford', model: 'Ranger', body: 'Truck',
    year: 2021, mileage: 250, fuel: 'Diesel', transmission: 'Manual', price: 41000, oldPrice: 45000, badge: 'Sale', condition: 'Used',
    color: 'Lightning Blue', engine: '2.0', cylinders: 4, drive: 'Four-Wheel Drive (4x4)', seats: 5, doors: '4 Doors',
    spec: '2.0 EcoBlue Wildtrak Double Cab 4x4',
    gallery: ['1641437638621-1de977395a9c', '1641437639110-dffa4407fc33', '1641437638122-1208e6ebf2aa', '1641437636812-f0d219cc6e44', '1641437636097-dc163de677c0'],
  },
  {
    id: 'bmw-x7-2024', title: 'BMW X7 M60i – 2024', brand: 'BMW', model: 'X7', body: 'SUV',
    year: 2024, mileage: 12, fuel: 'Petrol', transmission: 'Automatic', price: 112000, condition: 'New',
    color: 'Frozen Black', engine: '4.4', cylinders: 8, drive: 'All-Wheel Drive (xDrive)', seats: 7, doors: '5 Doors',
    spec: 'M60i xDrive, 4.4 V8 TwinPower Turbo',
    gallery: ['1731988666894-482242ceae2f', '1731988666748-120acd34cbbd', '1731988666860-b4b5e312ed82', '1731988666805-9a9992d7b946'],
  },
  {
    id: 'bmw-x5-2023', title: 'BMW X5 M Sport – 2023', brand: 'BMW', model: 'X5', body: 'SUV',
    year: 2023, mileage: 100, fuel: 'Hybrid', transmission: 'Automatic', price: 89000, badge: 'Great Price', condition: 'Used',
    color: 'Carbon Black', engine: '3.0', cylinders: 6, drive: 'All-Wheel Drive (xDrive)', seats: 5, doors: '5 Doors',
    spec: 'xDrive50e M Sport Plug-in Hybrid',
    gallery: ['1653227158553-ddaa680cdd65', '1653227229655-e9e10147a464', '1653227188794-612c08de7341', '1653227229725-c6520aee748e', '1653227230187-93bcb9a9a8ca'],
  },
  {
    id: 'kia-sportage-2023', title: 'Kia Sportage GT-Line – 2023', brand: 'Kia', model: 'Sportage', body: 'SUV',
    year: 2023, mileage: 220, fuel: 'Hybrid', transmission: 'Automatic', price: 31000, condition: 'Used',
    color: 'Penta Metal', engine: '1.6', cylinders: 4, drive: 'All-Wheel Drive', seats: 5, doors: '5 Doors',
    spec: '1.6 T-GDi HEV GT-Line AWD',
    gallery: ['1688893287874-ac7fbd686c24', '1688893288248-3338b8491a46', '1688893287848-a218df183f36'],
  },
  {
    id: 'toyota-tacoma-2023', title: 'Toyota Tacoma TRD – 2023', brand: 'Toyota', model: 'Tacoma', body: 'Truck',
    year: 2023, mileage: 60, fuel: 'Petrol', transmission: 'Automatic', price: 54000, badge: 'Low Mileage', condition: 'New',
    color: 'Ice Cap White', engine: '2.4', cylinders: 4, drive: 'Four-Wheel Drive (4x4)', seats: 5, doors: '4 Doors',
    spec: '2.4 i-FORCE TRD Off-Road Double Cab',
    gallery: ['1762236096928-6f91aab1ab83', '1762236096071-bf1ccbff48ff', '1762236096060-964c4acb6700'],
  },
  {
    id: 'dodge-challenger-2021', title: 'Dodge Challenger R/T – 2021', brand: 'Dodge', model: 'Challenger', body: 'Coupe',
    year: 2021, mileage: 900, fuel: 'Petrol', transmission: 'Automatic', price: 45000, oldPrice: 49000, badge: 'Sale', condition: 'Used',
    color: 'Granite Grey', engine: '5.7', cylinders: 8, drive: 'Rear-Wheel Drive', seats: 5, doors: '2 Doors',
    spec: '5.7 HEMI V8 R/T Scat Pack',
    gallery: ['1609386463693-caf39be25c6d', '1609386464554-31f6618a86b3', '1609386462833-6b0d46b2fce0', '1609386464913-4cbfa39de540'],
  },
  {
    id: 'mercedes-amg-gt-2022', title: 'Mercedes-AMG GT – 2022', brand: 'Mercedes-Benz', model: 'AMG GT', body: 'Coupe',
    year: 2022, mileage: 70, fuel: 'Petrol', transmission: 'Automatic', price: 145000, condition: 'Used',
    color: 'Designo Night Black Magno', engine: '4.0', cylinders: 8, drive: 'Rear-Wheel Drive', seats: 2, doors: '2 Doors',
    spec: 'AMG GT C Coupe, 4.0 V8 Biturbo',
    gallery: ['1617814065893-00757125efab', '1617814076231-2c58846db944', '1617814076367-b759c7d7e738'],
  },
  {
    id: 'vw-tiguan-allspace-2023', title: 'VW Tiguan Allspace – 2023', brand: 'Volkswagen', model: 'Tiguan Allspace', body: 'SUV',
    year: 2023, mileage: 30, fuel: 'Diesel', transmission: 'Automatic', price: 41000, condition: 'New',
    color: 'Atlantic Blue', engine: '2.0', cylinders: 4, drive: 'All-Wheel Drive (4MOTION)', seats: 7, doors: '5 Doors',
    spec: '2.0 TDI Elegance 4MOTION DSG',
    gallery: ['1760713173223-59ef015ad368', '1760713170685-b67abc3be5ad', '1760713164476-7eb5063b3d07'],
  },
  {
    id: 'chevrolet-corvette-2024', title: 'Chevrolet Corvette Z06 – 2024', brand: 'Chevrolet', model: 'Corvette', body: 'Coupe',
    year: 2024, mileage: 25, fuel: 'Petrol', transmission: 'Automatic', price: 125000, badge: 'Great Price', condition: 'New',
    color: 'Carbon Flash', engine: '5.5', cylinders: 8, drive: 'Rear-Wheel Drive', seats: 2, doors: '2 Doors',
    spec: '5.5 LT6 V8 Z06 3LZ',
    gallery: ['1786245134325-daaab2159ae7', '1786245133123-00dc90700ead', '1786245134527-c19888c53742'],
  },
  {
    id: 'mercedes-e-class-2022', title: 'Mercedes-Benz E-Class Estate – 2022', brand: 'Mercedes-Benz', model: 'E-Class', body: 'Sedan',
    year: 2022, mileage: 180, fuel: 'Diesel', transmission: 'Automatic', price: 58000, condition: 'Used',
    color: 'Obsidian Black', engine: '2.0', cylinders: 4, drive: 'All-Wheel Drive (4MATIC)', seats: 5, doors: '5 Doors',
    spec: 'E 220 d 4MATIC All-Terrain',
    gallery: ['1652453822986-04f70788b118', '1652453822981-653a9a522a5b', '1652453822986-aba9e3677515'],
  },
]

export const cars = list.map((c) => ({
  ...c,
  photo: c.gallery[0],
  image: img(c.gallery[0], 700),
  images: c.gallery.map((id) => img(id, 1400)),
  thumbs: c.gallery.map((id) => img(id, 500)),
}))

export const carById = (id) => cars.find((c) => c.id === id)
export const pick = (...ids) => ids.map(carById).filter(Boolean)

export const makes = [...new Set(cars.map((c) => c.brand))].sort()
export const bodies = ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Hybrid', 'Convertible', 'Van', 'Truck', 'Electric']

export const money = (n) => '$' + n.toLocaleString('en-US')
export const miles = (n) => `${n.toLocaleString('en-US')} ${t('Miles')}`

// Groups that the home pages reuse.
export const groups = {
  searched: pick('mercedes-glc-2023', 'vw-tiguan-2023', 'bmw-x5-2023', 'ford-transit-2021', 'audi-q7-2022', 'mazda-cx5-2023', 'jeep-wrangler-2022', 'kia-sportage-2023'),
  explore: pick('ford-transit-2021', 'mercedes-glc-2023', 'audi-q7-2022', 'mazda-cx5-2023', 'bmw-x7-2024', 'vw-tiguan-2023', 'dodge-challenger-2021', 'toyota-tacoma-2023'),
  latest: pick('vw-tiguan-2023', 'bmw-x7-2024', 'ford-transit-2021', 'mercedes-glc-2023', 'chevrolet-corvette-2024', 'mazda-cx5-2023', 'vw-tiguan-allspace-2023', 'toyota-tacoma-2023'),
  recommended: pick('mercedes-e-class-2022', 'ford-ranger-2021', 'jeep-wrangler-2022', 'bmw-x5-2023', 'mercedes-amg-gt-2022', 'audi-q7-2022', 'dodge-challenger-2021', 'kia-sportage-2023'),
  specials: pick('audi-q7-2022', 'ford-ranger-2021', 'dodge-challenger-2021', 'bmw-x5-2023', 'ford-transit-2021', 'chevrolet-corvette-2024', 'jeep-wrangler-2022', 'mercedes-glc-2023'),
  popularBmw: pick('bmw-x7-2024', 'bmw-x5-2023'),
}

export const byTab = (tab) => {
  const t = tab.toLowerCase()
  if (t === 'new cars') return cars.filter((c) => c.condition === 'New')
  if (t === 'used cars') return cars.filter((c) => c.condition === 'Used')
  if (t === 'featured cars') return groups.recommended
  if (t === 'popular cars') return groups.specials
  if (bodies.map((b) => b.toLowerCase()).includes(t)) return cars.filter((c) => c.body.toLowerCase() === t)
  if (makes.map((m) => m.toLowerCase()).includes(t) || t === 'mercedes benz') return cars.filter((c) => c.brand.toLowerCase().replace('-', ' ') === t.replace('-', ' '))
  return null
}
