// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDX2Rr6K6auM-CijhLKPAiLviDjdEfw5Cc',
    authDomain: 'to-do-list-f7cdd.firebaseapp.com',
    databaseURL: 'https://to-do-list-f7cdd.firebaseio.com',
    projectId: 'to-do-list-f7cdd',
    storageBucket: 'to-do-list-f7cdd.appspot.com',
    messagingSenderId: '402474832966'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
