const { platform, run } = Deno;

export interface Process {
  command: string;
  ppid: number;
  pid: number;
  stat: string;
}

export interface ProcessTree extends Process {
  children: ProcessTree[];
}

/**
 * Get the single process infomation.
 * @param pid
 */
export async function getProcess(pid: number): Promise<Process> {
  return (await getProcesses()).find(v => v.pid === pid);
}

/**
 * Get process list
 */
export async function getProcesses(): Promise<Process[]> {
  const commands =
    platform.os == "win"
      ? ["wmic.exe", "PROCESS", "GET", "Name,ProcessId,ParentProcessId,Status"]
      : ["ps", "-A", "-o", "comm,ppid,pid,stat"];

  const ps = run({
    args: commands,
    stdout: "piped"
  });

  const { success, code } = await ps.status();

  if (!success || code !== 0) {
    throw new Error("Fail to get process.");
  }

  const output = new TextDecoder().decode(await ps.output());

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
export async function getProcessTree(): Promise<ProcessTree[]> {
  const processList = await getProcesses();
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
