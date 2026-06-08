import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function AppSkeleton() {
  return (
    <div className="page__content">
      <Header />
      <main className="main content"></main>
      <Footer />
    </div>
  );
}

export default AppSkeleton;
