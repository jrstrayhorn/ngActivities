import { IActivity } from './activity.model';
export interface ActivityState {
  activities: IActivity[];
  loadingInitial: boolean;
}
