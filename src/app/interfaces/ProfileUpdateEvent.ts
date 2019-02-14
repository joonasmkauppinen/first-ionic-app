import { SignupParams } from './user-params';

export interface ProfileUpdateEvent {
  wasUpdated: boolean;
  info: SignupParams;
}
