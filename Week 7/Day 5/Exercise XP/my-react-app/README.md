# React Exercises: Live Clock and Form Validation

Two small React exercises built with function components and hooks.

## Exercise 1: Local Time Live Clock
- `Clock` component shows the current time.
- Uses `useState` for `currentDate` and a `tick()` function to update it.
- Uses `useEffect` to call `tick()` every second.
- The cleanup function clears the interval when the component unmounts.

## Exercise 2: Form Validation
- `Form` and `Input` components.
- Fields: First Name, Last Name, Phone, Email.
- Custom validation with Regex (no HTML validation):
  - Required-field checks
  - Valid phone and email formats

## Getting Started

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

## Project Structure

```
src/
├── components/
│   ├── Clock.js
│   ├── Form.js
│   └── Input.js
├── App.js
└── index.js
```