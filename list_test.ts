import { assert } from "https://deno.land/std@v0.35.0/testing/asserts.ts";
import { getAll } from "./mod.ts";

const { test } = Deno;

test(async function testGetAllProcesses() {
  const processList = await getAll();
  assert(processList.length > 0);
});
