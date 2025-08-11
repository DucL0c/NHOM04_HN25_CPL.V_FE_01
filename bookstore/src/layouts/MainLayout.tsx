import { Outlet } from 'react-router-dom';


const MainLayout = () => (
  <>
    {/* <Header /> */}
    <main className="min-h-screen bg-[#F5F5FA]">
      <Outlet />
    </main>
    {/* <Footer /> */}
  </>
);

export default MainLayout;
