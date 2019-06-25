import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { runIfMain, test } from "https://deno.land/std/testing/mod.ts";

test({
  name: "[math] sum",
  fn(): void {
    assertEquals(true, true);
  }
});

runIfMain(import.meta);
