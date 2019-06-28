import { IWebDriverOptionsCookie } from 'selenium-webdriver';

export interface GapFeedBack {
    Id: string;
    IsActive: boolean;
    GeoHostingOwner: string;
    AssessmentID: string;
    AssessmentStatus: string;
    AssignedTo: string;
    Author: Author;
    CompletedDate: Date;
    CountryName: string;
    DataCenterRiskLevel: string;
    AverageRating : string;
    Country: string;
    CountryID: string;
    Editor: {Email: string, LookupValue: string};
    FeedbackSummary: string;
    FormId: string;
    Modified: Date;
    MyFields: MyFields;
    NetworkRiskLevel: string;
    NewCompleteAssessmentID: string;
    NewCountryAssessmentID: string;
    NewFormName: string;
    RiskLevel: string;
    SubmitStatus: string;
    Submitted: Date;
    TaskStatus: string;
    TeamName: string;
    WorkflowVersion: number;
}

export interface MyFields {
  CommonFields: ICommonFields;
  Energy: IEnergy;
  InformationSecurityComplaince: IInformationSecurityComplaince;
  LCA: ILCA;
  LogicalSecurity: ILogicalSecurity;
  PhysicalSecurity: IPhysicalSecurity;
  RiskManagement: IRiskManagement;
  Summary: ISummary;
  TaskName: ITaskName;
  Tax: ITax;
  Treasury: ITreasury;
}
interface Author{
  Email: string;
  LookupId: string;
  LookupValue: string;
  TypeId: string;
}

export interface ICommonFields {
  AssignedTo: string;
  Country: string;
  CountryID: string;
  GeoHostingOwner: number;
  Priority: string;
  Scope: string;
}

export interface IEnergy {
  EnergyDetails: IEnergyDetails;
}

export interface IEnergyDetails {
  Co2Emission: string;
  EnergyRate: string;
  MarketStructure: string;
  Reliability: string; 
}

export interface IInformationSecurityComplaince {
  InformationSecurityComplainceDetails: IInformationSecurityComplainceDetails;
}

export interface IInformationSecurityComplainceDetails {
  ComplainceIssues: string;
  NationalInformationSecurity: string;
}

export interface ILCA {
  lcaDetails: ILCADetails;
}

export interface ILCADetails {
  CPIRating: string;
  dataSecurity: IDataSecurity;
  gni: IGNI;
  lawEnforcementCompliance: ILawEnforcementCompliance;
  mediaContentLiability: IMediaContntLiability;
  other: IOther;
  privacy: IPrivacy;
  telecommunications: ITelecommunications;
  LicenseRequirements: LicenseRequirements;
}

export interface IDataSecurity { // Data Security
  DataSecurityRisk: string;
  DataSecuritySummary: string;
}

export interface IGNI { // Global Network Initiative (GNI)
  GNIRating: string;
  GNISummary: string;
}

export interface ILawEnforcementCompliance {// Law Enforcement Compliance
  LECRisk: string;
  LECSummary: string;
}

export interface IMediaContntLiability { // Media / Content Liability
  MediaContentLiabilityRisk: string;
  MediaContentLiabilitySummary: string;
}

export interface IOther { // Pending Laws or Regulations
  DataResiReguSummary: string;
  DataResidencyRegulation: string; // data risk
  PendingLawRegulations: string; // pending summary
  PendingRisk: string;
}

export interface IPrivacy { // Privacy
  PrivacyRisk: string;
  PrivacySummary: string;
}

export interface ITelecommunications { // Telecommunications
  TelecommunicationsRisk: string;
  TelecommunicationsSummary: string;
}
export interface LicenseRequirements{
  TerrestrialRisk: string;
  TerrestrialSummary: string;
  SubmarineRisk: string;
  SubmarineSummary: string;
}

export interface ILogicalSecurity {
  logicalSecuritydetails: IlogicalSecuritydetails;
}

export interface IlogicalSecuritydetails{
  SecurityIssues: string;
}

export interface IPhysicalSecurity {
  PhysicalSecurityDetails: IPhysicalSecurityDetails;
  SecurityIssues: string;
  TravelWarningSection: string;
}

export interface IPhysicalSecurityDetails {
  BaselineSecurityRequirements: string;
  DepartTravelWarning: string;
  MicrosoftHeadCount: string;
  PhysicalSecurityPointofContact: Person;
  optionPhysical: string;
}

export interface Person {
  AccountId: string;
  AccountType: string;
  DisplayName: string;
}

export interface IRiskManagement {
  RiskManagementDetails: IRiskManagementDetails;
  SecurityIssues: string;
  TravelWarningSection: string;
}

export interface IRiskManagementDetails {
  GeneralRsikConsiderations: string;
  Insurability: IInsurability;
  Risk: IRisk;
}

export interface IInsurability {
  CyberRisk: string;
  GeneralLiability: string;
  PoliticalRisk: string;
  Property: string;
}

export interface IRisk {
  ExchangeTransferRisk: string;
  LegalandRegulartoryRisk: string;
  PoliticalViolenceRisk: string;
  LegalandRegulatoryRisk: string;
}

export interface ISummary {
  ActionItems: ActionItems[];
  FeedbackSummary: string;
  RiskMgmtRiskLevel: string;
}
export interface ITaskName {
  Name: string;
}
export interface ActionItems{
  ActionName: string;
  Details: string;
  Contact: string;
}
export interface ITreasury {
  TreasuryDetails: ITreasuryDetails;
}

export interface ITreasuryDetails {
      CountryCurrency: string;
      CurrencyRestrictionForiegnMarket: string;
      delayCountryPermission: string;
}

export interface ITax {
  DatacenterConsideration: IDatacenterConsideration;
  LegalEntity: string;
  LocalTaxContact: ILocalTaxContact;
  RestrictionsOnLocations: string;
  RestrictionOrTaxConsideration: string;
}

export interface IDatacenterConsideration {
  CorporateTaxRate: string;
  CreditableOptions: string;
  IncentivesandExemptions: string;
  PersonalPropertyTax: string;
  RealPropertyTax: string;
  RestrictionOnDatacenter: string;
  SalesTax: string;
  SalesTaxonServers: string;
  TaxRatesOptions: string;
  VATRates: string;
}

export interface ILocalTaxContact {
  AccountId: string;
  AccountType: string;
  DisplayName: string;
}

export interface IDialogConfig {
  title: string;
  country: string;
  user: {
      owner: string,
      scope: string,
      asignedTo: string,
      dueDate: Date,
      priority: string,
      completedDate: Date,
  }
}