import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state.service';

@Component({
  selector: 'app-create-hero',
  templateUrl: './create-hero.component.html',
  styleUrls: ['./create-hero.component.css']
})
export class CreateHeroComponent implements OnInit {
  private newHeroName: string;

  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  addNewHero() {
    this.stateService.addHero(this.newHeroName);
    this.newHeroName = '';
  }

}
