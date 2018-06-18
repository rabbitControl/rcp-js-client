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
    MULTISELECT: 50,

    48: "DEFAULT",
    49: "ENTRIES",
    50: "MULTISELECT",
  });

  RcpTypes.NumberboxOptions = Object.freeze({
    PRECISION: 86,
    FORMAT: 87,
    STEPSIZE: 88,
    CYCLIC: 89,

    86: "PRECISION",
    87: "FORMAT",
    88: "STEPSIZE",
    89: "CYCLIC",
  });

  RcpTypes.CustomtypeOptions = Object.freeze({
    DEFAULT: 48,
    UUID: 49,
    CONFIG: 50,

    48: "DEFAULT",
    49: "UUID",
    50: "CONFIG",
  });

  RcpTypes.WidgetOptions = Object.freeze({
    ENABLED: 80,
    LABEL_VISIBLE: 81,
    VALUE_VISIBLE: 82,

    80: "ENABLED",
    81: "LABEL_VISIBLE",
    82: "VALUE_VISIBLE",
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
    USERID: 40,

    32: "VALUE",
    33: "LABEL",
    34: "DESCRIPTION",
    35: "TAGS",
    36: "ORDER",
    37: "PARENTID",
    38: "WIDGET",
    39: "USERDATA",
    40: "USERID",
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
    CUSTOMWIDGET: 1,
    INFO: 16,
    TEXTBOX: 17,
    BANG: 18,
    PRESS: 19,
    TOGGLE: 20,
    NUMBERBOX: 21,
    DIAL: 22,
    SLIDER: 23,
    SLIDER2D: 24,
    RANGE: 25,
    DROPDOWN: 26,
    RADIOBUTTON: 27,
    COLORBOX: 28,
    TABLE: 29,
    FILECHOOSER: 30,
    DIRECTORYCHOOSER: 31,
    IP: 32,
    LIST: 32768,
    LISTPAGE: 32769,
    TABS: 32770,

    1: "CUSTOMWIDGET",
    16: "INFO",
    17: "TEXTBOX",
    18: "BANG",
    19: "PRESS",
    20: "TOGGLE",
    21: "NUMBERBOX",
    22: "DIAL",
    23: "SLIDER",
    24: "SLIDER2D",
    25: "RANGE",
    26: "DROPDOWN",
    27: "RADIOBUTTON",
    28: "COLORBOX",
    29: "TABLE",
    30: "FILECHOOSER",
    31: "DIRECTORYCHOOSER",
    32: "IP",
    32768: "LIST",
    32769: "LISTPAGE",
    32770: "TABS",
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

  RcpTypes.DialOptions = Object.freeze({
    CYCLIC: 86,

    86: "CYCLIC",
  });

  RcpTypes.RangeOptions = Object.freeze({
    DEFAULT: 48,

    48: "DEFAULT",
  });

  RcpTypes.LabelPosition = Object.freeze({
    LEFT: 1,
    RIGHT: 2,
    TOP: 3,
    BOTTOM: 4,
    CENTER: 5,

    1: "LEFT",
    2: "RIGHT",
    3: "TOP",
    4: "BOTTOM",
    5: "CENTER",
  });

  RcpTypes.UriOptions = Object.freeze({
    DEFAULT: 48,
    FILTER: 49,
    SCHEMA: 50,

    48: "DEFAULT",
    49: "FILTER",
    50: "SCHEMA",
  });

  RcpTypes.SliderOptions = Object.freeze({
    HORIZONTAL: 86,

    86: "HORIZONTAL",
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
    REGULAR_EXPRESSION: 49,

    48: "DEFAULT",
    49: "REGULAR_EXPRESSION",
  });

  RcpTypes.ArrayOptions = Object.freeze({
    DEFAULT: 48,
    STRUCTURE: 49,

    48: "DEFAULT",
    49: "STRUCTURE",
  });

  RcpTypes.NumberboxFormat = Object.freeze({
    DEC: 1,
    HEX: 2,
    BIN: 3,

    1: "DEC",
    2: "HEX",
    3: "BIN",
  });

  RcpTypes.Datatype = Object.freeze({
    CUSTOMTYPE: 1,
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
    ARRAY: 37,
    LIST: 38,
    BANG: 39,
    GROUP: 40,
    URI: 42,
    IPV4: 43,
    IPV6: 44,
    RANGE: 45,

    1: "CUSTOMTYPE",
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
    37: "ARRAY",
    38: "LIST",
    39: "BANG",
    40: "GROUP",
    42: "URI",
    43: "IPV4",
    44: "IPV6",
    45: "RANGE",
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

  RcpTypes.TextboxOptions = Object.freeze({
    MULTILINE: 86,
    WORDWRAP: 87,
    PASSWORD: 88,

    86: "MULTILINE",
    87: "WORDWRAP",
    88: "PASSWORD",
  });

  RcpTypes.ListOptions = Object.freeze({
    DEFAULT: 48,
    MINIMUM: 49,
    MAXIMUM: 50,

    48: "DEFAULT",
    49: "MINIMUM",
    50: "MAXIMUM",
  });

  RcpTypes.CustomwidgetOptions = Object.freeze({
    UUID: 86,
    CONFIG: 87,

    86: "UUID",
    87: "CONFIG",
  });

  function RcpTypes(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  RcpTypes.prototype._read = function() {
  }

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

  return RcpTypes;
})();
return RcpTypes;
}));
