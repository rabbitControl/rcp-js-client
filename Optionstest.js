// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

var Optionstest = (function() {
  Optionstest.Ids = Object.freeze({
    TYPE1: 1,
    TYPE2: 2,
    TYPE4: 4,

    1: "TYPE1",
    2: "TYPE2",
    4: "TYPE4",
  });

  function Optionstest(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this.options = [];
    while (!this._io.isEof()) {
      this.options.push(new Options(this._io, this, this._root));
    }
  }

  var Options = Optionstest.Options = (function() {
    function Options(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.dataId = this._io.readU1();
      if (this.dataId == Optionstest.Ids.TYPE1) {
        this.dataType1 = this._io.readU1();
      }
      if (this.dataId == Optionstest.Ids.TYPE2) {
        this.dataType2 = this._io.readU2be();
      }
      if (this.dataId == Optionstest.Ids.TYPE4) {
        this.dataType4 = this._io.readU8be();
      }
    }

    return Options;
  })();

  return Optionstest;
})();

// Export for amd environments
if (typeof define === 'function' && define.amd) {
  define('Optionstest', [], function() {
    return Optionstest;
  });
}

// Export for CommonJS
if (typeof module === 'object' && module && module.exports) {
  module.exports = Optionstest;
}
