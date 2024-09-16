# Page Rank Metrics Collector

## Introduction

This application is made to show page rank metrics that are collected through the app's API in table's format.
It displays domain name and rank, has search input for filtering by name. 
Application is made on React - Typescript framework.


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
    - NEXT_PUBLIC_PAGE_METRICS_COLLECTOR_API_KEY=12345

3. **Run application**

      ```bash
         npm run dev
      ```
