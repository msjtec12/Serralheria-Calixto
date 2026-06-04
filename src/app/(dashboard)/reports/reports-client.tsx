"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, ShoppingBag, Package, Wallet } from "lucide-react";

export function ReportsClient({ data }: { data: any }) {
  const { sales, cashRegisters, products } = data;
  const [activeTab, setActiveTab] = useState("vendas");

  const totalRevenue = useMemo(() => sales.reduce((acc: number, s: any) => acc + s.total, 0), [sales]);
  const totalItemsSold = useMemo(() => sales.reduce((acc: number, s: any) => 
    acc + s.items.reduce((iAcc: number, item: any) => iAcc + item.quantity, 0)
  , 0), [sales]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{sales.length} vendas concluídas</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
            <Wallet className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {sales.length > 0 ? (totalRevenue / sales.length).toFixed(2) : "0.00"}
            </div>
            <p className="text-xs text-muted-foreground">Por venda</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Itens Vendidos</CardTitle>
            <ShoppingBag className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItemsSold}</div>
            <p className="text-xs text-muted-foreground">Unidades de produtos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estoque Geral</CardTitle>
            <Package className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">Produtos cadastrados</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-2 border-b">
        {["vendas", "produtos", "caixa"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab 
                ? "border-primary text-primary" 
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === "vendas" && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Vendedor</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Métodos</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center">Nenhuma venda encontrada.</TableCell></TableRow>
                )}
                {sales.map((sale: any) => (
                  <TableRow key={sale.id}>
                    <TableCell>{new Date(sale.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{sale.user?.name || "Desconhecido"}</TableCell>
                    <TableCell>{sale.customer?.name || "Consumidor Final"}</TableCell>
                    <TableCell>
                      {sale.payments.map((p: any) => p.method).join(', ')}
                    </TableCell>
                    <TableCell className="text-right font-medium">R$ {sale.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "caixa" && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Caixas</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Abertura</TableHead>
                  <TableHead>Fechamento</TableHead>
                  <TableHead>Operador</TableHead>
                  <TableHead className="text-right">Valor Inicial</TableHead>
                  <TableHead className="text-right">Valor Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cashRegisters.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center">Nenhum caixa encontrado.</TableCell></TableRow>
                )}
                {cashRegisters.map((cr: any) => (
                  <TableRow key={cr.id}>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${cr.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-zinc-100 text-zinc-700'}`}>
                        {cr.status === 'OPEN' ? 'ABERTO' : 'FECHADO'}
                      </span>
                    </TableCell>
                    <TableCell>{new Date(cr.openedAt).toLocaleString()}</TableCell>
                    <TableCell>{cr.closedAt ? new Date(cr.closedAt).toLocaleString() : "-"}</TableCell>
                    <TableCell>{cr.user?.name}</TableCell>
                    <TableCell className="text-right">R$ {cr.initialAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{cr.finalAmount ? `R$ ${cr.finalAmount.toFixed(2)}` : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {activeTab === "produtos" && (
        <Card>
          <CardHeader>
            <CardTitle>Relação de Produtos e Estoque</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="text-right">Estoque</TableHead>
                  <TableHead className="text-right">Preço de Venda</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-center">Nenhum produto encontrado.</TableCell></TableRow>
                )}
                {products.map((p: any) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.category?.name || "-"}</TableCell>
                    <TableCell className="text-right font-medium">
                      <span className={p.stock <= p.minStock ? "text-red-500" : ""}>{p.stock} {p.unit}</span>
                    </TableCell>
                    <TableCell className="text-right">R$ {p.sellPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
