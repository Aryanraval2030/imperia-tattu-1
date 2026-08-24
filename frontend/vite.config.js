import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for the Tattu tattoo studio website.
// Uses the official React plugin (Babel-based fast refresh).
export default defineConfig({
  plugins: [react()],
});
