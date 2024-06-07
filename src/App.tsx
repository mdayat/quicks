import { Link, Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <main className="bg-[#fff]">
        <Outlet />
      </main>

      <footer className="flex justify-end items-center gap-[26px]">
        <Link to="inboxes">Inboxes</Link>
        <Link to="tasks">Tasks</Link>
      </footer>
    </>
  );
}
