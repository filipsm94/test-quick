import { createAction, props } from '@ngrx/store';
import { ILeadModel } from 'src/app/shared/models/state.model';

export const updateLeadInfo = createAction('[Core Module] update lead info', props<{payload: ILeadModel}>());
export const deleteLead = createAction('[Core Module] delete Lead');
