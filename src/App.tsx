import './App.css';
import HomePage from './layouts/HomePage/HomePage';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import SearchBooksPage from './layouts/SearchBooksPage/SearchBooksPage';

export default function App() {
  return (
    <div>
      <Navbar />
        {/* <HomePage /> */}
        <SearchBooksPage />
    </div>
  );
}
