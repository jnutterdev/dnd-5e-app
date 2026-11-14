// Injected by Doppler (`doppler run -- ...`). The CLI uses the direct (non-pooled) URL;
// the app uses the pooled DATABASE_URL in src/lib/prisma.ts.
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DIRECT_URL"],
  },
});
