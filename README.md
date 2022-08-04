
<br>

<div align = center>

[![Badge License]][License]   
[![Badge Status]][Actions]

<br>
<br>

# Deno Process

*A deno module for process management.*

<br>
<br>

## Features

<kbd>  Cross Platform Support  </kbd>  
<kbd>  Get  </kbd>

<kbd>  GetTree  </kbd>  
<kbd>  GetAll  </kbd>  
<kbd>  Kill  </kbd>

</div>

<br>
<br>

## Usage

All methods require the  `--allow-run`  flags.

```TypeScript
import * as Process from 'https://deno.land/x/process@v0.3.0/mod.ts'
```

<br>

### Get

*Get a process info with it's id.*

```TypeScript
const processId = 1;
const info = await Process.get(processId);
```

<br>

### Get All

*Return all processes.*

```TypeScript
const processes = await Process.getAll();
```

<br>

### Get Tree

*Return the process tree.*

```TypeScript
const tree = await Process.getTree();
```

<br>

### Kill

*Kill a process by Id or name.*

```TypeScript
const processName = 'deno';
await Process.kill(processName);
```

```TypeScript
const processId = 1024;
await Process.kill(processId);
```

<br>


<!----------------------------------------------------------------------------->

[Actions]: https://github.com/axetroy/deno_process/actions

[License]: LICENSE


<!----------------------------------[ Badges ]--------------------------------->

[Badge License]: https://img.shields.io/badge/License-MIT-ac8b11.svg?style=for-the-badge&labelColor=yellow
[Badge Status]: https://img.shields.io/github/workflow/status/axetroy/deno_process/test?style=for-the-badge&labelColor=7F2B7B&color=5b1f59