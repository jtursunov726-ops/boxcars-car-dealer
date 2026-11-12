import { img, people } from './images'

export const brands = [
  { name: 'Audi', logo: 'audi' },
  { name: 'BMW', logo: 'bmw' },
  { name: 'Ford', logo: 'ford' },
  { name: 'Mercedes Benz', logo: 'mercedes' },
  { name: 'Peugeot', logo: 'peugeot' },
  { name: 'Volkswagen', logo: 'volkswagen' },
]
export const moreBrands = [
  ...brands,
  { name: 'Bentley', logo: 'bentley' },
  { name: 'Nissan', logo: 'nissan' },
  { name: 'Jeep', logo: 'jeep' },
  { name: 'Skoda', logo: 'skoda' },
]
export const brandLogo = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@11.0.0/icons/${slug}.svg`

export const features = [
  { icon: 'finance', title: 'Special Financing Offers', text: 'Our stress-free finance department that can find financial solutions to save you money.' },
  { icon: 'trusted', title: 'Trusted Car Dealership', text: 'Our stress-free finance department that can find financial solutions to save you money.' },
  { icon: 'pricing', title: 'Transparent Pricing', text: 'Our stress-free finance department that can find financial solutions to save you money.' },
  { icon: 'service', title: 'Expert Car Service', text: 'Our stress-free finance department that can find financial solutions to save you money.' },
]

export const stats = [
  { value: '836M', label: 'Cars for sale' },
  { value: '738M', label: 'Dealer reviews' },
  { value: '100M', label: 'Visitors per day' },
  { value: '238M', label: 'Verified dealers' },
]

export const team = [
  { name: 'Courtney Henry', role: 'Development Manager', photo: people.courtney, bg: '#F9FBFC' },
  { name: 'Jerome Bell', role: 'Software Tester', photo: people.jerome, bg: '#EEF1FB' },
  { name: 'Arlene McCoy', role: 'Software Developer', photo: people.arlene, bg: '#F9FBFC' },
  { name: 'Jenny Wilson', role: 'UI/UX Designer', photo: people.jenny, bg: '#FFE9F3' },
  { name: 'Jerome Bell', role: 'Software Developer', photo: people.jerome2, bg: '#EEF9F3' },
]

export const quoteReviews = [
  { title: 'Great Work', text: '“Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn\'t on our original designs.”', name: 'Leslie Alexander', role: 'Facebook', photo: people.leslie },
  { title: 'Awesome Design', text: '“Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam sed do eiusmod”', name: 'Floyd Miles', role: 'Designer', photo: people.floyd },
  { title: 'Good Job', text: '“But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.”', name: 'Dianne Russell', role: 'Marketing', photo: people.dianne },
  { title: 'Perfect Quality', text: '“At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos.”', name: 'Courtney Henry', role: 'Software Developer', photo: people.courtney },
]

export const shortReviews = [
  { stars: 5, title: 'Sales process was simple and easy', text: 'Sales process was simple and easy. Maximilian was friendly and I didn\'t feel pressured at all.', name: 'Ali Tufan' },
  { stars: 4, title: 'Good job for project', text: 'Sales process was simple and easy. Maximilian was friendly and I didn\'t feel pressured at all.', name: 'John Doe' },
  { stars: 2, title: 'Sales process was simple and easy', text: 'At Voiture what matters to us is making your car search and buying as easy as possible.', name: 'Brooklyn Simmons' },
  { stars: 5, title: 'Good job for project', text: 'Sales process was simple and easy. Maximilian was friendly and I didn\'t feel pressured at all.', name: 'Augusta Silva' },
  { stars: 5, title: 'Sales process was simple and easy', text: 'Sales process was simple and easy. Maximilian was friendly and I didn\'t feel pressured at all.', name: 'Jack Graham' },
]

export const trustReviews = [
  { name: 'Ali TUFAN', role: 'Designer', text: 'I\'d suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.', photo: people.courtney },
  { name: 'Jerome Bell', role: 'Engineer', text: 'Buying my car online was quick and painless. The team kept me updated at every step and the delivery came a day early.', photo: people.jerome },
  { name: 'Arlene McCoy', role: 'Teacher', text: 'Honest prices and no pressure. I compared three dealers and BoxCar was the clear winner on service and transparency.', photo: people.arlene },
]

const p = (id) => img(id, 900)
export const posts = [
  { id: 'bmw-alpina-xb7', category: 'Sound', title: '2024 BMW ALPINA XB7 with exclusive details, extraordinary', image: p('1612563893490-d86ed296e5e6') },
  { id: 'bmw-x6-m50i', category: 'Accessories', title: 'BMW X6 M50i is designed to exceed your sportiest.', image: p('1511919884226-fd3cad34687c') },
  { id: 'bmw-x5-gold', category: 'Exterior', title: 'BMW X5 Gold 2024 Sport Review: Light on Sport', image: p('1567808291548-fc3ee04dbcf0') },
  { id: 'kia-sorento-hybrid', category: 'Body Kit', title: '2024 Kia Sorento Hybrid Review: Big Vehicle With Small-Vehicle', image: p('1772155836202-1e6d2ae10239') },
  { id: 'audi-hybrid', category: 'Fuel Systems', title: '2024 Audi Hybrid gives up nothing with its optimized', image: p('1705624843697-4461f9dce482') },
  { id: 'bmw-x3-seats', category: 'Exterior', title: '2024 BMW X3 M Sport Seats – available as a standalone option', image: p('1631347826177-de288776ed3b') },
  { id: 'carnival-safety', category: 'Body Kit', title: '2023 Carnival Standard blind-spot & forward collision avoidance', image: p('1622893288761-823ba60f17a6') },
  { id: 'golf-vs-polo', category: 'Sound', title: 'Golf vs Polo: A Comparison of Two Volkswagen Classics', image: p('1492144534655-ae79c964c9d7') },
  { id: 'kia-vs-hyundai', category: 'Oil & Filters', title: 'Battle of the SUVs – Kia Sportage vs Hyundai Tucson', image: p('1606611013016-969c19ba27bb') },
].map((post) => ({ ...post, author: 'Admin', date: 'November 22, 2023', excerpt: 'Aliquam hendrerit sollicitudin purus, quis rutrum mi accumsan nec. Quisque bibendum orci ac nibh facilisis, at malesuada orci congue. Nullam tempus sollicitudin cursus.' }))

export const blogCategories = ['Accessories', 'Body Kit', 'Exterior', 'Fuel Systems', 'Interior', 'Oil & Filters', 'Sound', 'Wheels']
export const blogTags = ['Accessories', 'Exterior', 'Fuel System', 'Interior', 'Sound', 'Wheels']

export const faqs = [
  { q: 'Does BoxCar own the cars I see online or are they owned by other.', a: 'Cras vitae ac nunc orci. Purus amet tortor non at phasellus ultricies hendrerit. Eget a, sit morbi nunc sit id massa. Metus, scelerisque volutpat nec sit vel donec. Sagittis, id volutpat erat vel.' },
  { q: 'How do you choose the cars that you sell?', a: 'Every vehicle passes a 150-point inspection and a history check before it is listed. We only keep cars that meet our quality and price standards.' },
  { q: 'Can I save my favorite cars to a list I can view later?', a: 'Yes. Tap the bookmark icon on any listing and it is saved to your list on this device. Open Listings → Saved to see them all.' },
  { q: 'Can I be notified when cars I like are added to your inventory?', a: 'Subscribe with your email in the Join BoxCar box at the bottom of every page and we will send you new arrivals that match your interests.' },
  { q: 'What tools do you have to help me find the right car for me and my budget?', a: 'Use the search filters on the listings page, the loan calculator to estimate monthly payments, and our team is happy to help by phone or chat.' },
]

export const products = [
  { id: 1, name: 'Front and Rear Brake Kit', price: 120, rating: 5, reviews: 2, category: 'Wheels', image: img('1611633235555-45e252fe48c8', 500) },
  { id: 2, name: 'Michelin Defender LTX M/S', price: 150, rating: 5, reviews: 4, category: 'Wheels', image: img('1537462715879-360eeb61a0ad', 500) },
  { id: 3, name: 'Car Rear View Mirror Kit', price: 180, rating: 5, reviews: 2, category: 'Accessories', image: img('1556448851-9359658faa54', 500) },
  { id: 4, name: 'Brent Challenger\'s Steering Wheel', price: 60, rating: 5, reviews: 3, category: 'Interior', image: img('1498887960847-2a5e46312788', 500) },
  { id: 5, name: 'Carbon Fiber PVC Car Rear', price: 230, rating: 5, reviews: 2, category: 'Body Kit', image: img('1606577924006-27d39b132ae2', 500) },
  { id: 6, name: 'Sports Safety Bike Helmet', price: 95, rating: 5, reviews: 1, category: 'Accessories', image: img('1517026575980-3e1e2dedeab4', 500) },
  { id: 7, name: 'Performance Air Filter', price: 45, rating: 4, reviews: 6, category: 'Oil & Filters', image: img('1522598140461-ec9911e01c53', 500) },
  { id: 8, name: 'Engine Rebuild Kit', price: 340, rating: 5, reviews: 2, category: 'Fuel Systems', image: img('1486262715619-67b85e0b08d3', 500) },
  { id: 9, name: 'Exhaust Catalytic Converter', price: 210, rating: 4, reviews: 3, category: 'Exterior', image: img('1759419281419-b04552b2691a', 500) },
  { id: 10, name: 'Engine Oil Service Pack', price: 35, rating: 5, reviews: 9, category: 'Oil & Filters', image: img('1487754180451-c456f719a1fc', 500) },
  { id: 11, name: 'Ignition Coil Set', price: 75, rating: 4, reviews: 2, category: 'Fuel Systems', image: img('1527383418406-f85a3b146499', 500) },
  { id: 12, name: 'Premium Sound Speaker Set', price: 160, rating: 5, reviews: 5, category: 'Sound', image: img('1767884162326-54d3e26d444a', 500) },
  { id: 13, name: 'Turbo Engine Cover', price: 130, rating: 4, reviews: 1, category: 'Exterior', image: img('1663642775693-6628f65358be', 500) },
]

export const plans = [
  { price: 29, name: 'Basic Plan', listings: '50 Listings', days: '120 Days Visibility', highlight: true },
  { price: 39, name: 'Standard Plan', listings: '60 Listings', days: '150 Days Visibility', highlight: true, featured: true },
  { price: 89, name: 'Extended Plan', listings: '60 Listings', days: '200 Days Visibility', highlight: true },
  { price: 129, name: 'Enterprise Plan', listings: '100 Listings', days: '365 Days Visibility', highlight: true },
]

export const hours = [
  ['Monday', '9:00 - 13:00'], ['Tuesday', '9:00 - 13:00'], ['Wednesday', '9:00 - 13:00'], ['Thursday', '9:00 - 13:00'],
  ['Friday', '9:00 - 13:00'], ['Saturday', '9:00 - 13:00'], ['Sunday', 'CLOSED'],
]

export const shopLinks = {
  'New Cars For Sale': ['Ford Cars', 'Honda Cars', 'Hyundai Cars', 'Infiniti Cars', 'Jaguar Cars', 'Jeep Cars', 'Chrysler Cars', 'Citroen Cars', 'Cupra Cars', 'Dacia Cars', 'DS Cars', 'Fiat Cars', 'Land Rover Cars', 'Lexus Cars', 'Mercedes-Benz Cars', 'Mazda Cars', 'MG Cars', 'Kia Cars', 'Abarth Cars', 'Romeo Cars', 'Audi Cars', 'Bentley Cars', 'BMW Cars', 'Chevrolet Cars', 'Mini Cars', 'Mitsubishi Cars', 'Nissan Cars', 'Peugeot Cars', 'Porsche Cars', 'Renault Cars'],
  'Used Cars For Sale': ['Used Ford', 'Used Honda', 'Used Hyundai', 'Used Infiniti', 'Used Jaguar', 'Used Jeep', 'Used Chrysler', 'Used Citroen', 'Used Cupra', 'Used Dacia', 'Used DS', 'Used Fiat', 'Used Land Rover', 'Used Lexus', 'Used Mercedes-Benz', 'Used Mazda', 'Used MG', 'Used Kia', 'Used Abarth', 'Used Romeo', 'Used Audi', 'Used Bentley', 'Used BMW', 'Used Chevrolet', 'Used Mini', 'Used Mitsubishi', 'Used Nissan', 'Used Peugeot', 'Used Porsche', 'Used Renault'],
  'Browse By Type': ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Hybrid', 'Convertible', 'Van', 'Truck', 'Electric'],
  'Browse By Brand': ['Audi', 'BMW', 'Ford', 'Mercedes-Benz', 'Peugeot', 'Volkswagen', 'Toyota', 'Porsche', 'Nissan', 'Jeep'],
}
