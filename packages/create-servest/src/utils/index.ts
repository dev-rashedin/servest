import { red } from "./console-colors";

interface CancelOperation {
  (message?: string): void;
}

export const cancelOperation: CancelOperation = (message = 'Operation cancelled') => {
   console.error(red(message));
   process.exit(1);
}