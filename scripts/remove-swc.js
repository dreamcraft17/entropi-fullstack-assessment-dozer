/**
 * Remove @next/swc-* packages so Next.js falls back to Babel (avoids broken SWC binary on some Windows setups).
 */
const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, "..", "node_modules", "@next");
if (!fs.existsSync(nextDir)) process.exit(0);

const entries = fs.readdirSync(nextDir, { withFileTypes: true });
for (const ent of entries) {
  if (ent.isDirectory() && ent.name.startsWith("swc-")) {
    const target = path.join(nextDir, ent.name);
    try {
      fs.rmSync(target, { recursive: true, force: true });
      console.log("Removed", ent.name, "(Next.js will use Babel)");
    } catch (e) {
      // ignore
    }
  }
}
