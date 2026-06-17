import { existsSync } from 'node:fs';

/**
 * Returns true if the current process is running on Android.
 * Handles native Android, Termux, and proot environments.
 */
export function isAndroid(env: NodeJS.ProcessEnv = process.env): boolean {
  return (
    process.platform === 'android' ||
    env['ANDROID_ROOT'] !== undefined ||
    env['ANDROID_DATA'] !== undefined ||
    // Common Android path
    existsSync('/system/bin/app_process') ||
    // Termux-specific path
    existsSync('/data/data/com.termux')
  );
}

/**
 * Returns true if the current process is running inside Termux.
 */
export function isTermux(env: NodeJS.ProcessEnv = process.env): boolean {
  return env['TERMUX_VERSION'] !== undefined || existsSync('/data/data/com.termux');
}
