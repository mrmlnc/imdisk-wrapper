'use strict';

const assert = require('assert');
const childProcess = require('child_process');
const imDisk = require('./');

describe('Fail tests', () => {
  it('Should give an error without size option', () => {
    return imDisk.create('Z').then((err) => {
      assert.ok(/Size option is required/.test(err));
    });
  });

  it('Should give an error with wrong size format', () => {
    return imDisk.create('Z', '32Cat').then((err) => {
      assert.ok(/Wrong size format/.test(err));
    });
  });

  it('Should give an error without size option', () => {
    return imDisk.create('Z', '32M', {
      imdiskPath: 'nope'
    }).then((err) => {
      assert.ok(/ImDisk not found/.test(err));
    });
  });

  it('Should give an error removing disk with not existing label', () => {
    return imDisk.remove('Z').then((err) => {
      assert.ok(/No such device/.test(err));
    });
  });
});

describe('Creating & Removing', () => {
  it('Should creating disk', () => {
    return imDisk.create('Z', '32M').then((res) => {
      assert.equal(res.label, 'Z');
      assert.equal(res.size, '32M');
    });
  });

  it('Should be NTFS file system', (done) => {
    const command = `wmic logicaldisk where name='Z:' get FileSystem`;
    childProcess.exec(command, (err, stdout) => {
      if (err) {
        assert.fail(err);
      }

      assert.ok(/NTFS/.test(stdout));
      done();
    });
  });

  it('Should removing disk', () => {
    return imDisk.remove('Z').then((res) => {
      assert.equal(res.label, 'Z');
    });
  });
});

describe('Creating & Removing (force)', () => {
  it('Should creating disk', () => {
    return imDisk.create('Z', '32M').then((res) => {
      assert.equal(res.label, 'Z');
      assert.equal(res.size, '32M');
    });
  });

  it('Should removing disk', () => {
    return imDisk.remove('Z', { force: true }).then((res) => {
      assert.equal(res.label, 'Z');
    });
  });
});

describe('Creating & Removing random disk', () => {
  let diskLabel;

  it('Should creating disk', () => {
    return imDisk.create(null, '32M').then((res) => {
      diskLabel = res.label;
      assert.equal(res.size, '32M');
    });
  });

  it('Should removing disk', () => {
    return imDisk.remove(diskLabel).then((res) => {
      assert.equal(res.label, diskLabel);
    });
  });
});
