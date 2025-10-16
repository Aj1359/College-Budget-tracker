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
  date: string;
  purpose: string;
  amount: number;
  description: string;
  requisitionUrl?: string;
  invoiceDate?: string;
  invoiceAmount?: number;
  billUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  remarks?: string;
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
