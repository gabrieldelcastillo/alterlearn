// components/Layout.js
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function Layout({ children }) {
  const router = useRouter();

  // Rutas en las que no quieres mostrar el Header
  const noHeaderRoutes = ['/index', '/admin'];

  return (
    <div>
      {!noHeaderRoutes.includes(router.pathname) && <Header />}
      <main>{children}</main>
      <Footer />
    </div>
  );
}
