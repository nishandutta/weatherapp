# 🌦️ Weather Forecast App

A responsive and modern weather forecast web application built using **HTML**, **Tailwind CSS**, and **JavaScript**. This app fetches weather data from the [WeatherAPI](https://www.weatherapi.com/) and displays current conditions as well as a 7-day forecast based on user input or current location.

---

## 🚀 Features

- 🌍 Fetch weather using **current location (GPS)** or **city name**
- 📅 **7-day forecast** with temperature, wind, and humidity
- 🔍 Search bar with **autocomplete dropdown** for recently searched cities
- 📦 Data persistence with **Local Storage**
- 🌫️ Sleek, responsive **glassmorphism UI** with Tailwind CSS
- 🔗 GitHub profile button

---

## 🛠️ Technologies Used

- **HTML5**
- **Tailwind CSS v3** (via `output.css`)
- **Vanilla JavaScript (ES6+)**
- **WeatherAPI** for live forecast data
- **Font Awesome** for icons

---

## 📷 Preview

<img width="959" alt="image" src="https://github.com/user-attachments/assets/d8834c75-a92b-4a69-860a-afd62979e5c9" />
<img width="956" alt="image" src="https://github.com/user-attachments/assets/f80f3042-6e2e-45c1-8482-19465cac6ba9" />
<img width="525" alt="image" src="https://github.com/user-attachments/assets/d63792b5-e802-459f-a332-89dd2577e70b" />
<img width="527" alt="image" src="https://github.com/user-attachments/assets/0d16914b-c5af-42a7-8d5a-e6bf8e5501a8" />

## 📂 Folder Structure

project-root/
│
├── index.html
├── script.js
├── input.css #Importing tailwind.css
├── output.css # Tailwind CSS build output
├── tailwind.config.js
├── package.json # If using Tailwind via PostCSS
└── README.md

🚀 How to Run Download or Clone the Repository: git clone : https://github.com/nishandutta/weatherapp.git

Install Tailwind (if not using CDN):

npm install -D tailwindcss
npx tailwindcss init

Create your Tailwind build:

npx tailwindcss -i ./input.css -o ./output.css --watch
Open index.html in your browser and you’re ready!


