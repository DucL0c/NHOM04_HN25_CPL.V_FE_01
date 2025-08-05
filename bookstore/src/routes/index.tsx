import { useRoutes } from "react-router-dom";
import { routes } from "./routerConfig";

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;