// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kaitai-struct/KaitaiStream'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('kaitai-struct/KaitaiStream'));
  } else {
    root.RcpTypes = factory(root.KaitaiStream);
  }
}(this, function (KaitaiStream) {
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
    TAGS: 35,
    ORDER: 36,
    PARENTID: 37,
    WIDGET: 38,
    USERDATA: 39,

    32: "VALUE",
    33: "LABEL",
    34: "DESCRIPTION",
    35: "TAGS",
    36: "ORDER",
    37: "PARENTID",
    38: "WIDGET",
    39: "USERDATA",
  });

  RcpTypes.Ipv4Options = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
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
    DISCOVER: 3,
    UPDATE: 4,
    REMOVE: 5,
    UPDATEVALUE: 6,

    0: "INVALID",
    1: "VERSION",
    2: "INITIALIZE",
    3: "DISCOVER",
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

  RcpTypes.UriOptions = Object.freeze({
    DEFAULT: 48,
    FILTER: 49,
    SCHEMA: 50,

    48: "DEFAULT",
    49: "FILTER",
    50: "SCHEMA",
  });

  RcpTypes.ClientStatus = Object.freeze({
    DISCONNECTED: 0,
    CONNECTED: 1,
    VERSION_MISSMATCH: 2,
    OK: 3,

    0: "DISCONNECTED",
    1: "CONNECTED",
    2: "VERSION_MISSMATCH",
    3: "OK",
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
    VECTOR2I32: 27,
    VECTOR2F32: 28,
    VECTOR3I32: 29,
    VECTOR3F32: 30,
    VECTOR4I32: 31,
    VECTOR4F32: 32,
    STRING: 33,
    RGB: 34,
    RGBA: 35,
    ENUM: 36,
    FIXED_ARRAY: 37,
    DYNAMIC_ARRAY: 38,
    BANG: 39,
    GROUP: 40,
    URI: 42,
    IPV4: 43,
    IPV6: 44,

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
    27: "VECTOR2I32",
    28: "VECTOR2F32",
    29: "VECTOR3I32",
    30: "VECTOR3F32",
    31: "VECTOR4I32",
    32: "VECTOR4F32",
    33: "STRING",
    34: "RGB",
    35: "RGBA",
    36: "ENUM",
    37: "FIXED_ARRAY",
    38: "DYNAMIC_ARRAY",
    39: "BANG",
    40: "GROUP",
    42: "URI",
    43: "IPV4",
    44: "IPV6",
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

  RcpTypes.Ipv6Options = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
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
    TIMESTAMP: 17,
    DATA: 18,

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

    this._read();
  }
  RcpTypes.prototype._read = function() {
  }

  var ShortString = RcpTypes.ShortString = (function() {
    function ShortString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ShortString.prototype._read = function() {
      this.myLen = this._io.readU2be();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return ShortString;
  })();

  var Userdata = RcpTypes.Userdata = (function() {
    function Userdata(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Userdata.prototype._read = function() {
      this.myLen = this._io.readU4be();
      this.data = this._io.readBytes(this.myLen);
    }

    return Userdata;
  })();

  var LongString = RcpTypes.LongString = (function() {
    function LongString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    LongString.prototype._read = function() {
      this.myLen = this._io.readU4be();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return LongString;
  })();

  var Id = RcpTypes.Id = (function() {
    function Id(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Id.prototype._read = function() {
      this.myLen = this._io.readU1();
      this.data = this._io.readBytes(this.myLen);
    }

    return Id;
  })();

  var TinyString = RcpTypes.TinyString = (function() {
    function TinyString(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    TinyString.prototype._read = function() {
      this.myLen = this._io.readU1();
      this.data = KaitaiStream.bytesToStr(this._io.readBytes(this.myLen), "UTF-8");
    }

    return TinyString;
  })();

  return RcpTypes;
})();
return RcpTypes;
}));
