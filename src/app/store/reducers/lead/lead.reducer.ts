import { Action, createReducer, on } from '@ngrx/store';
import { empytLead } from 'src/app/shared/constans/state.constant';
import { ILeadModel } from 'src/app/shared/models/state.model';
import { deleteLead, updateLeadInfo } from '../../actions/lead.actions';

export const QuickLead: ILeadModel = {...empytLead};

const _LeadReducer = createReducer(
    QuickLead,
    on(updateLeadInfo, (state, { payload }) => payload),
    on(deleteLead, () => QuickLead)
);

export function LeadReducer(state: ILeadModel = QuickLead, action: Action) {
    return _LeadReducer(state, action);
}
