import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

interface ExpenseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (expense: {
    date: string;
    purpose: string;
    amount: number;
    description: string;
    requisitionUrl?: string;
  }) => void;
}

export const ExpenseForm = ({ open, onClose, onSubmit }: ExpenseFormProps) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    purpose: "",
    amount: "",
    description: "",
  });
  const [requisitionFile, setRequisitionFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.purpose || !formData.amount || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    onSubmit({
      date: formData.date,
      purpose: formData.purpose,
      amount: parseFloat(formData.amount),
      description: formData.description,
      requisitionUrl: requisitionFile ? URL.createObjectURL(requisitionFile) : undefined,
    });

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      purpose: "",
      amount: "",
      description: "",
    });
    setRequisitionFile(null);
    
    toast.success("Expense submitted for approval");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setRequisitionFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (₹) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose">Purpose *</Label>
            <Input
              id="purpose"
              placeholder="e.g., Event supplies, Equipment purchase"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of the expense..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requisition">Requisition Document (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
              <input
                id="requisition"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="requisition" className="cursor-pointer">
                {requisitionFile ? (
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5 text-primary" />
                    <span className="text-sm text-foreground">{requisitionFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setRequisitionFile(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload requisition document
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PDF, PNG, JPG up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-primary">
              Submit for Approval
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
