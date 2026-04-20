import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";

const CONFIG_PATH = "./astro.config.mjs";

function setSkipGeneration(value) {
  const content = readFileSync(CONFIG_PATH, "utf8");
  const updated = content.replace(
    /skipGeneration:\s*(true|false),/,
    `skipGeneration: ${value},`
  );
  writeFileSync(CONFIG_PATH, updated, "utf8");
}

function run(cmd) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit" });
}

const date = new Date().toISOString().slice(0, 10);

try {
  console.log("🔧 Activation de la génération (skipGeneration: false)...");
  setSkipGeneration("false");

  console.log("\n📦 Build en cours...");
  run("npm run build");

  console.log("\n🔒 Désactivation de la génération (skipGeneration: true)...");
  setSkipGeneration("true");

  console.log("\n🚀 Commit et push...");
  run("git add .");
  run(`git commit -m "update ${date}"`);
  run("git push origin main");

  console.log("\n✅ Deploy terminé !");
} catch (err) {
  console.error("\n❌ Erreur pendant le deploy :", err.message);
  console.log("🔒 Restauration de skipGeneration: true...");
  setSkipGeneration("true");
  process.exit(1);
}
