import { Action, createReducer, on } from '@ngrx/store';
import { empytTeam } from 'src/app/shared/constans/state.constant';
import { ITeamModel } from 'src/app/shared/models/state.model';
import { deleteTeam, updateTeamInfo } from '../../actions/team.actions';

export const QuickTeam: Array<ITeamModel> = [{...empytTeam}]

const _TeamReducer = createReducer(
    QuickTeam,
    on(updateTeamInfo, (state, { payload }) => payload),
    on(deleteTeam, () => QuickTeam)
);

export function TeamReducer(state: Array<ITeamModel> = QuickTeam, action: Action) {
    return _TeamReducer(state, action);
}
