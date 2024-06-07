import { Link, Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <main className="bg-[#fff] relative border border-[#828282] py-6 px-8 rounded-[5px] h-[737px]">
        <Outlet />
      </main>

      <footer className="flex justify-end items-center gap-[26px]">
        <Link to="inboxes">Inboxes</Link>
        <Link to="tasks">Tasks</Link>
      </footer>
    </>
  );
}
