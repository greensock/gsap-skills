import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = path.join(root, "skills");
const read = (filePath) => readFileSync(path.join(root, filePath), "utf8");

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function parseFrontmatter(skillPath) {
  const contents = read(skillPath);
  const match = contents.match(/^---\n([\s\S]*?)\n---\n/);

  if (!match) {
    fail(`${skillPath} is missing YAML frontmatter.`);
    return {};
  }

  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([a-z]+):\s*(.*)$/))
      .filter(Boolean)
      .map(([, key, value]) => [key, value.trim()])
  );
}

const skillNames = readdirSync(skillsDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const skillName of skillNames) {
  const skillPath = `skills/${skillName}/SKILL.md`;

  if (!existsSync(path.join(root, skillPath))) {
    fail(`${skillPath} does not exist.`);
    continue;
  }

  const frontmatter = parseFrontmatter(skillPath);

  if (frontmatter.name !== skillName) {
    fail(`${skillPath} frontmatter name must be "${skillName}".`);
  }

  if (!frontmatter.description) {
    fail(`${skillPath} is missing a description.`);
  }
}

const routerPath = "skills/gsap/SKILL.md";
if (!existsSync(path.join(root, routerPath))) {
  fail(`${routerPath} must exist as the unified GSAP routing skill.`);
}

const router = existsSync(path.join(root, routerPath)) ? read(routerPath) : "";
const expectedRoutes = [
  "gsap-core",
  "gsap-timeline",
  "gsap-scrolltrigger",
  "gsap-plugins",
  "gsap-utils",
  "gsap-react",
  "gsap-frameworks",
  "gsap-performance",
];

for (const route of expectedRoutes) {
  if (!skillNames.includes(route)) {
    fail(`Expected routed skill ${route} to exist in skills/.`);
  }

  if (router && !router.includes(`${route}/SKILL.md`)) {
    fail(`${routerPath} must route to ${route}/SKILL.md.`);
  }
}

const routerFrontmatter = router ? parseFrontmatter(routerPath) : {};
if (router && routerFrontmatter.name !== "gsap") {
  fail(`${routerPath} frontmatter name must be "gsap".`);
}

if (router && !routerFrontmatter.description?.includes("Unified entry point")) {
  fail(`${routerPath} description must identify it as the unified entry point.`);
}

const readme = read("README.md");
const index = read("skills/llms.txt");

if (!readme.includes("**gsap**")) {
  fail("README.md must list the unified gsap skill.");
}

if (!readme.includes("gsap/            SKILL.md")) {
  fail("README.md structure section must include skills/gsap/.");
}

if (!index.includes("gsap\n")) {
  fail("skills/llms.txt must list the unified gsap skill.");
}

if (process.exitCode) {
  process.exit(process.exitCode);
}

console.log(`Validated ${skillNames.length} skills and the unified GSAP router.`);
