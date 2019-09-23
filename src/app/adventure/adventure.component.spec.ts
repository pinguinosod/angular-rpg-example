import { TestBed, async } from '@angular/core/testing';

import { StateService } from './../state.service';

import { AdventureComponent } from './adventure.component';
import { EncounterComponent } from './encounter/encounter.component';
import { FighterComponent } from './encounter/fighter/fighter.component';

describe('AdventureComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
      declarations: [
        AdventureComponent,
        EncounterComponent,
        FighterComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(AdventureComponent);
    const componentInstance = fixture.debugElement.componentInstance;
    expect(componentInstance).toBeTruthy();
  });
});
