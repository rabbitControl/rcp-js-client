// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

var ToiTypes = (function() {
  ToiTypes.Parameter = Object.freeze({
    VALUE: 32,
    LABEL: 33,
    DESCRIPTION: 34,
    ORDER: 35,
    WIDGET: 36,
    USERDATA: 37,

    32: "VALUE",
    33: "LABEL",
    34: "DESCRIPTION",
    35: "ORDER",
    36: "WIDGET",
    37: "USERDATA",
  });

  ToiTypes.TypeNumber = Object.freeze({
    DEFAULTVALUE: 48,
    MIN: 49,
    MAX: 50,
    MULT: 51,
    SCALE: 52,
    UNIT: 53,

    48: "DEFAULTVALUE",
    49: "MIN",
    50: "MAX",
    51: "MULT",
    52: "SCALE",
    53: "UNIT",
  });

  ToiTypes.TypeDefinition = Object.freeze({
    DEFAULTVALUE: 48,

    48: "DEFAULTVALUE",
  });

  ToiTypes.Widget = Object.freeze({
    TYPE: 80,
    ENABLED: 81,
    VISIBLE: 82,
    LABEL_VISIBLE: 83,
    VALUE_VISIBLE: 84,
    LABE_POSITION: 85,

    80: "TYPE",
    81: "ENABLED",
    82: "VISIBLE",
    83: "LABEL_VISIBLE",
    84: "VALUE_VISIBLE",
    85: "LABE_POSITION",
  });

  ToiTypes.TypeEnum = Object.freeze({
    DEFAULTVALUE: 48,
    ENTRIES: 49,

    48: "DEFAULTVALUE",
    49: "ENTRIES",
  });

  ToiTypes.WidgetType = Object.freeze({
    TEXTBOX: 16,
    NUMBERBOX: 17,
    BUTTON: 18,
    CHECKBOX: 19,
    RADIOBUTTON: 20,
    SLIDER: 21,
    DIAL: 22,
    COLORBOX: 23,
    TABLE: 24,
    TREEVIEW: 25,
    DROPDOWN: 26,
    XYFIELD: 31,

    16: "TEXTBOX",
    17: "NUMBERBOX",
    18: "BUTTON",
    19: "CHECKBOX",
    20: "RADIOBUTTON",
    21: "SLIDER",
    22: "DIAL",
    23: "COLORBOX",
    24: "TABLE",
    25: "TREEVIEW",
    26: "DROPDOWN",
    31: "XYFIELD",
  });

  ToiTypes.Command = Object.freeze({
    VERSION: 1,
    INIT: 2,
    ADD: 3,
    UPDATE: 4,
    REMOVE: 5,

    1: "VERSION",
    2: "INIT",
    3: "ADD",
    4: "UPDATE",
    5: "REMOVE",
  });

  ToiTypes.NumberScale = Object.freeze({
    LIN: 0,
    LOG: 1,
    EXP2: 2,

    0: "LIN",
    1: "LOG",
    2: "EXP2",
  });

  ToiTypes.TypeVector = Object.freeze({
    DEFAULTVALUE: 48,
    MIN: 49,
    MAX: 50,
    MULT: 51,
    SCALE: 52,
    UNIT: 53,

    48: "DEFAULTVALUE",
    49: "MIN",
    50: "MAX",
    51: "MULT",
    52: "SCALE",
    53: "UNIT",
  });

  ToiTypes.LabelPosition = Object.freeze({
    LEFT: 0,
    RIGHT: 1,
    TOP: 2,
    BOTTOM: 3,
    CENTER: 4,

    0: "LEFT",
    1: "RIGHT",
    2: "TOP",
    3: "BOTTOM",
    4: "CENTER",
  });

  ToiTypes.Metadata = Object.freeze({
    VERSION: 26,
    CAPABILITIES: 27,
    COMMANDS: 28,

    26: "VERSION",
    27: "CAPABILITIES",
    28: "COMMANDS",
  });

  ToiTypes.Datatype = Object.freeze({
    BOOL: 16,
    INT8: 17,
    UINT8: 18,
    INT16: 19,
    UINT16: 20,
    INT32: 21,
    UINT32: 22,
    INT64: 23,
    UINT64: 24,
    FLOAT32: 25,
    FLOAT64: 26,
    VECTOR2F32: 31,
    VECTOR3F32: 37,
    VECTOR4F32: 43,
    TSTR: 45,
    SSTR: 46,
    LSTR: 47,
    RGB8: 48,
    RGBA8: 49,
    ARGB8: 50,
    ENUM: 54,
    ARRAY: 55,
    IMAGE: 57,
    BANG: 58,
    TIME: 59,

    16: "BOOL",
    17: "INT8",
    18: "UINT8",
    19: "INT16",
    20: "UINT16",
    21: "INT32",
    22: "UINT32",
    23: "INT64",
    24: "UINT64",
    25: "FLOAT32",
    26: "FLOAT64",
    31: "VECTOR2F32",
    37: "VECTOR3F32",
    43: "VECTOR4F32",
    45: "TSTR",
    46: "SSTR",
    47: "LSTR",
    48: "RGB8",
    49: "RGBA8",
    50: "ARGB8",
    54: "ENUM",
    55: "ARRAY",
    57: "IMAGE",
    58: "BANG",
    59: "TIME",
  });

  ToiTypes.TypeArray = Object.freeze({
    DEFAULTVALUE: 48,
    SUBTYPE: 49,

    48: "DEFAULTVALUE",
    49: "SUBTYPE",
  });

  ToiTypes.Packet = Object.freeze({
    TERMINATOR: 0,
    ID: 16,
    TIMESTAMP: 17,
    DATA: 18,

    0: "TERMINATOR",
    16: "ID",
    17: "TIMESTAMP",
    18: "DATA",
  });

  function ToiTypes(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

  }

  var TinyString = ToiTypes.TinyString = (function() {
    function TinyString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU1();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return TinyString;
  })();

  var ShortString = ToiTypes.ShortString = (function() {
    function ShortString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU2be();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return ShortString;
  })();

  var LongString = ToiTypes.LongString = (function() {
    function LongString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU4be();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return LongString;
  })();

  var Userdata = ToiTypes.Userdata = (function() {
    function Userdata(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU4be();
      this.data = this._io.readBytes(this.myLen);
    }

    return Userdata;
  })();

  return ToiTypes;
})();

// Export for amd environments
if (typeof define === 'function' && define.amd) {
  define('ToiTypes', [], function() {
    return ToiTypes;
  });
}

// Export for CommonJS
if (typeof module === 'object' && module && module.exports) {
  module.exports = ToiTypes;
}
