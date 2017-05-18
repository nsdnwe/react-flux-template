import BookStore from './BookStore';

test('Should contain correct state variables', () => {
  expect(BookStore).toBeDefined();
  expect(BookStore.books).toBeDefined();
  expect(BookStore.fetchStatus).toBeDefined();
});
