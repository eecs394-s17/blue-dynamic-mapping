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
import { JournalPage } from '../pages/journal-page/journal-page';
import { OldJournalsPage } from '../pages/view-old-journals-page/view-old-journals-page';
import { JournalDetailPage } from '../pages/journal-detail-page/journal-detail-page';

import { PromptChoicesPage } from '../pages/prompt-choices-page/prompt-choices-page';
import { ResponseChoicesPage } from '../pages/response-choices-page/response-choices-page'; 

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';

import { ResponseButton } from '../components/response-button/response-button';
import {Autosize} from 'ionic2-autosize';

import { AuthData } from '../providers/auth-data';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PromptsRootPage,
    PromptPage,
    SummaryPage,
    JournalPage,
    JournalDetailPage,
    OldJournalsPage,
    MantraPage,
    ResponseButton,
    Autosize,
    PromptChoicesPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ResponseChoicesPage
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
    JournalPage,
    JournalDetailPage,
    OldJournalsPage,
    MantraPage,
    PromptChoicesPage,
    ResponseChoicesPage,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    ResponseButton
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData
  ]
})
export class AppModule {}
