import { runIfMain, test } from "https://deno.land/std@v0.9.0/testing/mod.ts";
import { join } from "https://deno.land/std@v0.9.0/fs/path/mod.ts";
import { killProcess } from "./mod.ts";

const { run } = Deno;

function homedir(): string {
  let env = "HOME";
  let envErr = "$HOME";

  if (Deno.platform.os === "win") {
    env = "USERPROFILE";
    envErr = "%USERPROFILE%";
  }

  const value = Deno.env()[env];
  if (value !== "") {
    return value;
  }

  throw new Error(`Environment variable '${envErr}' is not defined.`);
}

function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

test(async function testKillProcess() {
  const ps = run({
    args: [
      join(
        homedir(),
        ".deno",
        "bin",
        "deno" + (Deno.platform.os === "win" ? ".exe" : "")
      ),
      "-A",
      "https://deno.land/std@v0.9.0/http/file_server.ts",
      "mod.ts"
    ],
    stdout: "inherit",
    stderr: "inherit"
  });

  await sleep(2000);

  await killProcess(ps.pid);

  console.log("kill success.");
});

runIfMain(import.meta);
