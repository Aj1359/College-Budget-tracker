import { Card } from "@/components/ui/card";
import { Council } from "@/types/budget";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CouncilCardProps {
  council: Council;
  onClick: () => void;
}

export const CouncilCard = ({ council, onClick }: CouncilCardProps) => {
  const allocated = council.budget.total.fundsAllocated;
  const spent = council.budget.total.expenditure + council.budget.total.fundBooking;
  const remaining = allocated - spent + council.budget.total.externalFunding;
  const percentUsed = allocated > 0 ? ((spent / allocated) * 100).toFixed(1) : 0;
  const isHealthy = Number(percentUsed) < 70;

  const councilColors = {
    cultural: "from-purple-500 to-pink-500",
    sports: "from-green-500 to-emerald-500",
    scitech: "from-blue-500 to-cyan-500",
    academics: "from-orange-500 to-amber-500",
  };

  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300",
        "hover:scale-105 hover:shadow-glow",
        "bg-card border-border/50 backdrop-blur-sm",
        "group animate-fade-in"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 opacity-10 bg-gradient-to-br transition-opacity",
          "group-hover:opacity-20",
          councilColors[council.type]
        )}
      />
      
      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-foreground">{council.name}</h3>
          <div className={cn(
            "flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold",
            isHealthy ? "bg-accent/20 text-accent" : "bg-warning/20 text-warning"
          )}>
            {isHealthy ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {percentUsed}%
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Allocated</span>
            <span className="text-lg font-semibold text-foreground">
              ₹{allocated.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500 bg-gradient-to-r",
                councilColors[council.type]
              )}
              style={{ width: `${Math.min(Number(percentUsed), 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-muted-foreground">Spent</p>
              <p className="font-semibold text-foreground">₹{spent.toLocaleString('en-IN')}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Remaining</p>
              <p className={cn(
                "font-semibold",
                isHealthy ? "text-accent" : "text-warning"
              )}>
                ₹{remaining.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              {council.clubs.length} Club{council.clubs.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
