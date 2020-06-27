import { assert } from "https://deno.land/std@v0.59.0/testing/asserts.ts";
import { getAll } from "./mod.ts";

const { test } = Deno;

test({
  name: "GetAllProcesses",
  fn: async () => {
    const processList = await getAll();
    assert(processList.length > 0);
  },
});
