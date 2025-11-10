import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/modules/core/components/ui/card';
import { Label } from '@/modules/core/components/ui/label';
import { Input } from '@/modules/core/components/ui/input';
import { Textarea } from '@/modules/core/components/ui/textarea';
import { Button } from '@/modules/core/components/ui/button';
import { ProductFormProps } from '../types/product.types';

export function ProductForm({ onAddProduct }: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    price?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      newErrors.price = 'Ingrese un precio válido mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onAddProduct({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(Number(price).toFixed(2))
    });

    setName('');
    setDescription('');
    setPrice('');
    setErrors({});
  };

  return (
    <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <CardHeader className="relative">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <CardTitle className="text-gray-900">Nuevo Producto</CardTitle>
        </div>
        <CardDescription>
          Complete la información del producto farmacéutico
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">Nombre del producto *</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ej: Paracetamol 500mg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`h-11 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-blue-500'}`}
            />
            {errors.name && (
              <p className="text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Descripción detallada del producto..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`min-h-[100px] ${errors.description ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-blue-500'}`}
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-gray-700">Precio (USD) *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="price"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`h-11 pl-7 ${errors.price ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-blue-500'}`}
              />
            </div>
            {errors.price && (
              <p className="text-red-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                {errors.price}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full h-11 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 shadow-lg transition-all hover:shadow-xl">
            <Plus className="mr-2 h-5 w-5" />
            Agregar Producto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}