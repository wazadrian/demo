import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

if (typeof structuredClone === 'undefined') {
  (global as any).structuredClone = (obj: any) =>
    JSON.parse(JSON.stringify(obj));
}
