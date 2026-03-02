import ownerPhoto from "@/assets/logo.png"; // Using logo as placeholder for team/owner photo

const AboutSection = () => (
  <section id="sobre" className="section-padding bg-background">
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative">
          <div className="aspect-[4/5] rounded-sm overflow-hidden border-2 border-primary/20 shadow-2xl">
            <img 
              src={ownerPhoto} 
              alt="Proprietário Serralheria Calixto" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-sm hidden md:block">
            <p className="text-primary-foreground font-display text-2xl font-bold leading-tight">
              Mão de obra <br />especializada
            </p>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm">História e Compromisso</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-8">QUEM SOMOS</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            A <strong className="text-foreground">Serralheria Calixto</strong> começou com a visão de Dennis Lopes Calixto de oferecer um serviço que o Morumbi e a Zona Sul de São Paulo realmente precisavam: <strong>confiança e acabamento premium</strong>.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-6">
            Desde 2019, não apenas produzimos portões e grades; nós entregamos segurança e valorização para o seu imóvel. Valorizamos a transparência, o uso de metais de primeira linha e, acima de tudo, o <strong>cumprimento rigoroso do prazo</strong>.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Nossa missão é transformar metal em peças que unem funcionalidade e estética, garantindo que cada cliente se sinta satisfeito e seguro em seu lar ou comércio.
          </p>

          <div className="grid grid-cols-2 gap-6 border-t border-border pt-8">
            <div>
              <span className="font-display text-4xl font-bold text-primary">06+</span>
              <p className="text-muted-foreground text-sm mt-1 uppercase tracking-tighter">Anos de experiência</p>
            </div>
            <div>
              <span className="font-display text-4xl font-bold text-primary">500+</span>
              <p className="text-muted-foreground text-sm mt-1 uppercase tracking-tighter">Projetos no Morumbi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default AboutSection;
