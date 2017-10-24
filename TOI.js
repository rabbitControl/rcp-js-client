
// flag to control some verbose logging
var TOIVerbose = false;


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


_readTypedValue = function(_typeid, _io) {

  if (_io == null || !(_io instanceof KaitaiStream)) {
    throw "no KaitaiStream provided";
  }

  switch (_typeid) {

    case ToiTypes.Datatype.BOOL:
        return _io.readU1() > 0;

    // number types
    case ToiTypes.Datatype.INT8:
        return _io.readS1();
    case ToiTypes.Datatype.UINT8:
        return _io.readU1();
    case ToiTypes.Datatype.INT16:
        return _io.readS2be();
    case ToiTypes.Datatype.UINT16:
        return _io.readU2be();
    case ToiTypes.Datatype.INT32:
        return _io.readS4be();
    case ToiTypes.Datatype.UINT32:
        return _io.readU4be();
    case ToiTypes.Datatype.INT64:
        return _io.readS8be();
    case ToiTypes.Datatype.UINT64:
        return _io.readU8be();
    case ToiTypes.Datatype.FLOAT32:
        return _io.readF4be();
    case ToiTypes.Datatype.FLOAT64:
        return _io.readF8be();

    // string
    case ToiTypes.Datatype.TSTR:
      var strObj = new ToiTypes.TinyString(_io);
      return strObj.data;
    case ToiTypes.Datatype.SSTR:
      var strObj = new ToiTypes.ShortString(_io);
      return strObj.data;
    case ToiTypes.Datatype.LSTR:
      var strObj = new ToiTypes.LongString(_io);
      return strObj.data;
  }

  return null;
}

_writeTypedValue = function(_typeid, value, array) {

  switch (_typeid) {

    case ToiTypes.Datatype.BOOL:
      array.push(value > 0);
      break;

    // number types
    case ToiTypes.Datatype.INT8:
    case ToiTypes.Datatype.UINT8:
      array.push(value);
      break;
    case ToiTypes.Datatype.INT16:
    case ToiTypes.Datatype.UINT16:
      pushIn16ToArrayBe(value, array);
      break;
    case ToiTypes.Datatype.INT32:
    case ToiTypes.Datatype.UINT32:
      pushIn32ToArrayBe(value, array);
      break;
    case ToiTypes.Datatype.INT64:
    case ToiTypes.Datatype.UINT64:
      pushFloat64ToArrayBe(value, array);
      break;
    case ToiTypes.Datatype.FLOAT32:
      pushFloat64ToArrayBe(value, array);
      break;
    case ToiTypes.Datatype.FLOAT64:
      pushFloat64ToArrayBe(value, array);
      break;

    // string
    case ToiTypes.Datatype.TSTR:
      break;
    case ToiTypes.Datatype.SSTR:
      break;
    case ToiTypes.Datatype.LSTR:
      array = writeLongString(value, array);
      break;
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

  var packet = new ToiPacket(ToiTypes.Command.UPDATE);
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
    return;
  }

  // check if value exists
  if (this.valueCache[parameter.id]) {
    console.error("value already exists in data-cache... drop");
    return;
  }

  // ok, add it
  console.log("adding parameter: " + JSON.stringify(parameter));
  this.valueCache[parameter.id] = parameter;

  // console.log("this.valueCache: " + this.valueCache);

  if (this.add != null) { // TODO ensure its a function?
    this.add(parameter);
  }
}

//------------------------------------------------
//------------------------------------------------
ToiClient.prototype._updateCache = function(parameter) {

  if (!_validateParameter(parameter)) {
    return false;
  }

  // get value from cache
  if (!this.valueCache[parameter.id]) {
    console.error("value not in data-cache... drop");
    return false;
  }

  var cachedParam = this.valueCache[parameter.id];

  // update cached
  // check types...
  if (parameter.id != cachedParam.id) {
    console.error("ids do not match");
    return false;
  }

  if (parameter.type.typeid != cachedParam.type.typeid) {
    console.error("types do not match");
    return false;
  }

  cachedParam.update(parameter);

  console.log("updated cached parameter: " + JSON.stringify(cachedParam));

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
    console.error("value not in data-cache... drop");
    return;
  }

  console.log("removing parameter: " + parameter.id);
  this.valueCache[parameter.id] = null;

  if (this.remove != null) { // TODO ensure its a function?
    this.remove(parameter);
  }
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
};


TOISocket.prototype = {};

TOISocket.prototype._onopen = function(e) {
  // this = WebSocket!

  console.log("WebSocket opened to " + this.url);

  // TODO send init data...
  // 04 0F 05 09 01
  var data = new Uint8Array([ToiTypes.Command.INIT]);
  this.send(data);

  if (this._.onopen) {
    this._.onopen();
  }
};

