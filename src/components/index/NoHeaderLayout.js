import Footer from '../Footer';

export default function NoHeaderLayout({ children }) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
