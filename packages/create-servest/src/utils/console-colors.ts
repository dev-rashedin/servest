const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  dimGray: '\x1b[2m',
};

export function boldRed(text: string) : string {
  return `${colors.bold}${colors.red}${text}${colors.reset}`;
}

export function red(text: string) : string {
  return `${colors.red}${text}${colors.reset}`;
}

export function boldYellow(text: string) : string {
  return `${colors.bold}${colors.yellow}${text}${colors.reset}`;
}

export function yellow(text: string) : string {
  return `${colors.yellow}${text}${colors.reset}`;
}

export function boldGreen(text: string) : string {
  return `${colors.bold}${colors.green}${text}${colors.reset}`;
}

export function green(text: string) : string {
  return `${colors.green}${text}${colors.reset}`;
}

export function bold (text: string) : string {
  return `${colors.bold}${text}${colors.reset}`;
}

export function blue(text: string) : string {
  return `${colors.blue}${text}${colors.reset}`;
}

export function magenta(text: string) : string {
  return `${colors.magenta}${text}${colors.reset}`;
}

export function cyan(text: string) : string {
  return `${colors.cyan}${text}${colors.reset}`;
}

export function dimGray(text: string) : string {
  return `${colors.dimGray}${text}${colors.reset}`;
}
