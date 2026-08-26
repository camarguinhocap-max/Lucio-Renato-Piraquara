export function SiteFooter() {
  return (
    <footer className="bg-petrol text-petrol-foreground">
      <div className="container-editorial py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-sm bg-petrol-foreground text-petrol font-serif text-xl">
                LR
              </span>
              <div>
                <p className="font-serif text-2xl">Lúcio Renato</p>
                <p className="text-[10px] uppercase tracking-[0.22em] opacity-60">
                  Piraquara On-line · Portal local
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-sm opacity-80 leading-relaxed">
              Informação local, utilidade pública e cobertura comunitária para quem vive, trabalha e
              ama Piraquara.
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] opacity-60">Navegação</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#lucio" className="hover:opacity-100 opacity-80">
                  Quem é ele
                </a>
              </li>
              <li>
                <a href="#conteudos" className="hover:opacity-100 opacity-80">
                  Conteúdos
                </a>
              </li>
              <li>
                <a href="#utilidade" className="hover:opacity-100 opacity-80">
                  Utilidade
                </a>
              </li>
              <li>
                <a href="#redes" className="hover:opacity-100 opacity-80">
                  Redes
                </a>
              </li>
              <li>
                <a href="/parceiros" className="hover:opacity-100 opacity-80">
                  Parceiros
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-[0.18em] opacity-60">Redes</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:opacity-100 opacity-80">
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61592683896175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 opacity-80"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@piraquaraon-line"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 opacity-80"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5541987248686"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-100 opacity-80"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.18em] opacity-60">Contato</p>
            <ul className="mt-4 space-y-2 text-sm opacity-90">
              <li>contato@luciorenatopiraquara.com.br</li>
              <li>(41) 98724-8686</li>
              <li>Rua Júlio Keques, 76 — Piraquara, PR</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-petrol-foreground/15 flex flex-col sm:flex-row gap-3 justify-between text-xs opacity-70">
          <p>© {new Date().getFullYear()} Piraquara On-line. Todos os direitos reservados.</p>
          <p>Feito em Piraquara, com orgulho local.</p>
        </div>
      </div>
    </footer>
  );
}
