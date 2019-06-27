import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.9.0/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std@v0.9.0/testing/mod.ts";
import { getProcess, getProcesses, killProcess } from "./mod.ts";

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
      "deno",
      "-A",
      "https://github.com/denoland/deno_std/raw/master/http/file_server.ts"
    ],
    stdout: "inherit",
    stderr: "inherit"
  });

  await sleep(2000);

  await killProcess(ps.pid);

  console.log("kill success.");
});

runIfMain(import.meta);
