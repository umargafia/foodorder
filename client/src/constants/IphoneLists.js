import danwake from '../assets/danwake.webp';
import chipsandeggs from '../assets/chipsandeggs.jpg';
import friedyam from '../assets/friedyam.jpg';
import masa from '../assets/masa.jpg';
import rice from '../assets/rice.jpg';
import tuwandawa from '../assets/tuwandawa.jpg';
import tuwonshinkafa from '../assets/tuwonshinkafa.jpg';
import friedrice from '../assets/friedrice.jpg';
import jallofrice from '../assets/jallofrice.jpg';
import awara from '../assets/awara.webp';

class Food {
  constructor(id, image, name, price) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.price = price;
  }
}

export default [
  new Food(1, chipsandeggs, 'Chips and Egg', '110000'),
  new Food(5, rice, 'Rice And Stew', '100000'),
  new Food(5, friedrice, 'Fried Rice', '100000'),
  new Food(5, jallofrice, 'Jallof Rice', '100000'),
  new Food(2, danwake, 'Danwake', '200'),
  new Food(2, awara, 'Awara', '200'),
  new Food(3, friedyam, 'Fried Yam', '120000'),
  new Food(4, masa, 'Masa', '135000'),
  new Food(6, tuwandawa, 'Tuwon dawa', '100000'),
  new Food(7, tuwonshinkafa, 'Tuwon Shinkafa', '100000'),
];
