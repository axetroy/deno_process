import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.35.0/testing/asserts.ts";
import { get, Process } from "./mod.ts";

const { test } = Deno;

test(async function testGetProcess() {
  const ps = await get(Deno.pid) as Process;
  assertEquals(ps.pid, Deno.pid);
  assert(ps.command.length > 0);
});
