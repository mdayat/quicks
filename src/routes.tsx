import { createBrowserRouter } from "react-router-dom";

import { App } from "./App";
import { Inbox } from "./pages/Inbox";
import { InboxDetail } from "./pages/InboxDetail";
import { Error } from "./components/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "inboxes",
        element: <Inbox />,
      },
      {
        path: "inboxes/:inboxID",
        element: <InboxDetail />,
      },
      {
        path: "tasks",
        element: <Error message="This Page Has Not Been Worked On." />,
      },
      {
        path: "tasks/:taskID",
        element: <Error message="This Page Has Not Been Worked On." />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
