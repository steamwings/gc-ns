// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  verbose: true, // Enable for way too much output
  traceRoutes: false, // Enable to see routing
  apiUrl: 'gcapi0.azurewebsites.net/gcapi0',
  apiKey: 'bc7e5fe0b7dc4ebfa32ed80d5de43657',
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
