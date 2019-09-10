import { assert } from "https://deno.land/std@v0.17.0/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std@v0.17.0/testing/mod.ts";
import { getAll } from "./mod.ts";

test(async function testGetAllProcesses() {
  const processList = await getAll();
  assert(processList.length > 0);
});

runIfMain(import.meta);
