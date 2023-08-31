'use strict';
import App from './components/App';
import * as Sentry from "@sentry/browser";

Sentry.init({
    dsn: "https://244373b5703e1e7b545b5e695bb8ced9@o4505717305704448.ingest.sentry.io/4505795230629888",

    // Alternatively, use `process.env.npm_package_version` for a dynamic release version
    // if your build tool supports it.
    release: "development-opportunities@2.0.2",
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/detroitmi\.gov/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});
(function(){
  let app = new App();
})(window);