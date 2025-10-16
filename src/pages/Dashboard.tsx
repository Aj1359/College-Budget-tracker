import { useState } from "react";
import { mockCoSAData } from "@/lib/mockData";
import { BudgetOverview } from "@/components/BudgetOverview";
import { CouncilCard } from "@/components/CouncilCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, Users, CalendarDays, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data] = useState(mockCoSAData);

  const quickStats = [
    {
      label: "Total Councils",
      value: data.councils.length,
      icon: Building2,
      color: "text-primary",
    },
    {
      label: "Total Clubs",
      value: data.councils.reduce((acc, c) => acc + c.clubs.length, 0) + data.independentClubs.length,
      icon: Users,
      color: "text-secondary",
    },
    {
      label: "Active Year",
      value: "2025-26",
      icon: CalendarDays,
      color: "text-accent",
    },
    {
      label: "Overall Usage",
      value: `${((data.totalBudget.total.expenditure / data.totalBudget.total.fundsAllocated) * 100).toFixed(0)}%`,
      icon: TrendingUp,
      color: "text-warning",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-elevation-high">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">CoSA Budget Tracker</h1>
              <p className="text-white/80">Council of Student Affairs • IIT Bhilai</p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              Academic Year 2025-26
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-6 bg-card border-border/50 hover:shadow-elevation-medium transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Budget Overview */}
        <div className="animate-slide-up">
          <BudgetOverview budget={data.totalBudget} title="CoSA Total Budget 2025-26" />
        </div>

        {/* Councils Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Councils</h2>
            <p className="text-sm text-muted-foreground">Click on a council to view details</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.councils.map((council, index) => (
              <div
                key={council.id}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CouncilCard
                  council={council}
                  onClick={() => navigate(`/council/${council.id}`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Independent Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Independent Clubs */}
          <Card className="p-6 bg-card border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-4">Independent Clubs</h3>
            <div className="space-y-3">
              {data.independentClubs.map((club) => {
                const allocated = club.budget.total.fundsAllocated;
                const spent = club.budget.total.expenditure;
                const percentUsed = allocated > 0 ? ((spent / allocated) * 100).toFixed(0) : 0;
                
                return (
                  <div
                    key={club.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => navigate(`/club/${club.id}`)}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{club.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{allocated.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{percentUsed}%</p>
                      <p className="text-xs text-muted-foreground">used</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Meraz Section */}
          <Card className="p-6 bg-card border-border/50">
            <h3 className="text-xl font-bold text-foreground mb-4">Meraz</h3>
            <div className="space-y-3">
              {data.meraz.sections.map((section) => {
                const allocated = section.budget.total.fundsAllocated;
                const spent = section.budget.total.expenditure;
                const percentUsed = allocated > 0 ? ((spent / allocated) * 100).toFixed(0) : 0;
                
                return (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                    onClick={() => navigate(`/meraz/${section.id}`)}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{section.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{allocated.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary">{percentUsed}%</p>
                      <p className="text-xs text-muted-foreground">used</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
