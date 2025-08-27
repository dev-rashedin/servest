import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
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

  console.log('projectRoot:', baseDir);

  const cmd = getInstallCommand(packageManager, 'mongoose');
  const isESM = isESModule(cwd);

  // Step 1: Installing mongoose if not installed
  if (isPackageInstalled(cwd, 'mongoose')) {
    console.log('Mongoose is already installed. Skipping installation.');
  } else {
    console.log('📦 Installing mongoose...');
    execSync(cmd, { stdio: 'inherit' });
  }

  // Step 2: Creating config/connectDB file
  const configDir = path.join(baseDir, 'config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log('📁 Created config/ directory');
  }

  const connectDBPath = path.join(configDir, `connectDB.${isTypeScript ? 'ts' : 'js'}`);

  console.log('connectDBPath:', connectDBPath);

  if (!fs.existsSync(connectDBPath)) {
    const connectDBContent = isTypeScript
      ? tsConnectDBContent
      : isESM
        ? esmConnectDBContent
        : cjsConnectDBContent;

    fs.writeFileSync(connectDBPath, connectDBContent, 'utf8');
    console.log(`✅ Created ${connectDBPath}`);
  } else {
    console.log(`ℹ️ Skipped: ${connectDBPath} already exists`);
  }

  // Step 3: Injecting connectDB into server.js/ts or app.js/ts

  const possibleFiles = ['src/server', 'src/app'].map((name) =>
    path.join(cwd, `${name}.${isTypeScript ? 'ts' : 'js'}`),
  );

  const targetFile = possibleFiles.find((file) => fs.existsSync(file));

  console.log('possibleFiles:', possibleFiles);
  console.log('targetFile:', targetFile);

  if (targetFile) {
    let content = fs.readFileSync(targetFile, 'utf8');

    if (!content.includes('connectDB')) {
      const importLine =
        isESM || isTypeScript
          ? `import { connectDB } from "./config/connectDB";`
          : `const { connectDB } = require("./config/connectDB");`;

      content = `${importLine}\n${content}`;
    }

    // 2️⃣ Wrap app.listen in async IIFE to await connectDB
    const listenRegex = /(app\.listen\([^)]*\);?)/;
    if (listenRegex.test(content)) {
      const asyncWrapper = `
(async () => {
  try {
    await connectDB();
    $1
  } catch (err) {
    console.error('Failed to connect DB or start server:', err);
    process.exit(1);
  }
})();
`;
      content = content.replace(listenRegex, asyncWrapper);
    } else {
      console.warn(
        `⚠️ Could not find app.listen in ${path.basename(targetFile)} — remember to run connectDB manually`,
      );
    }

    fs.writeFileSync(targetFile, content, 'utf8');
    console.log(`🔗 Mongoose connectDB injected into ${path.basename(targetFile)}`);
  } else {
    console.log('⚠️ No server.js/ts or app.js/ts found — created connectDB but did not inject.');
  }

  console.log('🎉 Mongoose setup completed!');
}
