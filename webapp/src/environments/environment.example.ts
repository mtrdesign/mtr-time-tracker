// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'http://0.0.0.0:8000/time-tracker/api/',
  website: {
    company: "MTR Design",
    title: "Time Tracker",
    logo: "assets/images/logo-print.png"
  },
  settings: {
    datetime_long: "EEEE, d MMMM y",
    datetime_short: "dd.MM.y",
  }
};
