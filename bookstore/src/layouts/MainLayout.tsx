// import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from './user-layout';
const MainLayout = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Header />
    <UserProfile />
    <Footer />
  </div>
);

export default MainLayout;
