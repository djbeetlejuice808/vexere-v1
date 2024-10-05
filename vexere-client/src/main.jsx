import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import "./index.css";
import Index from "./routes/index";
import ErrorPage from "./error-page";
import Root from "./page/root"
// Transports
import CreateTransport from "./page/transports/transport-create"
import ReadTransport from "./page/transports/transport-read"
// Transport Booking Methods
import ReadTransportBookingMethod from './page/transports/transport-booking-methods/transport-booking-method-read'
// Routes
import ReadTransportRoutes from './page/transports/routes/transport-routes-read'
import CreateTransportRoutes from './page/transports/routes/transport-routes-create'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children:[
      { index: true, element: <Index /> },
      {
        path: "transport-station/transport/create",
        element: <CreateTransport />,
      },
      {
        path: "transport-station/transport/read",
        element: <ReadTransport />,
      },
      {
        path: "transport-station/transport/transport-booking-method/read",
        element: <ReadTransportBookingMethod />,
      },
      {
        path: "transport-station/transport/routes/read",
        element: <ReadTransportRoutes />,
      },
      {
        path: "transport-station/transport/routes/create",
        element: <CreateTransportRoutes />,
      },


    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);