import { CoSAData, BudgetData, Club, Council } from "@/types/budget";

const createEmptyBudget = (allocated: number): BudgetData => ({
  particulars: {
    fundsAllocated: allocated * 0.6,
    expenditure: allocated * 0.2,
    fundBooking: allocated * 0.1,
    externalFunding: allocated * 0.1,
  },
  equipment: {
    fundsAllocated: allocated * 0.4,
    expenditure: allocated * 0.15,
    fundBooking: allocated * 0.05,
    externalFunding: allocated * 0.05,
  },
  total: {
    fundsAllocated: allocated,
    expenditure: allocated * 0.35,
    fundBooking: allocated * 0.15,
    externalFunding: allocated * 0.15,
  },
});

// Cultural Council Clubs
const culturalClubs: Club[] = [
  { id: 'beatbackers', name: 'Beatbackers', budget: createEmptyBudget(50000) },
  { id: 'gols', name: 'General Oratory and Literary Society', budget: createEmptyBudget(45000) },
  { id: 'drishya', name: 'Drishya', budget: createEmptyBudget(60000) },
  { id: 'fps', name: 'Film Production Society', budget: createEmptyBudget(70000) },
  { id: 'pixel', name: 'The Pixel Snappers', budget: createEmptyBudget(40000) },
  { id: 'renaissance', name: 'Renaissance', budget: createEmptyBudget(55000) },
  { id: 'quizzotica', name: 'Quizzotica', budget: createEmptyBudget(35000) },
  { id: 'swara', name: 'Swara', budget: createEmptyBudget(50000) },
  { id: 'designx', name: 'DesignX', budget: createEmptyBudget(45000) },
];

// SciTech Council Clubs
const scitechClubs: Club[] = [
  { id: 'space', name: 'Space Exploration', budget: createEmptyBudget(80000) },
  { id: 'misc-sci', name: 'MiSc Society', budget: createEmptyBudget(40000) },
  { id: 'epsilon', name: 'Epsilon', budget: createEmptyBudget(65000) },
  { id: 'spectre', name: 'Spectre', budget: createEmptyBudget(70000) },
  { id: 'bib', name: 'BIB', budget: createEmptyBudget(55000) },
  { id: 'ingenuity', name: 'Ingenuity', budget: createEmptyBudget(60000) },
  { id: 'electromos', name: 'Electromos', budget: createEmptyBudget(75000) },
  { id: 'motorsports', name: 'Motorsports', budget: createEmptyBudget(100000) },
  { id: 'dsai', name: 'Data Science and AI', budget: createEmptyBudget(70000) },
  { id: 'openlake', name: 'OpenLake', budget: createEmptyBudget(50000) },
  { id: 'gdg', name: 'GDG', budget: createEmptyBudget(45000) },
];

// Sports Council Clubs
const sportsClubs: Club[] = [
  { id: 'cricket', name: 'Cricket', budget: createEmptyBudget(90000) },
  { id: 'basketball', name: 'Basketball', budget: createEmptyBudget(70000) },
  { id: 'tabletennis', name: 'Table Tennis', budget: createEmptyBudget(50000) },
  { id: 'football', name: 'Football', budget: createEmptyBudget(85000) },
  { id: 'badminton', name: 'Badminton', budget: createEmptyBudget(60000) },
  { id: 'volleyball', name: 'Volleyball', budget: createEmptyBudget(55000) },
  { id: 'athletics', name: 'Athletics', budget: createEmptyBudget(75000) },
  { id: 'chess', name: 'Chess', budget: createEmptyBudget(30000) },
  { id: 'gym', name: 'Gym', budget: createEmptyBudget(120000) },
  { id: 'yoga', name: 'Yoga and Recreational', budget: createEmptyBudget(40000) },
  { id: 'sports-misc', name: 'Misc', budget: createEmptyBudget(35000) },
];

// Meraz Sections
const merazSections: Club[] = [
  { id: 'decor', name: 'Decor', budget: createEmptyBudget(150000) },
  { id: 'outreach', name: 'Outreach', budget: createEmptyBudget(80000) },
  { id: 'flashmob', name: 'Flashmob', budget: createEmptyBudget(50000) },
  { id: 'pronites', name: 'Pronites', budget: createEmptyBudget(300000) },
  { id: 'meraz-misc', name: 'Misc', budget: createEmptyBudget(70000) },
];

// Calculate council totals
const calculateCouncilTotal = (clubs: Club[]): BudgetData => {
  const total = clubs.reduce(
    (acc, club) => ({
      particulars: {
        fundsAllocated: acc.particulars.fundsAllocated + club.budget.particulars.fundsAllocated,
        expenditure: acc.particulars.expenditure + club.budget.particulars.expenditure,
        fundBooking: acc.particulars.fundBooking + club.budget.particulars.fundBooking,
        externalFunding: acc.particulars.externalFunding + club.budget.particulars.externalFunding,
      },
      equipment: {
        fundsAllocated: acc.equipment.fundsAllocated + club.budget.equipment.fundsAllocated,
        expenditure: acc.equipment.expenditure + club.budget.equipment.expenditure,
        fundBooking: acc.equipment.fundBooking + club.budget.equipment.fundBooking,
        externalFunding: acc.equipment.externalFunding + club.budget.equipment.externalFunding,
      },
      total: {
        fundsAllocated: acc.total.fundsAllocated + club.budget.total.fundsAllocated,
        expenditure: acc.total.expenditure + club.budget.total.expenditure,
        fundBooking: acc.total.fundBooking + club.budget.total.fundBooking,
        externalFunding: acc.total.externalFunding + club.budget.total.externalFunding,
      },
    }),
    createEmptyBudget(0)
  );
  return total;
};

const councils: Council[] = [
  {
    id: 'cultural',
    name: 'Cultural Council',
    type: 'cultural',
    budget: calculateCouncilTotal(culturalClubs),
    clubs: culturalClubs,
  },
  {
    id: 'scitech',
    name: 'SciTech Council',
    type: 'scitech',
    budget: calculateCouncilTotal(scitechClubs),
    clubs: scitechClubs,
  },
  {
    id: 'sports',
    name: 'Sports Council',
    type: 'sports',
    budget: calculateCouncilTotal(sportsClubs),
    clubs: sportsClubs,
  },
  {
    id: 'meraz',
    name: 'Meraz',
    type: 'cultural',
    budget: calculateCouncilTotal(merazSections),
    clubs: merazSections,
  },
];

const independentClubs: Club[] = [
  { id: 'fintech', name: 'Fintech Society', budget: createEmptyBudget(80000) },
  { id: 'ecell', name: 'E-Cell', budget: createEmptyBudget(90000) },
  { id: 'nirvana', name: 'Nirvana', budget: createEmptyBudget(70000) },
];

export const mockCoSAData: CoSAData = {
  totalBudget: createEmptyBudget(5000000),
  councils,
  independentClubs,
  meraz: {
    budget: calculateCouncilTotal([]),
    sections: [],
  },
  misc: createEmptyBudget(100000),
};
