import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { IonicStorageModule } from '@ionic/storage';

import { PromptsRootPage } from '../pages/prompts-root-page/prompts-root-page';
import { HomePage } from '../pages/home-page/home-page';
import { PromptPage } from '../pages/prompt-page/prompt-page';
import { SummaryPage } from '../pages/summary-page/summary-page';
import { MantraPage } from '../pages/mantra-page/mantra-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ResponseButton } from '../components/response-button/response-button';
import {Autosize} from 'ionic2-autosize';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PromptsRootPage,
    PromptPage,
    SummaryPage,
    MantraPage,
    ResponseButton,
    Autosize,
  ],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PromptsRootPage,
    PromptPage,
    SummaryPage,
    MantraPage,
    ResponseButton
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
