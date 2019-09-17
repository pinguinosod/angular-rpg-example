import { Component, OnInit } from '@angular/core';

import { StateService } from './../state.service';
import monsters from './../../assets/monsters.json';
import { Monster } from './monster';
import { Hero } from './../Hero';

@Component({
  selector: 'app-adventure',
  templateUrl: './adventure.component.html',
  styleUrls: ['./adventure.component.css']
})
export class AdventureComponent implements OnInit {

  public monsters: Monster[];
  public heroes: Hero[];

  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.monsters = monsters;
    this.heroes = this.stateService.getHeroes();
  }

}
