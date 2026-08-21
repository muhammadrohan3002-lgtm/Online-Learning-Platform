import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm px-4 md:px-12 sticky top-0 z-50">

      {/* Logo */}
      <div className="navbar-start">
        <Link
          href="/"
          className="btn btn-ghost text-xl font-black tracking-tight text-primary"
        >
          Skill<span className="text-neutral">Sphere</span>
        </Link>
      </div>

      {/* Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium gap-2">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/courses">Courses</Link>
          </li>
        </ul>
      </div>

      {/* Login / Register */}
      <div className="navbar-end gap-2">
        <Link href="/login" className="btn btn-ghost btn-sm">
          Login
        </Link>

        <Link href="/register" className="btn btn-primary btn-sm">
          Register
        </Link>
      </div>

    </div>
  );
}