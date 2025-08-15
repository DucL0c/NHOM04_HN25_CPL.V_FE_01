import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';


const MainLayout = () => (
  <div className="min-h-screen bg-[#efefef]">
    <Header />
    <main className="min-h-screen bg-[#F5F5FA]">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default MainLayout;
