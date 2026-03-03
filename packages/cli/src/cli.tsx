/** InternsMarket CLI (im) — main entry point with Commander command tree */
import { Command } from 'commander';
import { render } from 'ink';
import React from 'react';
import { VERSION } from '@internsmarket/core';
import { InstallCommand } from './commands/install-command.js';
import { UpdateCommand } from './commands/update-command.js';
import { RemoveCommand } from './commands/remove-command.js';
import { ListCommand } from './commands/list-command.js';
import { ActivateCommand } from './commands/activate-command.js';
import { StatusCommand } from './commands/status-command.js';
import { ApplyCommand } from './commands/apply-command.js';
import { SetupCommand } from './commands/setup-command.js';
import type { SupportedRuntime } from './services/runtime-adapter-factory.js';
import { skillInit } from './commands/skill-init-command.js';
import { skillValidate } from './commands/skill-validate-command.js';
import { skillPack } from './commands/skill-pack-command.js';
import { SkillInstallCommand } from './commands/skill-install-command.js';

const program = new Command();

program
  .name('im')
  .description('Install, manage, and deploy AI intern personas')
  .version(VERSION);

program
  .command('install <intern-id>')
  .description('Install an AI intern from the registry or a local path')
  .option('-f, --force', 'Overwrite existing installation')
  .option('-l, --local <path>', 'Install from a local directory (dev mode)')
  .option('-r, --runtime <runtime>', 'Target runtime: zeroclaw | openclaw', 'zeroclaw')
  .action(async (internId: string, opts: { force?: boolean; local?: string; runtime?: string }) => {
    const { waitUntilExit } = render(
      <InstallCommand
        internId={internId}
        force={opts.force}
        localPath={opts.local}
        runtime={opts.runtime as SupportedRuntime | undefined}
      />,
    );
    await waitUntilExit();
  });

program
  .command('update [intern-id]')
  .description('Update an intern (or all interns if no ID given)')
  .action(async (internId?: string) => {
    const { waitUntilExit } = render(<UpdateCommand internId={internId} />);
    await waitUntilExit();
  });

program
  .command('remove <intern-id>')
  .description('Remove an installed intern')
  .action(async (internId: string) => {
    const { waitUntilExit } = render(<RemoveCommand internId={internId} />);
    await waitUntilExit();
  });

program
  .command('list')
  .description('List installed interns')
  .action(async () => {
    const { waitUntilExit } = render(<ListCommand />);
    await waitUntilExit();
  });

program
  .command('activate')
  .description('Activate a license key')
  .action(async () => {
    const { waitUntilExit } = render(<ActivateCommand />);
    await waitUntilExit();
  });

program
  .command('status')
  .description('Show license tier and installed interns')
  .action(async () => {
    const { waitUntilExit } = render(<StatusCommand />);
    await waitUntilExit();
  });

program
  .command('apply <intern-id>')
  .description('Apply an installed intern to a runtime (zeroclaw | openclaw)')
  .option('-r, --runtime <runtime>', 'Target runtime', 'zeroclaw')
  .action(async (internId: string, opts: { runtime?: string }) => {
    const runtime = (opts.runtime ?? 'zeroclaw') as SupportedRuntime;
    const { waitUntilExit } = render(
      <ApplyCommand internId={internId} runtime={runtime} />,
    );
    await waitUntilExit();
  });

program
  .command('setup')
  .description('Interactive onboarding — detect and install runtimes (ZeroClaw / OpenClaw)')
  .option('-r, --runtime <runtime>', 'Directly install a specific runtime: zeroclaw | openclaw')
  .option('-y, --yes', 'Non-interactive mode (auto-confirm)')
  .action(async (opts: { runtime?: string; yes?: boolean }) => {
    const { waitUntilExit } = render(
      <SetupCommand
        directRuntime={opts.runtime as SupportedRuntime | undefined}
        autoConfirm={opts.yes}
      />,
    );
    await waitUntilExit();
  });

const skill = program.command('skill').description('Manage AI agent skills');

skill
  .command('init [dir]')
  .description('Scaffold a new skill directory')
  .action(async (dir?: string) => {
    await skillInit(dir ?? '.');
  });

skill
  .command('validate [dir]')
  .description('Validate a skill directory')
  .action(async (dir?: string) => {
    await skillValidate(dir ?? '.');
  });

skill
  .command('pack [dir]')
  .description('Pack a skill directory into a .tgz archive')
  .option('-o, --output <dir>', 'Output directory', '.')
  .action(async (dir?: string, opts?: { output?: string }) => {
    await skillPack(dir ?? '.', opts?.output ?? '.');
  });

skill
  .command('install <name>')
  .description('Install a skill from the registry')
  .option('-v, --version <range>', 'Version range', '*')
  .action(async (name: string, opts: { version?: string }) => {
    const { waitUntilExit } = render(
      <SkillInstallCommand name={name} versionRange={opts.version ?? '*'} />,
    );
    await waitUntilExit();
  });

program.parse();
