import { runIfMain, test } from "https://deno.land/std@v0.17.0/testing/mod.ts";
import { join } from "https://deno.land/std@v0.17.0/fs/path/mod.ts";
import { kill } from "./mod.ts";

const { run } = Deno;

function homedir(): string {
  let env = "HOME";
  let envErr = "$HOME";

  if (Deno.build.os === "win") {
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

test(async function testKill() {
  const ps = run({
    args: [
      join(
        homedir(),
        ".deno",
        "bin",
        "deno" + (Deno.build.os === "win" ? ".exe" : "")
      ),
      "-A",
      "https://deno.land/std@v0.17.0/http/file_server.ts",
      "mod.ts"
    ],
    stdout: "inherit",
    stderr: "inherit"
  });

  await sleep(2000);

  await kill(ps.pid, { force: Deno.build.os === "win" });

  console.log("kill success.");
});

runIfMain(import.meta);
