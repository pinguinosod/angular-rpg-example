import { Component, OnInit } from '@angular/core';

import { StateService } from '../../state.service';
import { Hero } from '../../Hero';

@Component({
  selector: 'app-debug-get-state',
  templateUrl: './debug-get-state.component.html',
  styleUrls: ['./debug-get-state.component.css']
})
export class DebugGetStateComponent implements OnInit {

  public currentStateAsJSON: string;

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  getStateAsJSON() {
    this.currentStateAsJSON = JSON.stringify({
      heroes: this.stateService.getHeroes(),
      lastHeroId: this.stateService.getLastHeroId(),
      embarked: this.stateService.getPartyEmbarked(),
      coins: this.stateService.getCoins()
    });
  }

}
