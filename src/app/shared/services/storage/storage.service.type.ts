import { ICarModel } from '../../models/car.model';
import { ILeadModel, ITeamModel } from '../../models/state.model';

export interface IStorageService {
  updateLead(lead: ILeadModel): void;

  updateTeam(team: Array<ITeamModel>): void;

  getLead(): Promise<ILeadModel>;
  
  getTeam(): Promise<Array<ITeamModel>>;

  clearInfo(): void
}
