import { runIfMain, test } from "https://deno.land/std@v0.29.0/testing/mod.ts";
import { kill } from "./mod.ts";

const { run } = Deno;

function sleep(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

test(async function testKill() {
  const ps = run({
    args: [
      Deno.execPath(),
      "-A",
      "https://deno.land/std@v0.29.0/http/file_server.ts"
    ],
    stdout: "inherit",
    stderr: "inherit"
  });

  await sleep(2000);

  await kill(ps.pid, { force: Deno.build.os === "win" });

  console.log("kill success.");
});

runIfMain(import.meta);
