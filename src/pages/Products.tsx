import { useState } from 'react';
import { Package, Search, Plus, ToggleLeft, ToggleRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  isAvailable: boolean;
}

const mockProducts: Product[] = [
  { id: '1', name: 'X-Burger', price: 18.90, category: 'Lanches', isAvailable: true },
  { id: '2', name: 'X-Salada', price: 20.90, category: 'Lanches', isAvailable: true },
  { id: '3', name: 'X-Bacon', price: 24.90, category: 'Lanches', isAvailable: false },
  { id: '4', name: 'Batata Frita P', price: 6.90, category: 'Acompanhamentos', isAvailable: true },
  { id: '5', name: 'Batata Frita G', price: 12.90, category: 'Acompanhamentos', isAvailable: true },
  { id: '6', name: 'Refrigerante Lata', price: 6.00, category: 'Bebidas', isAvailable: true },
  { id: '7', name: 'Suco Natural', price: 8.00, category: 'Bebidas', isAvailable: true },
  { id: '8', name: 'Água Mineral', price: 4.00, category: 'Bebidas', isAvailable: true },
  { id: '9', name: 'Açaí 300ml', price: 14.90, category: 'Sobremesas', isAvailable: true },
  { id: '10', name: 'Açaí 500ml', price: 19.90, category: 'Sobremesas', isAvailable: true },
];

export default function Products() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState('');

  const toggleAvailability = (productId: string) => {
    setProducts(prev => 
      prev.map(p => 
        p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Package className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Produtos</h1>
              <p className="text-sm text-muted-foreground">
                {products.filter(p => p.isAvailable).length} disponíveis
              </p>
            </div>
          </div>

          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Novo Produto
          </Button>
        </div>
      </header>

      <main className="p-6">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Products by Category */}
        <div className="space-y-8">
          {categories.map(category => {
            const categoryProducts = filteredProducts.filter(p => p.category === category);
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category}>
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  {category}
                  <Badge variant="secondary" className="font-mono">
                    {categoryProducts.length}
                  </Badge>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryProducts.map(product => (
                    <div
                      key={product.id}
                      className={cn(
                        "group flex items-center justify-between p-4 rounded-xl border bg-card transition-all duration-200",
                        product.isAvailable 
                          ? "border-border hover:border-primary/30" 
                          : "border-red-500/20 bg-red-500/5 opacity-60"
                      )}
                    >
                      <div>
                        <p className={cn(
                          "font-medium",
                          !product.isAvailable && "line-through text-muted-foreground"
                        )}>
                          {product.name}
                        </p>
                        <p className="font-mono text-lg font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => toggleAvailability(product.id)}
                        className="p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        {product.isAvailable ? (
                          <ToggleRight className="h-8 w-8 text-emerald-500" />
                        ) : (
                          <ToggleLeft className="h-8 w-8 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
