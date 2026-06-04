"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createProduct, updateProduct, deleteProduct } from "@/app/actions/products";

const formSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  internalCode: z.string().optional(),
  barcode: z.string().optional(),
  description: z.string().optional(),
  costPrice: z.coerce.number().min(0, "Preço inválido"),
  sellPrice: z.coerce.number().min(0, "Preço inválido"),
  stock: z.coerce.number().min(0, "Estoque inválido"),
  minStock: z.coerce.number().min(0, "Estoque inválido"),
  unit: z.string().min(1, "Unidade é obrigatória"),
  imageUrl: z.string().url("URL inválida").optional().or(z.literal("")),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
});

type FormValues = z.infer<typeof formSchema>;

export function ProductClient({ products, categories }: { products: any[], categories: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      internalCode: "",
      barcode: "",
      description: "",
      costPrice: 0,
      sellPrice: 0,
      stock: 0,
      minStock: 0,
      unit: "UN",
      imageUrl: "",
      categoryId: "",
    },
  });

  function openNew() {
    setEditingId(null);
    form.reset({
      name: "", internalCode: "", barcode: "", description: "",
      costPrice: 0, sellPrice: 0, stock: 0, minStock: 0,
      unit: "UN", imageUrl: "", categoryId: "",
    });
    setIsOpen(true);
  }

  function openEdit(product: any) {
    setEditingId(product.id);
    form.reset({
      name: product.name,
      internalCode: product.internalCode || "",
      barcode: product.barcode || "",
      description: product.description || "",
      costPrice: product.costPrice,
      sellPrice: product.sellPrice,
      stock: product.stock,
      minStock: product.minStock,
      unit: product.unit,
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId || "",
    });
    setIsOpen(true);
  }

  async function onSubmit(data: FormValues) {
    setIsLoading(true);
    try {
      if (editingId) {
        await updateProduct(editingId, data);
        toast.success("Produto atualizado!");
      } else {
        await createProduct(data);
        toast.success("Produto criado!");
      }
      setIsOpen(false);
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar o produto.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    try {
      await deleteProduct(id);
      toast.success("Produto removido!");
    } catch (error) {
      toast.error("Não é possível excluir o produto pois ele pode estar vinculado a uma venda.");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Produtos</h2>
        <Button onClick={openNew}>
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </div>

      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Código/Ref</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-muted-foreground">
                  Nenhum produto cadastrado.
                </TableCell>
              </TableRow>
            )}
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-8 h-8 rounded-md object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-md bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-zinc-400" />
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.internalCode || product.barcode || "-"}</TableCell>
                <TableCell>{product.category?.name || "-"}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.sellPrice)}
                </TableCell>
                <TableCell>
                  <span className={product.stock <= product.minStock ? "text-red-500 font-medium" : ""}>
                    {product.stock} {product.unit}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(product)}>
                    <Edit className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto *</FormLabel>
                      <FormControl><Input placeholder="Ex: Coca-Cola 2L" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="internalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código Interno</FormLabel>
                      <FormControl><Input placeholder="Ex: COD-001" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de Barras (EAN/GTIN)</FormLabel>
                      <FormControl><Input placeholder="Ex: 7891234567890" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço de Custo (R$)</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sellPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preço de Venda (R$) *</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque Atual</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="minStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estoque Mínimo</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unidade de Medida</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="UN" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="UN">Unidade (UN)</SelectItem>
                          <SelectItem value="KG">Quilograma (KG)</SelectItem>
                          <SelectItem value="CX">Caixa (CX)</SelectItem>
                          <SelectItem value="L">Litro (L)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL da Imagem</FormLabel>
                      <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição Detalhada</FormLabel>
                    <FormControl><Input placeholder="Detalhes do produto" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Produto
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
