import { TestBed, async } from '@angular/core/testing';

import { StateService } from './../../state.service';

import { FighterComponent } from './fighter/fighter.component';
import { EncounterComponent } from './encounter.component';

import { Party } from './party.enum';
import { Hero } from 'src/app/Hero';

describe('EncounterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
      declarations: [
        EncounterComponent,
        FighterComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.debugElement.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should render encounter with title Battle in a h2 tag', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    fixture.componentInstance.monsters = [];
    fixture.componentInstance.heroes = [];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Battle');
  });

  it('should initialize combat log with starting text', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    const componentInstance = fixture.debugElement.componentInstance;
    expect(componentInstance.combatLog).toEqual(['Combat started...']);
  });

  it('should render combat log with combat text', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    fixture.componentInstance.monsters = [];
    fixture.componentInstance.heroes = [];
    fixture.componentInstance.combatLog = ['I like when you get mad', 'I guess I\'m pretty glad', 'that you\'re alone'];
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('ul > li')[0].textContent).toContain('that you\'re alone');
    expect(compiled.querySelectorAll('ul > li')[1].textContent).toContain('I guess I\'m pretty glad');
    expect(compiled.querySelectorAll('ul > li')[2].textContent).toContain('I like when you get mad');
  });

  it('should generate fiendly party based on heroes', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    fixture.componentInstance.monsters = [];
    const heroMartin: Hero = new Hero(1, 'Martin', 0, 12, 13, 14);
    const heroLucas: Hero = new Hero(2, 'Lucas', 0, 15, 16, 17);
    fixture.componentInstance.heroes = [heroMartin, heroLucas];
    fixture.detectChanges();
    const componentInstance = fixture.debugElement.componentInstance;
    expect(componentInstance.friendlyParty).toEqual([
      {
        id: heroMartin.getId(),
        name: heroMartin.getName(),
        party: Party.FRIEND,
        minAttack: heroMartin.getMinAttack(),
        maxAttack: heroMartin.getMaxAttack(),
        hpCurrent: heroMartin.getHP(),
        hpMax: heroMartin.getHP()
      },
      {
        id: heroLucas.getId(),
        name: heroLucas.getName(),
        party: Party.FRIEND,
        minAttack: heroLucas.getMinAttack(),
        maxAttack: heroLucas.getMaxAttack(),
        hpCurrent: heroLucas.getHP(),
        hpMax: heroLucas.getHP()
      }
    ]);
  });

  it('should generate enemy party based on monsters', () => {
    const fixture = TestBed.createComponent(EncounterComponent);
    fixture.componentInstance.monsters = [
      { id: 1, name: 'Goblin Fighter', minAttack: 5, maxAttack: 10, hp: 30 },
      { id: 2, name: 'Goblin Archer', minAttack: 5, maxAttack: 20, hp: 15 }
    ];
    fixture.componentInstance.heroes = [];
    fixture.detectChanges();
    const componentInstance = fixture.debugElement.componentInstance;
    expect(componentInstance.enemyParty).toEqual([
      { id: 1, name: 'Goblin Fighter', party: Party.ENEMY, minAttack: 5, maxAttack: 10, hpCurrent: 30, hpMax: 30 },
      { id: 2, name: 'Goblin Archer', party: Party.ENEMY, minAttack: 5, maxAttack: 20, hpCurrent: 15, hpMax: 15 }
    ]);
  });
});
