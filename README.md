

-----

# Market Seasonality Explorer 📈

The **Market Seasonality Explorer** is a sophisticated financial data visualization tool built with React and TypeScript. It provides traders, analysts, and hobbyists with a powerful way to analyze and identify seasonal patterns in market data.

This application fetches and processes historical market data, aggregating it by month or week to display key performance metrics in an interactive, color-coded calendar view. Users can quickly spot trends, average performance, and volatility to make more informed decisions.

##  Core Features

  * **Interactive Calendar UI:** A heatmap-style calendar (`CalendarGrid`) that visually represents market performance for each day.
  * **Dynamic Data Aggregation:** Toggle between **Monthly** and **Weekly** views to analyze aggregated seasonality data.
  * **Key Metrics Display:** Calculates and displays essential metrics for any selected period:
      * **Average % Change:** The average price movement.
      * **% Positive Days:** The percentage of days that closed positive.
      * **% Negative Days:** The percentage of days that closed negative.
      * **Volatility:** The standard deviation of price changes.
  * **Color-Coded Heatmap:** Cells are colored based on volatility, making it easy to spot high-risk and low-risk periods (Green for low volatility, Red for high).
  * **Detailed Day Drilldown:** Click on any day cell to open a side panel (`DetailsPanel`) showing:
      * Specific OHLCV data for that day.
      * An **Intraday Chart** (powered by **Recharts**) visualizing price movements.
  * **Data Export:** A built-in "Export to CSV" function (`exportToCsv`) to download aggregated data for further analysis.
  * **Responsive Design:** A clean, modern UI built with **Tailwind CSS** and **shadcn/ui** components, ensuring a great experience on all devices.
  * **Keyboard Navigation:** Fully accessible calendar navigation using arrow keys, thanks to the `useKeyboardNavigation` hook.

##  Tech Stack

  * **Frontend:** React 18
  * **Language:** TypeScript
  * **Build Tool:** Vite
  * **Styling:** Tailwind CSS
  * **UI Components:** shadcn/ui (using Radix UI)
      * `Button`, `Select`, `Sheet`, `Tooltip`, `ToggleGroup`
  * **Charting:** Recharts
  * **Utilities:**
      * `date-fns` for all date logic
      * `clsx` & `tailwind-merge` for classname utilities
  * **Testing:** Vitest (unit tests for utility functions)
  * **Documentation:** TypeDoc (for generating the `/docs` website)

##  Getting Started

### Prerequisites

  * Node.js (v18 or above)
  * npm, yarn, or pnpm

### 1\. Clone the Repository

```bash
git clone https://github.com/shubhratiwary134/market-seasonality-explorer.git
cd market-seasonality-explorer
```

### 2\. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3\. Set Up Environment Variables

The application uses an external API for market data. You will need to get an API key (e.g., from [Alpha Vantage](https://www.google.com/search?q=httpsS://www.alphavantage.co/) or [Polygon.io](https://www.google.com/search?q=httpsS://polygon.io/)) and configure the `MarketApi.ts` file or an environment variable.

Create a `.env.local` file in the root directory and add your API key:

```env
VITE_API_KEY=your_api_key_here
```

*Note: The current `MarketApi.ts` fetches from a static URL. You will need to replace this with your dynamic fetching logic using the API key.*

### 4\. Run the Development Server

```bash
npm run dev
```

The application will be running on `http://localhost:5173`.

### 5\. Run Tests

Unit tests for the utility functions are included and can be run with:

```bash
npm run test
```

## 📚 Documentation

This project is thoroughly documented using **TypeDoc**. The complete component and utility documentation is available in the `/docs` folder.

You can view the live documentation here:
[**https://market-seasonality-explorer.pages.dev/**](https://market-seasonality-explorer.pages.dev/)

To generate the documentation locally, run:

```bash
npm run docs
```
---

## Contributing 

Contributions are welcome and encouraged! Simply fork this repository or create a new branch and open a pull request against main.

When opening a PR, please provide a brief summary explaining the changes as well as some code examples to test the functionality. Also, please be prepared to edit your pull request based on comments and feedback.

---

##  License(MIT)

Copyright (c) 2025 Shubhra Tiwary

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

##  Author

Built by **Shubhra Tiwary**
