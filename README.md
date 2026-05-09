# 💱 React Currency Converter

## 📝 Description
A sleek, responsive, and fast currency converter application built with React and Vite. This project fetches real-time exchange rates from an external API, allowing users to instantly convert values between multiple global currencies. It serves as a practical implementation of core React concepts like `useState`, `useEffect`, and custom hooks.

## ✨ Features
* **Real-Time Data:** Fetches up-to-date currency exchange rates via API.
* **Instant Conversion:** Calculates the exchanged amount immediately as the user types.
* **Swap Functionality:** A handy button to instantly swap the "From" and "To" currencies.
* **Responsive UI:** Clean and modern interface that works perfectly on both desktop and mobile devices.

## 🛠️ Technologies Used
* **Frontend:** React.js (Vite)
* **Styling:** CSS / Tailwind CSS (Update this based on what you used)
* **Logic:** Modern JavaScript (ES6+), React Hooks (`useState`, `useEffect`, `useCallback`)

## 🔗 API Reference

This project uses the free and open-source Currency API created by Fawaz Ahmed to fetch daily updated exchange rates.

* **GitHub Repository / Documentation:** [fawazahmed0/exchange-api](https://github.com/fawazahmed0/exchange-api)
* **Primary Endpoint Used:** `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{currency}.json`
* **Fallback Endpoint:** `https://latest.currency-api.pages.dev/v1/currencies/{currency}.json`

**Data Update Frequency:** The exchange rates are updated once daily.
