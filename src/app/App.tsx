import '@/App.css';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from '@/app/router/route';
import CursorFollower from '@/shared/components/CursorFollower/CursorFollower';
import ScrollToTop from '@/shared/components/ScrollToTop/ScrollToTop';
import GlobalLoader from '@/shared/components/GlobalLoader/GlobalLoader';

function App() {
  return (
    <>
      <CursorFollower lag={0.07} />
      <BrowserRouter>
        <GlobalLoader />
        <ScrollToTop />
        <MainRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
