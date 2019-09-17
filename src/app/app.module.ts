import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroComponent } from './heroes/hero/hero.component';
import { StateService } from './state.service';
import { HeaderComponent } from './header/header.component';
import { CreateHeroComponent } from './heroes/create-hero/create-hero.component';
import { AdventureComponent } from './adventure/adventure.component';
import { EncounterComponent } from './adventure/encounter/encounter.component';
import { DebugToolsComponent } from './debug-tools/debug-tools.component';
import { DebugGetStateComponent } from './debug-tools/debug-get-state/debug-get-state.component';
import { DebugSetStateComponent } from './debug-tools/debug-set-state/debug-set-state.component';
import { FighterComponent } from './adventure/encounter/fighter/fighter.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent,
    HeroesComponent,
    HeroComponent,
    HeaderComponent,
    CreateHeroComponent,
    AdventureComponent,
    EncounterComponent,
    DebugGetStateComponent,
    DebugToolsComponent,
    DebugSetStateComponent,
    FighterComponent],
  bootstrap: [AppComponent],
  providers: [StateService]
})
export class AppModule { }
