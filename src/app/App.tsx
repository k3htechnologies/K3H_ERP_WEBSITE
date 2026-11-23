import { BrowserRouter } from 'react-router-dom';

import '@/App.css';
import MainRouter from '@/app/router/route';
import ScrollToTop from '@/shared/components/ScrollToTop/ScrollToTop';
import GlobalLoader from '@/shared/components/GlobalLoader/GlobalLoader';

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalLoader />
        <ScrollToTop />
        <MainRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
