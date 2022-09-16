import { createSelector } from '@ngrx/store';
import { QuickState } from '../../reducers';

const leadSelector = (state: QuickState) => state.leadInfo;

export const getLeadSelector = createSelector(
    leadSelector,
    (Lead) => Lead
);


const teamSelector = (state: QuickState) => state.teamInfo;

export const getTeamSelector = createSelector(
    teamSelector,
    (Team) => Team
);
