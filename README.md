[![Build Status](https://github.com/axetroy/deno_process/workflows/test/badge.svg)](https://github.com/axetroy/deno_process/actions)

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

### API

Currently supported process information

```typescript
interface Process {
  command: string; // Command to run this process
  ppid: number; // The parent process ID of the process
  pid: number; // Process ID
  stat: string; // Process status
}
```

#### get(pid: number): Promise < Process >

Get process information by `pid`

#### getAll(): Promise < []Process >

Get all the process information currently running

#### kill(pid: number): Promise< void >

Kill the process by `pid`

## License

The [MIT License](LICENSE)
