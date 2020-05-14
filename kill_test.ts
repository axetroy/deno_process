import {
  assertEquals,
} from "https://deno.land/std@v0.50.0/testing/asserts.ts";
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
        "https://deno.land/std@v0.50.0/http/file_server.ts",
      ],
      cwd: Deno.cwd(),
    });

    await sleep(5000);

    const resBefore = await fetch("http://localhost:4500");

    assertEquals(resBefore.ok, true);
    assertEquals(resBefore.status, 200);

    await resBefore.trailer;

    await kill(ps.pid, { force: Deno.build.os === "windows" });

    const resAfter = await fetch("http://localhost:4500");

    assertEquals(resAfter.ok, false);

    await resAfter.trailer;

    ps.close();
  },
});
