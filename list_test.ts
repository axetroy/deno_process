import { assert } from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";
import { getAll } from "./mod.ts";

const { test } = Deno;

test({
  name: "GetAllProcesses",
  fn: async () => {
    const processList = await getAll();
    assert(processList.length > 0);
  },
});
