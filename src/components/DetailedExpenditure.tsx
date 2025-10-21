import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Expense } from "@/types/budget";
import { Badge } from "@/components/ui/badge";

interface DetailedExpenditureProps {
  onBack: () => void;
}

export const DetailedExpenditure = ({ onBack }: DetailedExpenditureProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("status", "paid")
        .order("date", { ascending: false });

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
        status: exp.status as any,
      })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load expenses",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-white shadow-elevation-high">
        <div className="container mx-auto px-6 py-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold">Detailed Expenditure</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card className="p-6 bg-card border-border/50">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Council</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Activity Type</TableHead>
                    <TableHead>Item Type</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Bill</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                      <TableCell>{expense.councilName}</TableCell>
                      <TableCell>{expense.clubId}</TableCell>
                      <TableCell>{expense.activityType}</TableCell>
                      <TableCell>
                        <Badge variant={expense.itemType === 'consumable' ? 'secondary' : 'outline'}>
                          {expense.itemType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={expense.expenseType === 'reimbursement' ? 'default' : 'secondary'}>
                          {expense.expenseType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        ₹{expense.amount.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell>
                        {expense.billUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(expense.billUrl, '_blank')}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={6} className="font-bold">Total Expenditure</TableCell>
                    <TableCell className="text-right font-bold text-primary">
                      ₹{total.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};