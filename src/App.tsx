import './App.css';
import HomePage from './layouts/HomePage/HomePage';
import Navbar from './layouts/NavbarAndFooter/Navbar';
import SearchBooksPage from './layouts/SearchBooksPage/SearchBooksPage';

import { Route, Switch } from 'react-router-dom';

export default function App() {
  return (
    <div>
      {/* 공통 컴포넌트 */}
      <Navbar />
      {/* Switch로 Route를 포함해 특정 경로에 맞는 컴포넌트 렌더링 */}
      <Switch>
        {/* exact: '/' 경로가 정확히 일치하는 경우에만 HomePage 렌더링 */}
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/search">
          <SearchBooksPage />
        </Route>
      </Switch>
    </div>
  );
}
