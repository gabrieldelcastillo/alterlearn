import Link from "next/link";

export default function Header() {
  return (
    <nav>
      <Link href="/">
        Inicio
      </Link>
      <Link href="/acceso">
        Acceso
      </Link>
      {/* Agrega más enlaces según las páginas que necesites */}
    </nav>
  );
}