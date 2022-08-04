import { v4 as uuid } from 'uuid';

const book = {
  id: uuid(),
  title: 'test book',
  coverImage: 'test cover image',
  description: 'some description',
  language: 'vi-VN',
  numberOfPages: 999,
  publishDate: new Date(),
  publisher: 'IV',
  reprintTimes: 7,
};
