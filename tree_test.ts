import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.26.0/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std@v0.26.0/testing/mod.ts";
import { getTree } from "./mod.ts";

test(async function testGetProcessesTree() {
  const processList = await getTree();
  assert(processList.length > 0);
  for (const ps of processList) {
    assert(ps.children.length > 0);
  }
});

runIfMain(import.meta);
