var test = require('ava');
var imDisk = require('./index');
var label = 'none';

test.serial('Create disk', function(t) {
  imDisk.createDisk({ size: '32M' }, function(err, info) {
    console.log(info);
    if (err) {
      throw err;
    } else {
      label = info.label;
      t.is(info.status, 'ok');
      t.end();
    }
  });
});

test.serial('Remove disk', function(t) {
  imDisk.removeDisk(label, function(err, info) {
    console.log(info);
    if (err) {
      throw err;
    } else {
      t.is(info.label, label);
      t.end();
    }
  });
});

test.serial('Create disk', function(t) {
  imDisk.createDisk({ size: '32M' }, function(err, info) {
    console.log(info);
    if (err) {
      throw err;
    } else {
      label = info.label;
      t.is(info.status, 'ok');
      t.end();
    }
  });
});

test.serial('Remove disk with force', function(t) {
  imDisk.removeDiskForce(label, function(err, info) {
    console.log(info);
    if (err) {
      throw err;
    } else {
      t.is(info.label, label);
      t.end();
    }
  });
});
