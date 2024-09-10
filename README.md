# Sisense Compose SDK + AG Grid React Example

![AgGrid](https://github.com/user-attachments/assets/6449882f-9266-46e5-8c20-8e3ca8580539)


This repository is an example React application built to showcase the **Sisense Compose SDK** capabilities, visualized using **AG Grid**. The app fetches data from Sisense using the Sisense Compose SDK and presents it in an interactive AG Grid table. Users can also export the data as a CSV file directly from the table.

## Key Features

- **Sisense Compose SDK Integration**: Use the Sisense Compose SDK to query and visualize data.
- **AG Grid Integration**: Display the queried data in an interactive table with sorting, filtering, and CSV export options.
- **CSV Export**: Export table data as a CSV file using AG Grid's built-in export feature.
  
## Prerequisites

Before starting, ensure you have the following installed:

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn (>= 1.x)

## Packages to Install

This app relies on several key packages. Here's a list of dependencies to install:

### Required Packages

- `react` and `react-dom`: Core libraries for building React applications.
- `ag-grid-react`: The official AG Grid wrapper for React.
- `ag-grid-community`: The AG Grid core functionality.
- `@mui/material`: Material UI library for UI components (used for buttons and cards).
- `@sisense/sdk-ui`: Sisense SDK UI package for integrating Sisense capabilities.
- `@sisense/sdk-data`: Sisense SDK Data package for making queries and handling data.
  
### Installation

Run the following command to install all the necessary packages:

```bash
npm install react react-dom ag-grid-react ag-grid-community @mui/material @sisense/sdk-ui @sisense/sdk-data
```

Alternatively, if you're using yarn:

```bash
yarn add react react-dom ag-grid-react ag-grid-community @mui/material @sisense/sdk-ui @sisense/sdk-data
```

## Setup Guide

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies

Run the following command in the project directory to install all the necessary packages:

```bash
npm install
```

### 3. Setup Sisense Context Provider

To use the Sisense Compose SDK, you need to configure the Sisense Context Provider with the **Sisense URL** and **API Token**.

If you're not an existing customer, you can get a free trial and obtain these credentials here:  
[Compose SDK Free Trial](https://www.sisense.com/platform/compose-sdk-free-trial/?utm_source=google&utm_campaign=nam_compose_sdk&cmp=nam_compose_sdk&utm_medium=cpc&ag=compose_sdk_general&ad=695746289913&campaignID=21106126685&AdGroupId=160097260739&kwid=kwd-2224936483649&kw=compose%20sdk&utm_programid=7010W000002fT4eQAE&gad_source=1&gclid=CjwKCAjw3P-2BhAEEiwA3yPhwJf01AnbQ53fBPmPM2jmqku9xKXyAF9eNhxucwwYbiSCviq552_r_xoC6yUQAvD_BwE).

In your application, add a `SisenseContextProvider` to your root component to initialize the Sisense instance.

### Example `SisenseContextProvider` Setup:

```tsx
import React from 'react';
import { SisenseContextProvider } from '@sisense/sdk-ui';

const SisenseApp = ({ children }) => {
  return (
    <SisenseContextProvider
      settings={{
        baseUrl: process.env.REACT_APP_SISENSE_URL, // Sisense URL
        apiToken: process.env.REACT_APP_SISENSE_TOKEN, // Sisense API Token
      }}
    >
      {children}
    </SisenseContextProvider>
  );
};

export default SisenseApp;
```

In the `.env` file (create if missing), add the following environment variables:

```bash
REACT_APP_SISENSE_URL=<your-sisense-url>
REACT_APP_SISENSE_TOKEN=<your-sisense-api-token>
```

Replace `<your-sisense-url>` and `<your-sisense-api-token>` with the correct values. You can find these credentials from your Sisense account or the free trial link provided above.

### 4. Running the Application

Once your `.env` file is configured with the correct credentials, you can start the application by running:

```bash
npm start
```

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Features Breakdown

### AG Grid Integration

The application uses AG Grid to present data in a highly flexible and interactive grid. Key features include:

- Sorting and filtering
- Responsive column resizing
- CSV export functionality

### Exporting Data

You can export the data from AG Grid by clicking the **Export to CSV** button. This will download the current grid data in a CSV format.

## Additional Notes

- **AG Grid Documentation**: For further customizations of AG Grid, refer to their official [documentation](https://www.ag-grid.com/react-data-grid/).
- **Sisense SDK Documentation**: To learn more about Sisense Compose SDK, refer to the official [Compose SDK Docs](https://www.sisense.com/docs/).

### Free Trial for Sisense Compose SDK

If you're not an existing customer and want to try Sisense Compose SDK, you can obtain the required URL and token by signing up for a free trial here:  
[Get Your Free Trial](https://www.sisense.com/platform/compose-sdk-free-trial/?utm_source=google&utm_campaign=nam_compose_sdk&cmp=nam_compose_sdk&utm_medium=cpc&ag=compose_sdk_general&ad=695746289913&campaignID=21106126685&AdGroupId=160097260739&kwid=kwd-2224936483649&kw=compose%20sdk&utm_programid=7010W000002fT4eQAE&gad_source=1&gclid=CjwKCAjw3P-2BhAEEiwA3yPhwJf01AnbQ53fBPmPM2jmqku9xKXyAF9eNhxucwwYbiSCviq552_r_xoC6yUQAvD_BwE).
