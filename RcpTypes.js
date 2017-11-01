// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

var RcpTypes = (function() {
  RcpTypes.EnumOptions = Object.freeze({
    DEFAULT: 48,
    ENTRIES: 49,

    48: "DEFAULT",
    49: "ENTRIES",
  });

  RcpTypes.WidgetOptions = Object.freeze({
    TYPE: 80,
    ENABLED: 81,
    VISIBLE: 82,
    LABEL_VISIBLE: 83,
    VALUE_VISIBLE: 84,
    LABEL_POSITION: 85,

    80: "TYPE",
    81: "ENABLED",
    82: "VISIBLE",
    83: "LABEL_VISIBLE",
    84: "VALUE_VISIBLE",
    85: "LABEL_POSITION",
  });

  RcpTypes.ColorOptions = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
  });

  RcpTypes.ParameterOptions = Object.freeze({
    VALUE: 32,
    LABEL: 33,
    DESCRIPTION: 34,
    ORDER: 35,
    PARENT: 36,
    WIDGET: 37,
    USERDATA: 38,

    32: "VALUE",
    33: "LABEL",
    34: "DESCRIPTION",
    35: "ORDER",
    36: "PARENT",
    37: "WIDGET",
    38: "USERDATA",
  });

  RcpTypes.VectorOptions = Object.freeze({
    DEFAULT: 48,
    MINIMUM: 49,
    MAXIMUM: 50,
    MULTIPLEOF: 51,
    SCALE: 52,
    UNIT: 53,

    48: "DEFAULT",
    49: "MINIMUM",
    50: "MAXIMUM",
    51: "MULTIPLEOF",
    52: "SCALE",
    53: "UNIT",
  });

  RcpTypes.CompoundOptions = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
  });

  RcpTypes.BooleanOptions = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
  });

  RcpTypes.Widgettype = Object.freeze({
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

  RcpTypes.Command = Object.freeze({
    INVALID: 0,
    VERSION: 1,
    INITIALIZE: 2,
    ADD: 3,
    UPDATE: 4,
    REMOVE: 5,
    UPDATEVALUE: 6,

    0: "INVALID",
    1: "VERSION",
    2: "INITIALIZE",
    3: "ADD",
    4: "UPDATE",
    5: "REMOVE",
    6: "UPDATEVALUE",
  });

  RcpTypes.NumberScale = Object.freeze({
    LINEAR: 0,
    LOGARITHMIC: 1,
    EXP2: 2,

    0: "LINEAR",
    1: "LOGARITHMIC",
    2: "EXP2",
  });

  RcpTypes.DynamicArrayOptions = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
  });

  RcpTypes.LabelPosition = Object.freeze({
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

  RcpTypes.StringOptions = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
  });

  RcpTypes.Datatype = Object.freeze({
    BOOLEAN: 16,
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
    VECTOR2I8: 27,
    VECTOR2I16: 28,
    VECTOR2I32: 29,
    VECTOR2I64: 30,
    VECTOR2F32: 31,
    VECTOR2F64: 32,
    VECTOR3I8: 33,
    VECTOR3I16: 34,
    VECTOR3I32: 35,
    VECTOR3I64: 36,
    VECTOR3F32: 37,
    VECTOR3F64: 38,
    VECTOR4I8: 39,
    VECTOR4I16: 40,
    VECTOR4I32: 41,
    VECTOR4I64: 42,
    VECTOR4F32: 43,
    VECTOR4F64: 44,
    TINY_STRING: 45,
    SHORT_STRING: 46,
    STRING: 47,
    RGB: 48,
    RGBA: 49,
    ENUM: 50,
    FIXED_ARRAY: 51,
    DYNAMIC_ARRAY: 52,
    IMAGE: 54,
    BANG: 55,
    TIME: 56,
    GROUP: 57,
    COMPOUND: 58,

    16: "BOOLEAN",
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
    27: "VECTOR2I8",
    28: "VECTOR2I16",
    29: "VECTOR2I32",
    30: "VECTOR2I64",
    31: "VECTOR2F32",
    32: "VECTOR2F64",
    33: "VECTOR3I8",
    34: "VECTOR3I16",
    35: "VECTOR3I32",
    36: "VECTOR3I64",
    37: "VECTOR3F32",
    38: "VECTOR3F64",
    39: "VECTOR4I8",
    40: "VECTOR4I16",
    41: "VECTOR4I32",
    42: "VECTOR4I64",
    43: "VECTOR4F32",
    44: "VECTOR4F64",
    45: "TINY_STRING",
    46: "SHORT_STRING",
    47: "STRING",
    48: "RGB",
    49: "RGBA",
    50: "ENUM",
    51: "FIXED_ARRAY",
    52: "DYNAMIC_ARRAY",
    54: "IMAGE",
    55: "BANG",
    56: "TIME",
    57: "GROUP",
    58: "COMPOUND",
  });

  RcpTypes.NumberOptions = Object.freeze({
    DEFAULT: 48,
    MINIMUM: 49,
    MAXIMUM: 50,
    MULTIPLEOF: 51,
    SCALE: 52,
    UNIT: 53,

    48: "DEFAULT",
    49: "MINIMUM",
    50: "MAXIMUM",
    51: "MULTIPLEOF",
    52: "SCALE",
    53: "UNIT",
  });

  RcpTypes.MetadataOptions = Object.freeze({
    VERSION: 26,
    CAPABILITIES: 27,
    COMMANDS: 28,

    26: "VERSION",
    27: "CAPABILITIES",
    28: "COMMANDS",
  });

  RcpTypes.PacketOptions = Object.freeze({
    ID: 16,
    TIMESTAMP: 17,
    DATA: 18,

    16: "ID",
    17: "TIMESTAMP",
    18: "DATA",
  });

  RcpTypes.FixedArrayOptions = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
  });

  function RcpTypes(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

  }

  var TinyString = RcpTypes.TinyString = (function() {
    function TinyString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU1();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return TinyString;
  })();

  var ShortString = RcpTypes.ShortString = (function() {
    function ShortString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU2be();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return ShortString;
  })();

  var LongString = RcpTypes.LongString = (function() {
    function LongString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU4be();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return LongString;
  })();

  var Userdata = RcpTypes.Userdata = (function() {
    function Userdata(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this.myLen = this._io.readU4be();
      this.data = this._io.readBytes(this.myLen);
    }

    return Userdata;
  })();

  return RcpTypes;
})();

// Export for amd environments
if (typeof define === 'function' && define.amd) {
  define('RcpTypes', [], function() {
    return RcpTypes;
  });
}

// Export for CommonJS
if (typeof module === 'object' && module && module.exports) {
  module.exports = RcpTypes;
}
