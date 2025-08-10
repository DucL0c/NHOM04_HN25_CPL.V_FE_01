// import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from './user-layout';
const MainLayout = () => (
  <div className="min-h-screen bg-[#efefef]">
    {/* <Header /> */}
    <Header />
    {/* Main content area */}
    <main className="min-h-screen">
      {/* <Outlet/> */}
      <UserProfile />
    </main>
    {/* <Footer /> */}
    <Footer />
  </div>
);

export default MainLayout;
