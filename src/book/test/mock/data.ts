import { BookDTO } from 'src/book/dtos';

const bookCreateDTO: BookDTO = {
  title: 'book create',
  coverImage: 'book create image',
  description: 'book create descriptions',
  language: 'en-EN',
  numberOfPages: 464,
  publishDate: new Date(),
  publisher: 'VII',
  reprintTimes: 7,
};

const bookUpdateDTO: BookDTO = {
  title: 'book update',
  coverImage: 'book update image',
  description: 'book update descriptions',
  language: 'en-EN',
  numberOfPages: 464,
  publishDate: new Date(),
  publisher: 'VII',
  reprintTimes: 7,
};

const bookEmptyTitle: BookDTO = {
  title: '',
  coverImage: 'Clean Code image',
  description: 'Clean Code descriptions',
  language: 'en-EN',
  numberOfPages: 464,
  publishDate: new Date(),
  publisher: 'VII',
  reprintTimes: 7,
};

const bookEmptyDate: BookDTO = {
  title: 'test',
  coverImage: 'Clean Code image',
  description: 'Clean Code descriptions',
  language: 'en-EN',
  numberOfPages: 464,
  publishDate: '',
  publisher: 'VII',
  reprintTimes: 7,
};

const bookWithoutTitle = {
  coverImage: 'Clean Code image',
  description: 'Clean Code descriptions',
  language: 'en-EN',
  numberOfPages: 464,
  publishDate: new Date(),
  publisher: 'VII',
  reprintTimes: 7,
};

const bookWrongFormatNumber = {
  title: 'test',
  coverImage: 'Clean Code image',
  description: 'Clean Code descriptions',
  language: 'en-EN',
  numberOfPages: 'test',
  publishDate: new Date(),
  publisher: 'VII',
  reprintTimes: 'test',
};

export {
  bookCreateDTO,
  bookEmptyTitle,
  bookEmptyDate,
  bookUpdateDTO,
  bookWithoutTitle,
  bookWrongFormatNumber,
};
