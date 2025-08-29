import Header from "./components/Header";
import Arsalar from "./sections/Arsalar";
import Projeler from "./sections/Projeler";
import Kurumsal from "./sections/Kurumsal";
import Iletisim from "./sections/Iletisim";

export default function App() {
  return (
    <>
      <Header />
      <main id="main-content" className="space-y-2">
        <Arsalar />
        <Projeler />
        <Kurumsal />
        <Iletisim />
      </main>
      <footer className="border-t mt-16 py-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Created by sudenur.tilla2020@gmail.com
      </footer>
    </>
  );
}
