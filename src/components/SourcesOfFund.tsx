import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SourceOfFund } from "@/types/budget";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SourcesOfFundProps {
  onBack: () => void;
}

export const SourcesOfFund = ({ onBack }: SourcesOfFundProps) => {
  const [sources, setSources] = useState<SourceOfFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    month: "",
    feesCollected: "",
    sponsorship: "",
    others: "",
  });

  useEffect(() => {
    fetchSources();
  }, []);

  const fetchSources = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("sources_of_fund")
        .select("*")
        .order("month", { ascending: false });

      if (error) throw error;

      setSources(data.map(s => ({
        id: s.id,
        month: s.month,
        feesCollected: Number(s.fees_collected),
        sponsorship: Number(s.sponsorship),
        others: Number(s.others),
      })));
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load sources of fund",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("sources_of_fund").insert({
        month: formData.month,
        fees_collected: Number(formData.feesCollected),
        sponsorship: Number(formData.sponsorship),
        others: Number(formData.others),
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Source of fund added successfully",
      });

      setShowForm(false);
      setFormData({ month: "", feesCollected: "", sponsorship: "", others: "" });
      fetchSources();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add source",
        variant: "destructive",
      });
    }
  };

  const total = sources.reduce((acc, s) => acc + s.feesCollected + s.sponsorship + s.others, 0);

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
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold">Sources of Fund</h1>
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Source
            </Button>
          </div>
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
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Fund Collected from Fees</TableHead>
                  <TableHead className="text-right">Sponsorship</TableHead>
                  <TableHead className="text-right">Others</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map((source) => (
                  <TableRow key={source.id}>
                    <TableCell className="font-medium">{source.month}</TableCell>
                    <TableCell className="text-right">₹{source.feesCollected.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right">₹{source.sponsorship.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right">₹{source.others.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ₹{(source.feesCollected + source.sponsorship + source.others).toLocaleString('en-IN')}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Grand Total</TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{sources.reduce((acc, s) => acc + s.feesCollected, 0).toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{sources.reduce((acc, s) => acc + s.sponsorship, 0).toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    ₹{sources.reduce((acc, s) => acc + s.others, 0).toLocaleString('en-IN')}
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    ₹{total.toLocaleString('en-IN')}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </Card>
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Source of Fund</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="month">Month</Label>
              <Input
                id="month"
                type="month"
                value={formData.month}
                onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="fees">Fund Collected from Fees</Label>
              <Input
                id="fees"
                type="number"
                value={formData.feesCollected}
                onChange={(e) => setFormData({ ...formData, feesCollected: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="sponsorship">Sponsorship</Label>
              <Input
                id="sponsorship"
                type="number"
                value={formData.sponsorship}
                onChange={(e) => setFormData({ ...formData, sponsorship: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="others">Others</Label>
              <Input
                id="others"
                type="number"
                value={formData.others}
                onChange={(e) => setFormData({ ...formData, others: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Source</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};