import { Zap, HandCoins, Ruler, Award } from "lucide-react";

const items = [
  { icon: Zap, title: "Atendimento Rápido", desc: "Respondemos em minutos e agilizamos seu projeto." },
  { icon: HandCoins, title: "Orçamento Sem Compromisso", desc: "Faça seu orçamento gratuito sem nenhuma obrigação." },
  { icon: Ruler, title: "Fabricação Sob Medida", desc: "Cada projeto é feito sob medida para sua necessidade." },
  { icon: Award, title: "Experiência Desde 2019", desc: "Anos de experiência em serralheria na capital paulista." },
];

const DifferentialsSection = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold uppercase tracking-widest text-sm">Por que nos escolher</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">NOSSOS DIFERENCIAIS</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.title} className="text-center group">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <item.icon className="text-primary" size={36} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-muted-foreground text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default DifferentialsSection;
