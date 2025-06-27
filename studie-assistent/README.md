# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Maak een account aan op [Vercel](https://vercel.com) en koppel deze repository.
2. Stel in de Vercel settings de omgevingsvariabele `GEMINI_API_KEY` in.
3. Vercel gebruikt het bijgeleverde `vercel.json` om het project te bouwen met `npm run build` en de map `dist` te deployen.
4. Na het deployen is de applicatie direct online beschikbaar.
