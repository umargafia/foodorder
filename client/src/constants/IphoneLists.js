import iphonex from '../assets/iphonex.png';
import iphonexr from '../assets/iphonexr.jpg';
import iphonexs from '../assets/iphonexs.jpg';
import iphonexsmax from '../assets/iphonexsmax.jpg';
import iphone11 from '../assets/iphone11.png';
import iphone11pro from '../assets/11promax.png';
import iphone12mini from '../assets/12mini.jpg';
import iphone12 from '../assets/12.jpg';
import iphone12pro from '../assets/12pro.jpg';
import iphone12promax from '../assets/12promax.jpg';
import iphone13mini from '../assets/13mini.png';
import iphone13 from '../assets/13.png';
import iphonese from '../assets/se2nd.png';
import iphoneset from '../assets/se3rd.png';
import iphone13pro from '../assets/13pro.png';
import iphone13promax from '../assets/13promax.png';
import iphone14 from '../assets/14.webp';
import iphone14pro from '../assets/14pro.jpg';
import iphone14promax from '../assets/iphone14lg.jpg';

class Iphone {
  constructor(id, image, name, price) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.price = price;
  }
}

export default [
  new Iphone(100, iphonex, 'Apple iPhone X', '100000'),
  new Iphone(2, iphonexr, 'Apple iPhone XR', '110000'),
  new Iphone(3, iphonexs, 'Apple iPhone XS', '120000'),
  new Iphone(4, iphonexsmax, 'Apple iPhone XS Max', '135000'),
  new Iphone(5, iphone11, 'Apple iPhone 11', '100000'),
  new Iphone(6, iphone11pro, 'Apple iPhone 11 Pro', '140000'),
  new Iphone(7, iphone11pro, 'Apple iPhone 11 Pro Max', '150000'),
  new Iphone(8, iphonese, 'Apple iPhone SE (2nd generation)', '160000'),
  new Iphone(9, iphone12mini, 'Apple iPhone 12 mini', '175000'),
  new Iphone(10, iphone12, 'Apple iPhone 12 ', '183000'),
  new Iphone(11, iphone12pro, 'Apple iPhone 12 Pro', '190000'),
  new Iphone(12, iphone12promax, 'Apple iPhone 12 Pro Max', '200000'),
  new Iphone(13, iphone13mini, 'Apple iPhone 13 mini', '210000'),
  new Iphone(14, iphone13, 'Apple iPhone 13', '100,000'),
  new Iphone(15, iphone13pro, 'Apple iPhone 13 Pro', '220000'),
  new Iphone(16, iphone13promax, 'Apple iPhone 13 Pro Max', '230000'),
  new Iphone(17, iphoneset, 'Apple iPhone SE (3rd generation)', '450000'),
  new Iphone(18, iphone14, 'Apple iPhone 14 Plus', '500000'),
  new Iphone(19, iphone14pro, 'Apple iPhone 14 Pro', '550000'),
  new Iphone(20, iphone14promax, 'Apple iPhone 14 Pro Max', '600000'),
];
