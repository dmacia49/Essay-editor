import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { EssayEditor } from './components/essay-editor/essay-editor';
import { FlagSuggestPanel } from './components/flag-suggest-panel/flag-suggest-panel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    EssayEditor,
    FlagSuggestPanel
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ],
  bootstrap: [App]
})
export class AppModule { }
