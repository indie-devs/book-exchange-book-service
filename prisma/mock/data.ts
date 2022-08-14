const authors = [
  {
    id: 'uuid()-test-author-1',
    name: 'Robert Cecil Martin',
  },
  {
    id: 'uuid()-test-author-2',
    name: 'Steve McConnell',
  },
];
const books = [
  {
    id: 'uuid()-test-book-1',
    title: 'Clean Code',
    coverImage: 'Clean Code image',
    description: 'Clean Code descriptions',
    language: 'en-EN',
    numberOfPages: 464,
    publishDate: new Date(),
    publisher: 'VII',
    reprintTimes: 7,
    ownerId: 'user A',
  },
  {
    id: 'uuid()-test-book-2',
    title: 'Code Complete',
    coverImage: 'Code Complete cover image',
    description: 'Code Complete descriptions',
    language: 'vi-VN',
    numberOfPages: 914,
    publishDate: new Date(),
    publisher: 'II',
    reprintTimes: 2,
    ownerId: 'user B',
  },
];
const categories = [
  {
    id: 'uuid()-test-cate-1',
    name: 'Technology',
  },
  {
    id: 'uuid()-test-cate-2',
    name: 'Architecture',
  },
];

export { authors, books, categories };
