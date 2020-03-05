import { assert } from "https://deno.land/std@v0.35.0/testing/asserts.ts";
import { getTree } from "./mod.ts";

const { test } = Deno;

test(async function testGetProcessesTree() {
  const processList = await getTree();
  assert(processList.length > 0);
  for (const ps of processList) {
    assert(ps.children!.length > 0);
  }
});
