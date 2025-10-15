import { Routes, Route, useLocation } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";

import Navbar from "./components/Navbar";
import AnimatedPage from "./components/AnimatedPage";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Profile from "./pages/Profile";

export default function App() {
  const location = useLocation();
  return (
    <Tooltip.Provider>
      <div className="bg-gradient-to-tr from-fuchsia-100 to-sky-100 min-h-screen w-full font-sans relative safe-area">
        <Navbar />
        <main className="py-4 bottom-nav-safe max-w-2xl mx-auto px-4">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <AnimatedPage>
                  <Home />
                </AnimatedPage>
              }
            />
            <Route
              path="/lessons"
              element={
                <AnimatedPage>
                  <Lessons />
                </AnimatedPage>
              }
            />
            <Route
              path="/profile"
              element={
                <AnimatedPage>
                  <Profile />
                </AnimatedPage>
              }
            />
          </Routes>
        </main>
      </div>
    </Tooltip.Provider>
  );
}
