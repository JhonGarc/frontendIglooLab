"use client";
import { Header } from "@/modules/core/components/others/header";
import { ProductForm } from "@/modules/products/components/ProductForm";
import { ProductList } from "@/modules/products/components/ProductList";
import { useProducts } from "@/modules/products/hooks/useProducts";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { Product } from "@/modules/products/types/product.types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { products, loading, addProduct, deleteProduct } = useProducts();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  const handleAddProduct = async (productData: Omit<Product, "id">) => {
    try {
      await addProduct(productData);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      localStorage.removeItem("accessToken");
      router.push("/");
    }
  };

  if (!localStorage.getItem("accessToken")) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header user={user} onLogout={handleLogout} />
        <div className="flex items-center justify-center py-20">
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ProductForm onAddProduct={handleAddProduct} />
            </div>
          </div>
          <div className="lg:col-span-2">
            <ProductList 
              products={products} 
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </div>
  );
}