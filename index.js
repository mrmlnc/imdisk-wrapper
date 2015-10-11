var cp = require('child_process');
var driveLetters = require('windows-drive-letters');

/**
 * Checking installation ImDisk
 *
 * @returns {boolean}
 */
var checkImDisk = function() {
  var test = cp.execSync('imdisk --version');
  return (/olof@ltr-data\.se/.test(test) && /Olof Lagerkvist/.test(test));
};

/**
 * Checking the value of the transmitted size of the disk
 *
 * @param {string} size
 * @returns {boolean}
 */
var checkSize = function(size) {
  return /(b|k|m|g|t|K|M|G|T)/.test(size);
};

/**
 * Initialization()
 *
 * @constructor
 */
function Imdisk() {
  this.imdisk = checkImDisk();
}

module.exports = new Imdisk();

/**
 * Preparation of the command to create a disc
 *
 * @param {object} op
 * @returns {string}
 * @private
 */
Imdisk.prototype._prepareCommand = function(op) {
  this.label = (op.label) ? op.label : driveLetters.randomLetterSync();

  return 'imdisk -a -s ' + op.size + ' -m ' + this.label + ': -t vm -p "/fs:ntfs /q /y"';
};

/**
 * Remove virtual disk
 *
 * @param {string} label
 * @param {string} force
 * @param {function} cb
 * @private
 */
Imdisk.prototype._removeDisk = function(label, force, cb) {
  if (this.imdisk) {
    cp.exec('imdisk ' + force + ' -m ' + label + ':', function(err, stdout, stderr) {
      if (err) {
        cb(stderr);
      } else {
        cb(null, {
          status: 'ok',
          label: label
        });
      }
    });
  } else {
    cb(new Error('ImDisk not found or invalid data format: size (b|k|m|g|t|K|M|G|T).'));
  }
};

/**
 * Create virtual disk
 *
 * @param {object} op
 * @param {function} cb
 */
Imdisk.prototype.createDisk = function(op, cb) {
  if (this.imdisk && checkSize(op.size)) {
    var _that = this;
    cp.exec(this._prepareCommand(op), function(err, stdout, stderr) {
      if (err) {
        cb(stderr);
      } else {
        cb(null, {
          status: 'ok',
          size: op.size,
          label: _that.label
        });
      }
    });
  } else {
    cb(new Error('ImDisk not found or invalid data format: size (b|k|m|g|t|K|M|G|T).'));
  }
};

/**
 * Remove virtual disk
 *
 * @param {string} label
 * @param {function} cb
 */
Imdisk.prototype.removeDisk = function(label, cb) {
  this._removeDisk(label, '-d', cb);
};

/**
 * Remove virtual disk with force
 *
 * @param {string} label
 * @param {function} cb
 */
Imdisk.prototype.removeDiskForce = function(label, cb) {
  this._removeDisk(label, '-D', cb);
};
