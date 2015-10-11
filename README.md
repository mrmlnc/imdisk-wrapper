# ImDisk-wrapper

ImDisk wrapper to create and delete virtual disks.

## Usage

This wrapper is able to create only VM disks type.

#### Options

  - Size **(required)**: value (b, k, m, g, t, K, M, G or T)
  - Label **(options)**: Letter of the English alphabet (A..Z)
  
#### .createDisk(options, callback)

```js
imDisk.createDisk({ size: '32M' }, function(err, info) {
  if (err) {
    throw err;
  } else {
    console.log(info);
  }
});

// => { status: 'ok', size: '32M', label: 'M' }
```

#### .removeDisk(label, callback)

```js
imDisk.removeDisk('X', function(err, info) {
  if (err) {
    throw err;
  } else {
    console.log(info);
  }
});

// => { status: 'ok', label: 'M' }
```

#### .removeDiskForce(label, callback)

Delete a virtual disk, even if it is performing the task.

```js
imDisk.removeDiskForce('X', function(err, info) {
  if (err) {
    throw err;
  } else {
    console.log(info);
  }
});

// => { status: 'ok', label: 'M' }
```

## License

MIT.
