import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // 라우팅 설정의 시작점 (최상위 라우터 설정)
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
