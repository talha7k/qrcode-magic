# Welcome to a Dijitize.com project

## Project Info

This QR Code Generator is a robust, free, and open-source solution developed by [Dijitize.com](https://dijitize.com). It empowers users to create highly customizable QR codes with advanced features like local storage persistence, allowing all QR code data to be saved directly in your browser. You can manage multiple saved entries for each QR code type, ensuring your data is always accessible. The application boasts session restoration, intuitively auto-saving your current form data and QR settings across browser sessions to prevent data loss. Its intuitive UI simplifies saving, loading, and deleting entries. Crucially, this project generates static QR codes, embedding data directly into the image, guaranteeing they work forever without reliance on dynamic URLs or costly subscriptions, offering a truly permanent and free QR code solution.

## How can I edit this code?

There are several ways of editing your application.

**Use Dijitize.com**

Simply visit the [Dijitize.com Project](https://dijitize.com) and start prompting.

Changes made via Dijitize.com will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Features

This QR Code Generator now includes the following features:

- **Local Storage Persistence**: All QR code data is persisted in your browser's local storage.
- **Multiple Saved Entries**: Save multiple QR code contents for each QR code type (e.g., multiple URLs, multiple Wi-Fi configurations).
- **Session Restoration**: Your current form data and QR settings are automatically saved and restored across browser sessions.
- **Intuitive Management UI**: Easily save, load, and delete your QR code entries directly from the application interface.
- **Auto-Save Functionality**: Real-time auto-saving of current form data and QR settings to prevent data loss.
- **Customizable QR Codes**: Continue to enjoy features like logo integration, adjustable resolution, and border customization.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

To deploy this project, you can build the application and then serve the generated `dist` folder. Here are the steps:

```sh
# Step 1: Build the project for production
npm run build

# Step 2: Serve the 'dist' folder using a static file server (e.g., 'serve' package)
# If you don't have 'serve' installed, you can install it globally: npm install -g serve
serve -s dist
```

## Custom Domain

If you deploy this project to your own hosting, you can connect any custom domain directly through your hosting provider's settings. This project generates static QR codes, meaning the QR code data is embedded directly into the image. This ensures your QR codes will work forever, without relying on dynamic URLs or requiring any subscriptions, unlike many other QR code services.

 
