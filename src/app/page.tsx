import Link from "next/link";
import { ArrowRight, CheckCircle2, ShoppingCart, BarChart3, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Navbar */}
      <header className="px-6 py-4 border-b bg-white dark:bg-zinc-900 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <ShoppingCart className="text-white h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Calixto PDV</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <a href="#recursos" className="hover:text-primary transition">Recursos</a>
            <a href="#vantagens" className="hover:text-primary transition">Vantagens</a>
            <a href="#precos" className="hover:text-primary transition">Preços</a>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline">Fazer Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 md:py-32 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6">
            O sistema de frente de caixa <span className="text-primary">definitivo</span> para o seu negócio.
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto">
            Venda mais rápido, controle seu estoque com precisão e gerencie seus clientes em uma plataforma moderna e fácil de usar.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8">
                Acessar o Sistema <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8">
              Falar com Consultor
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="recursos" className="py-20 bg-white dark:bg-zinc-900 border-y">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Tudo que você precisa em um só lugar</h2>
              <p className="text-zinc-500">Esqueça os sistemas antigos e travados. Conheça o futuro da gestão.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "PDV Ultra Rápido", desc: "Frente de caixa otimizado para vender em segundos, com suporte a leitor de código de barras." },
                { icon: BarChart3, title: "Controle de Estoque", desc: "Saiba exatamente o que tem na loja e receba alertas de estoque mínimo." },
                { icon: ShieldCheck, title: "Gestão Segura", desc: "Controle de acesso por usuário e auditoria completa de cancelamentos e descontos." }
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing/Info Section */}
        <section id="precos" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="bg-zinc-900 dark:bg-black rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para modernizar sua loja?</h2>
              <p className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto">
                Adquira sua licença vitalícia com instalação local ou acesse nossos planos em nuvem. Entre em contato para descobrir a melhor solução.
              </p>
              <ul className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10">
                {["Sem mensalidades abusivas", "Suporte especializado", "Fácil de treinar a equipe"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <Button size="lg" className="bg-white text-black hover:bg-zinc-200 text-lg h-14 px-8">
                  Comece Agora
                </Button>
              </Link>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
              <div className="absolute -top-[50%] -left-[10%] w-[70%] h-[150%] bg-primary/30 blur-[120px] rounded-full mix-blend-screen" />
              <div className="absolute top-[20%] -right-[20%] w-[60%] h-[100%] bg-blue-500/20 blur-[100px] rounded-full mix-blend-screen" />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 text-center text-zinc-500 border-t">
        <p>© 2026 Calixto Sistemas. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
