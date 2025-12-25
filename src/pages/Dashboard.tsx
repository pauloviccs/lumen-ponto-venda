import { 
  ShoppingBag, 
  Clock, 
  DollarSign, 
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useOrders } from '@/hooks/useOrders';
import { StatsCard } from '@/components/StatsCard';
import { KanbanColumn } from '@/components/KanbanColumn';
import { OrderStatus } from '@/types/order';

const kanbanStatuses: OrderStatus[] = [
  'pending_payment',
  'paid', 
  'preparing', 
  'ready',
  'delivering'
];

export default function Dashboard() {
  const { activeOrders, ordersByStatus, advanceOrder } = useOrders();

  const totalRevenue = activeOrders
    .filter(o => o.status !== 'pending_payment' && o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const avgTime = 18; // Mock average time

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seus pedidos em tempo real
            </p>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">
              Sistema Online
            </span>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Pedidos Ativos"
            value={activeOrders.length}
            icon={ShoppingBag}
            variant="primary"
          />
          <StatsCard
            title="Aguardando Pagamento"
            value={ordersByStatus('pending_payment').length}
            icon={AlertCircle}
            variant="warning"
          />
          <StatsCard
            title="Tempo Médio"
            value={`${avgTime} min`}
            icon={Clock}
            variant="default"
          />
          <StatsCard
            title="Faturamento"
            value={`R$ ${totalRevenue.toFixed(2)}`}
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
            variant="success"
          />
        </div>

        {/* Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-6 min-w-max">
            {kanbanStatuses.map(status => (
              <KanbanColumn
                key={status}
                status={status}
                orders={ordersByStatus(status)}
                onAdvanceOrder={advanceOrder}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
