import { test, expect } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log("This is a global teardown. In our case, we have nothing to ramp up for our tests, so this is a placeholder")
}

export default globalTeardown;