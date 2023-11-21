### Prerequisites

- [Node.js](https://nodejs.org/es/download/)
- [(JDK)](https://www.oracle.com/java/technologies/downloads/)

### Usage

#### **Install Playwright npm dependencies.**

    npm install

#### **Install Playwright and OS compatible browsers that are configured in playwright.config.ts **

    npx playwright install

#### **Run the tests from root directory with all Playwright browsers in headless mode**

     npx playwright test

#### **Run the tests from root directory with all Playwright browsers in headed mode**

     npx playwright test --headed

#### **Run the tests only on Firefox**

    npx playwright test --project=firefox

#### **Run the tests only on Chromium**

    npx playwright test --project=chromium

#### **Run the tests only on Webkit**

    npx playwright test --project=webkit

#### **Open Playwright's test report**

    npx playwright show-report

#### **Test data for url and amazon product type location**

    tests/data 
