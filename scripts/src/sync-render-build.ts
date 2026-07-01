import { cpSync, existsSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = resolve(process.cwd(), "..");
const sourceDir = resolve(repoRoot, "artifacts", "portfolio", "dist", "public");
const targetDir = resolve(repoRoot, "build");

if (!existsSync(sourceDir)) {
  throw new Error(`Expected portfolio build output at ${sourceDir}`);
}

rmSync(targetDir, { recursive: true, force: true });
cpSync(sourceDir, targetDir, { recursive: true });

console.log(`Copied ${sourceDir} -> ${targetDir}`);