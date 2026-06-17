import { open } from 'node:fs/promises';

/**
 * Validates that an executable binary is compatible with the current Android environment.
 * On Android, binaries must be Position Independent Executables (PIE).
 */
export async function validateAndroidBinary(filePath: string): Promise<boolean> {
  try {
    const handle = await open(filePath, 'r');
    try {
      const buffer = Buffer.alloc(20);
      await handle.read(buffer, 0, 20, 0);

      // ELF Magic: 7f 45 4c 46 (0x7F 'E' 'L' 'F')
      if (buffer[0] !== 0x7f || buffer[1] !== 0x45 || buffer[2] !== 0x4c || buffer[3] !== 0x46) {
        return false;
      }

      // ELF Type: offset 16 (2 bytes)
      // ET_EXEC = 2 (Executable, usually not PIE, fails on modern Android)
      // ET_DYN = 3 (Shared object, used for PIE)
      const eType = buffer.readUInt16LE(16);

      // Modern Android (since 5.0) requires PIE, which is ET_DYN (3).
      // ET_EXEC (2) binaries fail with "has unexpected e_type: 2".
      return eType === 3;
    } finally {
      await handle.close();
    }
  } catch {
    return false;
  }
}
