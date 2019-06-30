[![Build Status](https://travis-ci.com/axetroy/deno_process.svg?branch=master)](https://travis-ci.com/axetroy/deno_process)

### Handle process with Deno

### Usage

```typescript
import {
  get,
  getAll,
  kill
} from "https://github.com/axetroy/deno_process/raw/master/mod.ts";

get(1); // get process info with pid
getAll(); // get all process
kill(1); // kill process
```

## License

The [MIT License](https://github.com/axetroy/deno_process/blob/master/LICENSE)
