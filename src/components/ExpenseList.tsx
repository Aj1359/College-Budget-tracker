import { Expense } from "@/types/budget";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, IndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpenseListProps {
  expenses: Expense[];
}

export const ExpenseList = ({ expenses }: ExpenseListProps) => {
  const getStatusColor = (status: Expense["status"]) => {
    switch (status) {
      case "approved":
        return "bg-accent/20 text-accent border-accent/30";
      case "rejected":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-warning/20 text-warning border-warning/30";
    }
  };

  const getStatusText = (status: Expense["status"]) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      default:
        return "Pending Approval";
    }
  };

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <Card
          key={expense.id}
          className={cn(
            "p-6 bg-card border-border/50 hover:shadow-elevation-medium transition-all",
            "animate-fade-in"
          )}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-foreground">{expense.purpose}</h3>
                <Badge className={cn("border", getStatusColor(expense.status))}>
                  {getStatusText(expense.status)}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{expense.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                ₹{expense.amount.toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(expense.date).toLocaleDateString('en-IN')}</span>
            </div>
            {expense.requisitionUrl && (
              <Button variant="ghost" size="sm" asChild>
                <a href={expense.requisitionUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  View Requisition
                </a>
              </Button>
            )}
          </div>

          {expense.remarks && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground mb-1">Remarks:</p>
              <p className="text-sm text-muted-foreground">{expense.remarks}</p>
            </div>
          )}

          {expense.status === "approved" && expense.billUrl && (
            <div className="mt-4 flex items-center gap-4 p-3 bg-accent/10 rounded-lg">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Invoice Details</p>
                <p className="text-xs text-muted-foreground">
                  Date: {expense.invoiceDate} • Amount: ₹{expense.invoiceAmount?.toLocaleString('en-IN')}
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={expense.billUrl} target="_blank" rel="noopener noreferrer">
                  <FileText className="w-4 h-4 mr-2" />
                  View Bill
                </a>
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
