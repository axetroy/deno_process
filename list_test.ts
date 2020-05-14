import { assert } from "https://deno.land/std@v0.50.0/testing/asserts.ts";
import { getAll } from "./mod.ts";

const { test } = Deno;

test({
  name: "GetAllProcesses",
  fn: async () => {
    const processList = await getAll();
    assert(processList.length > 0);
  },
});
