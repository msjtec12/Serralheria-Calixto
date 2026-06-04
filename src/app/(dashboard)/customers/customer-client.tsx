"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createCustomer, updateCustomer, deleteCustomer } from "@/app/actions/customers";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  document: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CustomerClient({ customers }: { customers: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      document: "",
      phone: "",
      email: "",
      address: "",
      notes: "",
    },
  });

  function openNew() {
    setEditingId(null);
    form.reset({
      name: "", document: "", phone: "", email: "", address: "", notes: "",
    });
    setIsOpen(true);
  }

  function openEdit(customer: any) {
    setEditingId(customer.id);
    form.reset({
      name: customer.name,
      document: customer.document || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      notes: customer.notes || "",
    });
    setIsOpen(true);
  }

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      if (editingId) {
        await updateCustomer(editingId, data);
        toast.success("Cliente atualizado!");
      } else {
        await createCustomer(data);
        toast.success("Cliente criado!");
      }
      setIsOpen(false);
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar o cliente.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este cliente?")) return;
    try {
      await deleteCustomer(id);
      toast.success("Cliente removido!");
    } catch (error) {
      toast.error("Não é possível excluir o cliente pois possui histórico de vendas.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Clientes</h2>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Novo Cliente
        </Button>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>CPF/CNPJ</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">
                  Nenhum cliente cadastrado.
                </TableCell>
              </TableRow>
            )}
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full">
                    <User className="h-4 w-4 text-zinc-500" />
                  </div>
                  {customer.name}
                </TableCell>
                <TableCell>{customer.document || "-"}</TableCell>
                <TableCell>{customer.phone || "-"}</TableCell>
                <TableCell>{customer.email || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(customer)}>
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(customer.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Nome Completo / Razão Social *</FormLabel>
                      <FormControl><Input placeholder="Ex: João da Silva" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF / CNPJ</FormLabel>
                      <FormControl><Input placeholder="Apenas números" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone / WhatsApp</FormLabel>
                      <FormControl><Input placeholder="(11) 90000-0000" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="joao@exemplo.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Endereço Completo</FormLabel>
                      <FormControl><Input placeholder="Rua A, 123 - Bairro" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Observações</FormLabel>
                      <FormControl><Input placeholder="Cliente fiel, gosta de desconto..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Cliente
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
