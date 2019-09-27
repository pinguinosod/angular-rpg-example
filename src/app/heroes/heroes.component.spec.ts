import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { StateService } from 'src/app/state.service';

import { HeroesComponent } from './heroes.component';
import { CreateHeroComponent } from './create-hero/create-hero.component';
import { HeroComponent } from './hero/hero.component';
import { Hero } from '../Hero';
import { Role } from '../role.enum';

describe('HeroesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [StateService],
      declarations: [
        HeroesComponent,
        CreateHeroComponent,
        HeroComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    const componentInstance = fixture.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should render heroes in h2 tag', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Heroes');
  });

  it('should render Embark button if party has enough party members to embark', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.componentInstance.requiredPartySize = 2;
    fixture.componentInstance.heroes = [
      new Hero(1, 'DummyHeroOne', Role.Fighter, 10, 10, 11),
      new Hero(2, 'DummyHeroTwo', Role.Archer, 10, 10, 11)
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button#embarkButton').textContent).toContain('Embark');
  });

  it('should NOT render Embark button if party does NOT have enough party members to embark', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.componentInstance.requiredPartySize = 3;
    fixture.componentInstance.heroes = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button#embarkButton')).toBeNull();
  });

  it('should render create hero component if party does NOT have enough party members to embark', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.componentInstance.requiredPartySize = 4;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-create-hero')).not.toBeNull();
  });

  it('should NOT render create hero component if party has enough party members to embark', () => {
    const fixture = TestBed.createComponent(HeroesComponent);
    fixture.componentInstance.requiredPartySize = 3;
    fixture.componentInstance.heroes = [
      new Hero(1, 'DummyHeroOne', Role.Fighter, 10, 10, 11),
      new Hero(2, 'DummyHeroTwo', Role.Archer, 10, 10, 11),
      new Hero(3, 'DummyHeroThree', Role.Archer, 10, 10, 11)
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-create-hero')).toBeNull();
  });
});
