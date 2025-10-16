import { BudgetData } from "@/types/budget";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface BudgetTableProps {
  budget: BudgetData;
}

export const BudgetTable = ({ budget }: BudgetTableProps) => {
  const rows = [
    { label: "Funds Allocated", key: "fundsAllocated" as const },
    { label: "Expenditure", key: "expenditure" as const },
    { label: "Fund Booking", key: "fundBooking" as const },
    { label: "External Funding & Sponsorship", key: "externalFunding" as const },
  ];

  const calculateRemaining = (category: keyof BudgetData) => {
    const data = budget[category];
    return data.fundsAllocated - data.expenditure - data.fundBooking + data.externalFunding;
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-bold text-foreground">Category</TableHead>
              <TableHead className="text-right font-bold text-foreground">Particulars</TableHead>
              <TableHead className="text-right font-bold text-foreground">Equipment & Other</TableHead>
              <TableHead className="text-right font-bold text-foreground">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key} className="hover:bg-muted/30">
                <TableCell className="font-medium text-foreground">{row.label}</TableCell>
                <TableCell className="text-right text-foreground">
                  ₹{budget.particulars[row.key].toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-right text-foreground">
                  ₹{budget.equipment[row.key].toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground">
                  ₹{budget.total[row.key].toLocaleString('en-IN')}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-accent/10 font-bold">
              <TableCell className="text-foreground">Remaining Amount</TableCell>
              <TableCell className="text-right text-accent">
                ₹{calculateRemaining('particulars').toLocaleString('en-IN')}
              </TableCell>
              <TableCell className="text-right text-accent">
                ₹{calculateRemaining('equipment').toLocaleString('en-IN')}
              </TableCell>
              <TableCell className="text-right text-accent text-lg">
                ₹{calculateRemaining('total').toLocaleString('en-IN')}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Percentage Used Card */}
      <div className="grid grid-cols-3 gap-4">
        {(['particulars', 'equipment', 'total'] as const).map((category) => {
          const data = budget[category];
          const percentUsed = data.fundsAllocated > 0
            ? (((data.expenditure + data.fundBooking) / data.fundsAllocated) * 100).toFixed(1)
            : 0;
          
          return (
            <div key={category} className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground capitalize mb-2">{category}</p>
              <p className="text-2xl font-bold text-primary">{percentUsed}%</p>
              <p className="text-xs text-muted-foreground">Budget Used</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
