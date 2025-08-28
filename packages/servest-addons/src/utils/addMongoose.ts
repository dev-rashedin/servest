import fs from 'fs';
import path from 'path';
import spawn from 'cross-spawn';
import { cyan, green, red, yellow } from '../../../utils/colors';
import { getInstallCommand, isESModule, isPackageInstalled } from './index';

const tsConnectDBContent = `
import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(MONGO_URI!);
    console.log(\`MongoDB connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
}
`;

const esmConnectDBContent = `
import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(\`MongoDB connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
}
`;

const cjsConnectDBContent = `
const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(\`MongoDB connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
`;

export async function addMongoose({ baseDir, language, packageManager }: AddMongooseOptions) {
  const cwd = process.cwd();
  const isTypeScript = language === 'ts' || language === 'typescript';
  const cmd = getInstallCommand(packageManager, 'mongoose');
  const isESM = isESModule(cwd);

  // Step 1: Installing mongoose if not installed
  if (isPackageInstalled(cwd, 'mongoose')) {
    console.log(yellow('⚠️ mongoose already installed'));
  } else {
    console.log(cyan('⬇️ Installing mongoose...'));

    await new Promise<void>((resolve, reject) => {
      const child = spawn(cmd, { cwd, stdio: 'inherit', shell: true });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(red(`Installation failed with exit code ${code}`)));
        }
      });

      child.on('error', reject);
    });
  }

  // Step 2: Creating config/connectDB file
  const configDir = path.join(baseDir, 'config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log(green('📁 Created config/ directory'));
  }

  const connectDBPath = path.join(configDir, `connectDB.${isTypeScript ? 'ts' : 'js'}`);

  if (!fs.existsSync(connectDBPath)) {
    const connectDBContent = isTypeScript
      ? tsConnectDBContent
      : isESM
        ? esmConnectDBContent
        : cjsConnectDBContent;

    fs.writeFileSync(connectDBPath, connectDBContent, 'utf8');
    console.log(green(`✅ Created connectDB file`));
  } else {
    console.log(yellow(`⚠️ connectDB already exists`));
  }

  // Step 3: Injecting connectDB into server.js/ts or app.js/ts

  const possibleFiles = ['src/server', 'src/app'].map((name) =>
    path.join(cwd, `${name}.${isTypeScript ? 'ts' : 'js'}`),
  );

  const targetFile = possibleFiles.find((file) => fs.existsSync(file));

  if (targetFile) {
    let content = fs.readFileSync(targetFile, 'utf8');

    if (!content.includes('connectDB')) {
      const importLine =
        isESM || isTypeScript
          ? `import { connectDB } from "./config/connectDB";`
          : `const { connectDB } = require("./config/connectDB");`;

      // Remove any old app.listen block
      const listenStartIndex = content.indexOf('app.listen');
      if (listenStartIndex !== -1) {
        const listenEndIndex = content.indexOf('});', listenStartIndex);
        if (listenEndIndex !== -1) {
          content =
            content.slice(0, listenStartIndex).trimEnd() + content.slice(listenEndIndex + 3);
        } else {
          content = content.slice(0, listenStartIndex).trimEnd();
        }
      }

      // Trim the remaining content but keep one line break at the end
      const trimmedContent = content.trimEnd() + '\n\n';

      // Combine import + content + async IIFE
      const newContent = `${importLine}\n${trimmedContent}(async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(\`Server listening on port http://localhost:\${config.port}\`);
    });
  } catch (err) {
    console.error('Failed to connect DB or start server:', err);
    process.exit(1);
  }
})();`;

      fs.writeFileSync(targetFile, newContent, 'utf8');
    }
  } else {
    console.log(yellow('⚠️ Could not find src/server or src/app to inject connectDB call.'));
  }

  console.log(green('🎉 Mongoose setup completed!'));
}
