const { platform, run, readAll } = Deno;

export interface Process {
  command: string;
  ppid: number;
  pid: number;
  stat: string;
}

export interface ProcessTree extends Process {
  children: ProcessTree[];
}

export interface KillOptions {
  force?: boolean;
  ignoreCase?: boolean;
  tree?: boolean;
}

/**
 * Get the single process infomation.
 * @param pid
 */
export async function get(pid: number): Promise<Process> {
  return (await getAll()).find(v => v.pid === pid);
}

/**
 * Get process list
 */
export async function getAll(): Promise<Process[]> {
  const commands =
    platform.os == "win"
      ? ["wmic.exe", "PROCESS", "GET", "Name,ProcessId,ParentProcessId,Status"]
      : ["ps", "-A", "-o", "comm,ppid,pid,stat"];

  const ps = run({
    args: commands,
    stdout: "piped"
  });

  const output = new TextDecoder().decode(await ps.output());

  const { success, code } = await ps.status();

  if (!success || code !== 0) {
    throw new Error("Fail to get process.");
  }

  const lines = output.split("\n").filter((v: string): string => v.trim());
  lines.shift();

  const processList: Process[] = lines.map(
    (line: string): Process => {
      const columns = line.trim().split(/\s+/);
      return {
        command: columns[0],
        ppid: +columns[1],
        pid: +columns[2],
        stat: columns[3]
      };
    }
  );

  return processList;
}

function findChildProcess(pid: number, processList: Process[]): Process[] {
  return processList
    .map((v: Process): Process => (v.ppid === pid ? v : undefined))
    .filter(v => v);
}

/**
 * TODO: Get process tree
 */
export async function getTree(): Promise<ProcessTree[]> {
  const processList = await getAll();
  const treeList: ProcessTree[] = [];

  for (const ps of processList) {
    treeList.push({
      ...ps,
      children: findChildProcess(ps.pid, processList).map(v => {
        return {
          children: [],
          ...v
        };
      })
    });
  }

  return treeList;
}

function getKillCommand(
  pidOrName: number | string,
  options: KillOptions = {}
): string[] {
  const killByName = typeof pidOrName === "string";
  if (platform.os === "win") {
    const commands = ["taskkill"];

    if (options.force) {
      commands.push("/f");
    }

    if (options.tree) {
      commands.push("/t");
    }

    commands.push(killByName ? "/im" : "/pid", pidOrName + "");

    return commands;
  } else if (platform.os === "linux") {
    const commands = [killByName ? "killall" : "kill"];

    if (options.force) {
      commands.push("-9");
    }

    if (killByName && options.ignoreCase) {
      commands.push("-I");
    }

    commands.push(pidOrName + "");

    return commands;
  } else {
    const commands = [killByName ? "pkill" : "kill"];

    if (options.force) {
      commands.push("-9");
    }

    if (killByName && options.ignoreCase) {
      commands.push("-i");
    }

    commands.push(pidOrName + "");

    return commands;
  }
}

export async function kill(
  pidOrName: number | string,
  options: KillOptions = {}
): Promise<void> {
  const commands = getKillCommand(pidOrName, options);

  const ps = await run({
    args: commands,
    stderr: "piped",
    stdout: "piped"
  });

  const { success, code } = await ps.status();

  if (!success || code !== 0) {
    const msg = new TextDecoder().decode(await readAll(ps.stderr));
    throw new Error(msg || "exit with code: " + code);
  }
}
