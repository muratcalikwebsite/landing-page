import Header from "./components/Header";
import Arsalar from "./sections/Arsalar";
import Projeler from "./sections/Projeler";
import Kurumsal from "./sections/Kurumsal";
import Iletisim from "./sections/Iletisim";
import signature from "./assets/images/imza.jpg";

export default function App() {
  return (
    <>
      <Header />
      <main id="main-content" className="space-y-2">
        <Arsalar />
        <Projeler />
        <Kurumsal />
        <Iletisim />
        {/* İmza görseli */}
        <div className="mb-4 flex justify-center">
          <img
            src={signature}
            alt="Murat Çalık İmza"
            className="h-12 w-auto object-contain"
            loading="lazy"
          />
        </div>
      </main>
      <footer className="border-t bg-[#C32C31] text-white py-5 text-center text-sm">
        © {new Date().getFullYear()} Bu site<b> SDN Ajans</b> tarafından
        geliştirilmiştir. <br />
        Created by{" "}
        <a
          href="mailto:sudenur.tilla2020@gmail.com"
          className="underline hover:text-gray-200"
        >
          İletişim için tıklayın!
        </a>
      </footer>
    </>
  );
}
