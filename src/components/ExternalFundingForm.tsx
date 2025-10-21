import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ExternalFundingFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (funding: any) => void;
  clubId: string;
  councilName?: string;
}

export const ExternalFundingForm = ({ open, onClose, onSubmit, clubId, councilName }: ExternalFundingFormProps) => {
  const [formData, setFormData] = useState({
    source: "",
    amount: "",
    date: "",
    description: "",
    proofFile: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      clubId,
      councilName,
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      source: "",
      amount: "",
      date: "",
      description: "",
      proofFile: null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add External Funding</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              required
              placeholder="e.g., Sponsor Name, Grant Name"
            />
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="proof">Proof Document (Optional)</Label>
            <Input
              id="proof"
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={(e) => setFormData({ ...formData, proofFile: e.target.files?.[0] || null })}
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Additional details about the funding"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Funding</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};