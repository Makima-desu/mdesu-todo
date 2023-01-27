import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class EnablingComponentsService {

  constructor() { }

  workspaceSettings: boolean = false // workspace settings component, hidden by default
  // task editor component, hidden by default

}
