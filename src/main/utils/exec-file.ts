import { execFile as asyncExecFile } from 'child_process';
import { promisify } from 'util';

export const execFile = promisify(asyncExecFile);
