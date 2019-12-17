import {
  assert,
  assertEquals
} from "https://deno.land/std@v0.26.0/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std@v0.26.0/testing/mod.ts";
import { getTree } from "./mod.ts";

test(async function testGetProcessesTree() {
  const processList = await getTree();
  assert(processList.length === 1);

  const initProcess = processList[0];

  assertEquals(initProcess.pid, 1);

  assert(initProcess.children.length > 0);
});

runIfMain(import.meta);
