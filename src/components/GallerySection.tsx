import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

const images = [
  { src: p1, alt: "Portão Basculante no Morumbi" },
  { src: p2, alt: "Corrimão Inox de Alto Padrão" },
  { src: p3, alt: "Grades de Segurança Reforçadas" },
  { src: p4, alt: "Estrutura Metálica para Cobertura" },
  { src: p5, alt: "Portão Automático de Alumínio" },
  { src: p6, alt: "Guarda-corpo Minimalista" },
];


const GallerySection = () => (
  <section id="portfolio" className="section-padding bg-secondary">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold uppercase tracking-widest text-sm">Trabalhos realizados</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">PORTFÓLIO</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <div key={i} className="relative overflow-hidden rounded-sm aspect-square group cursor-pointer">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="font-display text-sm uppercase tracking-wider text-primary font-semibold">{img.alt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default GallerySection;
