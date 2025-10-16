import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCoSAData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { BudgetTable } from "@/components/BudgetTable";

const CouncilDetail = () => {
  const { councilId } = useParams();
  const navigate = useNavigate();
  const council = mockCoSAData.councils.find((c) => c.id === councilId);

  if (!council) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Council not found</h1>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white shadow-elevation-high">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold">{council.name}</h1>
          <p className="text-white/80 mt-2">{council.clubs.length} clubs under this council</p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Council Budget Overview */}
        <Card className="p-6 bg-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Council Budget Overview</h2>
          </div>
          <BudgetTable budget={council.budget} />
        </Card>

        {/* Clubs List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Clubs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {council.clubs.map((club) => {
              const allocated = club.budget.total.fundsAllocated;
              const spent = club.budget.total.expenditure + club.budget.total.fundBooking;
              const remaining = allocated - spent + club.budget.total.externalFunding;
              const percentUsed = allocated > 0 ? ((spent / allocated) * 100).toFixed(1) : 0;

              return (
                <Card
                  key={club.id}
                  onClick={() => navigate(`/club/${club.id}`)}
                  className="p-6 bg-card hover:shadow-elevation-medium transition-all cursor-pointer hover:scale-105"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">{club.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Allocated</span>
                      <span className="font-semibold text-foreground">
                        ₹{allocated.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-primary transition-all duration-500"
                        style={{ width: `${Math.min(Number(percentUsed), 100)}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-muted-foreground">Used</p>
                        <p className="font-semibold text-primary">{percentUsed}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Remaining</p>
                        <p className="font-semibold text-accent">
                          ₹{remaining.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouncilDetail;
