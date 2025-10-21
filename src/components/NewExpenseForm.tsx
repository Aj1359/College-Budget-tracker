import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NewExpenseFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (expense: any) => void;
  clubId: string;
  councilName?: string;
}

export const NewExpenseForm = ({ open, onClose, onSubmit, clubId, councilName }: NewExpenseFormProps) => {
  const [expenseType, setExpenseType] = useState<'reimbursement' | 'party_payment'>('reimbursement');
  const [formData, setFormData] = useState({
    date: "",
    activityType: "",
    itemType: "consumable",
    amount: "",
    paidBy: "",
    paidTo: "",
    description: "",
    billFile: null as File | null,
    requisitionFile: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      clubId,
      councilName,
      expenseType,
    });
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      date: "",
      activityType: "",
      itemType: "consumable",
      amount: "",
      paidBy: "",
      paidTo: "",
      description: "",
      billFile: null,
      requisitionFile: null,
    });
    setExpenseType('reimbursement');
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        <Tabs value={expenseType} onValueChange={(v) => setExpenseType(v as any)}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reimbursement">Reimbursement</TabsTrigger>
            <TabsTrigger value="party_payment">Party Payment</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <TabsContent value="reimbursement" className="space-y-4">
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
                <Label htmlFor="activityType">Activity Type</Label>
                <Input
                  id="activityType"
                  value={formData.activityType}
                  onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="itemType">Item Type</Label>
                <Select
                  value={formData.itemType}
                  onValueChange={(value) => setFormData({ ...formData, itemType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consumable">Consumable</SelectItem>
                    <SelectItem value="non_consumable">Non-Consumable</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="paidBy">Paid By</Label>
                <Input
                  id="paidBy"
                  value={formData.paidBy}
                  onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="paidTo">Paid To</Label>
                <Input
                  id="paidTo"
                  value={formData.paidTo}
                  onChange={(e) => setFormData({ ...formData, paidTo: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="bill">Bill/Screenshot (Required)</Label>
                <Input
                  id="bill"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setFormData({ ...formData, billFile: e.target.files?.[0] || null })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Other Details</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </TabsContent>

            <TabsContent value="party_payment" className="space-y-4">
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
                <Label htmlFor="activityType">Activity Type</Label>
                <Input
                  id="activityType"
                  value={formData.activityType}
                  onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="itemType">Item Type</Label>
                <Select
                  value={formData.itemType}
                  onValueChange={(value) => setFormData({ ...formData, itemType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consumable">Consumable</SelectItem>
                    <SelectItem value="non_consumable">Non-Consumable</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="requisition">Requisition Form (Required)</Label>
                <Input
                  id="requisition"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({ ...formData, requisitionFile: e.target.files?.[0] || null })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Other Details</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </TabsContent>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit for Approval</Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};