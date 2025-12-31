import {
  Instagram,
  Twitter,
  Facebook,
  Mail,
 
  PawPrint,
} from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-muted/30 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <PawPrint className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold tracking-tight">
                KucingKita<span className="text-primary">.id</span>
              </h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Kami percaya setiap anabul berhak mendapatkan cinta dan perawatan
              terbaik. Bergabunglah dengan komunitas kami untuk tips kesehatan,
              nutrisi, dan kegemasan harian.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: <Instagram className="h-5 w-5" />, label: "Instagram" },
                { icon: <Twitter className="h-5 w-5" />, label: "Twitter" },
                { icon: <Facebook className="h-5 w-5" />, label: "Facebook" },
                { icon: <Mail className="h-5 w-5" />, label: "Email" },
              ].map((social, index) => (
                <button
                  key={index}
                  className="p-2 rounded-full border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary hover:-translate-y-1 transition-all duration-300 shadow-sm"
                  aria-label={social.label}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
              Eksplorasi
            </h4>
            <ul className="space-y-3 text-sm">
              {["Ras Kucing", "Nutrisi", "Kesehatan", "Galeri Anabul"].map(
                (item) => (
                  <li key={item}>
                    <a className="text-muted-foreground hover:text-primary hover:pl-1 transition-all duration-200 cursor-pointer flex items-center group">
                      <span className="h-px w-0 group-hover:w-3 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          
          <div className="md:col-span-2 space-y-5">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
              Bantuan
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {["Tentang Kami", "Kontak", "Kebijakan Privasi", "FAQ"].map(
                (item) => (
                  <li key={item}>
                    <a className="hover:text-primary hover:pl-1 transition-all duration-200 cursor-pointer flex items-center group">
                      <span className="h-px w-0 group-hover:w-3 bg-primary mr-0 group-hover:mr-2 transition-all"></span>
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

         
          <div className="md:col-span-3">
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3 relative overflow-hidden group">
              <PawPrint className="absolute -right-4 -bottom-4 h-20 w-20 text-primary/5 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
              <p className="text-xs font-bold text-primary uppercase tracking-wider">
                Tahukah Kamu?
              </p>
              <p className="text-sm italic text-muted-foreground relative z-10">
                &quot;Kucing menghabiskan 70% hidup mereka hanya untuk tidur.
                Pastikan tempat tidurnya nyaman!&quot;
              </p>
            </div>
          </div>
        </div>

       
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[13px] text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} KucingKita.id. Seluruh hak cipta
            dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
