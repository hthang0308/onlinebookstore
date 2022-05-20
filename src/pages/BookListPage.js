import BookList from "../components/BookList";
const BookListPage = ({ handleAddToCart }) => {

  return <BookList handleAddToCart={handleAddToCart} ></BookList>;
};
export default BookListPage;
