import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import Chat from "../components/chat/Chat";

function Router({ children }) {
  const router = createBrowserRouter([
    {
      path: "/messenger",
      element: <HomePage />,
      children: [
        {
          path: "/messenger/:chatID",
          element: <Chat />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}>{children}</RouterProvider>;
}

export default Router;
