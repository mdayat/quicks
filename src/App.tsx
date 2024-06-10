import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./components/Navigation/Index";

export function App() {
  const { pathname } = useLocation();

  return (
    <>
      <main className="bg-[#fff] relative border border-[#828282] py-6 px-8 rounded-[5px] h-[737px]">
        {pathname === "/" ? (
          <div className="flex flex-col justify-center items-center gap-y-6 h-[calc(737px-48px)]">
            <h1 className="font-bold text-2xl">Welcome to Quicks!</h1>
            <p className="max-w-sm text-center">
              A simple app that comprises two alternating tools;{" "}
              <strong>message</strong> and <strong>to-do list</strong>.
            </p>
            <p className="text-primary-2 italic">
              Click Below Button to Get Started
            </p>
          </div>
        ) : (
          <></>
        )}

        <Outlet />
      </main>
      <Navigation />
    </>
  );
}
