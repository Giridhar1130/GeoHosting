export interface CountryList {
    Title: string;
    ModerationComments: string;
    ISOLong: string;
    ISOShort: string;
    DatacenterGeoClearance: string;
    EdgeGeoClearance: string;
    AssessmentScope: string;
    AssessmentSchedule: string;
    Restrictions: string;
    CountryID: string;
    Region: string;
    Territory: string;
    LastGAPDate: Date;
    AverageRating: string;
    Modified: Date;
    Created: Date;
}

export interface ICountryModel {
    CountryId: number;
    Title: string;
    DatacenterGeoClearance: string;
    EdgeGeoClearance: string;
    AssessmentScope: string;
    AssessmentSchedule: string;
    Owner: string;
}