
// flag to control some verbose logging
var RCPVerbose = false;
var TERMINATOR = 0;

var languages = [];
var languageAddedCB = null;

collectLanguage = function(lang_code) {
  if (!languages.includes(lang_code)) {
    if (languageAddedCB != null) {
      languageAddedCB(lang_code, languages.length);
    }

    languages.push(lang_code);
  }
}

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

pushFloat64ToArrayBe = function(num, array) {

  // string length
  var arr = new Float64Array([num]);
  var dataview = new DataView(arr.buffer);
  array.push(dataview.getUint8(7));
  array.push(dataview.getUint8(6));
  array.push(dataview.getUint8(5));
  array.push(dataview.getUint8(4));
  array.push(dataview.getUint8(3));
  array.push(dataview.getUint8(2));
  array.push(dataview.getUint8(1));
  array.push(dataview.getUint8(0));
};

pushFloat32ToArrayBe = function(num, array) {

  // string length
  var arr = new Float32Array([num]);
  var dataview = new DataView(arr.buffer);
  array.push(dataview.getUint8(3));
  array.push(dataview.getUint8(2));
  array.push(dataview.getUint8(1));
  array.push(dataview.getUint8(0));
};

pushIn64ToArrayBe = function(num, array) {

  // TODO: this needs attention!

  // console.log(num + " : "+  4294967295);
  // var rest = (num | 0) >> 16;
  //
  // console.log("rest: " + rest);
  //
  // if (rest < 0) {
  //   rest = 0;
  // }
  var rest = 0;

  // string length
  var arr32 = new Uint32Array([rest]);
  var dataview = new DataView(arr32.buffer);
  array.push(dataview.getUint8(3));
  array.push(dataview.getUint8(2));
  array.push(dataview.getUint8(1));
  array.push(dataview.getUint8(0));

  arr32 = new Uint32Array([num]);
  dataview = new DataView(arr32.buffer);
  array.push(dataview.getUint8(3));
  array.push(dataview.getUint8(2));
  array.push(dataview.getUint8(1));
  array.push(dataview.getUint8(0));

  console.log("array: " + array);
};

pushIn32ToArrayBe = function(num, array) {

  // string length
  var arr32 = new Uint32Array([num]);
  var dataview = new DataView(arr32.buffer);
  array.push(dataview.getUint8(3));
  array.push(dataview.getUint8(2));
  array.push(dataview.getUint8(1));
  array.push(dataview.getUint8(0));
};

pushIn16ToArrayBe = function(num, array) {

  // string length
  var arr16 = new Uint16Array([num]);
  var dataview = new DataView(arr16.buffer);
  array.push(dataview.getUint8(1));
  array.push(dataview.getUint8(0));
};

writeTinyString = function(string, array) {

  var enc = new TextEncoder("utf-8");
  var stringarray = [].slice.call(enc.encode(string));

  if (stringarray.length > 255) {
    console.error("tiny string is too long");
    stringarray = stringarray.slice(1, 256);
  }

  // string length
  array.push(stringarray.length);

  // add array
  array = array.concat(stringarray);

  return array;
}

writeShortString = function(string, array) {

  var enc = new TextEncoder("utf-8");
  var stringarray = [].slice.call(enc.encode(string));

  if (stringarray.length > 65535) {
    console.error("tiny string is too long");
    stringarray = stringarray.slice(1, 65536);
  }

  // string length
  pushIn16ToArrayBe(stringarray.length, array);

  // add array
  array = array.concat(stringarray);

  return array;
}

writeLongString = function(string, array) {

  var enc = new TextEncoder("utf-8");
  var stringarray = [].slice.call(enc.encode(string));

  // check length?

  // string length
  pushIn32ToArrayBe(stringarray.length, array);

  // add array
  array = array.concat(stringarray);

  return array;
}


byteToHex = function(num) {
    // Turns a number (0-255) into a 2-character hex number (00-ff)
    return ('0'+num.toString(16)).slice(-2);
}

numToColor = function(color) {

  var r = color & 0xff;
  var g = (color >> 8) & 0xff;
  var b = (color >> 16) & 0xff;
  var a = (color >> 24) & 0xff;

  return "#" + byteToHex(r) + byteToHex(g) + byteToHex(b);
}

colorToNum = function(color) {

  var rpart = color.slice(1, 3);
  var gpart = color.slice(3, 5);
  var bpart = color.slice(5, 7);

  var r = parseInt(rpart, 16);
  var g = parseInt(gpart, 16);
  var b = parseInt(bpart, 16);

  return (r + (g << 8) + (b << 16));
}


_readTinyString = function(_io) {
  var strObj = new RcpTypes.TinyString(_io);
  return strObj.data;
}

_readShortString = function(_io) {
  var strObj = new RcpTypes.ShortString(_io);
  return strObj.data;
}

