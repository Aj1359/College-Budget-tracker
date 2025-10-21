import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Expense } from "@/types/budget";
import { Badge } from "@/components/ui/badge";

interface FundBookingViewProps {
  onBack: () => void;
}

export const FundBookingView = ({ onBack }: FundBookingViewProps) => {
  const [bookings, setBookings] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .in("status", ["pending_approval", "approved", "awaiting_bill", "pending_payment"])
        .order("date", { ascending: false });

      if (error) throw error;

      setBookings(data.map(exp => ({
        id: exp.id,
        clubId: exp.club_id,
        councilName: exp.council_name || "",
        expenseType: exp.expense_type as 'reimbursement' | 'party_payment',
        date: exp.date,
        activityType: exp.activity_type,
        itemType: exp.item_type as 'consumable' | 'non_consumable',
        amount: Number(exp.amount),
        status: exp.status as any,
      })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load fund bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const total = bookings.reduce((acc, booking) => acc + booking.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_approval': return 'warning';
      case 'approved': return 'default';
      case 'awaiting_bill': return 'secondary';
      case 'pending_payment': return 'default';
      default: return 'outline';
    }
  };

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
          <h1 className="text-4xl font-bold">Fund Bookings</h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Card className="p-6 bg-card border-border/50">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Council</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>Activity Type</TableHead>
                  <TableHead>Item Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                    <TableCell>{booking.councilName}</TableCell>
                    <TableCell>{booking.clubId}</TableCell>
                    <TableCell>{booking.activityType}</TableCell>
                    <TableCell>
                      <Badge variant={booking.itemType === 'consumable' ? 'secondary' : 'outline'}>
                        {booking.itemType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(booking.status) as any}>
                        {booking.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{booking.amount.toLocaleString('en-IN')}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell colSpan={6} className="font-bold">Total Bookings</TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    ₹{total.toLocaleString('en-IN')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};