import {Injectable} from '@angular/core';
import {NgbConfig} from '../ngb-config';

@Injectable()
export class NgbConfigAnimation extends NgbConfig {
  animation = true;
}
