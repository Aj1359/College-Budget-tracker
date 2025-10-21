-- Drop existing expenses table and recreate with new structure
DROP TABLE IF EXISTS public.expenses CASCADE;

-- Create expense_type enum
CREATE TYPE public.expense_type AS ENUM ('reimbursement', 'party_payment');

-- Create item_type enum  
CREATE TYPE public.item_type AS ENUM ('consumable', 'non_consumable');

-- Create expense_status enum
CREATE TYPE public.expense_status AS ENUM ('pending_approval', 'approved', 'awaiting_bill', 'pending_payment', 'paid', 'rejected');

-- Create updated expenses table
CREATE TABLE public.expenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id TEXT NOT NULL,
  council_name TEXT,
  expense_type expense_type NOT NULL,
  date DATE NOT NULL,
  activity_type TEXT NOT NULL,
  item_type item_type NOT NULL,
  amount NUMERIC NOT NULL,
  paid_by TEXT,
  paid_to TEXT,
  bill_url TEXT,
  requisition_url TEXT,
  description TEXT,
  account_name TEXT,
  account_number TEXT,
  branch TEXT,
  ifsc_code TEXT,
  status expense_status NOT NULL DEFAULT 'pending_approval',
  remarks TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Create policies  
CREATE POLICY "Anyone can view expenses"
ON public.expenses
FOR SELECT
USING (true);

CREATE POLICY "Anyone can create expenses"
ON public.expenses
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update expenses"
ON public.expenses
FOR UPDATE
USING (true);

-- Create sources_of_fund table
CREATE TABLE public.sources_of_fund (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month TEXT NOT NULL,
  fees_collected NUMERIC NOT NULL DEFAULT 0,
  sponsorship NUMERIC NOT NULL DEFAULT 0,
  others NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sources_of_fund ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view sources of fund"
ON public.sources_of_fund
FOR SELECT
USING (true);

CREATE POLICY "Anyone can manage sources of fund"
ON public.sources_of_fund
FOR ALL
USING (true);

-- Create external_funding table
CREATE TABLE public.external_funding (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  club_id TEXT NOT NULL,
  council_name TEXT,
  source TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  proof_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.external_funding ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view external funding"
ON public.external_funding
FOR SELECT
USING (true);

CREATE POLICY "Anyone can manage external funding"
ON public.external_funding
FOR ALL
USING (true);

-- Create fund_asked table for Google Sheet links
CREATE TABLE public.fund_asked (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  entity_id TEXT NOT NULL UNIQUE,
  entity_type TEXT NOT NULL,
  sheet_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.fund_asked ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view fund asked"
ON public.fund_asked
FOR SELECT
USING (true);

CREATE POLICY "Anyone can manage fund asked"
ON public.fund_asked
FOR ALL
USING (true);

-- Add triggers for updated_at
CREATE TRIGGER update_expenses_updated_at
BEFORE UPDATE ON public.expenses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_sources_of_fund_updated_at
BEFORE UPDATE ON public.sources_of_fund
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_external_funding_updated_at
BEFORE UPDATE ON public.external_funding
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_fund_asked_updated_at
BEFORE UPDATE ON public.fund_asked
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();