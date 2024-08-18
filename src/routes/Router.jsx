import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Chat from "../components/chat/Chat";

function Router({ children }) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [
        {
          path: "/:chatID",
          element: <Chat />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
}

export default Router;
