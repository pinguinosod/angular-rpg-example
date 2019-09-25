import { TestBed, async } from '@angular/core/testing';
import { StateService } from 'src/app/state.service';

import { HeroComponent } from './hero.component';

import { Hero } from './../../Hero';
import { Role } from './../../role.enum';

describe('HeroComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [StateService],
      declarations: [
        HeroComponent
      ],
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    const componentInstance = fixture.debugElement.componentInstance;
    expect(componentInstance).toBeTruthy();
  });

  it('should render hero name in h4 tag', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(13, 'Clarissa Explains It All', Role.Fighter, 10, 10, 11);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Clarissa Explains It All');
  });

  it('should render different hero name in h4 tag', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(22, 'Sabrina the Teenage Witch', Role.Archer, 14, 11, 11);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Sabrina the Teenage Witch');
  });

  it('should render correct role name', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(61, 'Archie the Archer', Role.Archer, 14, 8, 14);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-child(1) > td').textContent).toContain('Archer');
  });

  it('should render correct different role name', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(51, 'Fighta the Fighter', Role.Fighter, 14, 14, 8);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-child(1) > td').textContent).toContain('Fighter');
  });

  it('should render correct DEX stat', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(44, 'Dexter', Role.Archer, 10, 14, 9);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-child(2) > td').textContent).toContain('14');
  });

  it('should render correct different DEX stat', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(42, 'Shakyhandy', Role.Fighter, 10, 7, 12);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-child(2) > td').textContent).toContain('7');
  });

  it('should render correct STR stat', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(33, 'Musclehead Steve', Role.Fighter, 10, 9, 16);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-child(3) > td').textContent).toContain('16');
  });

  it('should render correct different STR stat', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(34, 'Thin Tim', Role.Archer, 10, 11, 7);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-child(3) > td').textContent).toContain('7');
  });

  it('should render Dismiss button if party is NOT embarked', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(35, 'Dylan the Lucky', Role.Archer, 7, 7, 7);
    fixture.componentInstance.partyEmbarked = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('Dismiss');
  });

  it('should NOT render delete button if party is embarked', () => {
    const fixture = TestBed.createComponent(HeroComponent);
    fixture.componentInstance.hero = new Hero(36, 'Eugene Horowitz', Role.Fighter, 13, 13, 13);
    fixture.componentInstance.partyEmbarked = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('button')).toBeNull();
  });
});