_readTypedValue = function(_type, _io) {

  if (_type == null || _type == undefined) {
    throw "no _type provided";
  }

  if (!(_type instanceof ToiTypeDefinition)) {
    throw "not a ToiTypeDefinition"
    return;
  }

  if (_io == null || !(_io instanceof KaitaiStream)) {
    throw "no KaitaiStream provided";
  }

  switch (_type.typeid) {

    case RcpTypes.Datatype.BOOLEAN:
        return _io.readU1() > 0;

    // number types
    case RcpTypes.Datatype.INT8:
        return _io.readS1();
    case RcpTypes.Datatype.UINT8:
        return _io.readU1();
    case RcpTypes.Datatype.INT16:
        return _io.readS2be();
    case RcpTypes.Datatype.UINT16:
        return _io.readU2be();
    case RcpTypes.Datatype.INT32:
        return _io.readS4be();
    case RcpTypes.Datatype.UINT32:
        return _io.readU4be();
    case RcpTypes.Datatype.INT64:
        return _io.readS8be();
    case RcpTypes.Datatype.UINT64:
        return _io.readU8be();
    case RcpTypes.Datatype.FLOAT32:
        return _io.readF4be();
    case RcpTypes.Datatype.FLOAT64:
        return _io.readF8be();

    case RcpTypes.Datatype.RANGE:
        var v1 = _readTypedValue(_type.elementType, _io);
        var v2 = _readTypedValue(_type.elementType, _io);
        var value = {};
        value.v1 = v1;
        value.v2 = v2;
        return value;

    // string
    case RcpTypes.Datatype.STRING:
    {
      var strObj = new RcpTypes.LongString(_io);
      return strObj.data;
    }

    case RcpTypes.Datatype.ENUM:
    {
      var strObj = new RcpTypes.TinyString(_io);
      return strObj.data;
    }


    case RcpTypes.Datatype.RGB:
    case RcpTypes.Datatype.RGBA:
      return numToColor(_io.readU4be());

    case RcpTypes.Datatype.ARRAY:
      break;
    case RcpTypes.Datatype.LIST:
  }

  return null;
}

_writeTypedValue = function(_type, value, array) {

  switch (_type.typeid) {

    case RcpTypes.Datatype.BOOLEAN:
      array.push(value > 0);
      break;

    // number types
    case RcpTypes.Datatype.INT8:
    case RcpTypes.Datatype.UINT8:
      array.push(parseInt(value));
      break;
    case RcpTypes.Datatype.INT16:
    case RcpTypes.Datatype.UINT16:
      pushIn16ToArrayBe(parseInt(value), array);
      break;
    case RcpTypes.Datatype.INT32:
    case RcpTypes.Datatype.UINT32:
      pushIn32ToArrayBe(parseInt(value), array);
      break;
    case RcpTypes.Datatype.INT64:
    case RcpTypes.Datatype.UINT64:
      pushIn64ToArrayBe(parseInt(value), array);
      break;
    case RcpTypes.Datatype.FLOAT32:
      pushFloat32ToArrayBe(parseFloat(value), array);
      break;
    case RcpTypes.Datatype.FLOAT64:
      pushFloat64ToArrayBe(parseFloat(value), array);
      break;

    case RcpTypes.Datatype.RANGE:
      _writeTypedValue(_type.elementType, value.v1, array);
      _writeTypedValue(_type.elementType, value.v2, array);
      break;

    // string
    case RcpTypes.Datatype.STRING:
      console.log("write long string: " + value);
      array = writeLongString(value, array);
      break;

    case RcpTypes.Datatype.ENUM:
      array = writeTinyString(value, array);
      break;

    case RcpTypes.Datatype.RGBA:
      // TODO: alpha...?
    case RcpTypes.Datatype.RGB:
    {
      pushIn32ToArrayBe(colorToNum(value), array);
      break;
    }
  }

  return array;
}


_validateParameter = function(parameter) {
  if (!(parameter instanceof ToiParameter)) {
    console.error("add: wrong type");
    return false;
  }

  // check
  if (!parameter) {
    console.error("error: no parameter");
    return false;
  }

  if (!parameter.id) {
    console.error("error: no packet.data.id");
    return false;
  }

  if (!parameter.type) {
    console.error("error: no packet.data.type");
    return false;
  }

  return true;
}



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// TOI MAIN
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
ToiClient = function() {
  if(this === window) { //if *this* is the window object, start over with a *new* object
      return new ToiClient();
  }

  this.valueCache = {};

  // create transporter
  this.socket = new TOISocket();

  // create decoder
  this.decoder = new TOIPacketDecoder();
  this.decoder._packetListener = this;

  // set decoder
  this.socket._decoder = this.decoder;
  // this.socket.received = function(data) {
  //   console.log("TOIClient received: " + data);
  // };


  // Callbacks
  // TODO: a list of listener...
  // event emitter pattern (JS)
  this.add = null;
  this.update = null;
  this.remove = null;
}

ToiClient.prototype = {};

ToiClient.prototype.open = function(address, port, ssl) {
  // open address
  this.socket.open(address, port, ssl);
}


ToiClient.prototype.clear = function() {
  // open address
  this.valueCache = {};
}
ToiClient.prototype.setonclose = function(func) {
  this.socket.onclosecb = func;
}
ToiClient.prototype.setonerror = function(func) {
  this.socket.onerrorcb = func;
}

ToiClient.prototype.valueUpdate = function(id, value) {

  var cachedParam = this.valueCache[id];

  if (!cachedParam) {
    console.error("not matching param, or not in cache");
    return;
  }

  // udpate value
  cachedParam.value = value;

  // create update parameter of same type
  var cloned = cachedParam.cloneEmpty();
  cloned.value = value;
  this.sendUpdate(cloned);
}

ToiClient.prototype.sendUpdate = function(parameter) {

  if (!this._updateCache(parameter)) {
    console.error("not matching param, or not in cache");
    return;
  }

  var packet = new ToiPacket(RcpTypes.Command.UPDATE);
  packet.data = parameter;

  var arraybuffer = new Uint8Array(packet.write());

  this.socket.send(arraybuffer);
}

//------------------------------------------------
//------------------------------------------------
ToiClient.prototype._init = function(packet) {
  // init - ? should not get
  console.log("error: got init packet - drop");
}

