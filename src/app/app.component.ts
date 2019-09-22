import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StateService } from './state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private partyEmbarked$: Subscription;
  public partyEmbarked = false;

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.partyEmbarked$ = this.stateService
      .embarkedUpdated
      .subscribe(
        (partyEmbarked: boolean) => this.partyEmbarked = partyEmbarked);
  }

  ngOnDestroy() {
    this.partyEmbarked$.unsubscribe();
  }

}
