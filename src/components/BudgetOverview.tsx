import { Card } from "@/components/ui/card";
import { BudgetData } from "@/types/budget";
import { TrendingUp, Wallet, CreditCard, DollarSign } from "lucide-react";

interface BudgetOverviewProps {
  budget: BudgetData;
  title: string;
}

export const BudgetOverview = ({ budget, title }: BudgetOverviewProps) => {
  const { total } = budget;
  const remaining = total.fundsAllocated - total.expenditure - total.fundBooking + total.externalFunding;
  const percentUsed = total.fundsAllocated > 0 
    ? (((total.expenditure + total.fundBooking) / total.fundsAllocated) * 100).toFixed(1)
    : 0;

  const stats = [
    {
      label: "Total Allocated",
      value: total.fundsAllocated,
      icon: Wallet,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Expenditure",
      value: total.expenditure,
      icon: CreditCard,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      label: "Fund Booking",
      value: total.fundBooking,
      icon: DollarSign,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      label: "External Funding",
      value: total.externalFunding,
      icon: TrendingUp,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Budget Utilization</p>
          <p className="text-2xl font-bold text-primary">{percentUsed}%</p>
        </div>
      </div>

      <Card className="bg-gradient-primary p-8 text-white border-0 shadow-glow">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Remaining Balance</p>
              <p className="text-4xl font-bold">₹{remaining.toLocaleString('en-IN')}</p>
            </div>
            <Wallet className="w-16 h-16 text-white/20" />
          </div>
          
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${100 - Number(percentUsed)}%` }}
            />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-6 bg-card hover:shadow-elevation-medium transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">
                ₹{stat.value.toLocaleString('en-IN')}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