//------------------------------------------------
//------------------------------------------------
ToiClient.prototype._add = function(parameter) {
  // add the parameter...

  if (!_validateParameter(parameter)) {
    console.error("_add: invalid parameter");
    return;
  }

  // check if value exists
  if (this.valueCache[parameter.id]) {
    console.error("value already exists in data-cache... drop");
    return;
  }

  // ok, add it
  if (RCPVerbose) console.log("adding parameter: " + JSON.stringify(parameter));
  this.valueCache[parameter.id] = parameter;

  // console.log("this.valueCache: " + this.valueCache);

  if (this.add != null) { // TODO ensure its a function?
    this.add(parameter);
  }
}

//------------------------------------------------
//------------------------------------------------
function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) {
      return false;
    }

    while (i--) {
        if (a[i] !== b[i]) {
          return false;
        }
    }
    return true;
};

ToiClient.prototype._updateCache = function(parameter) {

  if (!_validateParameter(parameter)) {
    console.log("invalid parameter: " + parameter);
    return false;
  }

  // get value from cache
  if (!this.valueCache[parameter.id]) {
    console.error("_updateCache: value not in data-cache... add it");
    this._add(parameter);
    return false;
  }

  var cachedParam = this.valueCache[parameter.id];

  // update cached
  // check types...
  if (!arraysIdentical(parameter.id, cachedParam.id)) {
    console.error("ids do not match: " + parameter.id + " != " + cachedParam.id);
    return false;
  }

  if (parameter.type.typeid != cachedParam.type.typeid) {
    console.error("types do not match");
    return false;
  }

  cachedParam.update(parameter);

  if (RCPVerbose) console.log("updated cached parameter: " + JSON.stringify(cachedParam));

  return true;
}

//------------------------------------------------
//------------------------------------------------
ToiClient.prototype._update = function(parameter) {
  // validate param and update cache
  if (!this._updateCache(parameter)) {
    return;
  }

  if (this.update != null) { // TODO ensure its a function?
    this.update(parameter);
  }
}

//------------------------------------------------
//------------------------------------------------
ToiClient.prototype._remove = function(parameter) {
  // remove the packet...

  if (!_validateParameter(parameter)) {
    return;
  }

  // get value from cache
  if (!this.valueCache[parameter.id]) {
    console.error("_remove: value not in data-cache... drop " + parameter.id);
    return;
  }

  console.log("removing parameter: " + parameter.id);
  this.valueCache[parameter.id] = null;

  if (this.remove != null) { // TODO ensure its a function?
    this.remove(parameter);
  }
}

