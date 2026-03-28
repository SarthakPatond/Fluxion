import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicLayout({ children, className = "" }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-300 selection:text-slate-950">
      <Navbar />
      <main className={`relative flex-1 overflow-hidden ${className}`.trim()}>{children}</main>
      <Footer />
    </div>
  );
}
