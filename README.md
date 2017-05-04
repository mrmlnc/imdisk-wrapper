# imdisk-wrapper

[![Greenkeeper badge](https://badges.greenkeeper.io/mrmlnc/imdisk-wrapper.svg)](https://greenkeeper.io/)

> A simple wrapper for ImDisk to create (only VM) and delete virtual disks.

[![AppVeyor](https://ci.appveyor.com/api/projects/status/b707ardgrdf0lwa3?svg=true)](https://ci.appveyor.com/project/mrmlnc/imdisk-wrapper)
[![NPM version](https://img.shields.io/npm/v/imdisk-wrapper.svg?style=flat-square)](https://www.npmjs.com/package/imdisk-wrapper)
[![devDependency Status](https://img.shields.io/david/mrmlnc/imdisk-wrapper.svg?style=flat-square)](https://david-dm.org/mrmlnc/imdisk-wrapper#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/mrmlnc/imdisk-wrapper.svg?style=flat-square)](https://david-dm.org/mrmlnc/imdisk-wrapper#info=devDependencies)

## Install

```shell
$ npm i -S imdisk-wrapper
```

## Usage

### create(label, size, [options])

```js
imDisk.create('Z', '32M').then((res) => {
  console.log(res); // { label: 'Z', size: '32M' }
}).catch((err) => {
  console.log(err);
});
```

**arguments:**

  * `label` [`string` | default: random available letter] - Available drive letter is determined by [windows-drive-letters](https://github.com/mrmlnc/windows-drive-letters).
  * `size` [`string` | default: `null`] - The size of the disk in the format `number[b, k, m, g, t, K, M, G, T]`.

**options:**

  * `imdiskPath` [`string` | default: `imdisk`] - A path to ImDisk.
  * `fileSystem` [`string` | default: `ntfs`] - Disk file system.
  * `command` [`string` | default: `null`] - Custom command that replaces the command of creating disk in this module.

### remove(label, [options])

```js
imDisk.create('Z').then((res) => {
  console.log(res); // { label: 'Z' }
}).catch((err) => {
  console.log(err);
});
```

**arguments:**
  
  * `label` [`string` | default: `null`] - The drive letter to remove.

**options:**

  * `imdiskPath` [`string` | default: `imdisk`] - A path to ImDisk.
  * `force` [`boolean` | default: `false`] -  Use `true` to force removal even if the device is in use.
  * `command` [`string` | default: `null`] - Custom command that replaces the command of removing disk in this module.

## Changelog

See the [Releases section of our GitHub project](https://github.com/mrmlnc/imdisk-wrapper/releases) for changelogs for each release version.

## License

This software is released under the terms of the MIT license.
