import { existsSync } from 'node:fs';

/**
 * Returns true if the current process is running on Android.
 * Handles native Android, Termux, and proot environments.
 */
export function isAndroid(env: NodeJS.ProcessEnv = process.env): boolean {
  return (
    process.platform === 'android' ||
    env['ANDROID_ROOT'] !== undefined ||
    existsSync('/system/bin/app_process')
  );
}

/**
 * Returns true if the current process is running inside Termux.
 */
export function isTermux(env: NodeJS.ProcessEnv = process.env): boolean {
  return env['TERMUX_VERSION'] !== undefined;
}
