import { createAction, props } from '@ngrx/store';
import { ITeamModel } from 'src/app/shared/models/state.model';

export const updateTeamInfo = createAction('[Core Module] update Team info', props<{payload: Array<ITeamModel>}>());
export const deleteTeam = createAction('[Core Module] delete Team');