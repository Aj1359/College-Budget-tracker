import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockCoSAData } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus } from "lucide-react";
import { BudgetTable } from "@/components/BudgetTable";
import { ExpenseList } from "@/components/ExpenseList";
import { NewExpenseForm } from "@/components/NewExpenseForm";
import { ExternalFundingForm } from "@/components/ExternalFundingForm";
import { Expense } from "@/types/budget";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ClubDetail = () => {
  const { clubId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showFundingForm, setShowFundingForm] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  useEffect(() => {
    if (clubId) {
      fetchExpenses();
    }
  }, [clubId]);

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
        councilName: exp.council_name || "",
        expenseType: exp.expense_type as 'reimbursement' | 'party_payment',
        date: exp.date,
        activityType: exp.activity_type,
        itemType: exp.item_type as 'consumable' | 'non_consumable',
        amount: Number(exp.amount),
        paidBy: exp.paid_by || "",
        paidTo: exp.paid_to || "",
        billUrl: exp.bill_url || "",
        requisitionUrl: exp.requisition_url || "",
        description: exp.description || "",
        status: exp.status as any,
        remarks: exp.remarks || "",
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

  let club = null;
  let parentName = "";

  for (const council of mockCoSAData.councils) {
    const foundClub = council.clubs.find((c) => c.id === clubId);
    if (foundClub) {
      club = foundClub;
      parentName = council.name;
      break;
    }
  }

  if (!club) {
    club = mockCoSAData.independentClubs.find((c) => c.id === clubId);
    if (club) parentName = "Independent Club";
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

  const handleAddExpense = async (expenseData: any) => {
    try {
      const { error } = await supabase.from("expenses").insert({
        club_id: clubId!,
        council_name: parentName,
        expense_type: expenseData.expenseType,
        date: expenseData.date,
        activity_type: expenseData.activityType,
        item_type: expenseData.itemType,
        amount: Number(expenseData.amount),
        paid_by: expenseData.paidBy,
        paid_to: expenseData.paidTo,
        description: expenseData.description,
        status: 'pending_approval',
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

  const handleAddFunding = async (fundingData: any) => {
    try {
      const { error } = await supabase.from("external_funding").insert({
        club_id: clubId!,
        council_name: parentName,
        source: fundingData.source,
        amount: Number(fundingData.amount),
        date: fundingData.date,
        description: fundingData.description,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "External funding added successfully",
      });

      setShowFundingForm(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add funding",
        variant: "destructive",
      });
    }
  };

  if (loadingExpenses) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-xl text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
            <div className="flex gap-2">
              <Button
                onClick={() => setShowExpenseForm(true)}
                size="lg"
                className="bg-white text-primary hover:bg-white/90"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Expense
              </Button>
              <Button
                onClick={() => setShowFundingForm(true)}
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add External Funding
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        <Card className="p-6 bg-card border-border/50 animate-fade-in">
          <h2 className="text-2xl font-bold text-foreground mb-6">Budget Overview</h2>
          <BudgetTable budget={club.budget} />
        </Card>

        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Expenses</h2>
            <Button onClick={() => setShowExpenseForm(true)} variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
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

      <NewExpenseForm
        open={showExpenseForm}
        onClose={() => setShowExpenseForm(false)}
        onSubmit={handleAddExpense}
        clubId={clubId!}
        councilName={parentName}
      />
      
      <ExternalFundingForm
        open={showFundingForm}
        onClose={() => setShowFundingForm(false)}
        onSubmit={handleAddFunding}
        clubId={clubId!}
        councilName={parentName}
      />
    </div>
  );
};

export default ClubDetail;
