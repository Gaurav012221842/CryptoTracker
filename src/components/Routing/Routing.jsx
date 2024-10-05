import { Route, Routes } from 'react-router-dom';
// import Home from '../../pages/Home';
// import CoinDetailspage from '../../pages/CoinDetailspage';
import { lazy,Suspense } from 'react';
import MainLayout from '../../pages/Layout';
// import {Facebook} from 'react-content-loader'
import CustomErrorBoundary from '../CustomErrorBoundary/CustomErrorBoundary';
import MyLoader from '../PageLoader/PageLoader';

const Home = lazy(() => import('../../pages/Home'));
const CoinDetailspage = lazy(() => import('../../pages/CoinDetailspage'));
function Routing() {
  return ( // Added return
   < CustomErrorBoundary>
    <Routes>
      <Route path="/" element={<MainLayout/>} >
        <Route index element={
            <Suspense fallback={<MyLoader />}>
              <Home />
            </Suspense>
  
        } />
        <Route path="details/:coinId" element={
            <Suspense fallback={<MyLoader />}>
              <CoinDetailspage />
            </Suspense>
        } />
      </Route>
      

    </Routes>
    </CustomErrorBoundary>
    
  );
}

export default Routing;