ToiClient.prototype.getCachedParameter = function(id) {
  return this.valueCache[id];
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// TOI Socket
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
function TOISocket() {

  if(this === window) { //if *this* is the window object, start over with a *new* object
      return new TOISocket();
  }

  this.webSocket = null;
  this.address = null;

  this.onopen = null;
  this._decoder = null;

  this.received = null;

  this.onclosecb = null;
  this.onerrorcb = null;
};


TOISocket.prototype = {};

TOISocket.prototype._onopen = function(e) {
  // this = WebSocket!

  console.log("WebSocket opened to " + this.url);

  // TODO send init data...
  // 04 0F 05 09 01
  var data = new Uint8Array([RcpTypes.Command.INITIALIZE, 0]);
  this.send(data);

  if (this._.onopen) {
    this._.onopen();
  }
};

TOISocket.prototype._onclose = function(e) {
  // this = WebSocket!
  console.log("WebSocket closed " + this.url);

  if (this._.onclosecb) {
    this._.onclosecb();
  }
};

TOISocket.prototype._onerror = function(error) {
  // this = WebSocket!
  console.log("Error detected: " + error + ": " + JSON.stringify(error));

  if (this._.onerrorcb) {
    this._.onerrorcb(error);
  }
};

TOISocket.prototype._onmessage = function(ev) {
  // this = WebSocket!

  if (ev.data instanceof Blob) {
      var arrayBuffer;

      var fileReader = new FileReader();

      fileReader.socket = this;

      fileReader.onload = function () {

          if (RCPVerbose) console.log("received: " + ev.data);

          if (this._.received) {
            this._.received(ev.data);
          }

          if (this.socket._._decoder) {
            var packet = this.socket._._decoder._receive(ev.data);
          }

      };

      fileReader.readAsArrayBuffer(ev.data);

  } else if (ev.data instanceof ArrayBuffer) {

      if (RCPVerbose) console.log("received: " + ev.data);

      if (this._.received) {
        this._.received(ev.data);
      }

      if (this._._decoder) {
        var packet = this._._decoder._receive(ev.data);
      }

  } else {
    console.log("other format: " + ev.data);
  }
  // Other message type are not supported and will just be dropped
};


TOISocket.prototype.open = function(address, port, ssl) {

  if (this.webSocket != null) {
      this.webSocket.onopen = null;
      this.webSocket.onclose = null;
      this.webSocket.onmessage = null;
      this.webSocket.onerror = null;

      this.webSocket = null;
  }

  var doSSL = ssl || false;

  if (doSSL) {
    this.address = "wss://" + address + ":" + port;
  } else {
    this.address = "ws://" + address + ":" + port;
  }

  this.webSocket = new window.WebSocket(this.address);
  this.webSocket.binaryType = "arraybuffer";
  this.webSocket._ = this;

  this.webSocket.onopen = this._onopen;
  this.webSocket.onclose = this._onclose;
  this.webSocket.onmessage = this._onmessage;
  this.webSocket.onerror = this._onerror;
};


TOISocket.prototype.send = function(message) {

  console.log("this.webSocket.readyState: " + this.webSocket.readyState);
  if (RCPVerbose) console.log("typeof message: " + typeof message + " : " + (message instanceof Uint8Array) + ": " + message.constructor.name);

  if (this.webSocket.readyState == 1) {

    if (typeof message === 'string' || message instanceof String) {

      if (!("TextEncoder" in window)) {
        console.error("Sorry, this browser does not support TextEncoder...");
        return;
      }

      var enc = new TextEncoder("utf-8");
      this.webSocket.send(enc.encode(message));

    } else if (message instanceof Uint8Array) {
      this.webSocket.send(message);
    } else {
      // ??
      this.webSocket.send(message);
    }
  }
}



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// TOI DECODER
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
function TOIPacketDecoder() {

  if(this === window) { //if *this* is the window object, start over with a *new* object
      return new TOIPacketDecoder();
  }

  this._packetListener = null;
};

TOIPacketDecoder.prototype = {};

TOIPacketDecoder.prototype._receive = function(arraybuffer) {

  if (RCPVerbose) {
    var view   = new Int8Array(arraybuffer);
    console.log(view);
  }

  var _io = new KaitaiStream(arraybuffer);

  try {

    var packet = this._parsePacket(_io);

    switch (packet.command) {
      case RcpTypes.Command.VERSION:
        //
        break;
      case RcpTypes.Command.INITIALIZE:
        if (this._packetListener != null) {
          this._packetListener._init(packet);
        }
        break;
      case RcpTypes.Command.DISCOVER:
        console.log("ERROR: received DISCOVER");
        //
        break;
      case RcpTypes.Command.UPDATE:
        if (this._packetListener != null) {
          this._packetListener._update(packet.data);
        }
        break;
      case RcpTypes.Command.REMOVE:
        if (this._packetListener != null) {
          this._packetListener._remove(packet.data);
        }
        break;

      default:
        console.log("wrong command in packet: " + packet.command);
        break;
    }

  } catch(err) {
    console.log(err);
    console.log("error: " + err.message);

    var view   = new Int8Array(arraybuffer);
    console.log(view);
  }
}


TOIPacketDecoder.prototype._parsePacket = function(_io) {
  // parse packet
  var cmd = _io.readU1();

  var packet = new ToiPacket(cmd);

  if (RCPVerbose) console.log("parse packet options");

  // read packet options
  while (!_io.isEof()) {

    var dataid = _io.readU1();
    if (RCPVerbose) console.log("option: " + dataid);

    if (dataid == TERMINATOR) {
      break;
    }

    switch (dataid) {
      case RcpTypes.PacketOptions.DATA:

        if (packet.data != null) {
            throw "already has data...";
        }

        switch (cmd) {
          case RcpTypes.Command.INITIALIZE:
            // init - ignore any data...
            break;

          case RcpTypes.Command.REMOVE:
          case RcpTypes.Command.UPDATE:
            // expect parameter
            if (RCPVerbose) console.log("parse parameter");
            packet.data = this._parseParameter(_io);

            if (RCPVerbose) console.log("set packet data: " + JSON.stringify(packet.data));

            break;
          case RcpTypes.Command.VERSION:
            // version: expect meta
            // TODO: implement
            console.log("version not implemented yet");
            break;
        } // switch (cmd)

        break;

      case RcpTypes.PacketOptions.TIMESTAMP:
        packet.timestamp = _io.readU8be();
        if (RCPVerbose) console.log("packet timestamp: " + packet.timestamp);
        break;
      default:
        throw "unknown data-id: " + dataid;
    } // switch (dataid)
  } // while (!_io.isEof())

  if (!_io.isEof()) {
    throw "data inconsistency! finished package, but still data to read - invalid pacakge."
  }

  return packet;
}


TOIPacketDecoder.prototype._parseParameter = function(_io) {

  // get mandatory id
  var paramId = _io.readS2be();

  // get mandatory type
  var type = this._parseTypeDefinition(_io);

  var parameter = new ToiParameter(paramId, type);

  if (RCPVerbose) console.log("parse parameter options");

  // get options from the stream
  while (true) {

    // get data-id
    var dataid = _io.readU1();

    if (dataid == TERMINATOR) {
        break;
    }

    switch (dataid) {
      case RcpTypes.ParameterOptions.VALUE: {

        if (type.typeid != RcpTypes.Datatype.ARRAY) {
          parameter.value = _readTypedValue(type, _io);
        } else {

          var dims = _io.readU4be();
          dim_sizes = [];

          for (var i=0; i<dims; i++) {
            var n = _io.readU4be();
            dim_sizes.push(n);
          }

          if (RCPVerbose) console.log("default array structure: " + JSON.stringify(dim_sizes));

          // TODO:
          // change: do not set dimensions in type... hack!!

          type.dimensions = dims;
          type.dimsizes = dim_sizes;

          var v = [];
          intoarray(v, 0, dim_sizes, type.subtype, _io);

          parameter.value = JSON.stringify(v);
        }

        if (RCPVerbose) console.log("parameter value:  " + parameter.value);
        break;
      }

      case RcpTypes.ParameterOptions.LABEL: {

        var current = _io.pos;
        var peek_one = _io.readS1();

        while (peek_one != 0) {
          // rewind
          _io.seek(current);

          var lang_code = KaitaiStream.bytesToStr(_io.readBytes(3));
          var label = _readTinyString(_io);

          if (lang_code === "any") {
            console.log("setting any label: " + label);
            parameter.label = label;
          } else {
            console.log("setting lanugage label " + lang_code + " : " + label);
            parameter.languageLabel[lang_code] = label;

            // collect languages
            collectLanguage(lang_code);
          }

          current = _io.pos;
          peek_one = _io.readS1();
        }
        //parameter.label = _readTinyString(_io);
        //if (RCPVerbose) console.log("parameter label: " + parameter.label);
        break;
      }


      case RcpTypes.ParameterOptions.DESCRIPTION: {

        var current = _io.pos;
        var peek_one = _io.readS1();

        while (peek_one != 0) {
          // rewind
          _io.seek(current);

          var lang_code = KaitaiStream.bytesToStr(_io.readBytes(3));
          var label = _readShortString(_io);

          if (lang_code === "any") {
            console.log("setting any description: " + label);
            parameter.description = label;
          } else {
            console.log("setting lanugage description " + lang_code + " : " + label);
            parameter.languageLabel[lang_code] = label;

            // collect languages
            collectLanguage(lang_code);
          }

          current = _io.pos;
          peek_one = _io.readS1();
        }
        //parameter.description = _readShortString(_io);
        //if (RCPVerbose) console.log("parameter desc: " + parameter.description);
        break;
      }


      case RcpTypes.ParameterOptions.TAGS:
        parameter.tags = _readTinyString(_io);
        if (RCPVerbose) console.log("parameter tags: " + parameter.tags);
        break;

      case RcpTypes.ParameterOptions.ORDER:
        parameter.order = _io.readS4be();
        if (RCPVerbose) console.log("parameter order: " + parameter.order);
        break;

      case RcpTypes.ParameterOptions.PARENTID:
        parameter.parentid = _io.readS2be();
        if (RCPVerbose) console.log("parameter parentid: " + parameter.parentid);
        break;

      case RcpTypes.ParameterOptions.WIDGET:
        // skip...
        console.log("widget not implemented, skipping...");
    		while (_io.readU1() != 0)
    		{}

        break;

      case RcpTypes.ParameterOptions.USERDATA:
        var ud = new RcpTypes.Userdata(_io);
        parameter.userdata = ud.data;
        if (RCPVerbose) console.log("userdata set: " + parameter.userdata);
        break;

      case RcpTypes.ParameterOptions.USERID:
        parameter.userid = _readTinyString(_io);
        if (RCPVerbose) console.log("parameter userid: " + parameter.userid);
        break;
    }
  }

  return parameter;
}

TOIPacketDecoder.prototype._parseTypeDefinition = function(_io) {

  // read mandatory type
  var typeid = _io.readU1();

  // check if typeid is contained in RcpTypes.Datatype
  //RcpTypes.Datatype.hasOwnProperty(""+typeid);

  if (typeid == 0) {
    throw "type id == 0!";
  }

  var type = new ToiTypeDefinition(typeid);

  switch (typeid) {

    case RcpTypes.Datatype.GROUP:
    case RcpTypes.Datatype.BOOLEAN:
      this._parseTypeDefault(type, _io);
      break;

    // number types
    case RcpTypes.Datatype.INT8:
    case RcpTypes.Datatype.UINT8:
    case RcpTypes.Datatype.INT16:
    case RcpTypes.Datatype.UINT16:
    case RcpTypes.Datatype.INT32:
    case RcpTypes.Datatype.UINT32:
    case RcpTypes.Datatype.INT64:
    case RcpTypes.Datatype.UINT64:
    case RcpTypes.Datatype.FLOAT32:
    case RcpTypes.Datatype.FLOAT64:
      this._parseTypeNumber(type, _io);
      break;

    // range
    case RcpTypes.Datatype.RANGE:
      this._parseTypeRange(type, _io);
      break;

    // string
    case RcpTypes.Datatype.STRING:
    // color
    case RcpTypes.Datatype.RGB:
    case RcpTypes.Datatype.RGBA:
      this._parseTypeDefault(type, _io);
      break;

    // enum
    case RcpTypes.Datatype.ENUM:
      this._parseTypeEnum(type, _io);
      break;

    case RcpTypes.Datatype.ARRAY:
      this._parseTypeArray(type, _io);
      break;

    default:
        console.log("not implemented type: " + RcpTypes.Datatype[typeid]);
  }

  if (type == null) {
    throw "did not get type defintion - dataerror";
  }

  return type;
}


TOIPacketDecoder.prototype._parseTypeDefault = function(_type, _io) {

  if (_type == null || _io == null) {
    return;
  }

  if (!(_type instanceof ToiTypeDefinition)) {
    return;
  }

  var type = _type;

  if (RCPVerbose) console.log("parse default options");

  // parse optionals
  while (true) {

    var dataid = _io.readU1();

    if (dataid == TERMINATOR) {
        break;
    }

    switch (dataid) {

      case RcpTypes.StringOptions.DEFAULT:
        type.defaultValue = _readTypedValue(_type, _io);
        if (RCPVerbose) console.log("parse default, default: " + type.defaultValue);
        break;

      default:
        // not a number data id!!
        throw "wrong data id for a default-type: " + dataid;
    }
  }
}

TOIPacketDecoder.prototype._parseTypeNumber = function(_type, _io) {

  if (_type == null || _io == null) {
    return;
  }

  if (!(_type instanceof ToiTypeDefinition)) {
    return;
  }

  if (RCPVerbose) console.log("parse number options");

  var type = _type;
  switch (type.typeid) {
	case RcpTypes.Datatype.FLOAT32:
    case RcpTypes.Datatype.FLOAT64:
		type.multipleof = 0.01; break;
	default:
		type.multipleof = 1; break;
  }

  // parse optionals
  while (true) {

    var dataid = _io.readU1();

    if (dataid == TERMINATOR) {
        break;
    }

    switch (dataid) {

      case RcpTypes.NumberOptions.DEFAULT:
        type.defaultValue = _readTypedValue(_type, _io);
        if (RCPVerbose) console.log("number default: " + type.defaultValue);
        break;
      case RcpTypes.NumberOptions.MINIMUM:
        type.min = _readTypedValue(_type, _io);
        if (RCPVerbose) console.log("number min: " + type.min);
        break;
      case RcpTypes.NumberOptions.MAXIMUM:
        type.max = _readTypedValue(_type, _io);
        if (RCPVerbose) console.log("number max: " + type.max);
        break;
      case RcpTypes.NumberOptions.MULTIPLEOF:
        type.multipleof = _readTypedValue(_type, _io);
        if (RCPVerbose) console.log("number mult: " + type.multipleof);
        break;

      case RcpTypes.NumberOptions.SCALE:
        type.scale = _io.readU1();
        if (RCPVerbose) console.log("number scale: " + type.scale);
        break;

      case RcpTypes.NumberOptions.UNIT:
        type.unit = _readTinyString(_io);
        if (RCPVerbose) console.log("number unit: " + type.unit);
        break;

      default:
        // not a number data id!!
        throw "wrong data id for a number: " + dataid;
    }
  }
}

TOIPacketDecoder.prototype._parseTypeRange = function(_type, _io) {

  if (_type == null || _io == null) {
    return;
  }

  if (!(_type instanceof ToiTypeDefinition)) {
    return;
  }

  if (RCPVerbose) console.log("parse range options");

  var element_type_definition = this._parseTypeDefinition(_io);
  _type.elementType = element_type_definition;

  // parse default options
  this._parseTypeDefault(_type, _io);
}

TOIPacketDecoder.prototype._parseTypeArray = function(_type, _io) {
  if (_type == null || _io == null) {
    return;
  }

  if (!(_type instanceof ToiTypeDefinition)) {
    return;
  }

  var type = _type;

  if (RCPVerbose) console.log("parse fixed array");

  // element type
  type.subtype = this._parseTypeDefinition(_io);
  if (RCPVerbose) console.log("subtype: " + JSON.stringify(type.subtype));

  // parse optionals
  while (true) {

    var dataid = _io.readU1();

    if (dataid == TERMINATOR) {
        break;
    }

    switch (dataid) {

      case RcpTypes.ArrayOptions.DEFAULT:

        console.log("fixed array type default value...");

        var dims = _io.readU4be();
        if (RCPVerbose) console.log("fixed array dimensions: " + dims);
        dim_sizes = [];

        for (var i=0; i<dims; i++) {
          var n = _io.readU4be();
          dim_sizes.push(n);
        }

        if (RCPVerbose) console.log("default array structure: " + JSON.stringify(dim_sizes));

        var v = [];
        intoarray(v, 0, dim_sizes, type.subtype, _io);

        // read amout of bytes
        type.defaultValue = JSON.stringify(v);
        if (RCPVerbose) console.log("parse default, default: " + type.defaultValue);
        break;

      case RcpTypes.ArrayOptions.STRUCTURE:

        console.log("fixed array type structure...");

        type.dimensions = _io.readU4be();
        if (RCPVerbose) console.log("fixed array dimensions: " + type.dimensions);
        type.dimsizes = [];

        if (type.dimensions > 0) {
          type.numBytes = 1;
        } else {
          type.numBytes = 0;
        }

        for (var i=0; i<type.dimensions; i++) {
          var n = _io.readU4be();
          type.numBytes *= n;
          type.dimsizes.push(n);
        }

        if (RCPVerbose) console.log("fixed dim structure: " + JSON.stringify(type.dimsizes));

        type.structure = {};
        type.structure["dimensions"] = type.dimensions;
        type.structure["dimsizes"] = type.dimsizes;
        type.structure["numBytes"] = type.numBytes;

        break;

      default:
        // not a number data id!!
        throw "wrong data id for a ENUM: " + dataid;
    }
  }
}


function intoarray(array, dim, dimsizes, type, _io) {

  if (dim >= dimsizes.length) {
    return;
  }

  for (var i=0; i<dimsizes[dim]; i++) {

    if (dim == dimsizes.length-1) {
      array[i] = _readTypedValue(type, _io);
    } else {
      array[i] = [];
      intoarray(array[i], dim+1, dimsizes, type, _io);
    }
  }
}


TOIPacketDecoder.prototype._parseTypeEnum = function(_type, _io) {

  if (_type == null || _io == null) {
    return;
  }

  if (!(_type instanceof ToiTypeDefinition)) {
    return;
  }

  var type = _type;

  if (RCPVerbose) console.log("parse enum options");

  // parse optionals
  while (true) {

    var dataid = _io.readU1();

    if (dataid == TERMINATOR) {
        break;
    }

    switch (dataid) {

      case RcpTypes.EnumOptions.DEFAULT:
        type.defaultValue = _readTinyString(_io);
        if (RCPVerbose) console.log("parse default, default: " + type.defaultValue);
        break;

      case RcpTypes.EnumOptions.ENTRIES:
      {
        if (RCPVerbose) console.log("parse entries...");

        var entries = [];

        while (true) {
          var entry = _readTinyString(_io);
          if (entry.length == 0) {
            break;
          }

          if (RCPVerbose) console.log("adding entry: " + entry);
          entries.push(entry);
        }

        if (RCPVerbose) console.log("adding entry: " + entry);
        type.entries = entries;
      }
        break;

      default:
        // not a number data id!!
        throw "wrong data id for a ENUM: " + dataid;
    }
  }

}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// TOI MODEL
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
ToiPacket = function(_command) {
  if(this === window) { //if *this* is the window object, start over with a *new* object
      return new ToiPacket(_command);
  }

  this.command = _command;
  this.data = null;
  this.timestamp = null;
}

ToiPacket.prototype = {};

ToiPacket.prototype.write = function(_array) {

  var array = _array || [];

  // write command
  array.push(this.command);

  // write optionals
  if (this.timestamp != null) {
    array.push(RcpTypes.PacketOptions.TIMESTAMP);
    pushIn64ToArrayBe(this.timestamp, array);
  }

  if (this.data != null) {
    array.push(RcpTypes.PacketOptions.DATA);
    array = this.data.write(array);
  }

  array.push(TERMINATOR);

  return array;
}


//---------------------------------------
//---------------------------------------
ToiParameter = function(_id, _type) {

  if(this === window) { //if *this* is the window object, start over with a *new* object
      return new ToiParameter(_id, _type);
  }

  if (_id == null) {
    throw "parameter id is mandatory";
  }

  if (_type == null) {
    throw "parameter type is mandatory";
  }

  if (!(_type instanceof ToiTypeDefinition)) {
    throw "_type has to be a ToiTypeDefinition";
  }

  this.id = _id;
  this.type = _type;

  // optionals
  this.value = null;
  this.label = null;
  this.languageLabel = {};
  this.description = null;
  this.lanugageDescription = {};
  this.tags = null;
  this.order = null;
  this.parentid = null;
  this.widget = null;
  this.userdata = null;
  this.userid = null;
};

ToiParameter.prototype = {};

ToiParameter.prototype.cloneEmpty = function() {
  var emptyType = this.type.cloneEmpty();
  return new ToiParameter(this.id, emptyType);
}

ToiParameter.prototype.write = function(array) {

  // write id
  pushIn16ToArrayBe(this.id, array);

  // write type definition
  array = this.type.write(array);

  // write optionals
  if (this.value != null) {
    array.push(RcpTypes.ParameterOptions.VALUE);

    if (this.type.typeid != RcpTypes.Datatype.ARRAY) {
      array = _writeTypedValue(this.type, this.value, array);
    } else {

      // TODO: re-use dimensions we have stored...

      // write dim
      pushIn32ToArrayBe(this.type.dimensions, array);

      // write dim sizes
      for (var i=0; i<this.type.dimsizes.length; i++) {
        pushIn32ToArrayBe(this.type.dimsizes[i], array);
      }

      var d = flatten(JSON.parse(this.value));
      //flatten(d); // [1, 2, 3, 4, 5]
      for (var i=0; i<d.length; i++) {
        console.log("write: " + d[i]);
        array = _writeTypedValue(this.type.subtype, d[i], array);
      }
    }
  }

  if (this.label != null) {
    array.push(RcpTypes.ParameterOptions.LABEL);
    array = writeTinyString(this.label, array);
  }

  if (this.description != null) {
    array.push(RcpTypes.ParameterOptions.DESCRIPTION);
    array = writeShortString(this.description, array);
  }

  if (this.tags != null) {
    array.push(RcpTypes.ParameterOptions.TAGS);
    array = writeTinyString(this.tags, array);
  }

  if (this.order != null) {
    array.push(RcpTypes.ParameterOptions.ORDER);
    pushIn32ToArrayBe(this.order, array);
  }

  if (this.parentid != null) {
    array.push(RcpTypes.ParameterOptions.PARENTID);
    pushIn16ToArrayBe(this.parentid, array);
  }

  if (this.widget != null) {
    //array.push(RcpTypes.ParameterOptions.WIDGET);
    console.log("widget ignored for now");
  }

  if (this.userdata != null) {
    array.push(RcpTypes.ParameterOptions.USERDATA);
    pushIn32ToArrayBe(this.userdata.length, array);

    var userarray = [].slice.call(this.userdata);
    array = array.concat(userarray);
  }

  if (this.userid != null) {
    array.push(RcpTypes.ParameterOptions.USERID);
    array = writeTinyString(this.userid, array);
  }

  array.push(TERMINATOR);

  return array;
}

ToiParameter.prototype.update = function(parameter) {

  // check parameter

  // update type
  this.type.update(parameter.type);

  /*
  update optionals

  this.value = null;
  this.label = null;
  this.description = null;;
  this.order = null;
  this.widget = null;
  this.userdata = null;
  */

  if (parameter.value != null) {
    this.value = parameter.value;
  }

  if (parameter.label != null) {
    this.label = parameter.label;
  }

  if (parameter.description != null) {
    this.description = parameter.description;
  }

  if (parameter.tags != null) {
    this.tags = parameter.tags;
  }

  if (parameter.order != null) {
    this.order = parameter.order;
  }
  
  if (parameter.parentid != null) {
    this.parentid = parameter.parentid;
  }

  if (parameter.widget != null) {
    console.log("widget ignored for now");
    //cachedParam.widget = parameter.widget;
  }

  if (parameter.userdata != null) {
    this.userdata = parameter.userdata;
  }

  if (parameter.userid != null) {
    this.userid = parameter.userid;
  }
};

//---------------------------------------
//---------------------------------------
ToiTypeDefinition = function(_typeid) {

  if(this === window) { //if *this* is the window object, start over with a *new* object
      return new ToiTypeDefinition(_typeid);
  }

  this.typeid = _typeid;
  this.defaultValue = null;
};

ToiTypeDefinition.prototype = {};

ToiTypeDefinition.prototype.cloneEmpty = function() {

  var newTypeDef = new ToiTypeDefinition(this.typeid);

  if (this.typeid == RcpTypes.Datatype.ARRAY) {
    newTypeDef.subtype = this.subtype.cloneEmpty();
    newTypeDef.dimensions = this.dimensions;
    newTypeDef.dimsizes = this.dimsizes;
    newTypeDef.numBytes = this.numBytes;
  }
  else if (this.typeid == RcpTypes.Datatype.RANGE) {
    newTypeDef.elementType = this.elementType.cloneEmpty();
  }

  return newTypeDef;
}

ToiTypeDefinition.prototype.update = function(type) {

  // check type...

  if (type.defaultValue != null) {
    this.defaultValue = type.defaultValue;
  }

  switch (type.typeid) {
    case RcpTypes.Datatype.BOOLEAN:
      // only default in bool
      break;

    // number types
    case RcpTypes.Datatype.INT8:
    case RcpTypes.Datatype.UINT8:
    case RcpTypes.Datatype.INT16:
    case RcpTypes.Datatype.UINT16:
    case RcpTypes.Datatype.INT32:
    case RcpTypes.Datatype.UINT32:
    case RcpTypes.Datatype.INT64:
    case RcpTypes.Datatype.UINT64:
    case RcpTypes.Datatype.FLOAT32:
    case RcpTypes.Datatype.FLOAT64:
      this._updateNumber(type);
      break;

    // string
    case RcpTypes.Datatype.STRING:
    case RcpTypes.Datatype.ENUM:

    case RcpTypes.Datatype.ARRAY:
    default:
      break;
  }
};


ToiTypeDefinition.prototype._updateNumber = function(type) {

  if (type.min != null) {
    this.min = type.min;
  }

  if (type.max != null) {
    this.max = type.max;
  }

  if (type.multipleof != null) {
    this.multipleof = type.multipleof;
  }

  if (type.scale != null) {
    this.scale = type.scale;
  }

  if (type.unit != null) {
    this.unit = type.unit;
  }

};


ToiTypeDefinition.prototype.write = function(array) {

  // make sure it is an array...
  if (!(array instanceof Array)) {
    console.error("can not write to: " + typeof array);
    return array;
  }

  // write type
  array.push(this.typeid);

  // write optionals
  switch (this.typeid) {
    case RcpTypes.Datatype.BOOLEAN:
      // only default in bool
      array = this._writeBoolean(array);
      break;

    // number types
    case RcpTypes.Datatype.INT8:
    case RcpTypes.Datatype.UINT8:
    case RcpTypes.Datatype.INT16:
    case RcpTypes.Datatype.UINT16:
    case RcpTypes.Datatype.INT32:
    case RcpTypes.Datatype.UINT32:
    case RcpTypes.Datatype.INT64:
    case RcpTypes.Datatype.UINT64:
    case RcpTypes.Datatype.FLOAT32:
    case RcpTypes.Datatype.FLOAT64:
      array = this._writeNumber(array);
      break;

    case RcpTypes.Datatype.RANGE:
      array = this._writeRange(array);
      break;

    // string
    case RcpTypes.Datatype.STRING:
      array = this._writeString(array);
      break;

    case RcpTypes.Datatype.ENUM:
      array = this._writeEnum(array);
      break;

    case RcpTypes.Datatype.ARRAY:
      array = this._writeArray(array);
      break;

    default:
      break;
  }

  array.push(TERMINATOR);

  return array;
};

ToiTypeDefinition.prototype._writeBoolean = function(array) {

  if (this.defaultValue != null) {
    array.push(RcpTypes.BooleanOptions.DEFAULT);
    array.push(this.defaultValue);
  }

  return array;
};

ToiTypeDefinition.prototype._writeString = function(array) {

  if (this.defaultValue != null) {
    array.push(RcpTypes.StringOptions.DEFAULT);
    array = writeLongString(this.defaultValue, array);
  }

  return array;
}


ToiTypeDefinition.prototype._writeArray = function(array) {

  // write subtype
  this.subtype.write(array);

  if (this.defaultValue != null) {

    array.push(RcpTypes.StringOptions.DEFAULT);

    // TODO: re-use dimensions we have stored...

    // write dim
    pushIn32ToArrayBe(this.dimensions, array);

    // write dim sizes
    for (var i=0; i<this.dimsizes.length; i++) {
      pushIn32ToArrayBe(this.dimsizes[i], array);
    }

    var d = flatten(JSON.parse(this.defaultValue));
    //flatten(d); // [1, 2, 3, 4, 5]
    for (var i=0; i<d.length; i++) {
      array = _writeTypedValue(this.subtype, d[i], array);
    }
  }


  if (this.structure != null) {
  }

  return array;
}


ToiTypeDefinition.prototype._writeEnum = function(array) {

  if (this.defaultValue != null) {
    array.push(RcpTypes.StringOptions.DEFAULT);
    array = writeTinyString(this.defaultValue, array);
  }

  if (this.entries != null) {
    // nop - dont write 'em out
    console.log("skip writing enum entries");
  }

  return array;
}

ToiTypeDefinition.prototype._writeRange = function(array) {

  // write element type
  this.elementType.write(array);

  if (this.defaultValue != null) {
    array.push(RcpTypes.BooleanOptions.DEFAULT);
    _writeTypedValue(this, this.defaultValue, array);
  }

  return array;
}

ToiTypeDefinition.prototype._writeNumber = function(array) {

  if (this.defaultValue != null) {
    array.push(RcpTypes.NumberOptions.DEFAULT);
    array = _writeTypedValue(this, this.defaultValue, array);
  }

  if (this.min != null) {
    array.push(RcpTypes.NumberOptions.MINIMUM);
    array = _writeTypedValue(this, this.min, array);
  }

  if (this.max != null) {
    array.push(RcpTypes.NumberOptions.MAXIMUM);
    array = _writeTypedValue(this, this.max, array);
  }

  if (this.multipleof != null) {
    array.push(RcpTypes.NumberOptions.MULTIPLEOF);
    array = _writeTypedValue(this, this.multipleof, array);
  }

  if (this.scale != null) {
    array.push(RcpTypes.NumberOptions.SCALE);
    array.push(this.scale);
  }

  if (this.unit != null) {
    array.push(RcpTypes.NumberOptions.UNIT);
    // write as tiny string
    array = writeTinyString(this.unit, array);
  }

  return array;
};
