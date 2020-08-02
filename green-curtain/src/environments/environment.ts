// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  verbose: false, // Enable for way too much output
  traceRoutes: false, // Enable to see routing details
  apiUrl: 'https://gcapi0-staging.azurewebsites.net/api',
  //apiUrl: 'http://localhost:7071/api',
  apiKey: 'BVgzNb1Fnwnun1KI9piYnX6Itz3f7lEMPYMQoS90uFI4i1gQ2pkwKA==',
  apiHeader: 'x-functions-key'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
