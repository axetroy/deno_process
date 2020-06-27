import {
  assertEquals,
  assertThrowsAsync,
  assertStringContains,
} from "https://deno.land/std@v0.59.0/testing/asserts.ts";
import { kill } from "./mod.ts";

const { test, run } = Deno;

function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

test({
  name: "Kill",
  fn: async () => {
    const ps = run({
      cmd: [
        Deno.execPath(),
        "run",
        "-A",
        "https://deno.land/std@v0.59.0/http/file_server.ts",
        "--port",
        "4500",
      ],
      cwd: Deno.cwd(),
    });

    await sleep(10_000);

    const resBefore = await fetch(
      "http://localhost:4500/testdata/hello_world.txt",
    );

    assertEquals(resBefore.ok, true);
    assertEquals(resBefore.status, 200);

    assertEquals(await resBefore.text(), "hello world!");

    await kill(ps.pid, { force: Deno.build.os === "windows" });

    const err = await assertThrowsAsync(async () => {
      return fetch("http://localhost:4500/mod.ts");
    });

    assertStringContains(err.message, "tcp connect error");

    ps.close();
  },
});
