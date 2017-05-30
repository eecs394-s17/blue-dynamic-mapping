import { Component, ViewChild, NgZone } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { PromptsRootPage } from '../pages/prompts-root-page/prompts-root-page';
import { PromptChoicesPage } from '../pages/prompt-choices-page/prompt-choices-page';
import { ResponseChoicesPage } from '../pages/response-choices-page/response-choices-page';
import { HomePage } from '../pages/home-page/home-page';
import { PromptPage } from '../pages/prompt-page/prompt-page';
import { ReminderPage } from '../pages/reminder-page/reminder-page';
import { MantraPage } from '../pages/mantra-page/mantra-page';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JournalPage } from '../pages/journal-page/journal-page';
import { OldJournalsPage } from '../pages/view-old-journals-page/view-old-journals-page';

import { OldResponsesPage } from '../pages/view-old-responses-page/view-old-responses-page';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password'
import { Autosize} from 'ionic2-autosize';

import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'

})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any;
  zone: NgZone;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
  ) {

    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else {
          this.rootPage = HomePage;
          unsubscribe();
        }
      });
    });
 
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Home', component: HomePage }, 
      { title: 'View Old Journals', component: OldJournalsPage },
      { title: 'View Old Responses', component: OldResponsesPage },
      { title: 'Edit Prompts', component: PromptChoicesPage }

    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
