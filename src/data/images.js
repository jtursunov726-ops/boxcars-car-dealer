// All photos come from Unsplash (free license). `img(id, width)` builds a resized URL.
export const img = (id, w = 800, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}${h ? `&h=${h}` : ''}&q=80&auto=format&fit=crop`

export const photos = {
  // heroes
  mountainRoad: '1603584173870-7f23fdae1b7a',
  whiteCar: '1646960700481-c7be5224a7fc',
  porscheRoad: '1503376780353-7e6692767b70',
  suvBeach: '1772155836202-1e6d2ae10239',
  silverCoupe: '1568605117036-5fe5e7bab0b7',
  garageSuv: '1598248691267-4a62dfdfd8a8',
  desertCar: '1765211003784-a82564cb8d3d',
  chargingNight: '1641659376402-3d2f48a91ed7',
  mustang: '1494976388531-d1058494cdd8',
  greyCoupe: '1580273916550-e323be2ae537',
  neonHeadlight: '1542282088-fe8426682b8f',
  // people & places
  womanPhone: '1758599543129-bec77e427ac6',
  womanTrench: '1790802206504-b7b0ab0046d5',
  mechanic: '1625047509248-ec889cbff17f',
  mechanicTire: '1645445522156-9ac06bc7a767',
  showroom: '1692406069831-0bb7ea297645',
  showroomLuxury: '1764013290175-2b76e9a00b2e',
  showroomTesla: '1771284848859-12f150fa1637',
  showroomBlue: '1788178243401-854e12eeb8b1',
  salesman: '1560250097-0b93528c311a',
  maseratiBridge: '1568605117036-5fe5e7bab0b7',
  suvForest: '1757922589576-129377dadac9',
}

export const people = {
  courtney: '1627161683077-e34782c24d81',
  jerome: '1560250097-0b93528c311a',
  arlene: '1765005204058-10418f5123c5',
  jenny: '1573497019940-1c28c88b4f3e',
  jerome2: '1705645930353-0e335311ef20',
  leslie: '1699899657680-421c2c2d5064',
  floyd: '1629425733761-caae3b5f2e50',
  dianne: '1767611033966-f5f7b9b348d7',
}
