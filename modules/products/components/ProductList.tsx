import { Trash2, Package, DollarSign, ShoppingBag } from "lucide-react";

import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/modules/core/components/ui/alert-dialog";
import { Button } from "@/modules/core/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/modules/core/components/ui/card";

import { Badge } from "@/modules/core/components/ui/badge";
import { ProductListProps } from "../types/product.types";

export function ProductList({ products, onDeleteProduct }: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-gray-900">Lista de Productos</CardTitle>
          </div>
          <CardDescription>
            No hay productos registrados en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-20 h-20 bg-linear-to-r from-cyan-100 via-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <Package className="h-10 w-10 text-blue-500" />
            </div>
            <p className="text-gray-500">
              Agregue su primer producto usando el formulario
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalValue = products.reduce((sum, product) => sum + Number(product.price || 0), 0);


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="shadow-lg border-0 bg-linear-to-r from-cyan-500 via-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-cyan-100 mb-1">Total Productos</p>
                <p className="text-white">{products.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0 bg-linear-to-r from-green-500 via-teal-500 to-cyan-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1">Valor Total</p>
                <p className="text-white">${totalValue.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-white" />
            </div>
            <CardTitle className="text-gray-900">
              Catálogo de Productos
            </CardTitle>
          </div>
          <CardDescription>
            Gestione su inventario de productos farmacéuticos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all bg-white hover:border-blue-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="flex justify-between items-start gap-4 relative">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-linear-to-br from-cyan-100 via-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-cyan-200 group-hover:via-blue-200 group-hover:to-purple-200 transition-colors">
                        <span className="text-blue-700">#{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-13">
                      <Badge className="bg-linear-to-br from-green-500 via-teal-500 to-cyan-500 hover:from-green-600 hover:via-teal-600 hover:to-cyan-600 text-white border-0 shadow-sm">
                        <DollarSign className="h-3 w-3 mr-1" />
                        {Number(product.price || 0).toFixed(2)} USD
                      </Badge>
                    </div>
                  </div>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar producto?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará
                          permanentemente el producto ´{product.name}´ del
                          sistema.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDeleteProduct(product.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
