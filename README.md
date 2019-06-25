[![Build Status](https://travis-ci.com/axetroy/deno_process.svg?branch=master)](https://travis-ci.com/axetroy/deno_process)

### Handle process with Deno

### Usage

```typescript
import {
  getProcess,
  getProcesses
} from "https://github.com/axetroy/deno_process/raw/master/mod.ts";

getProcess(1); // get process info with pid
getProcesses(); // get process list
```
