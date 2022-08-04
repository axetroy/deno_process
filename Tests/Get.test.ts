import {
  assert,
  assertEquals,
} from "https://deno.land/std@v0.59.0/testing/asserts.ts";
import { get, Process } from "../mod.ts";

const { test } = Deno;

test({
  name: "Get",
  fn: async () => {
    const ps = (await get(Deno.pid)) as Process;
    assertEquals(ps.pid, Deno.pid);
    assert(ps.command.length > 0);

    console.log(JSON.stringify(ps, null, 2));
  },
});
