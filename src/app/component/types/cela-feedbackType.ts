export interface ITextArray {
  SourceId: number;  // before key
  Value: string;    // bebofre text
}

export interface ICelaFeedbackModel {
RiskLevel?: ITextArray;
FeedBackSummary?: string;
ActionItem?: string;
Details?: string;
Contacts?: string;
CPIRaiting?: string;
LicenseReqTerFib?: string;
SummaryLicense?: string;
GlobalNetworkRisk?: string;
FreedomRaiting?: string;
GlobalNetworkSummary?: string;
}
