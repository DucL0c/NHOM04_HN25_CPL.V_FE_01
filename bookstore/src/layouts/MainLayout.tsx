import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';


const MainLayout = () => (
  <div className="min-h-screen flex flex-col bg-[#efefef]">
    {/* <Header /> */}
    <Header />
    {/* Main content area */}
    <main className="min-h-screen">
      <Outlet />
    </main>
    {/* <Footer /> */}
    <Footer />
  </div>
);

export default MainLayout;
