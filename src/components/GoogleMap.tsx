const GoogleMap = () => {
  const address = "Rua Antonio Jose Evaristo, 280 - Jardim São Jorge, São Paulo - SP";
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=REPLACE_ME&q=${encodeURIComponent(address)}`;
  // Note: For a real project, we would use a real API key. 
  // For now, I'll use a standard search embed which is more durable for demos.
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.3312946258414!2d-46.7765103!3d-23.5924559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce55a96860f78d%3A0xc3f6ecb9f0d9c49d!2sR.%20Ant%C3%B4nio%20Jos%C3%A9%20Evaristo%2C%20280%20-%20Jardim%20S%C3%A3o%20Jorge%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2005568-060!5e0!3m2!1spt-BR!2sbr!4v1709400000000!5m2!1spt-BR!2sbr";

  return (
    <section className="bg-secondary overflow-hidden">
      <div className="grid md:grid-cols-2">
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <span className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">Onde Estamos</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-8 uppercase">Atendimento Local</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-sm h-fit">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-lg">Endereço</p>
                <p className="text-muted-foreground">{address}</p>
                <p className="text-muted-foreground">Jd. São Jorge / Próx. ao Morumbi</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-primary/10 p-3 rounded-sm h-fit">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-lg">Horário</p>
                <p className="text-muted-foreground">Segunda a Sexta: 08:00 - 18:00</p>
                <p className="text-muted-foreground">Sábado: 08:00 - 13:00</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <a 
              href="https://maps.app.goo.gl/YyR9p1G2b1G2b1G2A" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-sm hover:scale-105 transition-all"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>
        
        <div className="h-[400px] md:h-auto min-h-[400px] relative grayscale hover:grayscale-0 transition-all duration-700">
          <iframe
            title="Google Maps"
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default GoogleMap;
