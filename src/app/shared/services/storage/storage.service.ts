import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { firstValueFrom, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { deleteLead, updateLeadInfo } from 'src/app/store/actions/lead.actions';
import { deleteTeam, updateTeamInfo } from 'src/app/store/actions/team.actions';
import { QuickState } from 'src/app/store/reducers';
import { getLeadSelector, getTeamSelector } from 'src/app/store/selectors/quick/quick.selectors';
import { ILeadModel, ITeamModel } from '../../models/state.model';
import { IStorageService } from './storage.service.type';

@Injectable()
export class StorageService implements IStorageService {

  constructor(private store: Store<QuickState>) { }
  
  private dispatchAction(action: TypedAction<any>) {
    this.store.dispatch(action);
  }
  
  public updateLead(lead: ILeadModel): void {
    this.dispatchAction(updateLeadInfo({ payload: lead}));
  }

  public updateTeam(team: Array<ITeamModel>): void {
    this.dispatchAction(updateTeamInfo({ payload: team}));
  }
  
  public getLead(): Promise<ILeadModel> {
    return firstValueFrom(this.store.pipe(
      select(getLeadSelector),
      map((Lead) => Lead),
      take(1)
    ))
  }

  public getTeam(): Observable<Array<ITeamModel>> {
    // return firstValueFrom(this.store.pipe(
    //   select(getTeamSelector),
    //   map((Team) => Team),
    //   take(1)
    // ))
    return this.store.select(getTeamSelector)
  }

  public clearInfo(): void {
    this.dispatchAction(deleteLead());
    this.dispatchAction(deleteTeam());
  }
}