TOISocket.prototype._onclose = function(e) {
  // this = WebSocket!
  console.log("WebSocket closed " + this.url);
};

TOISocket.prototype._onerror = function(error) {
  // this = WebSocket!
  console.log("Error detected: " + error + ": " + JSON.stringify(error));
};

TOISocket.prototype._onmessage = function(ev) {
  // this = WebSocket!

  if (ev.data instanceof Blob) {
      var arrayBuffer;

      var fileReader = new FileReader();

      fileReader.socket = this;

      fileReader.onload = function () {

          if (this._.received) {
            this._.received(ev.data);
          }

          if (this.socket._._decoder) {
            var packet = this.socket._._decoder._receive(ev.data);
          }

      };

      fileReader.readAsArrayBuffer(ev.data);

  } else if (ev.data instanceof ArrayBuffer) {

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
  console.log("typeof message: " + typeof message + " : " + (message instanceof Uint8Array) + ": " + message.constructor.name);

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

  var _io = new KaitaiStream(arraybuffer);

  try {

    var packet = this._parsePacket(_io);

    switch (packet.command) {
      case ToiTypes.Command.VERSION:
        //
        break;
      case ToiTypes.Command.INIT:
        if (this._packetListener != null) {
          this._packetListener._init(packet);
        }
        break;
      case ToiTypes.Command.ADD:
        if (this._packetListener != null) {
          this._packetListener._add(packet.data);
        }
        break;
      case ToiTypes.Command.UPDATE:
        if (this._packetListener != null) {
          this._packetListener._update(packet.data);
        }
        break;
      case ToiTypes.Command.REMOVE:
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
  }
}


TOIPacketDecoder.prototype._parsePacket = function(_io) {
  // parse packet
  var cmd = _io.readU1();

  var packet = new ToiPacket(cmd);

  if (TOIVerbose) console.log("parse packet options");

  // read packet options
  while (!_io.isEof()) {

    var dataid = _io.readU1();

    if (dataid == ToiTypes.Packet.TERMINATOR) {
      break;
    }

    switch (dataid) {
      case ToiTypes.Packet.DATA:

        if (packet.data != null) {
            throw "already has data...";
        }

        switch (cmd) {
          case ToiTypes.Command.INIT:
            // init - ignore any data...
            break;

          case ToiTypes.Command.ADD:
          case ToiTypes.Command.REMOVE:
          case ToiTypes.Command.UPDATE:
            // expect parameter
            packet.data = this._parseParameter(_io);

            if (TOIVerbose) console.log("set packet data: " + JSON.stringify(packet.data));

            break;
          case ToiTypes.Command.VERSION:
            // version: expect meta
            // TODO: implement
            console.log("version not implemented yet");
            break;
        } // switch (cmd)

        break;

      case ToiTypes.Packet.PACKET_ID:
        packet.packetId = _io.readU4be();
        if (TOIVerbose) console.log("packet id: " + packet.packetId);
        break;
      case PACKET_TIME:
        packet.timestamp = _io.readU8be();
        if (TOIVerbose) console.log("packet timestamp: " + packet.timestamp);
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
  var paramId = _io.readS4be();
  // get mandatory type
  var type = this._parseTypeDefinition(_io);

  var parameter = new ToiParameter(paramId, type);

  if (TOIVerbose) console.log("parse parameter options");

  // get options from the stream
  while (true) {

    // get data-id
    var dataid = _io.readU1();

    if (dataid == ToiTypes.Packet.TERMINATOR) {
        break;
    }

    switch (dataid) {
      case ToiTypes.Parameter.VALUE:
        parameter.value = _readTypedValue(type.typeid, _io);
        if (TOIVerbose) console.log("parameter value:  " + parameter.value);
        break;

      case ToiTypes.Parameter.LABEL:
        parameter.label = _readTypedValue(ToiTypes.Datatype.TSTR, _io);
        if (TOIVerbose) console.log("parameter label: " + parameter.label);
        break;

      case ToiTypes.Parameter.DESCRIPTION:
        parameter.description = _readTypedValue(ToiTypes.Datatype.SSTR, _io);
        if (TOIVerbose) console.log("parameter desc: " + parameter.description);
        break;

      case ToiTypes.Parameter.ORDER:
        parameter.order = _io.readS4be();
        if (TOIVerbose) console.log("parameter order: " + parameter.order);
        break;

      case ToiTypes.Parameter.WIDGET:
        // skip...
        console.log("widget not implemented");
        break;

      case ToiTypes.Parameter.USERDATA:
        var ud = new ToiTypes.Userdata(_io);
        parameter.userdata = ud.data;
        if (TOIVerbose) console.log("userdata set");
        break;
    }
  }

  return parameter;
}

TOIPacketDecoder.prototype._parseTypeDefinition = function(_io) {

  // read mandatory type
  var typeid = _io.readU1();

  // check if typeid is contained in ToiTypes.Datatype
  //ToiTypes.Datatype.hasOwnProperty(""+typeid);

  if (typeid == 0) {
    throw "type id == 0!";
  }

  var type = new ToiTypeDefinition(typeid);

  switch (typeid) {

    case ToiTypes.Datatype.BOOL:
      this._parseTypeDefault(type, _io);
      break;

    // number types
    case ToiTypes.Datatype.INT8:
    case ToiTypes.Datatype.UINT8:
    case ToiTypes.Datatype.INT16:
    case ToiTypes.Datatype.UINT16:
    case ToiTypes.Datatype.INT32:
    case ToiTypes.Datatype.UINT32:
    case ToiTypes.Datatype.INT64:
    case ToiTypes.Datatype.UINT64:
    case ToiTypes.Datatype.FLOAT32:
    case ToiTypes.Datatype.FLOAT64:
      this._parseTypeNumber(type, _io);
      break;

    // string
    case ToiTypes.Datatype.TSTR:
      break;
    case ToiTypes.Datatype.SSTR:
      break;
    case ToiTypes.Datatype.LSTR:
      this._parseTypeDefault(type, _io);
      break;
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

  // parse optionals
  while (true) {

    var dataid = _io.readU1();

    if (dataid == ToiTypes.Packet.TERMINATOR) {
        break;
    }

    switch (dataid) {

      case ToiTypes.TypeDefinition.DEFAULTVALUE:
        type.defaultValue = _readTypedValue(_type.typeid, _io);
        if (TOIVerbose) console.log("parse default, default: " + type.defaultValue);
        break;

      default:
        // not a number data id!!
        throw "wrong data id for a bool";
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

  if (TOIVerbose) console.log("parse number options");

  var type = _type;

  // parse optionals
  while (true) {

    var dataid = _io.readU1();

    if (dataid == ToiTypes.Packet.TERMINATOR) {
        break;
    }

    switch (dataid) {

      case ToiTypes.TypeNumber.DEFAULTVALUE:
        type.defaultValue = _readTypedValue(_type.typeid, _io);
        if (TOIVerbose) console.log("number default: " + type.defaultValue);
        break;
      case ToiTypes.TypeNumber.MIN:
        type.min = _readTypedValue(_type.typeid, _io);
        if (TOIVerbose) console.log("number min: " + type.min);
        break;
      case ToiTypes.TypeNumber.MAX:
        type.max = _readTypedValue(_type.typeid, _io);
        if (TOIVerbose) console.log("number max: " + type.max);
        break;
      case ToiTypes.TypeNumber.MULT:
        type.multipleof = _readTypedValue(_type.typeid, _io);
        if (TOIVerbose) console.log("number mult: " + type.multipleof);
        break;

      case ToiTypes.TypeNumber.SCALE:
        type.scale = _io.readU1();
        if (TOIVerbose) console.log("number scale: " + type.scale);
        break;

      case ToiTypes.TypeNumber.UNIT:
        var tinyString = new ToiTypes.TinyString(_io);
        type.unit = tinyString.data;
        if (TOIVerbose) console.log("number unit: " + type.unit);
        break;

      default:
        // not a number data id!!
        throw "wrong data id for a number: " + dataid;
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
  this.packetId = null;
  this.timestamp = null;
}

ToiPacket.prototype = {};

ToiPacket.prototype.write = function(_array) {

  var array = _array || [];

  // write command
  array.push(this.command);

  // write optionals
  if (this.packetId != null) {
    array.push(ToiTypes.Packet.PACKET_ID);
    pushIn32ToArrayBe(this.packetId, array);
  }

  if (this.timestamp != null) {
    array.push(ToiTypes.Packet.PACKET_TIME);
    pushFloat64ToArrayBe(this.timestamp, array);
  }

  if (this.data != null) {
    array.push(ToiTypes.Packet.DATA);
    array = this.data.write(array);
  }

  array.push(ToiTypes.Packet.TERMINATOR);

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
  this.description = null;;
  this.order = null;
  this.widget = null;
  this.userdata = null;
};

ToiParameter.prototype = {};

ToiParameter.prototype.cloneEmpty = function() {
  var emptyType = this.type.cloneEmpty();
  return new ToiParameter(this.id, emptyType);
}

ToiParameter.prototype.write = function(array) {

  // write id
  pushIn32ToArrayBe(this.id, array);

  // write type definition
  array = this.type.write(array);

  // write optionals
  if (this.value != null) {
    array.push(ToiTypes.Parameter.VALUE);
    array = _writeTypedValue(this.type.typeid, this.value, array);
  }

  if (this.label != null) {
    array.push(ToiTypes.Parameter.LABEL);
    array = writeTinyString(this.label, array);
  }

  if (this.description != null) {
    array.push(ToiTypes.Parameter.DESCRIPTION);
    array = writeShortString(this.description, array);
  }

  if (this.order != null) {
    array.push(ToiTypes.Parameter.ORDER);
    pushIn32ToArrayBe(this.order, array);
  }

  if (this.widget != null) {
    //array.push(ToiTypes.Parameter.WIDGET);
    console.log("widget ignored for now");
  }

  if (this.userdata != null) {
    array.push(ToiTypes.Parameter.USERDATA);
    pushIn32ToArrayBe(this.userdata.length, array);

    var userarray = [].slice.call(this.userdata);
    array = array.concat(userarray);
  }

  array.push(ToiTypes.Packet.TERMINATOR);

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

  if (parameter.order != null) {
    this.order = parameter.order;
  }

  if (parameter.widget != null) {
    console.log("widget ignored for now");
    //cachedParam.widget = parameter.widget;
  }

  if (parameter.userdata != null) {
    this.userdata = parameter.userdata;
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
  return new ToiTypeDefinition(this.typeid);
}

ToiTypeDefinition.prototype.update = function(type) {

  // check type...

  if (type.defaultValue != null) {
    this.defaultValue = type.defaultValue;
  }

  switch (type.typeid) {
    case ToiTypes.Datatype.BOOL:
      // only default in bool
      break;

    // number types
    case ToiTypes.Datatype.INT8:
    case ToiTypes.Datatype.UINT8:
    case ToiTypes.Datatype.INT16:
    case ToiTypes.Datatype.UINT16:
    case ToiTypes.Datatype.INT32:
    case ToiTypes.Datatype.UINT32:
    case ToiTypes.Datatype.INT64:
    case ToiTypes.Datatype.UINT64:
    case ToiTypes.Datatype.FLOAT32:
    case ToiTypes.Datatype.FLOAT64:
      this._updateNumber(type);
      break;

    // string
    case ToiTypes.Datatype.TSTR:
    case ToiTypes.Datatype.SSTR:
    case ToiTypes.Datatype.LSTR:
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
    case ToiTypes.Datatype.BOOL:
      // only default in bool
      array = this._writeBoolean(array);
      break;

    // number types
    case ToiTypes.Datatype.INT8:
    case ToiTypes.Datatype.UINT8:
    case ToiTypes.Datatype.INT16:
    case ToiTypes.Datatype.UINT16:
    case ToiTypes.Datatype.INT32:
    case ToiTypes.Datatype.UINT32:
    case ToiTypes.Datatype.INT64:
    case ToiTypes.Datatype.UINT64:
    case ToiTypes.Datatype.FLOAT32:
    case ToiTypes.Datatype.FLOAT64:
      array = this._writeNumber(array);
      break;

    // string
    case ToiTypes.Datatype.TSTR:
    case ToiTypes.Datatype.SSTR:
    case ToiTypes.Datatype.LSTR:
      array = this._writeString(array);
    default:
      break;
  }

  array.push(ToiTypes.Packet.TERMINATOR);

  return array;
};

ToiTypeDefinition.prototype._writeBoolean = function(array) {

  if (this.defaultValue != null) {
    array.push(ToiTypes.TypeDefinition.DEFAULTVALUE);
    array.push(this.defaultValue);
  }

  return array;
};

ToiTypeDefinition.prototype._writeString = function(array) {

  if (this.defaultValue != null) {
    array.push(ToiTypes.TypeDefinition.DEFAULTVALUE);

    array = writeLongString(this.defaultValue, array);
  }

  return array;
}

ToiTypeDefinition.prototype._writeNumber = function(array) {

  if (this.defaultValue != null) {
    array.push(ToiTypes.TypeNumber.DEFAULTVALUE);
    array = _writeTypedValue(this.typeid, this.defaultValue, array);
  }

  if (this.min != null) {
    array.push(ToiTypes.TypeNumber.MIN);
    array = _writeTypedValue(this.typeid, this.min, array);
  }

  if (this.max != null) {
    array.push(ToiTypes.TypeNumber.MAX);
    array = _writeTypedValue(this.typeid, this.max, array);
  }

  if (this.multipleof != null) {
    array.push(ToiTypes.TypeNumber.MULT);
    array = _writeTypedValue(this.typeid, this.multipleof, array);
  }

  if (this.scale != null) {
    array.push(ToiTypes.TypeNumber.SCALE);
    array.push(this.scale);
  }

  if (this.unit != null) {
    array.push(ToiTypes.TypeNumber.UNIT);
    // write as tiny string
    array = writeTinyString(this.unit, array);
  }

  return array;
};
