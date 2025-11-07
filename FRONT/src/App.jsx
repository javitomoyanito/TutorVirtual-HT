import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/nav";
export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet /> 
      </main>
    </div>
  );
}