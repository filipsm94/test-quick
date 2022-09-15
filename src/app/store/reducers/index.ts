import { ActionReducerMap } from '@ngrx/store';
import { ILeadModel, ITeamModel } from 'src/app/shared/models/state.model';
import { LeadReducer } from './lead/lead.reducer';
import { TeamReducer } from './team/team.reducer';

export interface QuickState {
    leadInfo: ILeadModel;
    teamInfo: Array<ITeamModel>;
}

export const reducers: ActionReducerMap<QuickState> = {
    leadInfo: LeadReducer,
    teamInfo: TeamReducer
};
