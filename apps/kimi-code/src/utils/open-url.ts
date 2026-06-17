import { execFile } from 'node:child_process';

import { isTermux } from './platform';

export function openUrl(url: string): void {
  const command: [string, string[]] =
    process.platform === 'darwin'
      ? ['open', [url]]
      : process.platform === 'win32'
        ? ['cmd', ['/c', 'start', '', url]]
        : isTermux()
          ? ['termux-open', [url]]
          : ['xdg-open', [url]];
  execFile(command[0], command[1], () => {});
}
