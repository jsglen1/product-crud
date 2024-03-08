import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header>
      <nav className="bg-gray-900 text-white">
        <ul className="flex items-center justify-between px-10 h-12">
          <Link href={"/"} className="hover:text-slate-300">
            Productos
          </Link>
          <Link href={"/create"} className="hover:text-slate-300">
            Crear
          </Link>
        </ul>
      </nav>
    </header>
  );
}
