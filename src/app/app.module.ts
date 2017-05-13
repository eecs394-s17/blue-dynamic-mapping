import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { PromptsRootPage } from '../pages/prompts-root-page/prompts-root-page';
import { HomePage } from '../pages/home-page/home-page';
import { PromptPage } from '../pages/prompt-page/prompt-page';
import { SummaryPage } from '../pages/summary-page/summary-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JournalPage } from '../pages/journal-page/journal-page';

import { ResponseButton } from '../components/response-button/response-button';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PromptsRootPage,
    PromptPage,
    SummaryPage,
    JournalPage,
    ResponseButton
  ],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PromptsRootPage,
    PromptPage,
    SummaryPage,
    JournalPage,
    ResponseButton
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
