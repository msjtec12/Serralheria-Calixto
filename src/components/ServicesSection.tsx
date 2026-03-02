import { Shield, Wrench, Building2, Flame, Fence, LayoutGrid } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511999999999?text=Olá! Gostaria de solicitar um orçamento para ";

const services = [
  { icon: Fence, title: "Portões Metálicos", desc: "Fabricação sob medida de portões de correr, basculantes e pivotantes com acabamento profissional.", wa: "portões metálicos" },
  { icon: Shield, title: "Grades de Proteção", desc: "Grades para janelas, muros e fachadas com design moderno e máxima segurança.", wa: "grades de proteção" },
  { icon: Building2, title: "Estruturas Metálicas", desc: "Coberturas, mezaninos, galpões e estruturas em aço para projetos residenciais e comerciais.", wa: "estruturas metálicas" },
  { icon: Flame, title: "Soldas e Reformas", desc: "Serviços de solda MIG, TIG e eletrodo, além de reformas e manutenção em estruturas existentes.", wa: "soldas e reformas" },
  { icon: LayoutGrid, title: "Corrimão e Guarda-corpo", desc: "Corrimãos e guarda-corpos em aço, inox e ferro com design elegante e dentro das normas.", wa: "corrimão e guarda-corpo" },
  { icon: Wrench, title: "Serviços Especiais", desc: "Projetos personalizados, escadas metálicas, portinholas e soluções sob medida para sua necessidade.", wa: "serviços especiais" },
];

const ServicesSection = () => (
  <section id="servicos" className="section-padding bg-secondary">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <span className="text-primary font-semibold uppercase tracking-widest text-sm">O que fazemos</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">NOSSOS SERVIÇOS</h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="bg-card border border-border rounded-sm p-8 hover:border-primary/50 transition-all group">
            <s.icon className="text-primary mb-5" size={40} strokeWidth={1.5} />
            <h3 className="font-display text-xl font-bold mb-3">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
            <a
              href={`${WHATSAPP_URL}${encodeURIComponent(s.wa)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary text-sm font-semibold hover:underline"
            >
              Solicitar Orçamento →
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
