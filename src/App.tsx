import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation/Index";

export function App() {
  return (
    <>
      <main className="bg-[#fff] relative border border-[#828282] py-6 px-8 rounded-[5px] h-[737px]">
        <Outlet />
      </main>
      <Navigation />
    </>
  );
}
