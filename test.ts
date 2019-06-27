import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.9.0/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std@v0.9.0/testing/mod.ts";
import { join } from "https://deno.land/std@v0.9.0/fs/path/mod.ts";
import { getProcess, getProcesses, killProcess } from "./mod.ts";

export function homedir(): string {
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

const { run } = Deno;

test(async function testGetProcess() {
  const ps = await getProcess(Deno.pid);
  assertEquals(ps.pid, Deno.pid);
  assert(ps.command.length > 0);
});

test(async function testGetProcesses() {
  const processList = await getProcesses();
  assert(processList.length > 0);
});

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
      "https://deno.land/std@v0.9.0/prettier/main.ts",
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
