'use strict';

const childProcess = require('child_process');
const co = require('co');
const driveLetters = require('windows-drive-letters');

function exec(command, options) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, options, (err, stdout) => {
      if (err) {
        reject(err);
      }

      resolve(stdout);
    });
  });
}

function testVersion(size) {
  return /\d+(?:b|k|m|g|t|K|M|G|T){1}$/.test(size);
}

function create(label, size, options) {
  options = Object.assign({
    imdiskPath: 'imdisk',
    fileSystem: 'ntfs',
    command: null
  }, options);

  return co(function* () {
    if (!label) {
      label = yield driveLetters.randomLetter();
    }

    if (!size) {
      return new Error('Size option is required');
    }

    if (!testVersion(size)) {
      return new Error('Wrong size format. Use `b, k, m, g, t, K, M, G, T` suffix');
    }

    try {
      yield exec(`${options.imdiskPath} --version`);
    } catch (err) {
      return new Error('ImDisk not found');
    }

    if (!options.command) {
      options.command = `${options.imdiskPath} -a -s ${size} -m ${label}: -t vm -p "/fs:${options.fileSystem} /q /y"`;
    }

    try {
      yield exec(options.command);
      return {
        label: label,
        size: size
      };
    } catch (err) {
      return err;
    }
  });
}

module.exports.create = create;

function remove(label, options) {
  options = Object.assign({
    imdiskPath: 'imdisk',
    force: false,
    command: null
  }, options);

  return co(function* () {
    if (!label) {
      return new Error('Label is required');
    }

    if (!options.command) {
      const force = (options.force) ? '-D' : '-d';
      options.command = `imdisk ${force} -m ${label}:`;
    }

    try {
      yield exec(options.command);
      return {
        label: label
      };
    } catch (err) {
      return err;
    }
  });
}

module.exports.remove = remove;
