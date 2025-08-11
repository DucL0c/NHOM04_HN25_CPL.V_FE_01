import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';


const MainLayout = () => (
  <div className="min-h-screen bg-[#efefef]">
    <Header />
    <main className="min-h-screen bg-[#F5F5FA]">
      <Outlet />
    </main>
    {/* <Footer /> */}
    <Footer />
  </div>
);

export default MainLayout;
