import { assert } from "https://deno.land/std@v0.59.0/testing/asserts.ts";
import { getTree } from "./mod.ts";

const { test } = Deno;

test({
  name: "GetProcessesTree",
  fn: async () => {
    const processTree = await getTree();
    assert(processTree.length > 0);
    for (const ps of processTree) {
      assert(ps.children!.length > 0);
    }

    console.log(JSON.stringify(processTree, null, 2));
  },
});
