import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.9.0/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std@v0.9.0/testing/mod.ts";
import { getProcess, getProcesses } from "./mod.ts";

test(async function testGetProcess() {
  const ps = await getProcess(Deno.pid);
  assertEquals(ps.pid, Deno.pid);
  assertEquals(ps.command, "deno");
});

test(async function testGetProcesses() {
  const processList = await getProcesses();
  assert(processList.length > 0);
});

runIfMain(import.meta);
