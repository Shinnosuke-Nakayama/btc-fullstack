import { useRoutes } from "react-router-dom";
import { Video } from "../Video";
import { Contentes } from "../contentesComponets/Contentes";

const Router = () => {
  const routingConfig = [
    {
      path: "/",
      element: <Contentes />,
    },
    {
      path: "/home",
      element: <Contentes />,
    },
    {
      path: "/edit",
      element: <Video />,
    },
  ];

  const routing = useRoutes(routingConfig);

  return routing;
};

export default Router;
