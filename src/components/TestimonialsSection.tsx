import { Star, Quote, Instagram } from "lucide-react";

const testimonials = [
  {
    name: "Ricardo Silva",
    location: "Morumbi, SP",
    text: "Excelente serviço! O Denis foi muito profissional, entregou o portão no prazo e com um acabamento impecável. Recomendo muito para quem busca qualidade na Zona Sul.",
    stars: 5
  },
  {
    name: "Ana Paula",
    location: "Panamby, SP",
    text: "Fizemos o corrimão da escada e as grades das janelas. Trabalho muito bem feito e limpo. O preço foi justo e o atendimento excelente.",
    stars: 5
  },
  {
    name: "Carlos Eduardo",
    location: "Vila Andrade, SP",
    text: "Serralheria de confiança. O projeto da estrutura metálica do meu mezanino ficou perfeito. Pessoal entende muito do assunto.",
    stars: 5
  }
];

const TestimonialsSection = () => (
  <section id="depoimentos" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">Prova Social</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">O QUE NOSSOS CLIENTES DIZEM</h2>
        </div>
        <div className="flex items-center gap-4 bg-secondary p-4 rounded-sm border border-border">
          <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-2 rounded-full">
            <Instagram size={24} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-lg leading-tight">1.5k+</p>
            <p className="text-xs text-muted-foreground uppercase">Seguidores no Instagram</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-secondary p-8 rounded-sm relative border border-border hover:border-primary/30 transition-all group">
            <Quote className="absolute top-6 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={48} />
            <div className="flex gap-1 mb-4">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <p className="text-muted-foreground italic mb-8 relative z-10">"{t.text}"</p>
            <div>
              <p className="font-bold text-foreground">{t.name}</p>
              <p className="text-xs text-primary font-medium uppercase tracking-wider">{t.location}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-4 bg-card border border-border px-6 py-4 rounded-sm">
          <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Logo.svg" alt="Google" className="h-6" />
          <div className="flex items-center gap-2">
            <span className="font-bold">4.9/5</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(48 avaliações)</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
