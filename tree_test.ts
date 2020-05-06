import { assert } from "https://deno.land/std@v1.0.0-rc1/testing/asserts.ts";
import { getTree } from "./mod.ts";

const { test } = Deno;

test({
  name: "GetProcessesTree",
  fn: async () => {
    const processList = await getTree();
    assert(processList.length > 0);
    for (const ps of processList) {
      assert(ps.children!.length > 0);
    }
  },
});
