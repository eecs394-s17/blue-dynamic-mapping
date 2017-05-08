import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { PromptsRootPage } from '../pages/prompts-root-page/prompts-root-page';
import { HomePage } from '../pages/home/home';
import { PromptPage } from '../pages/prompt-page/prompt-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ResponseButton } from '../components/response-button/response-button';

@NgModule({
  declarations: [
    MyApp,
    PromptsRootPage,
    PromptPage,
    ResponseButton
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PromptsRootPage,
    PromptPage,
    ResponseButton
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
