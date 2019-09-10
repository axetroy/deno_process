import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.17.0/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std@v0.17.0/testing/mod.ts";
import { get } from "./mod.ts";

test(async function testGetProcess() {
  const ps = await get(Deno.pid);
  assertEquals(ps.pid, Deno.pid);
  assert(ps.command.length > 0);
});

runIfMain(import.meta);
