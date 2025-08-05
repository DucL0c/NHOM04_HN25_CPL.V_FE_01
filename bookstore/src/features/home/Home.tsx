import { type FC } from "react";
import { Button } from "../../components/Button";
import { Spinner } from "../../components/Spinner";
import ToastService from "../../services/notificationService";

const Home: FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">Chào mừng đến với Bookstore!</h1>
            <p className="mt-2 mb-2 text-gray-600">Tìm kiếm và mua sách yêu thích của bạn ngay hôm nay.</p>

            <Button variant="primary" onClick={() => ToastService.success("Success message!")}>
                Show Success Toast
            </Button>
            <Button variant="danger" onClick={() => ToastService.error("Error message!")}>
                Show Error Toast
            </Button>

            <div className="flex justify-center items-center h-screen">
                <Spinner size={48} />
            </div>
        </div>
    );
};

export default Home;