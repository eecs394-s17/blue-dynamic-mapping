# Dynamic Mapping

Dynamic mapping and integration couple’s counseling helps couples identify and create
balance in the dynamic of their relationship. The dynamic is the pattern of the interaction of thoughts feelings and actions in a relationship. Understanding comes through discovering how information from their past, approach to conflict, communication styles and love languages interact with and effect their partner and the relationship. This app will assist you in your understanding of the dynamic map. You will track your conflict with your partner. this will allow you to better identify patterns as well as what works and doesn’t work. In addition, you will be given prompts that will allow you to address current conflict in a more successful way thus decreasing the time spent in states of hurt, anger and resentment. Following the prompts that you collaboratively help to set, you will have more success navigating conflict areas of the relationship and have more happiness and peace.

## Getting the code and running locally

Install [Git](https://git-scm.com/).

Install [Node (and concurrently NPM)](https://nodejs.org/en/).

Open terminal (on Mac) or command prompt (on Windows) and navigate to the location where you want to download the project.  Terminal tutorial [here](https://computers.tutsplus.com/tutorials/navigating-the-terminal-a-gentle-introduction--mac-3855). Some basic navigation commands will be different on Mac and Windows.

Go back to the terminal and clone this GitHub repo.

```bash
$ git clone https://github.com/eecs394-s17/blue-dynamic-mapping.git
```

Install Ionic 2.

```bash
$ npm install -g cordova ionic
```

Navigate into the project folder.

```bash
$ cd blue-dynamic-mapping
```

Install project dependencies.
```bash
$ npm install
```
z
Acquire the APP_SECRETS.js file and copy it to the main folder of the project ".../blue-dynamic-mapping/APP_SECRETS.js"

Run the project.
```bash
$ ionic serve
```

After this, the app should open for demo in your default web browser.

## Accessing the database

Create an account at [Firebase](https://firebase.google.com/).

Get an invite to the project from the database administrator.

## Changing prompts and answers in Firebase

--------------

## Putting the app on Play store and App Store

[Android](https://support.google.com/googleplay/android-developer/answer/113469?hl=en)

[Apple](https://clearbridgemobile.com/how-to-submit-an-app-to-the-app-store/)

# For the next dev team

## Known bugs

When you navigate into the "Track Argument" feature, then hit the back button, it takes you to a blank "Home Page"

## Structure of the project

The app has 3 data services

- auth-data.ts connects to firebase and manages authentication
- prompt-service.ts connects to firebase and handles retrieving prompts and storing responses, as well as retrieving response history
- storage-service.ts uses the ionic storage package, which is a file based local storage package to securely store user journals

The functionality of most features should be easy to understand, the one that might benefit from a little explanation is the Track Activity feature.  This feature is implemented on two pages, the prompts-root-page and the prompts-page.  The prompts-root-page is a visually blank component that holds the prompts and responses arrays.  This page then pushes instances of prompt-page populated with data for the current prompt, and gives the pushed page a callback function to call back to prompts-root-page, which will update/add the data there and then push the next prompt-page.
