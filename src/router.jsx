import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { path } from "framer-motion/client";
import About from "./pages/About";
import AIContentGenerator from "./pages/AIContentGenerator";
import Feedback from "./pages/Feedback";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/AiContentGenerator",
    element: <AIContentGenerator />,
  },
]);
export default router;
