# JSON Beautifier

A client-side only JSON beautifier built with vanilla JavaScript. Format and beautify your JSON instantly with no data sent to servers.

## Features

- ✨ **Client-side only** - All processing happens in your browser
- 🎨 **Beautiful UI** - Modern, responsive design
- ⚙️ **Customizable indentation** - Choose from 2, 4, 8 spaces or tabs
- 📋 **Copy to clipboard** - Easy one-click copying
- ⚡ **Real-time validation** - Instant error messages for invalid JSON
- 📱 **Responsive** - Works on desktop and mobile devices

## Usage

1. Open `index.html` in your web browser
2. Paste your JSON text in the "Input JSON" textarea
3. Click the **Beautify** button (or press `Ctrl+Enter` / `Cmd+Enter`)
4. Your formatted JSON appears in the "Formatted JSON" textarea
5. Click **Copy Output** to copy to clipboard

## Files

- `index.html` - Main HTML structure
- `beautifier.js` - JavaScript logic for JSON beautification
- `style.css` - Styling and responsive design
- `README.md` - This file

## How It Works

The service:
1. Takes raw JSON input from the textarea
2. Parses it using `JSON.parse()`
3. Stringifies it with the selected indentation using `JSON.stringify()`
4. Displays formatted output or error messages

## Indentation Options

- **2 spaces** - Compact formatting
- **4 spaces** - Standard formatting (recommended)
- **8 spaces** - Loose formatting
- **Tab** - Tab character indentation

## Error Handling

If the JSON is invalid, the service displays a clear error message explaining what went wrong, making it easy to debug your JSON.

## Privacy

100% privacy - your JSON data never leaves your computer. All processing is done locally in your browser.
