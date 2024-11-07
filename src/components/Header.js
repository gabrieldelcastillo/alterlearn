import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const goToChat = () => {
    router.push('/chat');
  }

  if (router.pathname !== "/pages/access") {
    return (
      <nav>
        <Link href="/init">
          Inicio
        </Link>
        <Link href="/">
          Acceso
        </Link>
        <Link href="/chat">
          Chat
        </Link>
      </nav>
    );
  }
}