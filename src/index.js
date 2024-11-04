import Link from "next/link";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
      <div>
        <Header />
        <h1 className={styles.titulo}>Bienvenido a la Tienda de Recursos Educativos</h1>
        <p>Accede a recursos útiles creados por otros estudiantes de la universidad.</p>
        <Link href="/access">Accede a tu cuenta o regístrate</Link>
      </div>
    );
}
 