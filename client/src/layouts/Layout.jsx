import { Outlet } from "react-router-dom";
import logo from "../assets/logo.jpg"

export default function Layout() {
  return (
    <div className="min-h-screen bg-[rgba(148,131,131,0.24)]">
      <header className="bg-orange-500 flex flex-row items-center justify-between md:justify-evenly gap-5 text-white text-3xl font-bold p-5 shadow-md">
        <div className="h-12 w-12 md:w-12 md:h-12 overflow-hidden">
          <img src={logo} alt="gorgeous institute" className="w-full h-auto object-cover" />
        </div>
        <div className="flex flex-col items-center">
          <div className="text-sm md:text-3xl">Gorgeous technical  institute</div>
          <div className="self-center  md:text-xl text-sm font-light">weekly report</div> 
        </div>
      </header>

      <main className=" px-2 py-3">
        <Outlet />
      </main>
    </div>
  );
}