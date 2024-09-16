# Page Rank Metrics Collector

## Introduction

This application is made to show page rank metrics the are collected through the app's API. Application is made on React - Typescript framework.

## Instructions

1. **Install required packages**
      run, node version 18 or higher recommended
      ```bash
      npm install
      ```

2. **Set API Key and URL obtained from backend application**
      Create add values to  variables in your  .env, depending on your backend application settings:
      For example create .env.local set this values

    - NEXT_PUBLIC_PAGE_METRICS_COLLECTOR_API_URL http://127.0.0.1:8000/api/domains
      NEXT_PUBLIC_PAGE_METRICS_COLLECTOR_API_KEY=12345

3. **Run application**

    - Ensure the `OPEN_PAGE_RANK_API_KEY` in the `.env` file is set correctly.

4. **Set Remote JSON File URL**

    - Provide the URL of the remote JSON file containing the domain list in the `.env` file under `DOMAIN_LIST_REMOTE_JSON_FILE`.
    - If your domain file is hosted on GitHub, use the raw link format, e.g., `https://raw.githubusercontent.com/user/project/branch/filename.json`.
    - The default key for domain names is set to "rootDomain". You can customize this key in the `DomainListFromRemoteJsonService` class.

5. **Schedule Data Collection**

    - The application uses Laravel's scheduler to collect page data daily. Configure the interval in Laravel's schedule.
    - Add the following command to your server’s cron job to execute it:
      ```bash
      cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
      ```
    - For manual data updates, use the URL `/manual-import`.

6. **Configure API Access**

    - Set the app's API key in the `.env` file under `APP_API_KEY`.
    - External applications must include this header in their requests to access the app's API:
      ```plaintext
      Authorization: your-api-key
      ```
    - An empty string can be used if no key is set.

7. **Access Domain Data**

    - The list of domains with ranks is accessible via the following URL: `/api/domains`.

