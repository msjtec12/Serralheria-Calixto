import { Shield, Wrench, Building2, Flame, Fence, LayoutGrid, CheckCircle2 } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Olá! Gostaria de solicitar um orçamento para ";

const services = [
  { 
    icon: Fence, 
    title: "Portões Sob Medida", 
    desc: "Fabricação de portões automáticos, basculantes e deslizantes com design exclusivo para sua residência ou empresa no Morumbi.", 
    wa: "portões sob medida" 
  },
  { 
    icon: LayoutGrid, 
    title: "Corrimões Metálicos", 
    desc: "Corrimãos e guarda-corpos em aço e ferro, seguindo todas as normas de segurança e com acabamento impecável.", 
    wa: "corrimões metálicos" 
  },
  { 
    icon: Shield, 
    title: "Grades de Segurança", 
    desc: "Proteção reforçada para janelas e fechamentos de áreas com grades resistentes e esteticamente agradáveis.", 
    wa: "grades de segurança" 
  },
  { 
    icon: Building2, 
    title: "Estruturas Personalizadas", 
    desc: "Mezaninos, coberturas metálicas e projetos especiais de serralheria para necessidades específicas de construção.", 
    wa: "estruturas personalizadas" 
  },
];

const ServicesSection = () => (
  <section id="servicos" className="section-padding bg-secondary">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold uppercase tracking-widest text-sm text-center">Nossa Especialidade</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 text-center">SERVIÇOS DE SERRALHERIA</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-card border border-border rounded-sm p-8 hover:border-primary transition-all group flex flex-col h-full">
            <div className="bg-primary/10 w-16 h-16 flex items-center justify-center rounded-sm mb-6 group-hover:bg-primary transition-colors">
              <s.icon className="text-primary group-hover:text-primary-foreground transition-colors" size={32} strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl font-bold mb-4">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-grow">{s.desc}</p>
            <ul className="mb-8 space-y-2">
              <li className="flex items-center gap-2 text-xs text-muted-foreground italic">
                <CheckCircle2 size={12} className="text-primary" /> Atendimento no Morumbi
              </li>
              <li className="flex items-center gap-2 text-xs text-muted-foreground italic">
                <CheckCircle2 size={12} className="text-primary" /> Material de primeira
              </li>
            </ul>
            <a
              href={`${WHATSAPP_URL}${encodeURIComponent(s.wa)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground text-sm font-bold py-3 rounded-sm transition-all"
            >
              Orçar Agora
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
