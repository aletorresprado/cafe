export interface Product {
  id: string;
  name: string;
  origin: string;
  roast: string;
  notes: string;
  price: number;
  image: string;
  color: string;
}
export const products: Product[] = [
  {
    id: 'minero',
    name: 'El minero',
    origin: 'Brasil',
    roast: 'Medio',
    notes: 'Chocolate · Avellanas · Caramelo',
    price: 1099,
    image: '/images/beans.svg',
    color: '#e7e6d7',
  },
  {
    id: 'cresta',
    name: 'Cresta Andina',
    origin: 'Colombia',
    roast: 'Claro',
    notes: 'Panela · Naranja · Frutos rojos',
    price: 1099,
    image: '/images/coffee.svg',
    color: '#e9ddd1',
  },
  {
    id: 'inti',
    name: 'Inti',
    origin: 'Perú',
    roast: 'Medio',
    notes: 'Cacao · Miel · Almendras',
    price: 1299,
    image: '/images/cup.svg',
    color: '#e9d8bc',
  },
  {
    id: 'bosque',
    name: 'Bosque de altura',
    origin: 'Nicaragua',
    roast: 'Claro',
    notes: 'Flores · Cítricos · Chocolate',
    price: 1499,
    image: '/images/beans.svg',
    color: '#d9e1d6',
  },
];
export const origins = ['Brasil', 'Colombia', 'Nicaragua', 'Perú'];
export const experiences = [
  {
    id: 'cata',
    name: 'Cata de orígenes',
    detail: 'Brasil, Colombia y Perú en una misma mesa.',
    tag: 'Para los curiosos',
    duration: '90 min',
    price: 1099,
    image: '/images/story-0.svg',
  },
  {
    id: 'taller',
    name: 'El arte del filtrado',
    detail: 'Encontrá tu ritual entre V60 y Aeropress.',
    tag: 'Manos al café',
    duration: '60 min',
    price: 1099,
    image: '/images/story-1.svg',
  },
  {
    id: 'ruta',
    name: 'Una ruta, mil historias',
    detail: 'Descubrí las cafeterías que nos inspiran.',
    tag: 'Fuera de la rutina',
    duration: '120 min',
    price: 1099,
    image: '/images/story-2.svg',
  },
];
