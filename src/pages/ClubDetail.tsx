import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCoSAData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { BudgetTable } from "@/components/BudgetTable";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { Expense } from "@/types/budget";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ClubDetail = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading, hasRole } = useAuth();
  const { toast } = useToast();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && clubId) {
      fetchExpenses();
    }
  }, [user, clubId]);

  const fetchExpenses = async () => {
    try {
      setLoadingExpenses(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("club_id", clubId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setExpenses(data.map(exp => ({
        id: exp.id,
        clubId: exp.club_id,
        date: exp.date,
        purpose: exp.purpose,
        amount: Number(exp.amount),
        description: exp.description || "",
        requisitionUrl: exp.requisition_url || undefined,
        invoiceDate: exp.invoice_date || undefined,
        invoiceAmount: exp.invoice_amount ? Number(exp.invoice_amount) : undefined,
        billUrl: exp.bill_url || undefined,
        status: exp.status as "pending" | "approved" | "rejected",
      })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load expenses",
        variant: "destructive",
      });
    } finally {
      setLoadingExpenses(false);
    }
  };

  // Find club in all possible locations
  let club = null;
  let parentName = "";

  // Check councils
  for (const council of mockCoSAData.councils) {
    const foundClub = council.clubs.find((c) => c.id === clubId);
    if (foundClub) {
      club = foundClub;
      parentName = council.name;
      break;
    }
  }

  // Check independent clubs
  if (!club) {
    club = mockCoSAData.independentClubs.find((c) => c.id === clubId);
    if (club) parentName = "Independent Club";
  }

  // Check Meraz sections
  if (!club) {
    club = mockCoSAData.meraz.sections.find((c) => c.id === clubId);
    if (club) parentName = "Meraz";
  }

  if (!club) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Club not found</h1>
          <Button onClick={() => navigate("/")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const handleAddExpense = async (expense: Omit<Expense, "id" | "clubId" | "status">) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("expenses").insert({
        club_id: clubId!,
        submitted_by: user.id,
        date: expense.date,
        purpose: expense.purpose,
        amount: expense.amount,
        description: expense.description,
        requisition_url: expense.requisitionUrl,
        status: "pending",
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Expense submitted for approval",
      });

      await fetchExpenses();
      setShowExpenseForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit expense",
        variant: "destructive",
      });
    }
  };

  if (authLoading || loadingExpenses) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">{club.name}</h1>
              <p className="text-white/80 mt-2">{parentName}</p>
            </div>
            {(hasRole("admin") || hasRole("super_admin")) && (
              <Button
                onClick={() => setShowExpenseForm(true)}
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Expense
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Budget Overview */}
        <Card className="p-6 bg-card border-border/50 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-6">Budget Overview</h2>
          <BudgetTable budget={club.budget} />
        </Card>

        {/* Expenses Section */}
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Expenses</h2>
            {(hasRole("admin") || hasRole("super_admin")) && (
              <Button
                onClick={() => setShowExpenseForm(true)}
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            )}
          </div>

          {expenses.length > 0 ? (
            <ExpenseList expenses={expenses} />
          ) : (
            <Card className="p-12 bg-card border-border/50 text-center">
              <p className="text-muted-foreground mb-4">No expenses recorded yet</p>
              <Button onClick={() => setShowExpenseForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Expense
              </Button>
            </Card>
          )}
        </div>
      </div>

      {/* Expense Form Dialog */}
      <ExpenseForm
        open={showExpenseForm}
        onClose={() => setShowExpenseForm(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
};

export default ClubDetail;
