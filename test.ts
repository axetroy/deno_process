import { runIfMain } from "https://deno.land/std@v0.19.0/testing/mod.ts";

import "./get_test.ts";
import "./list_test.ts";
import "./kill_test.ts";

runIfMain(import.meta);
