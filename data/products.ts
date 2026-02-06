import type { Product} from '../types/index';

export const products: Product[] = [
  {
    id: 1,
    name: 'Snack Series',
    price: 15,
    description: 'Just like dining at a retro American diner, Sonny Angel brings joy to every mealtime moment.',
    image: require('../assets/SNACK.png'),
  },
  {
    id: 2,
    name: 'Gifts of Love Series',
    price: 20,
    description: 'The Gifts of Love series is a message of “I love you!” from Sonny Angel and represents his daily gratitude and affection.',
    image: require('../assets/LOVE.png'),
  },
  {
    id: 3,
    name: 'Pumpkin Patch Series',
    price: 20,
    description: 'Sonny Angel dons colorful, playful pumpkin costumes in the brand new Pumpkin Patch Series.',
    image: require('../assets/PUMPKIN.png'),
  },
  {
    id: 4,
    name: 'Dog Time Series',
    price: 20,
    description: 'RUFF! Make Every Moment More Playful with the Sonny Angel Dog Time Series!',
    image: require('../assets/DOG.png'),
  },
  {
    id: 5,
    name: "Santa's Little Helper Series",
    price: 30,
    description: 'Get Ready for Christmas Celebrations with Sonny Angel.',
    image: require('../assets/SANTA.png'),
  },
  {
    id: 6,
    name: 'Cat Life Series',
    price: 20,
    description: 'Add fun to every day with the Sonny Angel Cat Life series.',
    image: require('../assets/CAT.png'),
  },
];