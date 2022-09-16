import { Observable } from 'rxjs';
import { ILeadModel, ITeamModel } from '../../models/state.model';

export interface IStorageService {
  updateLead(lead: ILeadModel): void;

  updateTeam(team: Array<ITeamModel>): void;

  getLead(): Promise<ILeadModel>;
  
  getTeam(): Observable<Array<ITeamModel>>;

  clearInfo(): void
}
