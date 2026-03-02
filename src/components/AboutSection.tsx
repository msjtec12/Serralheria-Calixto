const AboutSection = () => (
  <section id="sobre" className="section-padding">
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto text-center">
        <span className="text-primary font-semibold uppercase tracking-widest text-sm">Quem somos</span>
        <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-8">SOBRE A EMPRESA</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          A <strong className="text-foreground">Serralheria Calixto</strong> atua desde 2019 em São Paulo, oferecendo soluções completas em serralheria com foco em qualidade, pontualidade e atendimento personalizado.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          Trabalhamos com fabricação sob medida de portões, grades, estruturas metálicas, corrimãos e guarda-corpos, sempre utilizando materiais de primeira linha e mão de obra qualificada.
        </p>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Nosso compromisso é entregar projetos que unem funcionalidade, segurança e estética, atendendo residências, comércios e indústrias em toda a região metropolitana de São Paulo.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-12 border-t border-border pt-12">
          <div>
            <span className="font-display text-4xl font-bold text-primary">6+</span>
            <p className="text-muted-foreground text-sm mt-1">Anos de experiência</p>
          </div>
          <div>
            <span className="font-display text-4xl font-bold text-primary">500+</span>
            <p className="text-muted-foreground text-sm mt-1">Projetos entregues</p>
          </div>
          <div>
            <span className="font-display text-4xl font-bold text-primary">100%</span>
            <p className="text-muted-foreground text-sm mt-1">Clientes satisfeitos</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
