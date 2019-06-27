export interface CountryIntake {
  // name: string;
  Id: number;
  IsActive: boolean;
  AssessmentStatus: string;
  // symbol: string;
  Scope: string;
  Owner: { Email: string, TypeId: string, LookupId: number, LookupValue: string };
  Priority: string;
  Country: string;
  AdminComments: string; 
  MyFields: MyFields;
  KickoffDate: Date;
  DueDate: Date;
  AverageRating: string;
  CompletedDate: Date;
  FormId: number;
  Modified: Date;
}

interface MyFields {
  AssessmentID: string;
  FormName: string;
  GAPIntakeName: string;
  GapAdminGroupDetails: GapAdminGroupDetails;
  NewForm: string;   // pay attention
  Section1details: Section1details;
  Section2details: Section2details;
  Section3details: Section3details;
}

interface GapAdminGroupDetails {
  FormID: number;
  GAPStatus: string;
  NewFormStatus: string;
  AdminComments: string;
  Admin: string;
}

interface Section1details {
  Priority: string;
  Country: string;
  Justification: string;
  Scope: string;
  DateSubmitted: Date;
  GeoLocationOwner: string;
}

interface Section2details {
  PortfolioComments: string;
  ProposedSites: string;
  group16: CurrentPortfolioRoot;
}

interface Section3details {
  group9: InProgressSitesGroupRoot;
  CurrentOnlineSvr: string;
  CurrentOtherSvr: string;
  CustomerComments: string; // Additional customer/service comments
  DataRequirements: string; // Are there any known data sovereignty or data residency requirements?
  PlannedOnlineSvr: string;
  PlannedOtherSvr: string;
  ProposedOnlineSvr: string;
  ProposedOtherSvr: string;
  ServiceTargets: string; // Where are the customers or end users for these datacenters?
  Latency: string; // Are there any maximum latency requirements (in round trip time to customers)?
  CrossBorderDataFlows: string; // Do we expect the data to cross state or country borders at any point in its delivery to customers?
}

// interface Group16 {
//  // CurrentPortfolioRoot: CurrentPortfolioRoot;
//  CurrentPortfolio: CurrentPortfolio[];
// }

interface CurrentPortfolioRoot {
  CurrentPortfolio: CurrentPortfolio[];
}

interface Group9 {
  InProgressSitesGroupRoot: InProgressSitesGroupRoot;
}

interface InProgressSitesGroupRoot {
  InProgressSitesGroup: InProgressSitesGroup[];
}

export interface CurrentPortfolio {
  CurrentITCapacity: number;
  CurrentPortEstimatedSize: number;
  CurrentPortFacilitytype: string;
  CurrentPortOperationalTax: string;
  CurrentPortfolioDCcode: string;
}

export interface InProgressSitesGroup {
  InProgSitesDCcode: string;
  InProgOperationalTax: string;
  InProgFacilityType: string;
  InProgInitialSize: string; // Initial size in IT Capacity
  InProgEstimatedSize: string; // Estimated IT Capacity in 5 years
  InProgEstimatedInvestment: string;
  InProgEstimatedGoLive: string;
}