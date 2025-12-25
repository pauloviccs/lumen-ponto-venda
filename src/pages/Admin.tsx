import { useState } from 'react';
import { 
  Settings, 
  Lock, 
  DollarSign, 
  TrendingUp,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatsCard } from '@/components/StatsCard';
import { cn } from '@/lib/utils';

export default function Admin() {
  const [isLocked, setIsLocked] = useState(true);
  const [pin, setPin] = useState('');
  const correctPin = '1234';

  const handleUnlock = () => {
    if (pin === correctPin) {
      setIsLocked(false);
      setPin('');
    } else {
      setPin('');
    }
  };

  const handlePinInput = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === correctPin) {
          setIsLocked(false);
          setPin('');
        } else {
          setTimeout(() => setPin(''), 300);
        }
      }
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 mb-4">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Área Restrita</h1>
            <p className="text-muted-foreground">Digite o PIN para acessar</p>
          </div>

          {/* PIN Display */}
          <div className="flex justify-center gap-3 mb-8">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className={cn(
                  "h-4 w-4 rounded-full transition-all duration-200",
                  i < pin.length ? "bg-primary scale-110" : "bg-muted"
                )}
              />
            ))}
          </div>

          {/* PIN Pad */}
          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '←'].map((digit, i) => (
              <button
                key={i}
                onClick={() => {
                  if (digit === '←') {
                    setPin(prev => prev.slice(0, -1));
                  } else if (digit) {
                    handlePinInput(digit);
                  }
                }}
                disabled={!digit}
                className={cn(
                  "h-16 rounded-xl font-mono text-2xl font-bold transition-all duration-200",
                  digit 
                    ? "bg-card border border-border hover:bg-muted hover:scale-105 active:scale-95" 
                    : "invisible",
                  digit === '←' && "text-muted-foreground text-xl"
                )}
              >
                {digit}
              </button>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            PIN padrão: 1234
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Settings className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Administração</h1>
              <p className="text-sm text-muted-foreground">
                Configurações e relatórios
              </p>
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={() => setIsLocked(true)}
            className="gap-2"
          >
            <Lock className="h-4 w-4" />
            Bloquear
          </Button>
        </div>
      </header>

      <main className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Faturamento Hoje"
            value="R$ 1.847,90"
            icon={DollarSign}
            trend={{ value: 23, isPositive: true }}
            variant="success"
          />
          <StatsCard
            title="Pedidos Hoje"
            value="47"
            icon={TrendingUp}
            variant="primary"
          />
          <StatsCard
            title="Ticket Médio"
            value="R$ 39,32"
            icon={DollarSign}
            variant="default"
          />
        </div>

        {/* Integrations Status */}
        <div className="rounded-xl border bg-card p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Status das Integrações
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">WhatsApp (Evolution API)</p>
                  <p className="text-sm text-muted-foreground">Recebendo mensagens</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Conectado</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-cyan-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Mercado Pago</p>
                  <p className="text-sm text-muted-foreground">Processando pagamentos</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Ativo</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Impressora Térmica</p>
                  <p className="text-sm text-muted-foreground">Não configurada</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Offline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <DollarSign className="h-5 w-5" />
              <span>Fechar Caixa</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>Relatório</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>Reconectar WA</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Settings className="h-5 w-5" />
              <span>Configurações</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
