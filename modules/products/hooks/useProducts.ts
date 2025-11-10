import { useState, useEffect } from 'react';
import { Product } from '../types/product.types';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      
      const productsWithNumericIds = Array.isArray(data.data) 
        ? data.data.map((p: Product) => ({
            ...p,
            id: Number(p.id),
          }))
        : [];
      
      console.log('Productos cargados:', productsWithNumericIds); 
      setProducts(productsWithNumericIds);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const token = localStorage.getItem("accessToken");
    
    console.log('Enviando producto:', product);
    
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Error ${res.status}`);
    }
    
    const result = await res.json();
    
    console.log('Respuesta del backend al crear:', result);
    console.log('result.data:', result.data);
    console.log('result.data.id (sin procesar):', result.data?.id, 'Tipo:', typeof result.data?.id); 
    
    if (!result?.data) {
      throw new Error('Respuesta del servidor sin data');
    }

    const rawId = result.data.id;
    console.log('ID raw:', rawId, 'Tipo:', typeof rawId); 
    
    if (rawId === undefined || rawId === null) {
      throw new Error('El servidor no retornó un ID');
    }
    
    const numericId = parseInt(String(rawId), 10);
    
    if (isNaN(numericId)) {
      console.error('No se pudo convertir el ID:', rawId);
      throw new Error('ID inválido recibido del servidor');
    }
    
    const newProduct = {
      ...result.data,
      id: numericId,
    };
    
    console.log('Producto a agregar al estado:', newProduct);
    console.log('ID del producto:', newProduct.id, 'Tipo:', typeof newProduct.id);
    
    setProducts((prev) => {
      const updated = [...prev, newProduct];
      console.log('Estado actualizado:', updated);
      return updated;
    });
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

  const deleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const numericId = Number(id);
      
      console.log(' Intentando eliminar - ID recibido:', id, 'Tipo:', typeof id); 
      console.log('ID convertido:', numericId, 'Tipo:', typeof numericId); 
      console.log('Estado actual de productos:', products); 
      
      if (isNaN(numericId)) {
        throw new Error('ID inválido');
      }
      
      console.log('URL de eliminación:', `${API_URL}/${numericId}`); 
      
      const res = await fetch(`${API_URL}/${numericId}`, { 
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(' Respuesta del servidor:', res.status); 
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error del backend:', errorData); 
        throw new Error(errorData.message || `Error ${res.status}`);
      }
      
      console.log('Producto eliminado exitosamente del backend');
      
      setProducts((prev) => prev.filter((p) => Number(p.id) !== numericId));
    } catch (error) {
      console.error(' Error deleting product:', error);
      throw error;
    }
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    
    loadProducts();
  }, []);

  return { products, loading, addProduct, deleteProduct };
};