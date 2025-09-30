// if (addons.length > 0) {
//   spawn.sync(pkgManager, ['install'], { cwd: root, stdio: 'inherit' });

//   const { status } = spawn.sync('npx', ['servest@latest', 'init'], {
//     stdio: 'inherit',
//   });

//   if (status !== 0) {
//     log.warn(red(`🚨 Failed to initialize servest. Run 'npx servest@latest init' manually.`));
//     process.exit(status ?? 1);
//   } else if (getIServestConfig(cwd)) {
//     for (const addon of addons) {
//       log.info(`\nAdding ${addon}...`);
//       const { status } = spawn.sync('npx', ['servest@latest', 'add', addon], {
//         stdio: 'inherit',
//       });

//       if (status !== 0) {
//         log.warn(`${red('Failed:')} ${addon}`);
//       } else {
//         log.success(green(`${addon} added successfully!`));
//       }
//     }
//   }
// }
