import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-secondary border-t border-border py-12">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-col items-center justify-center gap-4 mb-6">
        <img src={logo} alt="Serralheria Calixto Logo" className="h-20 w-auto" />
        <p className="font-display text-xl font-bold">
          SERRALHERIA <span className="text-primary">CALIXTO</span>
        </p>
      </div>
      <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
        Expert em estruturas metálicas, portões e grades sob medida em São Paulo.
      </p>
      <div className="flex flex-col gap-1 text-muted-foreground text-sm mb-8">
        <p>Rua Antonio Jose Evaristo, 280 - Jd. São Jorge</p>
        <p>São Paulo - SP • CEP 05568-060</p>
        <p>CNPJ: 32.468.325/0001-90</p>
      </div>
      <p className="text-muted-foreground text-xs opacity-60">
        © {new Date().getFullYear()} Serralheria Calixto. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
