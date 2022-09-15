import { ICountryModel } from "./country.model";

export interface ILeadModel {
    name: string,
    location: ICountryModel
}

export interface ITeamModel {
    location: ICountryModel
    amount: number,
}