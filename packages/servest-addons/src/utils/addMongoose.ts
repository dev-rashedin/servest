import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { getInstallCommand } from './index';

export async function addMongoose({ baseDir, language, packageManager }: AddMongooseOptions) {
  const cwd = process.cwd();
  const isTypeScript = language === 'ts' || language === 'typescript';

  console.log('projectRoot:', baseDir);

  const cmd = getInstallCommand(packageManager, 'mongoose');

  // Step 1: Install mongoose
  console.log('📦 Installing mongoose...');
  execSync(cmd, { stdio: 'inherit' });

  // Step 2: Create config/connectDB file
  const configDir = path.join(baseDir, 'config');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
    console.log('📁 Created config/ directory');
  }

  const connectDBPath = path.join(configDir, `connectDB.${isTypeScript ? 'ts' : 'js'}`);

  console.log('connectDBPath:', connectDBPath);

  if (!fs.existsSync(connectDBPath)) {
    const connectDBContent = isTypeScript
      ? `import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(\`MongoDB connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
}
`
      : `const mongoose = require("mongoose");

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`MongoDB connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
}

module.exports = { connectDB };
`;

    fs.writeFileSync(connectDBPath, connectDBContent, 'utf8');
    console.log(`✅ Created ${connectDBPath}`);
  } else {
    console.log(`ℹ️ Skipped: ${connectDBPath} already exists`);
  }

  // Step 3: Inject connectDB into server.js/ts or app.js/ts
  const possibleFiles = ['src/server', 'src/app'].map((name) =>
    path.join(cwd, `${name}.${isTypeScript ? 'ts' : 'js'}`),
  );

  const targetFile = possibleFiles.find((file) => fs.existsSync(file));

  console.log('possibleFiles:', possibleFiles);
  console.log('targetFile:', targetFile);

  if (targetFile) {
    let content = fs.readFileSync(targetFile, 'utf8');

    // Check if connectDB is already imported
    if (!content.includes('connectDB')) {
      const importLine = isTypeScript
        ? `import { connectDB } from "./config/connectDB";`
        : `const { connectDB } = require("./config/connectDB");`;

      content = `${importLine}\n${content}`;

      // Try to run connectDB before server starts listening
      if (!content.includes('connectDB();')) {
        content = content.replace(/(app\.listen\(.*\))/, `connectDB().then(() => {\n  $1;\n});`);
      }

      fs.writeFileSync(targetFile, content, 'utf8');
      console.log(`🔗 Mongoose connected in ${path.basename(targetFile)}`);
    } else {
      console.log(`ℹ️ Skipped: connectDB already imported in ${path.basename(targetFile)}`);
    }
  } else {
    console.log('⚠️ No server.js/ts or app.js/ts found — created connectDB but did not inject.');
  }

  console.log('🎉 Mongoose setup completed!');
}
