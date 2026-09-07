import fs from 'node:fs';
import path from 'node:path';
import spawn from 'cross-spawn';

export function applyGitFeature(root: string, gitEnabled: boolean): void {
  if (!gitEnabled) return;

  // Ensure .git does not already exist
  if (fs.existsSync(path.join(root, '.git'))) return;

  try {
    spawn.sync('git', ['init'], { cwd: root, stdio: 'ignore' });
  } catch {
    // Git might not be installed or errored, ignore gracefully
  }
}
