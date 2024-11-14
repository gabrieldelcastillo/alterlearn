import { useRouter } from 'next/router';

export default function DetalleRecurso() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h2>Detalle del Recurso</h2>
      <p>Recurso ID: {id}</p>
    </div>
  );
}
