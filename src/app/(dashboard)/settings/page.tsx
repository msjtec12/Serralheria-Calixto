import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
        <p className="text-muted-foreground">Gerencie as configurações da empresa e do sistema.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados da Empresa</CardTitle>
            <CardDescription>Informações que sairão no cupom fiscal/recibo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Razão Social</label>
                <Input defaultValue="Konnexy PDV Ltda" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CNPJ</label>
                <Input defaultValue="00.000.000/0001-00" />
              </div>
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-medium">Endereço Completo</label>
                <Input defaultValue="Av. Principal, 1000 - Centro" />
              </div>
            </div>
            <Button>Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sistema e Impressão</CardTitle>
            <CardDescription>Configure como o PDV se comporta no seu computador.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Impressora Padrão</label>
                <Input placeholder="Ex: TM-T20X" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tema</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option>Claro</option>
                  <option>Escuro</option>
                  <option>Sistema</option>
                </select>
              </div>
            </div>
            <Button variant="secondary">Atualizar Preferências</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
