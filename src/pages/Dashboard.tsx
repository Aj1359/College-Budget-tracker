import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockCoSAData } from "@/lib/mockData";
import { BudgetOverview } from "@/components/BudgetOverview";
import { CouncilCard } from "@/components/CouncilCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Building2, Users, CalendarDays, TrendingUp, DollarSign } from "lucide-react";
import { SourcesOfFund } from "@/components/SourcesOfFund";
import { DetailedExpenditure } from "@/components/DetailedExpenditure";
import { FundBookingView } from "@/components/FundBookingView";

type View = 'dashboard' | 'sources' | 'expenditure' | 'bookings';

const Dashboard = () => {
  const navigate = useNavigate();
  const [data] = useState(mockCoSAData);
  const [currentView, setCurrentView] = useState<View>('dashboard');

  if (currentView === 'sources') {
    return <SourcesOfFund onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'expenditure') {
    return <DetailedExpenditure onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'bookings') {
    return <FundBookingView onBack={() => setCurrentView('dashboard')} />;
  }

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
          <div className="flex items-center gap-4 mb-4">
            <DollarSign className="w-12 h-12" />
            <h1 className="text-4xl font-bold">
              College Budget Tracker
            </h1>
          </div>
          <p className="text-xl text-white/80">Budget Dashboard 2025-26</p>
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

        {/* Budget Overview with Clickable Rows */}
        <div className="animate-slide-up">
          <Card className="p-6 bg-card border-border/50">
            <h2 className="text-2xl font-bold text-foreground mb-6">CoSA Total Budget 2025-26</h2>
            <div className="space-y-4">
              <div 
                className="p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                onClick={() => setCurrentView('sources')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Sources of Fund</span>
                  <span className="text-primary">₹{data.totalBudget.total.fundsAllocated.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div 
                className="p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                onClick={() => setCurrentView('expenditure')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Expenditure</span>
                  <span className="text-destructive">₹{data.totalBudget.total.expenditure.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div 
                className="p-4 bg-muted rounded-lg hover:bg-muted/80 cursor-pointer transition-colors"
                onClick={() => setCurrentView('bookings')}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Fund Booking</span>
                  <span className="text-warning">₹{data.totalBudget.total.fundBooking.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">Remaining</span>
                  <span className="text-accent">₹{(data.totalBudget.total.fundsAllocated - data.totalBudget.total.expenditure - data.totalBudget.total.fundBooking).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </Card>
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

        {/* Independent Clubs */}
        <Card className="p-6 bg-card border-border/50">
          <h3 className="text-xl font-bold text-foreground mb-4">Independent Clubs/Societies</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.independentClubs.map((club) => {
              const allocated = club.budget.total.fundsAllocated;
              const spent = club.budget.total.expenditure;
              const percentUsed = allocated > 0 ? ((spent / allocated) * 100).toFixed(0) : 0;
              
              return (
                <div
                  key={club.id}
                  className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer"
                  onClick={() => navigate(`/club/${club.id}`)}
                >
                  <p className="font-semibold text-foreground">{club.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">
                      ₹{allocated.toLocaleString('en-IN')}
                    </span>
                    <span className="text-primary font-semibold">{percentUsed}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
