export type CouncilType = 'cultural' | 'sports' | 'scitech' | 'academics';

export interface BudgetRow {
  fundsAllocated: number;
  expenditure: number;
  fundBooking: number;
  externalFunding: number;
}

export interface BudgetData {
  particulars: BudgetRow;
  equipment: BudgetRow;
  total: BudgetRow;
}

export interface Club {
  id: string;
  name: string;
  budget: BudgetData;
  councilId?: string;
}

export interface Council {
  id: string;
  name: string;
  type: CouncilType;
  budget: BudgetData;
  clubs: Club[];
}

export interface Expense {
  id: string;
  clubId: string;
  councilName?: string;
  expenseType: 'reimbursement' | 'party_payment';
  date: string;
  activityType: string;
  itemType: 'consumable' | 'non_consumable';
  amount: number;
  paidBy?: string;
  paidTo?: string;
  billUrl?: string;
  requisitionUrl?: string;
  description?: string;
  accountName?: string;
  accountNumber?: string;
  branch?: string;
  ifscCode?: string;
  status: 'pending_approval' | 'approved' | 'awaiting_bill' | 'pending_payment' | 'paid' | 'rejected';
  remarks?: string;
  approvedAt?: string;
  paidAt?: string;
}

export interface SourceOfFund {
  id: string;
  month: string;
  feesCollected: number;
  sponsorship: number;
  others: number;
}

export interface ExternalFunding {
  id: string;
  clubId: string;
  councilName?: string;
  source: string;
  amount: number;
  date: string;
  description?: string;
  proofUrl?: string;
}

export interface CoSAData {
  totalBudget: BudgetData;
  councils: Council[];
  independentClubs: Club[];
  meraz: {
    budget: BudgetData;
    sections: Club[];
  };
  misc: BudgetData;
}
