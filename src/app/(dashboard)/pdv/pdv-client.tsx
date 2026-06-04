"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, ShoppingCart, Plus, Minus, Trash2, CreditCard, Banknote, QrCode, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { openCashRegister } from "@/app/actions/cash-register";
import { checkoutSale } from "@/app/actions/sales";

interface CartItem {
  product: any;
  quantity: number;
}

interface Payment {
  method: string;
  amount: number;
}

export function PDVClient({ products, customers, cashRegister }: { products: any[], customers: any[], cashRegister: any }) {
  const [isRegisterOpen, setIsRegisterOpen] = useState(!!cashRegister);
  const [initialAmount, setInitialAmount] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedMethod, setSelectedMethod] = useState("DINHEIRO");
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const lower = searchTerm.toLowerCase();
    return products.filter(p => 
      p.name.toLowerCase().includes(lower) || 
      p.barcode?.includes(searchTerm) || 
      p.internalCode?.toLowerCase().includes(lower)
    );
  }, [searchTerm, products]);

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.product.sellPrice * item.quantity), 0), [cart]);
  const total = Math.max(0, subtotal - discount);
  const totalPaid = useMemo(() => payments.reduce((acc, p) => acc + p.amount, 0), [payments]);
  const remaining = Math.max(0, total - totalPaid);

  useEffect(() => {
    if (remaining > 0) {
      setPaymentAmount(remaining);
    }
  }, [remaining]);

  const handleOpenRegister = async () => {
    try {
      await openCashRegister(initialAmount);
      setIsRegisterOpen(true);
      toast.success("Caixa aberto com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao abrir caixa");
    }
  };

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setSearchTerm("");
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQtd = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQtd };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const addPayment = () => {
    if (paymentAmount <= 0) return;
    setPayments(prev => [...prev, { method: selectedMethod, amount: paymentAmount }]);
    setPaymentAmount(0);
  };

  const removePayment = (index: number) => {
    setPayments(prev => prev.filter((_, i) => i !== index));
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return toast.error("Carrinho vazio");
    if (totalPaid < total) return toast.error("O valor pago é menor que o total da venda");

    setIsProcessing(true);
    try {
      await checkoutSale({
        cashRegisterId: cashRegister?.id || "", // Em um fluxo real, o id do caixa vem do backend ou context
        items: cart.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.sellPrice,
        })),
        payments: payments,
        discount: discount,
      });

      toast.success("Venda finalizada com sucesso!");
      setCart([]);
      setPayments([]);
      setDiscount(0);
    } catch (error: any) {
      toast.error(error.message || "Erro ao finalizar venda");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isRegisterOpen) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-[400px] shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4"><LockKeyhole className="h-12 w-12 text-zinc-400" /></div>
            <CardTitle className="text-2xl">Caixa Fechado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-center text-zinc-500">Para iniciar as vendas, você precisa abrir o caixa informando o valor inicial (fundo de troco).</p>
            <div className="space-y-2">
              <label className="text-sm font-medium">Valor Inicial (R$)</label>
              <Input type="number" step="0.01" value={initialAmount} onChange={(e) => setInitialAmount(parseFloat(e.target.value) || 0)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleOpenRegister}>Abrir Caixa</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-4 h-full">
      {/* Esquerda: Busca e Carrinho */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Busca */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-zinc-400" />
              <Input 
                className="pl-10 text-lg h-12" 
                placeholder="Buscar produto por nome ou código de barras..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            
            {/* Resultados Rápidos */}
            {searchTerm && (
              <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                {filteredProducts.map(p => (
                  <div key={p.id} onClick={() => addToCart(p)} className="p-2 border rounded-md cursor-pointer hover:border-primary hover:bg-primary/5 flex flex-col">
                    <span className="font-medium text-sm truncate">{p.name}</span>
                    <span className="text-xs text-muted-foreground">{p.barcode || p.internalCode || 'S/N'}</span>
                    <span className="font-bold text-primary mt-1">R$ {p.sellPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Carrinho */}
        <Card className="flex-1 flex flex-col min-h-[400px]">
          <CardHeader className="py-3 border-b">
            <CardTitle className="flex items-center text-lg"><ShoppingCart className="mr-2 h-5 w-5" /> Carrinho de Compras</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-0 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-400">
                Adicione produtos para iniciar a venda
              </div>
            ) : (
              <div className="divide-y">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
                    <div className="flex-1">
                      <div className="font-medium">{item.product.name}</div>
                      <div className="text-sm text-zinc-500">R$ {item.product.sellPrice.toFixed(2)} x {item.quantity} = R$ {(item.product.sellPrice * item.quantity).toFixed(2)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, -1)}><Minus className="h-4 w-4" /></Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, 1)}><Plus className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => removeFromCart(item.product.id)}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Direita: Resumo e Pagamento */}
      <div className="w-full lg:w-[400px] flex flex-col gap-4">
        <Card>
          <CardHeader className="py-3 border-b">
            <CardTitle className="text-lg">Resumo</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between text-zinc-500">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-500">
              <span>Desconto</span>
              <div className="flex items-center gap-1 w-24">
                <span>R$</span>
                <Input className="h-8 text-right" type="number" value={discount} onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div className="pt-3 border-t flex justify-between font-bold text-2xl text-primary">
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="py-3 border-b">
            <CardTitle className="text-lg">Pagamento</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "DINHEIRO", icon: Banknote, label: "Dinheiro" },
                { id: "PIX", icon: QrCode, label: "PIX" },
                { id: "DEBITO", icon: CreditCard, label: "Débito" },
                { id: "CREDITO", icon: CreditCard, label: "Crédito" },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-md border text-xs font-medium transition ${
                    selectedMethod === method.id ? "bg-primary text-primary-foreground border-primary" : "bg-white dark:bg-zinc-900 text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <method.icon className="h-5 w-5 mb-1" />
                  {method.label}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <Input 
                type="number" 
                step="0.01" 
                className="text-lg font-bold" 
                value={paymentAmount} 
                onChange={(e) => setPaymentAmount(parseFloat(e.target.value) || 0)} 
              />
              <Button onClick={addPayment} disabled={paymentAmount <= 0}>Add</Button>
            </div>

            {payments.length > 0 && (
              <div className="space-y-2 mt-4">
                <div className="text-sm font-medium">Pagamentos Adicionados:</div>
                {payments.map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-zinc-50 dark:bg-zinc-900 rounded-md text-sm border">
                    <span className="font-medium">{p.method}</span>
                    <div className="flex items-center gap-2">
                      <span>R$ {p.amount.toFixed(2)}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => removePayment(i)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-2 border-t flex justify-between text-sm">
                  <span>Falta Pagar:</span>
                  <span className={`font-bold ${remaining > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    R$ {remaining.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button 
              className="w-full h-14 text-lg font-bold" 
              disabled={cart.length === 0 || remaining > 0 || isProcessing}
              onClick={handleCheckout}
            >
              {isProcessing ? "Processando..." : "Finalizar Venda"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
