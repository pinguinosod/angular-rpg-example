import { TestBed, async } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroComponent } from './heroes/hero/hero.component';
import { AdventureComponent } from './adventure/adventure.component';
import { CreateHeroComponent } from './heroes/create-hero/create-hero.component';
import { EncounterComponent } from './adventure/encounter/encounter.component';
import { FighterComponent } from './adventure/encounter/fighter/fighter.component';
import { DebugToolsComponent } from './debug-tools/debug-tools.component';
import { DebugGetStateComponent } from './debug-tools/debug-get-state/debug-get-state.component';
import { DebugSetStateComponent } from './debug-tools/debug-set-state/debug-set-state.component';

import { StateService } from './state.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule
      ],
      providers: [StateService],
      declarations: [
        AppComponent,
        HeaderComponent,
        HeroesComponent,
        HeroComponent,
        CreateHeroComponent,
        AdventureComponent,
        EncounterComponent,
        FighterComponent,
        DebugToolsComponent,
        DebugGetStateComponent,
        DebugSetStateComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have partyEmbarked as false`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.partyEmbarked).toBeFalsy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('RPG Heroes');
  });
});
