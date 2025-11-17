import "preline/preline";
import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IStaticMethods } from "preline/preline";

import BackTop from './components/layouts/BackTop';
import Navbar from './components/layouts/Navbar';
import Sidebar from './components/layouts/Sidebar';
import Footer from './components/layouts/Footer';

import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';
import BlogList from './pages/BlogList';
import TermAndConditions from './pages/TermAndConditions';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Page404 from './pages/errors/Page404';
import Page500 from './pages/errors/Page500';
import Maintenance from './pages/errors/Maintenance';

import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import EvaluasiAktifTable from "./pages/evaluation";


declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Navbar with dynamic margin */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-64'}`}>
        <Navbar />
      </div>

      <Sidebar onToggle={setIsSidebarCollapsed} />

      <main className={`pt-12 pb-10 md:pt-22 transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-64'}`}>
        <div className="relative overflow-hidden">
          <div aria-hidden="true" className="flex absolute -top-96 start-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]" />
            <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]" />
          </div>
          <div className="relative z-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/list-blog' element={<BlogList />} />
              <Route path='/detail-blog' element={<BlogDetail />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/404" element={<Page404 />} />
              <Route path="/500" element={<Page500 />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path='/term-and-conditions' element={<TermAndConditions />} />
              <Route path='/about' element={<About />} />
              <Route path='/gallery' element={<Gallery />} />
              <Route path="*" element={<Page404 />} />

              <Route path="/active-evaluation" element={<EvaluasiAktifTable />} />
            </Routes>
          </div>
        </div>
      </main>
      <BackTop />

      {/* Footer with dynamic margin */}
      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-64'}`}>
        <Footer />
      </div>
    </div>
  );
}

export default App;