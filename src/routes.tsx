import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "inboxes",
        element: <div>this is inboxes</div>,
      },
      {
        path: "inboxes/:inboxID",
        element: <div>this is inboxes with dynamic</div>,
      },
      {
        path: "tasks",
        element: <div>this is tasks</div>,
      },
      {
        path: "tasks/:taskID",
        element: <div>this is tasks with dynamic</div>,
      },
    ],
  },
]);
