/*! tableau-2.1.2 */
var tableauSoftware = {};
/*! tableau-2.2.1 */
(function() {
  /*! BEGIN MscorlibSlim */
  var global = {};
  (function(global) {
    "use strict";
    var ss = { __assemblies: {} };
    ss.initAssembly = function assembly(obj, name, res) {
      res = res || {};
      obj.name = name;
      obj.toString = function() {
        return this.name;
      };
      obj.__types = {};
      obj.getResourceNames = function() {
        return Object.keys(res);
      };
      obj.getResourceDataBase64 = function(name) {
        return res[name] || null;
      };
      obj.getResourceData = function(name) {
        var r = res[name];
        return r ? ss.dec64(r) : null;
      };
      ss.__assemblies[name] = obj;
    };
    ss.initAssembly(ss, "mscorlib");
    ss.getAssemblies = function ss$getAssemblies() {
      return Object.keys(ss.__assemblies).map(function(n) {
        return ss.__assemblies[n];
      });
    };
    ss.isNullOrUndefined = function ss$isNullOrUndefined(o) {
      return o === null || o === undefined;
    };
    ss.isValue = function ss$isValue(o) {
      return o !== null && o !== undefined;
    };
    ss.referenceEquals = function ss$referenceEquals(a, b) {
      return ss.isValue(a) ? a === b : !ss.isValue(b);
    };
    ss.mkdict = function ss$mkdict() {
      var a = arguments.length != 1 ? arguments : arguments[0];
      var r = {};
      for (var i = 0; i < a.length; i += 2) {
        r[a[i]] = a[i + 1];
      }
      return r;
    };
    ss.clone = function ss$clone(t, o) {
      return o ? t.$clone(o) : o;
    };
    ss.coalesce = function ss$coalesce(a, b) {
      return ss.isValue(a) ? a : b;
    };
    ss.isDate = function ss$isDate(obj) {
      return Object.prototype.toString.call(obj) === "[object Date]";
    };
    ss.isArray = function ss$isArray(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    ss.isTypedArrayType = function ss$isTypedArrayType(type) {
      return (
        [
          "Float32Array",
          "Float64Array",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Uint8Array",
          "Uint16Array",
          "Uint32Array",
          "Uint8ClampedArray"
        ].indexOf(ss.getTypeFullName(type)) >= 0
      );
    };
    ss.isArrayOrTypedArray = function ss$isArray(obj) {
      return ss.isArray(obj) || ss.isTypedArrayType(ss.getInstanceType(obj));
    };
    ss.getHashCode = function ss$getHashCode(obj) {
      if (!ss.isValue(obj))
        throw new ss_NullReferenceException("Cannot get hash code of null");
      else if (typeof obj.getHashCode === "function") return obj.getHashCode();
      else if (typeof obj === "boolean") {
        return obj ? 1 : 0;
      } else if (typeof obj === "number") {
        var s = obj.toExponential();
        s = s.substr(0, s.indexOf("e"));
        return parseInt(s.replace(".", ""), 10) & 0xffffffff;
      } else if (typeof obj === "string") {
        var res = 0;
        for (var i = 0; i < obj.length; i++)
          res = (res * 31 + obj.charCodeAt(i)) & 0xffffffff;
        return res;
      } else if (ss.isDate(obj)) {
        return obj.valueOf() & 0xffffffff;
      } else {
        return ss.defaultHashCode(obj);
      }
    };
    ss.defaultHashCode = function ss$defaultHashCode(obj) {
      return (
        obj.$__hashCode__ ||
        (obj.$__hashCode__ = (Math.random() * 0x100000000) | 0)
      );
    };
    ss.equals = function ss$equals(a, b) {
      if (!ss.isValue(a)) throw new ss_NullReferenceException("Object is null");
      else if (a !== ss && typeof a.equals === "function") return a.equals(b);
      if (ss.isDate(a) && ss.isDate(b)) return a.valueOf() === b.valueOf();
      else if (typeof a === "function" && typeof b === "function")
        return ss.delegateEquals(a, b);
      else if (ss.isNullOrUndefined(a) && ss.isNullOrUndefined(b)) return true;
      else return a === b;
    };
    ss.compare = function ss$compare(a, b) {
      if (!ss.isValue(a)) throw new ss_NullReferenceException("Object is null");
      else if (
        typeof a === "number" ||
        typeof a === "string" ||
        typeof a === "boolean"
      )
        return a < b ? -1 : a > b ? 1 : 0;
      else if (ss.isDate(a)) return ss.compare(a.valueOf(), b.valueOf());
      else return a.compareTo(b);
    };
    ss.equalsT = function ss$equalsT(a, b) {
      if (!ss.isValue(a)) throw new ss_NullReferenceException("Object is null");
      else if (
        typeof a === "number" ||
        typeof a === "string" ||
        typeof a === "boolean"
      )
        return a === b;
      else if (ss.isDate(a)) return a.valueOf() === b.valueOf();
      else return a.equalsT(b);
    };
    ss.staticEquals = function ss$staticEquals(a, b) {
      if (!ss.isValue(a)) return !ss.isValue(b);
      else return ss.isValue(b) ? ss.equals(a, b) : false;
    };
    ss.shallowCopy = function ss$shallowCopy(source, target) {
      var keys = Object.keys(source);
      for (var i = 0, l = keys.length; i < l; i++) {
        var k = keys[i];
        target[k] = source[k];
      }
    };
    ss.isLower = function ss$isLower(c) {
      var s = String.fromCharCode(c);
      return s === s.toLowerCase() && s !== s.toUpperCase();
    };
    ss.isUpper = function ss$isUpper(c) {
      var s = String.fromCharCode(c);
      return s !== s.toLowerCase() && s === s.toUpperCase();
    };
    if (typeof window == "object") {
      if (!window.Element) {
        window.Element = function() {};
        window.Element.isInstanceOfType = function(instance) {
          return (
            instance &&
            typeof instance.constructor === "undefined" &&
            typeof instance.tagName === "string"
          );
        };
      }
      window.Element.__typeName = "Element";
    }
    ss.clearKeys = function ss$clearKeys(d) {
      for (var n in d) {
        if (d.hasOwnProperty(n)) delete d[n];
      }
    };
    ss.keyExists = function ss$keyExists(d, key) {
      return d[key] !== undefined;
    };
    if (!Object.keys) {
      Object.keys = (function() {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
          hasDontEnumBug = !{ toString: null }.propertyIsEnumerable("toString"),
          dontEnums = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor"
          ],
          dontEnumsLength = dontEnums.length;
        return function(obj) {
          if (
            typeof obj !== "object" &&
            (typeof obj !== "function" || obj === null)
          ) {
            throw new TypeError("Object.keys called on non-object");
          }
          var result = [],
            prop,
            i;
          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }
          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }
          return result;
        };
      })();
    }
    ss.getKeyCount = function ss$getKeyCount(d) {
      return Object.keys(d).length;
    };
    ss.__genericCache = {};
    ss._makeGenericTypeName = function ss$_makeGenericTypeName(
      genericType,
      typeArguments
    ) {
      var result = genericType.__typeName;
      for (var i = 0; i < typeArguments.length; i++)
        result +=
          (i === 0 ? "[" : ",") + "[" + ss.getTypeQName(typeArguments[i]) + "]";
      result += "]";
      return result;
    };
    ss.makeGenericType = function ss$makeGenericType(
      genericType,
      typeArguments
    ) {
      var name = ss._makeGenericTypeName(genericType, typeArguments);
      return ss.__genericCache[name] || genericType.apply(null, typeArguments);
    };
    ss.registerGenericClassInstance = function ss$registerGenericClassInstance(
      instance,
      genericType,
      typeArguments,
      members,
      baseType,
      interfaceTypes
    ) {
      var name = ss._makeGenericTypeName(genericType, typeArguments);
      ss.__genericCache[name] = instance;
      instance.__typeName = name;
      instance.__genericTypeDefinition = genericType;
      instance.__typeArguments = typeArguments;
      ss.initClass(
        instance,
        genericType.__assembly,
        members,
        baseType(),
        interfaceTypes()
      );
    };
    ss.registerGenericInterfaceInstance = function ss$registerGenericInterfaceInstance(
      instance,
      genericType,
      typeArguments,
      members,
      baseInterfaces
    ) {
      var name = ss._makeGenericTypeName(genericType, typeArguments);
      ss.__genericCache[name] = instance;
      instance.__typeName = name;
      instance.__genericTypeDefinition = genericType;
      instance.__typeArguments = typeArguments;
      ss.initInterface(
        instance,
        genericType.__assembly,
        members,
        baseInterfaces()
      );
    };
    ss.isGenericTypeDefinition = function ss$isGenericTypeDefinition(type) {
      return type.__isGenericTypeDefinition || false;
    };
    ss.getGenericTypeDefinition = function ss$getGenericTypeDefinition(type) {
      return type.__genericTypeDefinition || null;
    };
    ss.getGenericParameterCount = function ss$getGenericParameterCount(type) {
      return type.__typeArgumentCount || 0;
    };
    ss.getGenericArguments = function ss$getGenericArguments(type) {
      return type.__typeArguments || null;
    };
    ss.setMetadata = function ss$_setMetadata(type, metadata) {
      if (metadata.members) {
        for (var i = 0; i < metadata.members.length; i++) {
          var m = metadata.members[i];
          m.typeDef = type;
          if (m.adder) m.adder.typeDef = type;
          if (m.remover) m.remover.typeDef = type;
          if (m.getter) m.getter.typeDef = type;
          if (m.setter) m.setter.typeDef = type;
        }
      }
      type.__metadata = metadata;
      if (metadata.variance) {
        type.isAssignableFrom = function(source) {
          var check = function(target, type) {
            if (
              type.__genericTypeDefinition === target.__genericTypeDefinition &&
              type.__typeArguments.length == target.__typeArguments.length
            ) {
              for (var i = 0; i < target.__typeArguments.length; i++) {
                var v = target.__metadata.variance[i],
                  t = target.__typeArguments[i],
                  s = type.__typeArguments[i];
                switch (v) {
                  case 1:
                    if (!ss.isAssignableFrom(t, s)) return false;
                    break;
                  case 2:
                    if (!ss.isAssignableFrom(s, t)) return false;
                    break;
                  default:
                    if (s !== t) return false;
                }
              }
              return true;
            }
            return false;
          };
          if (source.__interface && check(this, source)) return true;
          var ifs = ss.getInterfaces(source);
          for (var i = 0; i < ifs.length; i++) {
            if (ifs[i] === this || check(this, ifs[i])) return true;
          }
          return false;
        };
      }
    };
    ss.setMetadata = function ss$_setMetadata(type, metadata) {};
    ss.initClass = function ss$initClass(
      ctor,
      asm,
      members,
      baseType,
      interfaces
    ) {
      ctor.__class = true;
      ctor.__assembly = asm;
      if (!ctor.__typeArguments) asm.__types[ctor.__typeName] = ctor;
      if (baseType && baseType !== Object) {
        var f = function() {};
        f.prototype = baseType.prototype;
        ctor.prototype = new f();
        ctor.prototype.constructor = ctor;
      }
      ss.shallowCopy(members, ctor.prototype);
      if (interfaces) ctor.__interfaces = interfaces;
    };
    ss.initGenericClass = function ss$initGenericClass(
      ctor,
      asm,
      typeArgumentCount
    ) {
      ctor.__class = true;
      ctor.__assembly = asm;
      asm.__types[ctor.__typeName] = ctor;
      ctor.__typeArgumentCount = typeArgumentCount;
      ctor.__isGenericTypeDefinition = true;
    };
    ss.initInterface = function ss$initInterface(
      ctor,
      asm,
      members,
      baseInterfaces
    ) {
      ctor.__interface = true;
      ctor.__assembly = asm;
      if (!ctor.__typeArguments) asm.__types[ctor.__typeName] = ctor;
      if (baseInterfaces) ctor.__interfaces = baseInterfaces;
      ss.shallowCopy(members, ctor.prototype);
      ctor.isAssignableFrom = function(type) {
        return ss.contains(ss.getInterfaces(type), this);
      };
    };
    ss.initGenericInterface = function ss$initGenericClass(
      ctor,
      asm,
      typeArgumentCount
    ) {
      ctor.__interface = true;
      ctor.__assembly = asm;
      asm.__types[ctor.__typeName] = ctor;
      ctor.__typeArgumentCount = typeArgumentCount;
      ctor.__isGenericTypeDefinition = true;
    };
    ss.initEnum = function ss$initEnum(ctor, asm, members, namedValues) {
      ctor.__enum = true;
      ctor.__assembly = asm;
      asm.__types[ctor.__typeName] = ctor;
      ss.shallowCopy(members, ctor.prototype);
      ctor.getDefaultValue = ctor.createInstance = function() {
        return namedValues ? null : 0;
      };
      ctor.isInstanceOfType = function(instance) {
        return typeof instance == (namedValues ? "string" : "number");
      };
    };
    ss.getBaseType = function ss$getBaseType(type) {
      if (type === Object || type.__interface) {
        return null;
      } else if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(type.prototype).constructor;
      } else {
        var p = type.prototype;
        if (Object.prototype.hasOwnProperty.call(p, "constructor")) {
          try {
            var ownValue = p.constructor;
            delete p.constructor;
            return p.constructor;
          } finally {
            p.constructor = ownValue;
          }
        }
        return p.constructor;
      }
    };
    ss.getTypeFullName = function ss$getTypeFullName(type) {
      return (
        type.__typeName ||
        type.name ||
        (type.toString().match(/^\s*function\s*([^\s(]+)/) || [])[1] ||
        "Object"
      );
    };
    ss.getTypeQName = function ss$getTypeFullName(type) {
      return (
        ss.getTypeFullName(type) +
        (type.__assembly ? ", " + type.__assembly.name : "")
      );
    };
    ss.getTypeName = function ss$getTypeName(type) {
      var fullName = ss.getTypeFullName(type);
      var bIndex = fullName.indexOf("[");
      var nsIndex = fullName.lastIndexOf(
        ".",
        bIndex >= 0 ? bIndex : fullName.length
      );
      return nsIndex > 0 ? fullName.substr(nsIndex + 1) : fullName;
    };
    ss.getTypeNamespace = function ss$getTypeNamespace(type) {
      var fullName = ss.getTypeFullName(type);
      var bIndex = fullName.indexOf("[");
      var nsIndex = fullName.lastIndexOf(
        ".",
        bIndex >= 0 ? bIndex : fullName.length
      );
      return nsIndex > 0 ? fullName.substr(0, nsIndex) : "";
    };
    ss.getTypeAssembly = function ss$getTypeAssembly(type) {
      if (ss.contains([Date, Number, Boolean, String, Function, Array], type))
        return ss;
      else return type.__assembly || null;
    };
    ss._getAssemblyType = function ss$_getAssemblyType(asm, name) {
      var result = [];
      if (asm.__types) {
        return asm.__types[name] || null;
      } else {
        var a = name.split(".");
        for (var i = 0; i < a.length; i++) {
          asm = asm[a[i]];
          if (!ss.isValue(asm)) return null;
        }
        if (typeof asm !== "function") return null;
        return asm;
      }
    };
    ss.getAssemblyTypes = function ss$getAssemblyTypes(asm) {
      var result = [];
      if (asm.__types) {
        for (var t in asm.__types) {
          if (asm.__types.hasOwnProperty(t)) result.push(asm.__types[t]);
        }
      } else {
        var traverse = function(s, n) {
          for (var c in s) {
            if (s.hasOwnProperty(c)) traverse(s[c], c);
          }
          if (typeof s === "function" && ss.isUpper(n.charCodeAt(0)))
            result.push(s);
        };
        traverse(asm, "");
      }
      return result;
    };
    ss.createAssemblyInstance = function ss$createAssemblyInstance(
      asm,
      typeName
    ) {
      var t = ss.getType(typeName, asm);
      return t ? ss.createInstance(t) : null;
    };
    ss.getInterfaces = function ss$getInterfaces(type) {
      if (type.__interfaces) return type.__interfaces;
      else if (type === Date || type === Number)
        return [ss_IEquatable, ss_IComparable, ss_IFormattable];
      else if (type === Boolean || type === String)
        return [ss_IEquatable, ss_IComparable];
      else if (type === Array || ss.isTypedArrayType(type))
        return [ss_IEnumerable, ss_ICollection, ss_IList];
      else return [];
    };
    ss.isInstanceOfType = function ss$isInstanceOfType(instance, type) {
      if (ss.isNullOrUndefined(instance)) return false;
      if (typeof type.isInstanceOfType === "function")
        return type.isInstanceOfType(instance);
      return ss.isAssignableFrom(type, ss.getInstanceType(instance));
    };
    ss.isAssignableFrom = function ss$isAssignableFrom(target, type) {
      return (
        target === type ||
        (typeof target.isAssignableFrom === "function" &&
          target.isAssignableFrom(type)) ||
        type.prototype instanceof target
      );
    };
    ss.isClass = function Type$isClass(type) {
      return (
        type.__class == true ||
        type === Array ||
        type === Function ||
        type === RegExp ||
        type === String ||
        type === Error ||
        type === Object
      );
    };
    ss.isEnum = function Type$isEnum(type) {
      return !!type.__enum;
    };
    ss.isFlags = function Type$isFlags(type) {
      return (type.__metadata && type.__metadata.enumFlags) || false;
    };
    ss.isInterface = function Type$isInterface(type) {
      return !!type.__interface;
    };
    ss.safeCast = function ss$safeCast(instance, type) {
      if (type === true) return instance;
      else if (type === false) return null;
      else return ss.isInstanceOfType(instance, type) ? instance : null;
    };
    ss.cast = function ss$cast(instance, type) {
      if (instance === null || typeof instance === "undefined") return instance;
      else if (
        type === true ||
        (type !== false && ss.isInstanceOfType(instance, type))
      )
        return instance;
      throw new ss_InvalidCastException(
        "Cannot cast object to type " + ss.getTypeFullName(type)
      );
    };
    ss.getInstanceType = function ss$getInstanceType(instance) {
      if (!ss.isValue(instance))
        throw new ss_NullReferenceException("Cannot get type of null");
      try {
        return instance.constructor;
      } catch (ex) {
        return Object;
      }
    };
    ss._getType = function(typeName, asm, re) {
      var outer = !re;
      re = re || /[[,\]]/g;
      var last = re.lastIndex,
        m = re.exec(typeName),
        tname,
        targs = [];
      if (m) {
        tname = typeName.substring(last, m.index);
        switch (m[0]) {
          case "[":
            if (typeName[m.index + 1] != "[") return null;
            for (;;) {
              re.exec(typeName);
              var t = ss._getType(typeName, global, re);
              if (!t) return null;
              targs.push(t);
              m = re.exec(typeName);
              if (m[0] === "]") break;
              else if (m[0] !== ",") return null;
            }
            m = re.exec(typeName);
            if (m && m[0] === ",") {
              re.exec(typeName);
              if (
                !(asm =
                  ss.__assemblies[
                    (re.lastIndex > 0
                      ? typeName.substring(m.index + 1, re.lastIndex - 1)
                      : typeName.substring(m.index + 1)
                    ).trim()
                  ])
              )
                return null;
            }
            break;
          case "]":
            break;
          case ",":
            re.exec(typeName);
            if (
              !(asm =
                ss.__assemblies[
                  (re.lastIndex > 0
                    ? typeName.substring(m.index + 1, re.lastIndex - 1)
                    : typeName.substring(m.index + 1)
                  ).trim()
                ])
            )
              return null;
            break;
        }
      } else {
        tname = typeName.substring(last);
      }
      if (outer && re.lastIndex) return null;
      var t = ss._getAssemblyType(asm, tname.trim());
      return targs.length ? ss.makeGenericType(t, targs) : t;
    };
    ss.getType = function ss$getType(typeName, asm) {
      return typeName ? ss._getType(typeName, asm || global) : null;
    };
    ss.getDefaultValue = function ss$getDefaultValue(type) {
      if (typeof type.getDefaultValue === "function")
        return type.getDefaultValue();
      else if (type === Boolean) return false;
      else if (type === Date) return new Date(0);
      else if (type === Number) return 0;
      return null;
    };
    ss.createInstance = function ss$createInstance(type) {
      if (typeof type.createInstance === "function")
        return type.createInstance();
      else if (type === Boolean) return false;
      else if (type === Date) return new Date(0);
      else if (type === Number) return 0;
      else if (type === String) return "";
      else return new type();
    };
    var ss_IFormattable = function IFormattable$() {};
    ss_IFormattable.__typeName = "ss.IFormattable";
    ss.IFormattable = ss_IFormattable;
    ss.initInterface(ss_IFormattable, ss, { format: null });
    var ss_IComparable = function IComparable$() {};
    ss_IComparable.__typeName = "ss.IComparable";
    ss.IComparable = ss_IComparable;
    ss.initInterface(ss_IComparable, ss, { compareTo: null });
    var ss_IEquatable = function IEquatable$() {};
    ss_IEquatable.__typeName = "ss.IEquatable";
    ss.IEquatable = ss_IEquatable;
    ss.initInterface(ss_IEquatable, ss, { equalsT: null });
    ss.isNullOrEmptyString = function ss$isNullOrEmptyString(s) {
      return !s || !s.length;
    };
    if (!String.prototype.trim) {
      String.prototype.trim = function String$trim() {
        return ss.trimStartString(ss.trimEndString(this));
      };
    }
    ss.trimEndString = function ss$trimEndString(s, chars) {
      return s.replace(
        chars
          ? new RegExp("[" + String.fromCharCode.apply(null, chars) + "]+$")
          : /\s*$/,
        ""
      );
    };
    ss.trimStartString = function ss$trimStartString(s, chars) {
      return s.replace(
        chars
          ? new RegExp("^[" + String.fromCharCode.apply(null, chars) + "]+")
          : /^\s*/,
        ""
      );
    };
    ss.trimString = function ss$trimString(s, chars) {
      return ss.trimStartString(ss.trimEndString(s, chars), chars);
    };
    ss.arrayClone = function ss$arrayClone(arr) {
      if (arr.length === 1) {
        return [arr[0]];
      } else {
        return Array.apply(null, arr);
      }
    };
    if (!Array.prototype.map) {
      Array.prototype.map = function Array$map(callback, instance) {
        var length = this.length;
        var mapped = new Array(length);
        for (var i = 0; i < length; i++) {
          if (i in this) {
            mapped[i] = callback.call(instance, this[i], i, this);
          }
        }
        return mapped;
      };
    }
    if (!Array.prototype.some) {
      Array.prototype.some = function Array$some(callback, instance) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
          if (i in this && callback.call(instance, this[i], i, this)) {
            return true;
          }
        }
        return false;
      };
    }
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function(callback, thisArg) {
        var T, k;
        if (this == null) {
          throw new TypeError(" this is null or not defined");
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== "function") {
          throw new TypeError(callback + " is not a function");
        }
        if (arguments.length > 1) {
          T = thisArg;
        }
        k = 0;
        while (k < len) {
          var kValue;
          if (k in O) {
            kValue = O[k];
            callback.call(T, kValue, k, O);
          }
          k++;
        }
      };
    }
    if (!Array.prototype.filter) {
      Array.prototype.filter = function(fun) {
        if (this === void 0 || this === null) {
          throw new TypeError();
        }
        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== "function") {
          throw new TypeError();
        }
        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
          if (i in t) {
            var val = t[i];
            if (fun.call(thisArg, val, i, t)) {
              res.push(val);
            }
          }
        }
        return res;
      };
    }
    ss._delegateContains = function ss$_delegateContains(
      targets,
      object,
      method
    ) {
      for (var i = 0; i < targets.length; i += 2) {
        if (targets[i] === object && targets[i + 1] === method) {
          return true;
        }
      }
      return false;
    };
    ss._mkdel = function ss$_mkdel(targets) {
      var delegate = function() {
        if (targets.length == 2) {
          return targets[1].apply(targets[0], arguments);
        } else {
          var clone = ss.arrayClone(targets);
          for (var i = 0; i < clone.length; i += 2) {
            if (ss._delegateContains(targets, clone[i], clone[i + 1])) {
              clone[i + 1].apply(clone[i], arguments);
            }
          }
          return null;
        }
      };
      delegate._targets = targets;
      return delegate;
    };
    ss.mkdel = function ss$mkdel(object, method) {
      if (!object) {
        return method;
      }
      return ss._mkdel([object, method]);
    };
    ss.delegateCombine = function ss$delegateCombine(delegate1, delegate2) {
      if (!delegate1) {
        if (!delegate2._targets) {
          return ss.mkdel(null, delegate2);
        }
        return delegate2;
      }
      if (!delegate2) {
        if (!delegate1._targets) {
          return ss.mkdel(null, delegate1);
        }
        return delegate1;
      }
      var targets1 = delegate1._targets
        ? delegate1._targets
        : [null, delegate1];
      var targets2 = delegate2._targets
        ? delegate2._targets
        : [null, delegate2];
      return ss._mkdel(targets1.concat(targets2));
    };
    ss.delegateRemove = function ss$delegateRemove(delegate1, delegate2) {
      if (!delegate1 || delegate1 === delegate2) {
        return null;
      }
      if (!delegate2) {
        return delegate1;
      }
      var targets = delegate1._targets;
      var object = null;
      var method;
      if (delegate2._targets) {
        object = delegate2._targets[0];
        method = delegate2._targets[1];
      } else {
        method = delegate2;
      }
      for (var i = 0; i < targets.length; i += 2) {
        if (targets[i] === object && targets[i + 1] === method) {
          if (targets.length == 2) {
            return null;
          }
          var t = ss.arrayClone(targets);
          t.splice(i, 2);
          return ss._mkdel(t);
        }
      }
      return delegate1;
    };
    ss.delegateEquals = function ss$delegateEquals(a, b) {
      if (a === b) return true;
      if (!a._targets && !b._targets) return false;
      var ta = a._targets || [null, a],
        tb = b._targets || [null, b];
      if (ta.length != tb.length) return false;
      for (var i = 0; i < ta.length; i++) {
        if (ta[i] !== tb[i]) return false;
      }
      return true;
    };
    var ss_Enum = function Enum$() {};
    ss_Enum.__typeName = "ss.Enum";
    ss.Enum = ss_Enum;
    ss.initClass(ss_Enum, ss, {});
    ss_Enum.getValues = function Enum$getValues(enumType) {
      var parts = [];
      var values = enumType.prototype;
      for (var i in values) {
        if (values.hasOwnProperty(i)) parts.push(values[i]);
      }
      return parts;
    };
    var ss_IEnumerator = function IEnumerator$() {};
    ss_IEnumerator.__typeName = "ss.IEnumerator";
    ss.IEnumerator = ss_IEnumerator;
    ss.initInterface(
      ss_IEnumerator,
      ss,
      { current: null, moveNext: null, reset: null },
      [ss_IDisposable]
    );
    var ss_IEnumerable = function IEnumerable$() {};
    ss_IEnumerable.__typeName = "ss.IEnumerable";
    ss.IEnumerable = ss_IEnumerable;
    ss.initInterface(ss_IEnumerable, ss, { getEnumerator: null });
    ss.getEnumerator = function ss$getEnumerator(obj) {
      return obj.getEnumerator
        ? obj.getEnumerator()
        : new ss_ArrayEnumerator(obj);
    };
    var ss_ICollection = function ICollection$() {};
    ss_ICollection.__typeName = "ss.ICollection";
    ss.ICollection = ss_ICollection;
    ss.initInterface(ss_ICollection, ss, {
      get_count: null,
      add: null,
      clear: null,
      contains: null,
      remove: null
    });
    ss.count = function ss$count(obj) {
      return obj.get_count ? obj.get_count() : obj.length;
    };
    ss.add = function ss$add(obj, item) {
      if (obj.add) obj.add(item);
      else if (ss.isArray(obj)) obj.push(item);
      else throw new ss_NotSupportedException();
    };
    ss.clear = function ss$clear(obj) {
      if (obj.clear) obj.clear();
      else if (ss.isArray(obj)) obj.length = 0;
      else throw new ss_NotSupportedException();
    };
    ss.remove = function ss$remove(obj, item) {
      if (obj.remove) return obj.remove(item);
      else if (ss.isArray(obj)) {
        var index = ss.indexOf(obj, item);
        if (index >= 0) {
          obj.splice(index, 1);
          return true;
        }
        return false;
      } else throw new ss_NotSupportedException();
    };
    ss.contains = function ss$contains(obj, item) {
      if (obj.contains) return obj.contains(item);
      else return ss.indexOf(obj, item) >= 0;
    };
    var ss_IEqualityComparer = function IEqualityComparer$() {};
    ss_IEqualityComparer.__typeName = "ss.IEqualityComparer";
    ss.IEqualityComparer = ss_IEqualityComparer;
    ss.initInterface(ss_IEqualityComparer, ss, {
      areEqual: null,
      getObjectHashCode: null
    });
    var ss_IComparer = function IComparer$() {};
    ss_IComparer.__typeName = "ss.IComparer";
    ss.IComparer = ss_IComparer;
    ss.initInterface(ss_IComparer, ss, { compare: null });
    ss.unbox = function ss$unbox(instance) {
      if (!ss.isValue(instance))
        throw new ss_InvalidOperationException(
          "Nullable object must have a value."
        );
      return instance;
    };
    var ss_Nullable$1 = function Nullable$1$(T) {
      var $type = function() {};
      $type.isInstanceOfType = function(instance) {
        return ss.isInstanceOfType(instance, T);
      };
      ss.registerGenericClassInstance(
        $type,
        ss_Nullable$1,
        [T],
        {},
        function() {
          return null;
        },
        function() {
          return [];
        }
      );
      return $type;
    };
    ss_Nullable$1.__typeName = "ss.Nullable$1";
    ss.Nullable$1 = ss_Nullable$1;
    ss.initGenericClass(ss_Nullable$1, ss, 1);
    ss_Nullable$1.eq = function Nullable$eq(a, b) {
      return !ss.isValue(a) ? !ss.isValue(b) : a === b;
    };
    ss_Nullable$1.ne = function Nullable$eq(a, b) {
      return !ss.isValue(a) ? ss.isValue(b) : a !== b;
    };
    ss_Nullable$1.le = function Nullable$le(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a <= b;
    };
    ss_Nullable$1.ge = function Nullable$ge(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a >= b;
    };
    ss_Nullable$1.lt = function Nullable$lt(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a < b;
    };
    ss_Nullable$1.gt = function Nullable$gt(a, b) {
      return ss.isValue(a) && ss.isValue(b) && a > b;
    };
    ss_Nullable$1.sub = function Nullable$sub(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a - b : null;
    };
    ss_Nullable$1.add = function Nullable$add(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a + b : null;
    };
    ss_Nullable$1.mod = function Nullable$mod(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a % b : null;
    };
    ss_Nullable$1.div = function Nullable$divf(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a / b : null;
    };
    ss_Nullable$1.mul = function Nullable$mul(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a * b : null;
    };
    ss_Nullable$1.band = function Nullable$band(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a & b : null;
    };
    ss_Nullable$1.bor = function Nullable$bor(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a | b : null;
    };
    ss_Nullable$1.xor = function Nullable$xor(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a ^ b : null;
    };
    ss_Nullable$1.shl = function Nullable$shl(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a << b : null;
    };
    ss_Nullable$1.srs = function Nullable$srs(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a >> b : null;
    };
    ss_Nullable$1.sru = function Nullable$sru(a, b) {
      return ss.isValue(a) && ss.isValue(b) ? a >>> b : null;
    };
    ss_Nullable$1.and = function Nullable$and(a, b) {
      if (a === true && b === true) return true;
      else if (a === false || b === false) return false;
      else return null;
    };
    ss_Nullable$1.or = function Nullable$or(a, b) {
      if (a === true || b === true) return true;
      else if (a === false && b === false) return false;
      else return null;
    };
    ss_Nullable$1.not = function Nullable$not(a) {
      return ss.isValue(a) ? !a : null;
    };
    ss_Nullable$1.neg = function Nullable$neg(a) {
      return ss.isValue(a) ? -a : null;
    };
    ss_Nullable$1.pos = function Nullable$pos(a) {
      return ss.isValue(a) ? +a : null;
    };
    ss_Nullable$1.cpl = function Nullable$cpl(a) {
      return ss.isValue(a) ? ~a : null;
    };
    ss_Nullable$1.lift = function Nullable$lift() {
      for (var i = 0; i < arguments.length; i++) {
        if (!ss.isValue(arguments[i])) return null;
      }
      return arguments[0].apply(null, Array.prototype.slice.call(arguments, 1));
    };
    var ss_IList = function IList$() {};
    ss_IList.__typeName = "ss.IList";
    ss.IList = ss_IList;
    ss.initInterface(
      ss_IList,
      ss,
      {
        get_item: null,
        set_item: null,
        indexOf: null,
        insert: null,
        removeAt: null
      },
      [ss_ICollection, ss_IEnumerable]
    );
    ss.getItem = function ss$getItem(obj, index) {
      return obj.get_item ? obj.get_item(index) : obj[index];
    };
    ss.setItem = function ss$setItem(obj, index, value) {
      obj.set_item ? obj.set_item(index, value) : (obj[index] = value);
    };
    ss.indexOf = function ss$indexOf(obj, item) {
      var itemType = typeof item;
      if (
        (!item || typeof item.equals !== "function") &&
        typeof obj.indexOf === "function"
      ) {
        return obj.indexOf(item);
      } else if (ss.isArrayOrTypedArray(obj)) {
        for (var i = 0; i < obj.length; i++) {
          if (ss.staticEquals(obj[i], item)) {
            return i;
          }
        }
        return -1;
      } else return obj.indexOf(item);
    };
    ss.insert = function ss$insert(obj, index, item) {
      if (obj.insert) obj.insert(index, item);
      else if (ss.isArray(obj)) obj.splice(index, 0, item);
      else throw new ss_NotSupportedException();
    };
    ss.removeAt = function ss$removeAt(obj, index) {
      if (obj.removeAt) obj.removeAt(index);
      else if (ss.isArray(obj)) obj.splice(index, 1);
      else throw new ss_NotSupportedException();
    };
    var ss_IDictionary = function IDictionary$() {};
    ss_IDictionary.__typeName = "ss.IDictionary";
    ss.IDictionary = ss_IDictionary;
    ss.initInterface(
      ss_IDictionary,
      ss,
      {
        get_item: null,
        set_item: null,
        get_keys: null,
        get_values: null,
        containsKey: null,
        add: null,
        remove: null,
        tryGetValue: null
      },
      [ss_IEnumerable]
    );
    var ss_Int32 = function Int32$() {};
    ss_Int32.__typeName = "ss.Int32";
    ss.Int32 = ss_Int32;
    ss.initClass(ss_Int32, ss, {}, Object, [
      ss_IEquatable,
      ss_IComparable,
      ss_IFormattable
    ]);
    ss_Int32.__class = false;
    ss_Int32.isInstanceOfType = function Int32$isInstanceOfType(instance) {
      return (
        typeof instance === "number" &&
        isFinite(instance) &&
        Math.round(instance, 0) == instance
      );
    };
    ss_Int32.getDefaultValue = ss_Int32.createInstance = function Int32$getDefaultValue() {
      return 0;
    };
    ss_Int32.div = function Int32$div(a, b) {
      if (!ss.isValue(a) || !ss.isValue(b)) return null;
      if (b === 0) throw new ss_DivideByZeroException();
      return ss_Int32.trunc(a / b);
    };
    ss_Int32.trunc = function Int32$trunc(n) {
      return ss.isValue(n) ? (n > 0 ? Math.floor(n) : Math.ceil(n)) : null;
    };
    ss_Int32.tryParse = function Int32$tryParse(s, result, min, max) {
      result.$ = 0;
      if (!/^[+-]?[0-9]+$/.test(s)) return 0;
      var n = parseInt(s, 10);
      if (n < min || n > max) return false;
      result.$ = n;
      return true;
    };
    var ss_JsDate = function JsDate$() {};
    ss_JsDate.__typeName = "ss.JsDate";
    ss.JsDate = ss_JsDate;
    ss.initClass(ss_JsDate, ss, {}, Object, [ss_IEquatable, ss_IComparable]);
    ss_JsDate.createInstance = function JsDate$createInstance() {
      return new Date();
    };
    ss_JsDate.isInstanceOfType = function JsDate$isInstanceOfType(instance) {
      return instance instanceof Date;
    };
    var ss_ArrayEnumerator = function ArrayEnumerator$(array) {
      this._array = array;
      this._index = -1;
    };
    ss_ArrayEnumerator.__typeName = "ss.ArrayEnumerator";
    ss.ArrayEnumerator = ss_ArrayEnumerator;
    ss.initClass(
      ss_ArrayEnumerator,
      ss,
      {
        moveNext: function ArrayEnumerator$moveNext() {
          this._index++;
          return this._index < this._array.length;
        },
        reset: function ArrayEnumerator$reset() {
          this._index = -1;
        },
        current: function ArrayEnumerator$current() {
          if (this._index < 0 || this._index >= this._array.length)
            throw "Invalid operation";
          return this._array[this._index];
        },
        dispose: function ArrayEnumerator$dispose() {}
      },
      null,
      [ss_IEnumerator, ss_IDisposable]
    );
    var ss_ObjectEnumerator = function ObjectEnumerator$(o) {
      this._keys = Object.keys(o);
      this._index = -1;
      this._object = o;
    };
    ss_ObjectEnumerator.__typeName = "ss.ObjectEnumerator";
    ss.ObjectEnumerator = ss_ObjectEnumerator;
    ss.initClass(
      ss_ObjectEnumerator,
      ss,
      {
        moveNext: function ObjectEnumerator$moveNext() {
          this._index++;
          return this._index < this._keys.length;
        },
        reset: function ObjectEnumerator$reset() {
          this._index = -1;
        },
        current: function ObjectEnumerator$current() {
          if (this._index < 0 || this._index >= this._keys.length)
            throw new ss_InvalidOperationException("Invalid operation");
          var k = this._keys[this._index];
          return { key: k, value: this._object[k] };
        },
        dispose: function ObjectEnumerator$dispose() {}
      },
      null,
      [ss_IEnumerator, ss_IDisposable]
    );
    var ss_EqualityComparer = function EqualityComparer$() {};
    ss_EqualityComparer.__typeName = "ss.EqualityComparer";
    ss.EqualityComparer = ss_EqualityComparer;
    ss.initClass(
      ss_EqualityComparer,
      ss,
      {
        areEqual: function EqualityComparer$areEqual(x, y) {
          return ss.staticEquals(x, y);
        },
        getObjectHashCode: function EqualityComparer$getObjectHashCode(obj) {
          return ss.isValue(obj) ? ss.getHashCode(obj) : 0;
        }
      },
      null,
      [ss_IEqualityComparer]
    );
    ss_EqualityComparer.def = new ss_EqualityComparer();
    var ss_Comparer = function Comparer$(f) {
      this.f = f;
    };
    ss_Comparer.__typeName = "ss.Comparer";
    ss.Comparer = ss_Comparer;
    ss.initClass(
      ss_Comparer,
      ss,
      {
        compare: function Comparer$compare(x, y) {
          return this.f(x, y);
        }
      },
      null,
      [ss_IComparer]
    );
    ss_Comparer.def = new ss_Comparer(function Comparer$defaultCompare(a, b) {
      if (!ss.isValue(a)) return !ss.isValue(b) ? 0 : -1;
      else if (!ss.isValue(b)) return 1;
      else return ss.compare(a, b);
    });
    var ss_IDisposable = function IDisposable$() {};
    ss_IDisposable.__typeName = "ss.IDisposable";
    ss.IDisposable = ss_IDisposable;
    ss.initInterface(ss_IDisposable, ss, { dispose: null });
    var ss_StringBuilder = function StringBuilder$(s) {
      this._parts = ss.isValue(s) && s != "" ? [s] : [];
      this.length = ss.isValue(s) ? s.length : 0;
    };
    ss_StringBuilder.__typeName = "ss.StringBuilder";
    ss.StringBuilder = ss_StringBuilder;
    ss.initClass(ss_StringBuilder, ss, {
      append: function StringBuilder$append(o) {
        if (ss.isValue(o)) {
          var s = o.toString();
          ss.add(this._parts, s);
          this.length += s.length;
        }
        return this;
      },
      appendChar: function StringBuilder$appendChar(c) {
        return this.append(String.fromCharCode(c));
      },
      appendLine: function StringBuilder$appendLine(s) {
        this.append(s);
        this.append("\r\n");
        return this;
      },
      appendLineChar: function StringBuilder$appendLineChar(c) {
        return this.appendLine(String.fromCharCode(c));
      },
      clear: function StringBuilder$clear() {
        this._parts = [];
        this.length = 0;
      },
      toString: function StringBuilder$toString() {
        return this._parts.join("");
      }
    });
    var ss_EventArgs = function EventArgs$() {};
    ss_EventArgs.__typeName = "ss.EventArgs";
    ss.EventArgs = ss_EventArgs;
    ss.initClass(ss_EventArgs, ss, {});
    ss_EventArgs.Empty = new ss_EventArgs();
    var ss_Exception = function Exception$(message, innerException) {
      this._message = message || "An error occurred.";
      this._innerException = innerException || null;
      this._error = new Error();
    };
    ss_Exception.__typeName = "ss.Exception";
    ss.Exception = ss_Exception;
    ss.initClass(ss_Exception, ss, {
      get_message: function Exception$get_message() {
        return this._message;
      },
      get_innerException: function Exception$get_innerException() {
        return this._innerException;
      },
      get_stack: function Exception$get_stack() {
        return this._error.stack;
      },
      toString: function Exception$toString() {
        var message = this._message;
        var exception = this;
        if (ss.isNullOrEmptyString(message)) {
          if (
            ss.isValue(ss.getInstanceType(exception)) &&
            ss.isValue(ss.getTypeFullName(ss.getInstanceType(exception)))
          ) {
            message = ss.getTypeFullName(ss.getInstanceType(exception));
          } else {
            message = "[object Exception]";
          }
        }
        return message;
      }
    });
    ss_Exception.wrap = function Exception$wrap(o) {
      if (ss.isInstanceOfType(o, ss_Exception)) {
        return o;
      } else if (o instanceof TypeError) {
        return new ss_NullReferenceException(
          o.message,
          new ss_JsErrorException(o)
        );
      } else if (o instanceof RangeError) {
        return new ss_ArgumentOutOfRangeException(
          null,
          o.message,
          new ss_JsErrorException(o)
        );
      } else if (o instanceof Error) {
        return new ss_JsErrorException(o);
      } else {
        return new ss_Exception(o.toString());
      }
    };
    var ss_NotImplementedException = function NotImplementedException$(
      message,
      innerException
    ) {
      ss_Exception.call(
        this,
        message || "The method or operation is not implemented.",
        innerException
      );
    };
    ss_NotImplementedException.__typeName = "ss.NotImplementedException";
    ss.NotImplementedException = ss_NotImplementedException;
    ss.initClass(ss_NotImplementedException, ss, {}, ss_Exception);
    var ss_NotSupportedException = function NotSupportedException$(
      message,
      innerException
    ) {
      ss_Exception.call(
        this,
        message || "Specified method is not supported.",
        innerException
      );
    };
    ss_NotSupportedException.__typeName = "ss.NotSupportedException";
    ss.NotSupportedException = ss_NotSupportedException;
    ss.initClass(ss_NotSupportedException, ss, {}, ss_Exception);
    var ss_AggregateException = function AggregateException$(
      message,
      innerExceptions
    ) {
      this.innerExceptions = ss.isValue(innerExceptions)
        ? ss.arrayFromEnumerable(innerExceptions)
        : [];
      ss_Exception.call(
        this,
        message || "One or more errors occurred.",
        this.innerExceptions.length ? this.innerExceptions[0] : null
      );
    };
    ss_AggregateException.__typeName = "ss.AggregateException";
    ss.AggregateException = ss_AggregateException;
    ss.initClass(
      ss_AggregateException,
      ss,
      {
        flatten: function AggregateException$flatten() {
          var inner = [];
          for (var i = 0; i < this.innerExceptions.length; i++) {
            var e = this.innerExceptions[i];
            if (ss.isInstanceOfType(e, ss_AggregateException)) {
              inner.push.apply(inner, e.flatten().innerExceptions);
            } else {
              inner.push(e);
            }
          }
          return new ss_AggregateException(this._message, inner);
        }
      },
      ss_Exception
    );
    var ss_PromiseException = function PromiseException(
      args,
      message,
      innerException
    ) {
      ss_Exception.call(
        this,
        message ||
          (args.length && args[0] ? args[0].toString() : "An error occurred"),
        innerException
      );
      this.arguments = ss.arrayClone(args);
    };
    ss_PromiseException.__typeName = "ss.PromiseException";
    ss.PromiseException = ss_PromiseException;
    ss.initClass(
      ss_PromiseException,
      ss,
      {
        get_arguments: function PromiseException$get_arguments() {
          return this._arguments;
        }
      },
      ss_Exception
    );
    var ss_JsErrorException = function JsErrorException$(
      error,
      message,
      innerException
    ) {
      ss_Exception.call(this, message || error.message, innerException);
      this.error = error;
    };
    ss_JsErrorException.__typeName = "ss.JsErrorException";
    ss.JsErrorException = ss_JsErrorException;
    ss.initClass(
      ss_JsErrorException,
      ss,
      {
        get_stack: function Exception$get_stack() {
          return this.error.stack;
        }
      },
      ss_Exception
    );
    var ss_ArgumentException = function ArgumentException$(
      message,
      paramName,
      innerException
    ) {
      ss_Exception.call(
        this,
        message || "Value does not fall within the expected range.",
        innerException
      );
      this.paramName = paramName || null;
    };
    ss_ArgumentException.__typeName = "ss.ArgumentException";
    ss.ArgumentException = ss_ArgumentException;
    ss.initClass(ss_ArgumentException, ss, {}, ss_Exception);
    var ss_ArgumentNullException = function ArgumentNullException$(
      paramName,
      message,
      innerException
    ) {
      if (!message) {
        message = "Value cannot be null.";
        if (paramName) message += "\nParameter name: " + paramName;
      }
      ss_ArgumentException.call(this, message, paramName, innerException);
    };
    ss_ArgumentNullException.__typeName = "ss.ArgumentNullException";
    ss.ArgumentNullException = ss_ArgumentNullException;
    ss.initClass(ss_ArgumentNullException, ss, {}, ss_ArgumentException);
    var ss_ArgumentOutOfRangeException = function ArgumentOutOfRangeException$(
      paramName,
      message,
      innerException,
      actualValue
    ) {
      if (!message) {
        message = "Value is out of range.";
        if (paramName) message += "\nParameter name: " + paramName;
      }
      ss_ArgumentException.call(this, message, paramName, innerException);
      this.actualValue = actualValue || null;
    };
    ss_ArgumentOutOfRangeException.__typeName =
      "ss.ArgumentOutOfRangeException";
    ss.ArgumentOutOfRangeException = ss_ArgumentOutOfRangeException;
    ss.initClass(ss_ArgumentOutOfRangeException, ss, {}, ss_ArgumentException);
    var ss_FormatException = function FormatException$(
      message,
      innerException
    ) {
      ss_Exception.call(this, message || "Invalid format.", innerException);
    };
    ss_FormatException.__typeName = "ss.FormatException";
    ss.FormatException = ss_FormatException;
    ss.initClass(ss_FormatException, ss, {}, ss_Exception);
    var ss_DivideByZeroException = function DivideByZeroException$(
      message,
      innerException
    ) {
      ss_Exception.call(this, message || "Division by 0.", innerException);
    };
    ss_DivideByZeroException.__typeName = "ss.DivideByZeroException";
    ss.DivideByZeroException = ss_DivideByZeroException;
    ss.initClass(ss_DivideByZeroException, ss, {}, ss_Exception);
    var ss_InvalidCastException = function InvalidCastException$(
      message,
      innerException
    ) {
      ss_Exception.call(
        this,
        message || "The cast is not valid.",
        innerException
      );
    };
    ss_InvalidCastException.__typeName = "ss.InvalidCastException";
    ss.InvalidCastException = ss_InvalidCastException;
    ss.initClass(ss_InvalidCastException, ss, {}, ss_Exception);
    var ss_InvalidOperationException = function InvalidOperationException$(
      message,
      innerException
    ) {
      ss_Exception.call(
        this,
        message ||
          "Operation is not valid due to the current state of the object.",
        innerException
      );
    };
    ss_InvalidOperationException.__typeName = "ss.InvalidOperationException";
    ss.InvalidOperationException = ss_InvalidOperationException;
    ss.initClass(ss_InvalidOperationException, ss, {}, ss_Exception);
    var ss_NullReferenceException = function NullReferenceException$(
      message,
      innerException
    ) {
      ss_Exception.call(this, message || "Object is null.", innerException);
    };
    ss_NullReferenceException.__typeName = "ss.NullReferenceException";
    ss.NullReferenceException = ss_NullReferenceException;
    ss.initClass(ss_NullReferenceException, ss, {}, ss_Exception);
    var ss_KeyNotFoundException = function KeyNotFoundException$(
      message,
      innerException
    ) {
      ss_Exception.call(this, message || "Key not found.", innerException);
    };
    ss_KeyNotFoundException.__typeName = "ss.KeyNotFoundException";
    ss.KeyNotFoundException = ss_KeyNotFoundException;
    ss.initClass(ss_KeyNotFoundException, ss, {}, ss_Exception);
    var ss_AmbiguousMatchException = function AmbiguousMatchException$(
      message,
      innerException
    ) {
      ss_Exception.call(this, message || "Ambiguous match.", innerException);
    };
    ss_AmbiguousMatchException.__typeName = "ss.AmbiguousMatchException";
    ss.AmbiguousMatchException = ss_AmbiguousMatchException;
    ss.initClass(ss_AmbiguousMatchException, ss, {}, ss_Exception);
    var ss_IteratorBlockEnumerable = function IteratorBlockEnumerable$(
      getEnumerator,
      $this
    ) {
      this._getEnumerator = getEnumerator;
      this._this = $this;
    };
    ss_IteratorBlockEnumerable.__typeName = "ss.IteratorBlockEnumerable";
    ss.IteratorBlockEnumerable = ss_IteratorBlockEnumerable;
    ss.initClass(
      ss_IteratorBlockEnumerable,
      ss,
      {
        getEnumerator: function IteratorBlockEnumerable$getEnumerator() {
          return this._getEnumerator.call(this._this);
        }
      },
      null,
      [ss_IEnumerable]
    );
    var ss_IteratorBlockEnumerator = function IteratorBlockEnumerator$(
      moveNext,
      getCurrent,
      dispose,
      $this
    ) {
      this._moveNext = moveNext;
      this._getCurrent = getCurrent;
      this._dispose = dispose;
      this._this = $this;
    };
    ss_IteratorBlockEnumerator.__typeName = "ss.IteratorBlockEnumerator";
    ss.IteratorBlockEnumerator = ss_IteratorBlockEnumerator;
    ss.initClass(
      ss_IteratorBlockEnumerator,
      ss,
      {
        moveNext: function IteratorBlockEnumerator$moveNext() {
          try {
            return this._moveNext.call(this._this);
          } catch (ex) {
            if (this._dispose) this._dispose.call(this._this);
            throw ex;
          }
        },
        current: function IteratorBlockEnumerator$current() {
          return this._getCurrent.call(this._this);
        },
        reset: function IteratorBlockEnumerator$reset() {
          throw new ss_NotSupportedException("Reset is not supported.");
        },
        dispose: function IteratorBlockEnumerator$dispose() {
          if (this._dispose) this._dispose.call(this._this);
        }
      },
      null,
      [ss_IEnumerator, ss_IDisposable]
    );
    var ss_Lazy = function Lazy$(valueFactory) {
      this._valueFactory = valueFactory;
      this.isValueCreated = false;
    };
    ss_Lazy.__typeName = "ss.Lazy";
    ss.Lazy = ss_Lazy;
    ss.initClass(ss_Lazy, ss, {
      value: function Lazy$value() {
        if (!this.isValueCreated) {
          this._value = this._valueFactory();
          delete this._valueFactory;
          this.isValueCreated = true;
        }
        return this._value;
      }
    });
    if (typeof global.HTMLElement === "undefined") {
      global.HTMLElement = Element;
    }
    if (typeof global.MessageEvent === "undefined") {
      global.MessageEvent = Event;
    }
    Date.now =
      Date.now ||
      function() {
        return +new Date();
      };
    global.ss = ss;
  })(global);
  var ss = global.ss;
  var HTMLElement = global.HTMLElement;
  var MessageEvent = global.MessageEvent;
  /*! BEGIN CoreSlim */
  (function() {
    "dont use strict";
    var a = {};
    global.tab = global.tab || {};
    ss.initAssembly(a, "tabcoreslim");
    var b = function() {};
    b.__typeName = "tab.CookieHelper";
    b.getCookie = function() {
      return document.cookie;
    };
    b.setCookie = function(f) {
      document.cookie = f;
    };
    global.tab.CookieHelper = b;
    var c = function() {};
    c.__typeName = "tab.EscapingUtil";
    c.escapeHtml = function(f) {
      var g = ss.coalesce(f, "");
      g = g.replace(new RegExp("&", "g"), "&amp;");
      g = g.replace(new RegExp("<", "g"), "&lt;");
      g = g.replace(new RegExp(">", "g"), "&gt;");
      g = g.replace(new RegExp('"', "g"), "&quot;");
      g = g.replace(new RegExp("'", "g"), "&#39;");
      g = g.replace(new RegExp("/", "g"), "&#47;");
      return g;
    };
    global.tab.EscapingUtil = c;
    var d = function() {};
    d.__typeName = "tab.ScriptEx";
    global.tab.ScriptEx = d;
    var e = function(f) {
      this.$0 = null;
      this.$0 = f;
    };
    e.__typeName = "tab.WindowHelper";
    e.get_windowSelf = function() {
      return window.self;
    };
    e.get_windowParent = function() {
      return window.parent;
    };
    e.get_selection = function() {
      if (typeof window["getSelection"] === "function") {
        return window.getSelection();
      } else if (typeof document["getSelection"] === "function") {
        return document.getSelection();
      }
      return null;
    };
    e.close = function(f) {
      f.close();
    };
    e.getOpener = function(f) {
      return f.opener;
    };
    e.getLocation = function(f) {
      return f.location;
    };
    e.getPathAndSearch = function(f) {
      return f.location.pathname + f.location.search;
    };
    e.setLocationHref = function(f, g) {
      f.location.href = g;
    };
    e.locationReplace = function(f, g) {
      f.location.replace(g);
    };
    e.open = function(f, g, h) {
      return window.open(f, g, h);
    };
    e.reload = function(f, g) {
      f.location.reload(g);
    };
    e.requestAnimationFrame = function(f) {
      return e.$c(f);
    };
    e.cancelAnimationFrame = function(f) {
      if (ss.isValue(f)) {
        e.$b(f);
      }
    };
    e.setTimeout = function(f, g) {
      return window.setTimeout(f, g);
    };
    e.setInterval = function(f, g) {
      return window.setInterval(f, g);
    };
    e.addListener = function(f, g, h) {
      if ("addEventListener" in f) {
        f.addEventListener(g, h, false);
      } else {
        f.attachEvent("on" + g, h);
      }
    };
    e.removeListener = function(f, g, h) {
      if ("removeEventListener" in f) {
        f.removeEventListener(g, h, false);
      } else {
        f.detachEvent("on" + g, h);
      }
    };
    e.$0 = function() {
      var f = 0;
      e.$c = function(g) {
        var h = new Date().getTime();
        var i = Math.max(0, 16 - (h - f));
        f = h + i;
        var j = window.setTimeout(g, i);
        return j;
      };
    };
    e.clearSelection = function() {
      var f = e.get_selection();
      if (ss.isValue(f)) {
        if (typeof f["removeAllRanges"] === "function") {
          f.removeAllRanges();
        } else if (typeof f["empty"] === "function") {
          f["empty"]();
        }
      }
    };
    global.tab.WindowHelper = e;
    ss.initClass(b, a, {});
    ss.initClass(c, a, {});
    ss.initClass(d, a, {});
    ss.initClass(e, a, {
      get_pageXOffset: function() {
        return e.$7(this.$0);
      },
      get_pageYOffset: function() {
        return e.$8(this.$0);
      },
      get_clientWidth: function() {
        return e.$2(this.$0);
      },
      get_clientHeight: function() {
        return e.$1(this.$0);
      },
      get_innerWidth: function() {
        return e.$4(this.$0);
      },
      get_outerWidth: function() {
        return e.$6(this.$0);
      },
      get_innerHeight: function() {
        return e.$3(this.$0);
      },
      get_outerHeight: function() {
        return e.$5(this.$0);
      },
      get_screenLeft: function() {
        return e.$9(this.$0);
      },
      get_screenTop: function() {
        return e.$a(this.$0);
      },
      isQuirksMode: function() {
        return document.compatMode === "BackCompat";
      }
    });
    (function() {
      e.$4 = null;
      e.$3 = null;
      e.$2 = null;
      e.$1 = null;
      e.$7 = null;
      e.$8 = null;
      e.$9 = null;
      e.$a = null;
      e.$6 = null;
      e.$5 = null;
      e.$c = null;
      e.$b = null;
      if ("innerWidth" in window) {
        e.$4 = function(n) {
          return n.innerWidth;
        };
      } else {
        e.$4 = function(n) {
          return n.document.documentElement.offsetWidth;
        };
      }
      if ("outerWidth" in window) {
        e.$6 = function(n) {
          return n.outerWidth;
        };
      } else {
        e.$6 = e.$4;
      }
      if ("innerHeight" in window) {
        e.$3 = function(n) {
          return n.innerHeight;
        };
      } else {
        e.$3 = function(n) {
          return n.document.documentElement.offsetHeight;
        };
      }
      if ("outerHeight" in window) {
        e.$5 = function(n) {
          return n.outerHeight;
        };
      } else {
        e.$5 = e.$3;
      }
      if ("clientWidth" in window) {
        e.$2 = function(n) {
          return n["clientWidth"];
        };
      } else {
        e.$2 = function(n) {
          return n.document.documentElement.clientWidth;
        };
      }
      if ("clientHeight" in window) {
        e.$1 = function(n) {
          return n["clientHeight"];
        };
      } else {
        e.$1 = function(n) {
          return n.document.documentElement.clientHeight;
        };
      }
      if (ss.isValue(window.self.pageXOffset)) {
        e.$7 = function(n) {
          return n.pageXOffset;
        };
      } else {
        e.$7 = function(n) {
          return n.document.documentElement.scrollLeft;
        };
      }
      if (ss.isValue(window.self.pageYOffset)) {
        e.$8 = function(n) {
          return n.pageYOffset;
        };
      } else {
        e.$8 = function(n) {
          return n.document.documentElement.scrollTop;
        };
      }
      if ("screenLeft" in window) {
        e.$9 = function(n) {
          return n.screenLeft;
        };
      } else {
        e.$9 = function(n) {
          return n.screenX;
        };
      }
      if ("screenTop" in window) {
        e.$a = function(n) {
          return n.screenTop;
        };
      } else {
        e.$a = function(n) {
          return n.screenY;
        };
      }
      {
        var f = "requestAnimationFrame";
        var g = "cancelAnimationFrame";
        var h = ["ms", "moz", "webkit", "o"];
        var i = null;
        var j = null;
        if (f in window) {
          i = f;
        }
        if (g in window) {
          j = g;
        }
        for (
          var k = 0;
          k < h.length && (ss.isNullOrUndefined(i) || ss.isNullOrUndefined(j));
          ++k
        ) {
          var l = h[k];
          var m = l + "RequestAnimationFrame";
          if (ss.isNullOrUndefined(i) && m in window) {
            i = m;
          }
          if (ss.isNullOrUndefined(j)) {
            m = l + "CancelAnimationFrame";
            if (m in window) {
              j = m;
            }
            m = l + "CancelRequestAnimationFrame";
            if (m in window) {
              j = m;
            }
          }
        }
        if (ss.isValue(i)) {
          e.$c = function(n) {
            return window[i](n);
          };
        } else {
          e.$0();
        }
        if (ss.isValue(j)) {
          e.$b = function(n) {
            window[j](n);
          };
        } else {
          e.$b = function(n) {
            window.clearTimeout(n);
          };
        }
      }
    })();
  })();
  var tab = global.tab;
  global.tableauSoftware = global.tableauSoftware || {};
  /*! BEGIN ApiShared */
  (function() {
    "dont use strict";
    var a = {};
    global.tab = global.tab || {};
    global.tableauSoftware = global.tableauSoftware || {};
    ss.initAssembly(a, "vqlapishared");
    var b = function() {
      this.$2 = null;
      this.$1$1 = null;
    };
    b.__typeName = "tab.$0";
    var c = function() {};
    c.__typeName = "tab.$1";
    c.$0 = function(e) {
      var bh;
      if (e instanceof tableauSoftware.Promise) {
        bh = e;
      } else {
        if (ss.isValue(e) && typeof e["valueOf"] === "function") {
          e = e["valueOf"]();
        }
        if (c.$1(e)) {
          var bi = new l();
          e.then(ss.mkdel(bi, bi.resolve), ss.mkdel(bi, bi.reject));
          bh = bi.get_promise();
        } else {
          bh = c.$4(e);
        }
      }
      return bh;
    };
    c.$2 = function(e) {
      return c.$0(e).then(function(bh) {
        return c.$3(bh);
      }, null);
    };
    c.$4 = function(bh) {
      var bi = new o(function(bj, bk) {
        try {
          return c.$0(ss.isValue(bj) ? bj(bh) : bh);
        } catch (bl) {
          var e = ss.Exception.wrap(bl);
          return c.$3(e);
        }
      });
      return bi;
    };
    c.$3 = function(bh) {
      var bi = new o(function(bj, bk) {
        try {
          return ss.isValue(bk) ? c.$0(bk(bh)) : c.$3(bh);
        } catch (bl) {
          var e = ss.Exception.wrap(bl);
          return c.$3(e);
        }
      });
      return bi;
    };
    c.$1 = function(e) {
      return ss.isValue(e) && typeof e["then"] === "function";
    };
    var d = function(e, bh, bi, bj) {
      this.$1$1 = null;
      this.$1$2 = null;
      this.$1$3 = null;
      this.$1$4 = null;
      this.set_name(e);
      this.set_commandId(bh);
      this.set_hostId(bi);
      this.set_parameters(bj);
    };
    d.__typeName = "tab._ApiCommand";
    d.generateNextCommandId = function() {
      var e = "cmd" + d.$0;
      d.$0++;
      return e;
    };
    d.parse = function(e) {
      var bh;
      var bi = e.indexOf(String.fromCharCode(44));
      if (bi < 0) {
        bh = e;
        return new d(bh, null, null, null);
      }
      bh = e.substr(0, bi);
      var bj;
      var bk = e.substr(bi + 1);
      bi = bk.indexOf(String.fromCharCode(44));
      if (bi < 0) {
        bj = bk;
        return new d(bh, bj, null, null);
      }
      bj = bk.substr(0, bi);
      var bl;
      var bm = bk.substr(bi + 1);
      bi = bm.indexOf(String.fromCharCode(44));
      if (bi < 0) {
        bl = bm;
        return new d(bh, bj, bl, null);
      }
      bl = bm.substr(0, bi);
      var bn = bm.substr(bi + 1);
      return new d(bh, bj, bl, bn);
    };
    global.tab._ApiCommand = d;
    var f = function() {};
    f.__typeName = "tab._ApiObjectRegistry";
    f.registerApiMessageRouter = function(e) {
      return f.$3(Object).call(null, e);
    };
    f.getApiMessageRouter = function() {
      return f.$2(Object).call(null);
    };
    f.disposeApiMessageRouter = function() {
      f.$0(Object).call(null);
    };
    f.$3 = function(e) {
      return function(bh) {
        var bi = window._ApiObjectRegistryGlobalState.creationRegistry;
        var bj = ss.getTypeFullName(e);
        var bk = bi[bj];
        bi[bj] = bh;
        return bk;
      };
    };
    f.$1 = function(e) {
      return function() {
        var bh = ss.getTypeFullName(e);
        var bi = window._ApiObjectRegistryGlobalState.creationRegistry;
        var bj = bi[bh];
        if (ss.isNullOrUndefined(bj)) {
          throw q.createInternalError(
            "No creation function has been registered for interface type '" +
              bh +
              "'."
          );
        }
        var bk = bj();
        return bk;
      };
    };
    f.$2 = function(e) {
      return function() {
        var bh = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry;
        var bi = ss.getTypeFullName(e);
        var bj = bh[bi];
        if (ss.isNullOrUndefined(bj)) {
          bj = f.$1(e).call(null);
          bh[bi] = bj;
        }
        return bj;
      };
    };
    f.$0 = function(e) {
      return function() {
        var bh = window._ApiObjectRegistryGlobalState.singletonInstanceRegistry;
        var bi = ss.getTypeFullName(e);
        var bj = bh[bi];
        delete bh[bi];
        return bj;
      };
    };
    global.tab._ApiObjectRegistry = f;
    var g = function(e, bh, bi) {
      this.$1 = null;
      this.$2 = null;
      this.$0 = null;
      this.$1 = e;
      this.$2 = bh;
      this.$0 = bi;
    };
    g.__typeName = "tab._ApiServerNotification";
    g.deserialize = function(e) {
      var bh = JSON.parse(e);
      var bi = bh["api.workbookName"];
      var bj = bh["api.worksheetName"];
      var bk = bh["api.commandData"];
      return new g(bi, bj, bk);
    };
    global.tab._ApiServerNotification = g;
    var h = function(e) {
      this.$1 = null;
      this.$0 = null;
      var bh = JSON.parse(e);
      this.$1 = bh["api.commandResult"];
      this.$0 = bh["api.commandData"];
    };
    h.__typeName = "tab._ApiServerResultParser";
    global.tab._ApiServerResultParser = h;
    var i = function() {
      this.$4 = [];
      this.$3 = {};
    };
    i.__typeName = "tab._CollectionImpl";
    global.tab._CollectionImpl = i;
    var j = function(e, bh, bi, bj) {
      this.$1 = null;
      this.$0 = null;
      this.$3 = false;
      this.$2 = 0;
      n.verifyString(e, "Column Field Name");
      this.$1 = e;
      this.$0 = bh;
      this.$3 = ss.coalesce(bi, false);
      this.$2 = bj;
    };
    j.__typeName = "tab._ColumnImpl";
    global.tab._ColumnImpl = j;
    var k = function(e, bh, bi, bj) {
      this.$2 = null;
      this.$3 = null;
      this.$4 = 0;
      this.$0 = null;
      this.$1 = false;
      this.$3 = e;
      this.$4 = bi;
      this.$0 = bj;
      this.$1 = bh;
      this.$2 = bh ? "Summary Data Table" : "Underlying Data Table";
    };
    k.__typeName = "tab._DataTableImpl";
    global.tab._DataTableImpl = k;
    var l = function() {
      this.$3 = null;
      this.$5 = null;
      this.$2 = [];
      this.$4 = null;
      this.$3 = new o(ss.mkdel(this, this.then));
      this.$5 = ss.mkdel(this, this.$0);
      this.$4 = ss.mkdel(this, this.$1);
    };
    l.__typeName = "tab._DeferredImpl";
    global.tab._DeferredImpl = l;
    var m = function() {};
    m.__typeName = "tab._jQueryShim";
    m.isFunction = function(e) {
      return m.type(e) === "function";
    };
    m.isArray = function(e) {
      if (ss.isValue(Array["isArray"])) {
        return Array["isArray"](e);
      }
      return m.type(e) === "array";
    };
    m.type = function(e) {
      return ss.isNullOrUndefined(e)
        ? String(e)
        : m.$8[m.$d.call(e)] || "object";
    };
    m.trim = function(e) {
      if (ss.isValue(m.$e)) {
        return ss.isNullOrUndefined(e) ? "" : m.$e.call(e);
      }
      return ss.isNullOrUndefined(e)
        ? ""
        : e
            .toString()
            .replace(m.$f, "")
            .replace(m.$g, "");
    };
    m.parseJSON = function(e) {
      if (typeof e !== "string" || ss.isNullOrUndefined(e)) {
        return null;
      }
      e = m.trim(e);
      if (ss.isValue(JSON) && ss.isValue(JSON["parse"])) {
        return JSON.parse(e);
      }
      if (
        m.$a.test(
          e
            .replace(m.$b, "@")
            .replace(m.$c, "]")
            .replace(m.$9, "")
        )
      ) {
        return new Function("return " + e)();
      }
      throw new ss.Exception("Invalid JSON: " + e);
    };
    global.tab._jQueryShim = m;
    var n = function() {};
    n.__typeName = "tab._Param";
    n.verifyString = function(e, bh) {
      if (ss.isNullOrUndefined(e) || e.length === 0) {
        throw q.createInternalStringArgumentException(bh);
      }
    };
    n.verifyValue = function(e, bh) {
      if (ss.isNullOrUndefined(e)) {
        throw q.createInternalNullArgumentException(bh);
      }
    };
    global.tab._Param = n;
    var o = function(e) {
      this.then = null;
      this.then = e;
    };
    o.__typeName = "tab._PromiseImpl";
    global.tab._PromiseImpl = o;
    var p = function(e, bh, bi, bj) {
      this.left = 0;
      this.top = 0;
      this.width = 0;
      this.height = 0;
      this.left = e;
      this.top = bh;
      this.width = bi;
      this.height = bj;
    };
    p.__typeName = "tab._Rect";
    global.tab._Rect = p;
    var q = function() {};
    q.__typeName = "tab._TableauException";
    q.create = function(e, bh) {
      var bi = new ss.Exception(bh);
      bi["tableauSoftwareErrorCode"] = e;
      return bi;
    };
    q.createInternalError = function(e) {
      if (ss.isValue(e)) {
        return q.create(
          "internalError",
          "Internal error. Please contact Tableau support with the following information: " +
            e
        );
      } else {
        return q.create(
          "internalError",
          "Internal error. Please contact Tableau support"
        );
      }
    };
    q.createInternalNullArgumentException = function(e) {
      return q.createInternalError("Null/undefined argument '" + e + "'.");
    };
    q.createInternalStringArgumentException = function(e) {
      return q.createInternalError("Invalid string argument '" + e + "'.");
    };
    q.createServerError = function(e) {
      return q.create("serverError", e);
    };
    q.createNotActiveSheet = function() {
      return q.create(
        "notActiveSheet",
        "Operation not allowed on non-active sheet"
      );
    };
    q.createInvalidCustomViewName = function(e) {
      return q.create(
        "invalidCustomViewName",
        "Invalid custom view name: " + e
      );
    };
    q.createInvalidParameter = function(e) {
      return q.create("invalidParameter", "Invalid parameter: " + e);
    };
    q.createInvalidFilterFieldNameOrValue = function(e) {
      return q.create(
        "invalidFilterFieldNameOrValue",
        "Invalid filter field name or value: " + e
      );
    };
    q.createInvalidDateParameter = function(e) {
      return q.create("invalidDateParameter", "Invalid date parameter: " + e);
    };
    q.createNullOrEmptyParameter = function(e) {
      return q.create(
        "nullOrEmptyParameter",
        "Parameter cannot be null or empty: " + e
      );
    };
    q.createMissingMaxSize = function() {
      return q.create(
        "missingMaxSize",
        "Missing maxSize for SheetSizeBehavior.ATMOST"
      );
    };
    q.createMissingMinSize = function() {
      return q.create(
        "missingMinSize",
        "Missing minSize for SheetSizeBehavior.ATLEAST"
      );
    };
    q.createMissingMinMaxSize = function() {
      return q.create(
        "missingMinMaxSize",
        "Missing minSize or maxSize for SheetSizeBehavior.RANGE"
      );
    };
    q.createInvalidRangeSize = function() {
      return q.create(
        "invalidSize",
        "Missing minSize or maxSize for SheetSizeBehavior.RANGE"
      );
    };
    q.createInvalidSizeValue = function() {
      return q.create("invalidSize", "Size value cannot be less than zero");
    };
    q.createInvalidSheetSizeParam = function() {
      return q.create("invalidSize", "Invalid sheet size parameter");
    };
    q.createSizeConflictForExactly = function() {
      return q.create(
        "invalidSize",
        "Conflicting size values for SheetSizeBehavior.EXACTLY"
      );
    };
    q.createInvalidSizeBehaviorOnWorksheet = function() {
      return q.create(
        "invalidSizeBehaviorOnWorksheet",
        "Only SheetSizeBehavior.AUTOMATIC is allowed on Worksheets"
      );
    };
    q.createNoUrlForHiddenWorksheet = function() {
      return q.create(
        "noUrlForHiddenWorksheet",
        "Hidden worksheets do not have a URL."
      );
    };
    q.createInvalidAggregationFieldName = function(e) {
      return q.create(
        "invalidAggregationFieldName",
        "Invalid aggregation type for field '" + e + "'"
      );
    };
    q.createInvalidToolbarButtonName = function(e) {
      return q.create(
        "invalidToolbarButtonName",
        "Invalid toolbar button name: '" + e + "'"
      );
    };
    q.createIndexOutOfRange = function(e) {
      return q.create("indexOutOfRange", "Index '" + e + "' is out of range.");
    };
    q.createUnsupportedEventName = function(e) {
      return q.create("unsupportedEventName", "Unsupported event '" + e + "'.");
    };
    q.createBrowserNotCapable = function() {
      return q.create(
        "browserNotCapable",
        "This browser is incapable of supporting the Tableau JavaScript API."
      );
    };
    global.tab._TableauException = q;
    var r = function() {};
    r.__typeName = "tab._Utility";
    r.isNullOrEmpty = function(e) {
      return ss.isNullOrUndefined(e) || (e["length"] || 0) <= 0;
    };
    r.isString = function(e) {
      return typeof e === "string";
    };
    r.isNumber = function(e) {
      return typeof e === "number";
    };
    r.isDate = function(e) {
      if (typeof e === "object" && ss.isInstanceOfType(e, ss.JsDate)) {
        return true;
      } else if (Object.prototype.toString.call(e) !== "[object Date]") {
        return false;
      }
      return !isNaN(e.getTime());
    };
    r.isDateValid = function(e) {
      return !isNaN(e.getTime());
    };
    r.indexOf = function(e, bh, bi) {
      if (ss.isValue(Array.prototype["indexOf"])) {
        return e["indexOf"](bh, bi);
      }
      bi = bi || 0;
      var bj = e.length;
      if (bj > 0) {
        for (var bk = bi; bk < bj; bk++) {
          if (ss.referenceEquals(e[bk], bh)) {
            return bk;
          }
        }
      }
      return -1;
    };
    r.contains = function(e, bh, bi) {
      var bj = r.indexOf(e, bh, bi);
      return bj >= 0;
    };
    r.getTopmostWindow = function() {
      var e = window.self;
      while (ss.isValue(e.parent) && !ss.referenceEquals(e.parent, e)) {
        e = e.parent;
      }
      return e;
    };
    r.toInt = function(e) {
      if (r.isNumber(e)) {
        return ss.Int32.trunc(e);
      }
      var bh = parseInt(e.toString(), 10);
      if (isNaN(bh)) {
        return 0;
      }
      return bh;
    };
    r.hasClass = function(e, bh) {
      var bi = new RegExp("[\\n\\t\\r]", "g");
      return (
        ss.isValue(e) &&
        (" " + e.className + " ").replace(bi, " ").indexOf(" " + bh + " ") > -1
      );
    };
    r.findParentWithClassName = function(e, bh, bi) {
      var bj = ss.isValue(e) ? e.parentNode : null;
      bi = bi || document.body;
      while (ss.isValue(bj)) {
        if (r.hasClass(bj, bh)) {
          return bj;
        }
        if (ss.referenceEquals(bj, bi)) {
          bj = null;
        } else {
          bj = bj.parentNode;
        }
      }
      return bj;
    };
    r.hasJsonParse = function() {
      return ss.isValue(JSON) && ss.isValue(JSON.parse);
    };
    r.hasWindowPostMessage = function() {
      return ss.isValue(window.postMessage);
    };
    r.isPostMessageSynchronous = function() {
      if (r.isIE()) {
        var e = new RegExp("(msie) ([\\w.]+)");
        var bh = e.exec(window.navigator.userAgent.toLowerCase());
        var bi = bh[2] || "0";
        var bj = parseInt(bi, 10);
        return bj <= 8;
      }
      return false;
    };
    r.hasDocumentAttachEvent = function() {
      return ss.isValue(document.attachEvent);
    };
    r.hasWindowAddEventListener = function() {
      return ss.isValue(window.addEventListener);
    };
    r.isElementOfTag = function(e, bh) {
      return (
        ss.isValue(e) &&
        e.nodeType === 1 &&
        ss.referenceEquals(e.tagName.toLowerCase(), bh.toLowerCase())
      );
    };
    r.elementToString = function(e) {
      var bh = new ss.StringBuilder();
      bh.append(e.tagName.toLowerCase());
      if (!r.isNullOrEmpty(e.id)) {
        bh.append("#").append(e.id);
      }
      if (!r.isNullOrEmpty(e.className)) {
        var bi = e.className.split(" ");
        bh.append(".").append(bi.join("."));
      }
      return bh.toString();
    };
    r.tableauGCS = function(e) {
      if (typeof window["getComputedStyle"] === "function") {
        return window.getComputedStyle(e);
      } else {
        return e["currentStyle"];
      }
    };
    r.isIE = function() {
      return (
        window.navigator.userAgent.indexOf("MSIE") > -1 &&
        ss.isNullOrUndefined(window.opera)
      );
    };
    r.isSafari = function() {
      var e = window.navigator.userAgent;
      var bh = e.indexOf("Chrome") >= 0;
      return e.indexOf("Safari") >= 0 && !bh;
    };
    r.mobileDetect = function() {
      var e = window.navigator.userAgent;
      if (e.indexOf("iPad") !== -1) {
        return true;
      }
      if (e.indexOf("Android") !== -1) {
        return true;
      }
      if (e.indexOf("AppleWebKit") !== -1 && e.indexOf("Mobile") !== -1) {
        return true;
      }
      return false;
    };
    r.visibleContentRectInDocumentCoordinates = function(e) {
      var bh = r.contentRectInDocumentCoordinates(e);
      for (
        var bi = e.parentElement;
        ss.isValue(bi) && ss.isValue(bi.parentElement);
        bi = bi.parentElement
      ) {
        var bj = r.$0(bi).overflow;
        if (bj === "auto" || bj === "scroll" || bj === "hidden") {
          bh = bh.intersect(r.contentRectInDocumentCoordinates(bi));
        }
      }
      var bk = r.contentRectInDocumentCoordinates(document.documentElement);
      var bl = new tab.WindowHelper(window.self);
      if (bl.isQuirksMode()) {
        bk.height = document.body.clientHeight - bk.left;
        bk.width = document.body.clientWidth - bk.top;
      }
      bk.left += bl.get_pageXOffset();
      bk.top += bl.get_pageYOffset();
      return bh.intersect(bk);
    };
    r.contentRectInDocumentCoordinates = function(e) {
      var bh = r.getBoundingClientRect(e);
      var bi = r.$0(e);
      var bj = r.toInt(bi.paddingLeft);
      var bk = r.toInt(bi.paddingTop);
      var bl = r.toInt(bi.borderLeftWidth);
      var bm = r.toInt(bi.borderTopWidth);
      var bn = r.computeContentSize(e);
      var bo = new tab.WindowHelper(window.self);
      var bp = bh.left + bj + bl + bo.get_pageXOffset();
      var bq = bh.top + bk + bm + bo.get_pageYOffset();
      return new p(bp, bq, bn.width, bn.height);
    };
    r.getBoundingClientRect = function(e) {
      var bh = e.getBoundingClientRect();
      var bi = ss.Int32.trunc(bh.top);
      var bj = ss.Int32.trunc(bh.left);
      var bk = ss.Int32.trunc(bh.right);
      var bl = ss.Int32.trunc(bh.bottom);
      return new p(bj, bi, bk - bj, bl - bi);
    };
    r.convertRawValue = function(e, bh) {
      if (ss.isNullOrUndefined(e)) {
        return null;
      }
      switch (bh) {
        case "bool": {
          return e;
        }
        case "date":
        case "number": {
          if (ss.isNullOrUndefined(e)) {
            return Number.NaN;
          }
          return e;
        }
        default:
        case "string": {
          return e;
        }
      }
    };
    r.getDataValue = function(e) {
      if (ss.isNullOrUndefined(e)) {
        return Q.$ctor(null, null, null);
      }
      return Q.$ctor(
        r.convertRawValue(e.value, e.type),
        e.formattedValue,
        e.aliasedValue
      );
    };
    r.serializeDateForServer = function(e) {
      var bh = "";
      if (ss.isValue(e) && r.isDate(e)) {
        var bi = e.getUTCFullYear();
        var bj = e.getUTCMonth() + 1;
        var bk = e.getUTCDate();
        var bl = e.getUTCHours();
        var bm = e.getUTCMinutes();
        var bn = e.getUTCSeconds();
        bh = bi + "-" + bj + "-" + bk + " " + bl + ":" + bm + ":" + bn;
      }
      return bh;
    };
    r.computeContentSize = function(e) {
      var bh = r.$0(e);
      var bi = parseFloat(bh.paddingLeft);
      var bj = parseFloat(bh.paddingTop);
      var bk = parseFloat(bh.paddingRight);
      var bl = parseFloat(bh.paddingBottom);
      var bm = e.clientWidth - Math.round(bi + bk);
      var bn = e.clientHeight - Math.round(bj + bl);
      return bc.$ctor(bm, bn);
    };
    r.$0 = function(e) {
      if (typeof window["getComputedStyle"] === "function") {
        if (ss.isValue(e.ownerDocument.defaultView.opener)) {
          return e.ownerDocument.defaultView.getComputedStyle(e);
        }
        return window.getComputedStyle(e);
      } else if (ss.isValue(e["currentStyle"])) {
        return e["currentStyle"];
      }
      return e.style;
    };
    r.roundVizSizeInPixels = function(e) {
      if (ss.isNullOrUndefined(e) || !(e.indexOf("px") !== -1)) {
        return e;
      }
      var bh = parseFloat(e.split("px")[0]);
      return Math.round(bh) + "px";
    };
    r.noResultPromiseHelper = function(e, bh, bi) {
      var bj = new tab._Deferred();
      var bk = new (ss.makeGenericType(N, [Object]))(
        e,
        1,
        function(bl) {
          bj.resolve();
        },
        function(bl, bm) {
          bj.reject(q.createServerError(bm));
        }
      );
      bi.sendCommand(Object).call(bi, bh, bk);
      return bj.get_promise();
    };
    r.clone = function(e) {
      return function(bh) {
        return JSON.parse(JSON.stringify(bh));
      };
    };
    global.tab._Utility = r;
    var s = function() {};
    s.__typeName = "tab.ApiDashboardObjectType";
    global.tab.ApiDashboardObjectType = s;
    var t = function() {};
    t.__typeName = "tab.ApiDateRangeType";
    global.tab.ApiDateRangeType = t;
    var u = function() {};
    u.__typeName = "tab.ApiDeviceType";
    global.tab.ApiDeviceType = u;
    var v = function() {};
    v.__typeName = "tab.ApiEnumConverter";
    v.convertDashboardObjectType = function(e) {
      switch (e) {
        case "blank": {
          return "blank";
        }
        case "image": {
          return "image";
        }
        case "legend": {
          return "legend";
        }
        case "pageFilter": {
          return "pageFilter";
        }
        case "parameterControl": {
          return "parameterControl";
        }
        case "quickFilter": {
          return "quickFilter";
        }
        case "text": {
          return "text";
        }
        case "title": {
          return "title";
        }
        case "webPage": {
          return "webPage";
        }
        case "worksheet": {
          return "worksheet";
        }
        default: {
          throw q.createInternalError(
            "Unknown ApiCrossDomainDashboardObjectType: " + e
          );
        }
      }
    };
    v.convertDateRange = function(e) {
      switch (e) {
        case "curr": {
          return "curr";
        }
        case "last": {
          return "last";
        }
        case "lastn": {
          return "lastn";
        }
        case "next": {
          return "next";
        }
        case "nextn": {
          return "nextn";
        }
        case "todate": {
          return "todate";
        }
        default: {
          throw q.createInternalError(
            "Unknown ApiCrossDomainDateRangeType: " + e
          );
        }
      }
    };
    v.convertFieldAggregation = function(e) {
      switch (e) {
        case "ATTR": {
          return "ATTR";
        }
        case "AVG": {
          return "AVG";
        }
        case "COUNT": {
          return "COUNT";
        }
        case "COUNTD": {
          return "COUNTD";
        }
        case "DAY": {
          return "DAY";
        }
        case "END": {
          return "END";
        }
        case "HOUR": {
          return "HOUR";
        }
        case "INOUT": {
          return "INOUT";
        }
        case "KURTOSIS": {
          return "KURTOSIS";
        }
        case "MAX": {
          return "MAX";
        }
        case "MDY": {
          return "MDY";
        }
        case "MEDIAN": {
          return "MEDIAN";
        }
        case "MIN": {
          return "MIN";
        }
        case "MINUTE": {
          return "MINUTE";
        }
        case "MONTH": {
          return "MONTH";
        }
        case "MONTHYEAR": {
          return "MONTHYEAR";
        }
        case "NONE": {
          return "NONE";
        }
        case "PERCENTILE": {
          return "PERCENTILE";
        }
        case "QUART1": {
          return "QUART1";
        }
        case "QUART3": {
          return "QUART3";
        }
        case "QTR": {
          return "QTR";
        }
        case "SECOND": {
          return "SECOND";
        }
        case "SKEWNESS": {
          return "SKEWNESS";
        }
        case "STDEV": {
          return "STDEV";
        }
        case "STDEVP": {
          return "STDEVP";
        }
        case "SUM": {
          return "SUM";
        }
        case "SUM_XSQR": {
          return "SUM_XSQR";
        }
        case "TRUNC_DAY": {
          return "TRUNC_DAY";
        }
        case "TRUNC_HOUR": {
          return "TRUNC_HOUR";
        }
        case "TRUNC_MINUTE": {
          return "TRUNC_MINUTE";
        }
        case "TRUNC_MONTH": {
          return "TRUNC_MONTH";
        }
        case "TRUNC_QTR": {
          return "TRUNC_QTR";
        }
        case "TRUNC_SECOND": {
          return "TRUNC_SECOND";
        }
        case "TRUNC_WEEK": {
          return "TRUNC_WEEK";
        }
        case "TRUNC_YEAR": {
          return "TRUNC_YEAR";
        }
        case "USER": {
          return "USER";
        }
        case "VAR": {
          return "VAR";
        }
        case "VARP": {
          return "VARP";
        }
        case "WEEK": {
          return "WEEK";
        }
        case "WEEKDAY": {
          return "WEEKDAY";
        }
        case "YEAR": {
          return "YEAR";
        }
        default: {
          throw q.createInternalError(
            "Unknown ApiCrossDomainFieldAggregationType: " + e
          );
        }
      }
    };
    v.convertFieldRole = function(e) {
      switch (e) {
        case "dimension": {
          return "dimension";
        }
        case "measure": {
          return "measure";
        }
        case "unknown": {
          return "unknown";
        }
        default: {
          throw q.createInternalError(
            "Unknown ApiCrossDomainFieldRoleType: " + e
          );
        }
      }
    };
    v.convertFilterType = function(e) {
      switch (e) {
        case "categorical": {
          return "categorical";
        }
        case "hierarchical": {
          return "hierarchical";
        }
        case "quantitative": {
          return "quantitative";
        }
        case "relativedate": {
          return "relativedate";
        }
        default: {
          throw q.createInternalError("Unknown ApiCrossDomainFilterType: " + e);
        }
      }
    };
    v.convertParameterAllowableValuesType = function(e) {
      switch (e) {
        case "all": {
          return "all";
        }
        case "list": {
          return "list";
        }
        case "range": {
          return "range";
        }
        default: {
          throw q.createInternalError(
            "Unknown ApiCrossDomainParameterAllowableValuesType: " + e
          );
        }
      }
    };
    v.convertParameterDataType = function(e) {
      switch (e) {
        case "boolean": {
          return "boolean";
        }
        case "date": {
          return "date";
        }
        case "datetime": {
          return "datetime";
        }
        case "float": {
          return "float";
        }
        case "integer": {
          return "integer";
        }
        case "string": {
          return "string";
        }
        default: {
          throw q.createInternalError(
            "Unknown ApiCrossDomainParameterDataType: " + e
          );
        }
      }
    };
    v.convertPeriodType = function(e) {
      switch (e) {
        case "year": {
          return "year";
        }
        case "quarter": {
          return "quarter";
        }
        case "month": {
          return "month";
        }
        case "week": {
          return "week";
        }
        case "day": {
          return "day";
        }
        case "hour": {
          return "hour";
        }
        case "minute": {
          return "minute";
        }
        case "second": {
          return "second";
        }
        default: {
          throw q.createInternalError("Unknown ApiCrossDomainPeriodType: " + e);
        }
      }
    };
    v.convertSheetType = function(e) {
      switch (e) {
        case "worksheet": {
          return "worksheet";
        }
        case "dashboard": {
          return "dashboard";
        }
        case "story": {
          return "story";
        }
        default: {
          throw q.createInternalError("Unknown ApiCrossDomainSheetType: " + e);
        }
      }
    };
    v.convertDataType = function(e) {
      switch (e) {
        case "boolean": {
          return "boolean";
        }
        case "date": {
          return "date";
        }
        case "datetime": {
          return "datetime";
        }
        case "float": {
          return "float";
        }
        case "integer": {
          return "integer";
        }
        case "string": {
          return "string";
        }
        default: {
          throw q.createInternalError(
            "Unknown ApiCrossDomainParameterDataType: " + e
          );
        }
      }
    };
    global.tab.ApiEnumConverter = v;
    var w = function() {};
    w.__typeName = "tab.ApiErrorCode";
    global.tab.ApiErrorCode = w;
    var x = function() {};
    x.__typeName = "tab.ApiFieldAggregationType";
    global.tab.ApiFieldAggregationType = x;
    var y = function() {};
    y.__typeName = "tab.ApiFieldRoleType";
    global.tab.ApiFieldRoleType = y;
    var z = function() {};
    z.__typeName = "tab.ApiFilterType";
    global.tab.ApiFilterType = z;
    var A = function() {};
    A.__typeName = "tab.ApiFilterUpdateType";
    global.tab.ApiFilterUpdateType = A;
    var B = function() {};
    B.__typeName = "tab.ApiMessageHandler";
    global.tab.ApiMessageHandler = B;
    var C = function(e, bh) {
      this.$1 = null;
      this.$0 = null;
      n.verifyValue(e, "router");
      this.$1 = e;
      this.$0 = bh;
    };
    C.__typeName = "tab.ApiMessagingOptions";
    global.tab.ApiMessagingOptions = C;
    var D = function() {};
    D.__typeName = "tab.ApiNullOption";
    global.tab.ApiNullOption = D;
    var E = function() {};
    E.__typeName = "tab.ApiParameterAllowableValuesType";
    global.tab.ApiParameterAllowableValuesType = E;
    var F = function() {};
    F.__typeName = "tab.ApiParameterDataType";
    global.tab.ApiParameterDataType = F;
    var G = function() {};
    G.__typeName = "tab.ApiPeriodType";
    global.tab.ApiPeriodType = G;
    var H = function() {};
    H.__typeName = "tab.ApiSelectionUpdateType";
    global.tab.ApiSelectionUpdateType = H;
    var I = function() {};
    I.__typeName = "tab.ApiSheetSizeBehavior";
    global.tab.ApiSheetSizeBehavior = I;
    var J = function() {};
    J.__typeName = "tab.ApiSheetType";
    global.tab.ApiSheetType = J;
    var K = function() {};
    K.__typeName = "tab.ApiTableauEventName";
    global.tab.ApiTableauEventName = K;
    var L = function() {};
    L.__typeName = "tab.ApiToolbarButtonName";
    global.tab.ApiToolbarButtonName = L;
    var M = function() {};
    M.__typeName = "tab.ApiToolbarPosition";
    global.tab.ApiToolbarPosition = M;
    var N = function(e) {
      var bh = function(bi, bj, bk, bl) {
        this.$0 = null;
        this.$3 = 0;
        this.$2 = null;
        this.$1 = null;
        this.$0 = bi;
        this.$2 = bk;
        this.$3 = bj;
        this.$1 = bl;
      };
      ss.registerGenericClassInstance(
        bh,
        N,
        [e],
        {
          get_commandName: function() {
            return this.$0;
          },
          get_successCallback: function() {
            return this.$2;
          },
          get_successCallbackTiming: function() {
            return this.$3;
          },
          get_errorCallback: function() {
            return this.$1;
          }
        },
        function() {
          return null;
        },
        function() {
          return [];
        }
      );
      return bh;
    };
    N.__typeName = "tab.CommandReturnHandler$1";
    ss.initGenericClass(N, a, 1);
    global.tab.CommandReturnHandler$1 = N;
    var O = function(e) {
      this.$8 = 0;
      this.$6 = {};
      this.$4 = {};
      this.$5 = {};
      this.$7 = null;
      this.$7 = e;
      if (r.hasWindowAddEventListener()) {
        window.addEventListener("message", ss.mkdel(this, this.$1), false);
      } else if (r.hasDocumentAttachEvent()) {
        var bh = ss.mkdel(this, this.$1);
        document.attachEvent("onmessage", bh);
        window.attachEvent("onmessage", bh);
      } else {
        window.onmessage = ss.mkdel(this, this.$1);
      }
      this.$8 = 0;
    };
    O.__typeName = "tab.CrossDomainMessager";
    global.tab.CrossDomainMessager = O;
    var P = function() {};
    P.__typeName = "tab.DataType";
    global.tab.DataType = P;
    var Q = function() {};
    Q.__typeName = "tab.DataValue";
    Q.$ctor = function(e, bh, bi) {
      var bj = new Object();
      bj.value = null;
      bj.formattedValue = null;
      bj.value = e;
      if (r.isNullOrEmpty(bi)) {
        bj.formattedValue = bh;
      } else {
        bj.formattedValue = bi;
      }
      return bj;
    };
    Q.isInstanceOfType = function() {
      return true;
    };
    global.tab.DataValue = Q;
    var R = function() {};
    R.__typeName = "tab.FilterCommandsBuilder";
    global.tab.FilterCommandsBuilder = R;
    var S = function() {};
    S.__typeName = "tab.GetDataCommandsBuilder";
    global.tab.GetDataCommandsBuilder = S;
    var T = function() {
      this.$2$1 = null;
      B.call(this);
    };
    T.__typeName = "tab.HostedApiMessageHandler";
    global.tab.HostedApiMessageHandler = T;
    var U = function() {
      this.$0 = null;
      this.$0 = new O(null);
    };
    U.__typeName = "tab.HostedApiMessageRouter";
    global.tab.HostedApiMessageRouter = U;
    var V = function(e) {
      this.$2 = null;
      this.$3 = new tab._Collection();
      this.$4 = 0;
      if (m.isArray(e)) {
        var bh = e;
        for (var bi = 0; bi < bh.length; bi++) {
          var bj = bh[bi];
          if (!ss.isValue(bj.fieldName)) {
            throw q.createInvalidParameter("pair.fieldName");
          }
          if (!ss.isValue(bj.value)) {
            throw q.createInvalidParameter("pair.value");
          }
          var bk = new bg(bj.fieldName, bj.value);
          this.$3._add(bk.fieldName, bk);
        }
      } else {
        this.$4 = e;
      }
    };
    V.__typeName = "tab.MarkImpl";
    V.processActiveMarks = function(e) {
      var bh = new tab._Collection();
      if (ss.isNullOrUndefined(e) || r.isNullOrEmpty(e.marks)) {
        return bh;
      }
      for (var bi = 0; bi < e.marks.length; bi++) {
        var bj = e.marks[bi];
        var bk = bj.tupleId;
        var bl = new bf(bk);
        bh._add(bk.toString(), bl);
        for (var bm = 0; bm < bj.pairs.length; bm++) {
          var bn = bj.pairs[bm];
          var bo = r.convertRawValue(bn.value, bn.valueDataType);
          var bp = new bg(bn.fieldName, bo);
          bp.formattedValue = bn.formattedValue;
          if (!bl.impl.get_pairs()._has(bp.fieldName)) {
            bl.impl.$0(bp);
          }
        }
      }
      return bh;
    };
    global.tab.MarkImpl = V;
    var W = function(e, bh) {
      this.$0 = null;
      this.$1$1 = null;
      this.set_name(e);
      this.$0 = bh;
    };
    W.__typeName = "tab.NonApiCommand";
    W.parse = function(e) {
      var bh = e.split(String.fromCharCode(44));
      var bi = bh[0];
      var bj = bh.slice(1);
      return new W(bi, bj);
    };
    global.tab.NonApiCommand = W;
    var X = function() {};
    X.__typeName = "tab.Point";
    X.$ctor = function(e, bh) {
      var bi = new Object();
      bi.x = 0;
      bi.y = 0;
      bi.x = e;
      bi.y = bh;
      return bi;
    };
    X.isInstanceOfType = function() {
      return true;
    };
    global.tab.Point = X;
    var Y = function() {};
    Y.__typeName = "tab.PublicEnums";
    Y.tryNormalizeEnum = function(e) {
      return function(bh, bi) {
        if (ss.isValue(bh)) {
          var bj = bh.toString().toUpperCase();
          var bk = ss.Enum.getValues(e);
          for (var bl = 0; bl < bk.length; bl++) {
            var bm = bk[bl];
            var bn = bm.toUpperCase();
            if (ss.referenceEquals(bj, bn)) {
              bi.$ = bm;
              return true;
            }
          }
        }
        bi.$ = ss.getDefaultValue(e);
        return false;
      };
    };
    Y.normalizeEnum = function(e) {
      return function(bh, bi) {
        var bj = {};
        if (!Y.tryNormalizeEnum(e).call(null, bh, bj)) {
          throw q.createInvalidParameter(bi);
        }
        return bj.$;
      };
    };
    Y.isValidEnum = function(e) {
      return function(bh) {
        var bi = {};
        var bj = Y.tryNormalizeEnum(e).call(null, bh, bi);
        return bj;
      };
    };
    global.tab.PublicEnums = Y;
    var Z = function() {};
    Z.__typeName = "tab.SharedUtils";
    global.tab.SharedUtils = Z;
    var ba = function() {};
    ba.__typeName = "tab.SheetSize";
    ba.$ctor = function(e, bh, bi) {
      var bj = new Object();
      bj.behavior = null;
      bj.minSize = null;
      bj.maxSize = null;
      bj.behavior = ss.coalesce(e, "automatic");
      if (ss.isValue(bh)) {
        bj.minSize = bh;
      } else {
        delete bj["minSize"];
      }
      if (ss.isValue(bi)) {
        bj.maxSize = bi;
      } else {
        delete bj["maxSize"];
      }
      return bj;
    };
    ba.isInstanceOfType = function() {
      return true;
    };
    global.tab.SheetSize = ba;
    var bb = function() {};
    bb.__typeName = "tab.SheetSizeFactory";
    bb.createAutomatic = function() {
      var e = ba.$ctor("automatic", null, null);
      return e;
    };
    bb.fromSizeConstraints = function(e) {
      var bh = e.minHeight;
      var bi = e.minWidth;
      var bj = e.maxHeight;
      var bk = e.maxWidth;
      var bl = "automatic";
      var bm = null;
      var bn = null;
      if (bh === 0 && bi === 0) {
        if (bj === 0 && bk === 0) {
        } else {
          bl = "atmost";
          bn = bc.$ctor(bk, bj);
        }
      } else if (bj === 0 && bk === 0) {
        bl = "atleast";
        bm = bc.$ctor(bi, bh);
      } else if (bj === bh && bk === bi && bi > 0) {
        bl = "exactly";
        bm = bc.$ctor(bi, bh);
        bn = bc.$ctor(bi, bh);
      } else {
        bl = "range";
        if (bi === 0 && bk === 0) {
          bk = 2147483647;
        }
        bm = bc.$ctor(bi, bh);
        bn = bc.$ctor(bk, bj);
      }
      return ba.$ctor(bl, bm, bn);
    };
    global.tab.SheetSizeFactory = bb;
    var bc = function() {};
    bc.__typeName = "tab.Size";
    bc.$ctor = function(e, bh) {
      var bi = new Object();
      bi.width = 0;
      bi.height = 0;
      bi.width = e;
      bi.height = bh;
      return bi;
    };
    bc.isInstanceOfType = function() {
      return true;
    };
    global.tab.Size = bc;
    var bd = function(e) {
      this.$0 = null;
      this.$0 = e;
    };
    bd.__typeName = "tableauSoftware.Column";
    global.tableauSoftware.Column = bd;
    var be = function(e) {
      this.$0 = null;
      this.$0 = e;
    };
    be.__typeName = "tableauSoftware.DataTable";
    global.tableauSoftware.DataTable = be;
    var bf = function(e) {
      this.impl = null;
      this.impl = new V(e);
    };
    bf.__typeName = "tableauSoftware.Mark";
    global.tableauSoftware.Mark = bf;
    var bg = function(e, bh) {
      this.fieldName = null;
      this.value = null;
      this.formattedValue = null;
      this.fieldName = e;
      this.value = bh;
      this.formattedValue = ss.isValue(bh) ? bh.toString() : "";
    };
    bg.__typeName = "tableauSoftware.Pair";
    global.tableauSoftware.Pair = bg;
    ss.initClass(b, a, {
      add_stateReadyForQuery: function(e) {
        this.$1$1 = ss.delegateCombine(this.$1$1, e);
      },
      remove_stateReadyForQuery: function(e) {
        this.$1$1 = ss.delegateRemove(this.$1$1, e);
      },
      get_iframe: function() {
        return null;
      },
      get_hostId: function() {
        return this.$2;
      },
      set_hostId: function(e) {
        this.$2 = e;
      },
      $1: function() {
        return "*";
      },
      handleEventNotification: function(e, bh) {},
      $0: function() {
        this.$1$1(null);
      }
    });
    ss.initClass(c, a, {});
    ss.initClass(d, a, {
      get_name: function() {
        return this.$1$1;
      },
      set_name: function(e) {
        this.$1$1 = e;
      },
      get_hostId: function() {
        return this.$1$2;
      },
      set_hostId: function(e) {
        this.$1$2 = e;
      },
      get_commandId: function() {
        return this.$1$3;
      },
      set_commandId: function(e) {
        this.$1$3 = e;
      },
      get_parameters: function() {
        return this.$1$4;
      },
      set_parameters: function(e) {
        this.$1$4 = e;
      },
      get_isApiCommandName: function() {
        return this.get_rawName().indexOf("api.", 0) === 0;
      },
      get_rawName: function() {
        return this.get_name().toString();
      },
      serialize: function() {
        var e = [];
        e.push(this.get_name());
        e.push(this.get_commandId());
        e.push(this.get_hostId());
        if (ss.isValue(this.get_parameters())) {
          e.push(this.get_parameters());
        }
        var bh = e.join(",");
        return bh;
      }
    });
    ss.initClass(f, a, {});
    ss.initClass(g, a, {
      get_workbookName: function() {
        return this.$1;
      },
      get_worksheetName: function() {
        return this.$2;
      },
      get_data: function() {
        return this.$0;
      },
      serialize: function() {
        var e = {};
        e["api.workbookName"] = this.$1;
        e["api.worksheetName"] = this.$2;
        e["api.commandData"] = this.$0;
        return JSON.stringify(e);
      }
    });
    ss.initClass(h, a, {
      get_result: function() {
        return this.$1;
      },
      get_data: function() {
        return this.$0;
      }
    });
    ss.initClass(i, a, {
      get__length: function() {
        return this.$4.length;
      },
      get__rawArray: function() {
        return this.$4;
      },
      get_item: function(e) {
        return this.$4[e];
      },
      _get: function(e) {
        var bh = this.$0(e);
        if (ss.isValue(this.$3[bh])) {
          return this.$3[bh];
        }
        return undefined;
      },
      _has: function(e) {
        return ss.isValue(this._get(e));
      },
      _add: function(e, bh) {
        this.$1(e, bh);
        var bi = this.$0(e);
        this.$4.push(bh);
        this.$3[bi] = bh;
      },
      _addToFirst: function(e, bh) {
        this.$1(e, bh);
        var bi = this.$0(e);
        this.$4.unshift(bh);
        this.$3[bi] = bh;
      },
      _remove: function(e) {
        var bh = this.$0(e);
        if (ss.isValue(this.$3[bh])) {
          var bi = this.$3[bh];
          delete this.$3[bh];
          for (var bj = 0; bj < this.$4.length; bj++) {
            if (ss.referenceEquals(this.$4[bj], bi)) {
              this.$4.splice(bj, 1);
              break;
            }
          }
        }
      },
      _toApiCollection: function() {
        var e = this.$4.concat();
        e.get = ss.mkdel(this, function(bh) {
          return this._get(bh);
        });
        e.has = ss.mkdel(this, function(bh) {
          return this._has(bh);
        });
        return e;
      },
      $2: function(e) {
        if (r.isNullOrEmpty(e)) {
          throw new ss.Exception("Null key");
        }
        if (this._has(e)) {
          throw new ss.Exception("Duplicate key '" + e + "'");
        }
      },
      $1: function(e, bh) {
        this.$2(e);
        if (ss.isNullOrUndefined(bh)) {
          throw new ss.Exception("Null item");
        }
      },
      $0: function(e) {
        return "_" + e;
      }
    });
    ss.initClass(j, a, {
      get_fieldName: function() {
        return this.$1;
      },
      get_dataType: function() {
        return this.$0;
      },
      get_isReferenced: function() {
        return this.$3;
      },
      get_index: function() {
        return this.$2;
      }
    });
    ss.initClass(k, a, {
      get_name: function() {
        return this.$2;
      },
      get_rows: function() {
        return this.$3;
      },
      get_columns: function() {
        return this.$0;
      },
      get_totalRowCount: function() {
        return this.$4;
      },
      get_isSummaryData: function() {
        return this.$1;
      }
    });
    ss.initClass(l, a, {
      get_promise: function() {
        return this.$3;
      },
      all: function(e) {
        var bh = new l();
        var bi = e.length;
        var bj = bi;
        var bk = [];
        if (bi === 0) {
          bh.resolve(bk);
          return bh.get_promise();
        }
        var bl = function(bn, bo) {
          var bp = c.$0(bn);
          bp.then(
            function(bq) {
              bk[bo] = bq;
              bj--;
              if (bj === 0) {
                bh.resolve(bk);
              }
              return null;
            },
            function(bq) {
              bh.reject(bq);
              return null;
            }
          );
        };
        for (var bm = 0; bm < bi; bm++) {
          bl(e[bm], bm);
        }
        return bh.get_promise();
      },
      then: function(e, bh) {
        return this.$5(e, bh);
      },
      resolve: function(e) {
        return this.$4(e);
      },
      reject: function(e) {
        return this.$4(c.$3(e));
      },
      $0: function(e, bh) {
        var bi = new l();
        this.$2.push(function(bj) {
          bj
            .then(e, bh)
            .then(ss.mkdel(bi, bi.resolve), ss.mkdel(bi, bi.reject));
        });
        return bi.get_promise();
      },
      $1: function(e) {
        var bh = c.$0(e);
        this.$5 = bh.then;
        this.$4 = c.$0;
        for (var bi = 0; bi < this.$2.length; bi++) {
          var bj = this.$2[bi];
          bj(bh);
        }
        this.$2 = null;
        return bh;
      }
    });
    ss.initClass(m, a, {});
    ss.initClass(n, a, {});
    ss.initClass(o, a, {
      always: function(e) {
        return this.then(e, e);
      },
      otherwise: function(e) {
        return this.then(null, e);
      }
    });
    ss.initClass(p, a, {
      intersect: function(e) {
        var bh = Math.max(this.left, e.left);
        var bi = Math.max(this.top, e.top);
        var bj = Math.min(this.left + this.width, e.left + e.width);
        var bk = Math.min(this.top + this.height, e.top + e.height);
        if (bj <= bh || bk <= bi) {
          return new p(0, 0, 0, 0);
        }
        return new p(bh, bi, bj - bh, bk - bi);
      }
    });
    ss.initClass(q, a, {});
    ss.initClass(r, a, {});
    ss.initEnum(
      s,
      a,
      {
        blank: "blank",
        worksheet: "worksheet",
        quickFilter: "quickFilter",
        parameterControl: "parameterControl",
        pageFilter: "pageFilter",
        legend: "legend",
        title: "title",
        text: "text",
        image: "image",
        webPage: "webPage",
        addIn: "addIn"
      },
      true
    );
    ss.initEnum(
      t,
      a,
      {
        last: "last",
        lastn: "lastn",
        next: "next",
        nextn: "nextn",
        curr: "curr",
        todate: "todate"
      },
      true
    );
    ss.initEnum(
      u,
      a,
      {
        default: "default",
        desktop: "desktop",
        tablet: "tablet",
        phone: "phone"
      },
      true
    );
    ss.initClass(v, a, {});
    ss.initEnum(
      w,
      a,
      {
        internalError: "internalError",
        serverError: "serverError",
        invalidAggregationFieldName: "invalidAggregationFieldName",
        invalidToolbarButtonName: "invalidToolbarButtonName",
        invalidParameter: "invalidParameter",
        invalidUrl: "invalidUrl",
        staleDataReference: "staleDataReference",
        vizAlreadyInManager: "vizAlreadyInManager",
        noUrlOrParentElementNotFound: "noUrlOrParentElementNotFound",
        invalidFilterFieldName: "invalidFilterFieldName",
        invalidFilterFieldValue: "invalidFilterFieldValue",
        invalidFilterFieldNameOrValue: "invalidFilterFieldNameOrValue",
        filterCannotBePerformed: "filterCannotBePerformed",
        notActiveSheet: "notActiveSheet",
        invalidCustomViewName: "invalidCustomViewName",
        missingRangeNForRelativeDateFilters:
          "missingRangeNForRelativeDateFilters",
        missingMaxSize: "missingMaxSize",
        missingMinSize: "missingMinSize",
        missingMinMaxSize: "missingMinMaxSize",
        invalidSize: "invalidSize",
        invalidSizeBehaviorOnWorksheet: "invalidSizeBehaviorOnWorksheet",
        sheetNotInWorkbook: "sheetNotInWorkbook",
        indexOutOfRange: "indexOutOfRange",
        downloadWorkbookNotAllowed: "downloadWorkbookNotAllowed",
        nullOrEmptyParameter: "nullOrEmptyParameter",
        browserNotCapable: "browserNotCapable",
        unsupportedEventName: "unsupportedEventName",
        invalidDateParameter: "invalidDateParameter",
        invalidSelectionFieldName: "invalidSelectionFieldName",
        invalidSelectionValue: "invalidSelectionValue",
        invalidSelectionDate: "invalidSelectionDate",
        noUrlForHiddenWorksheet: "noUrlForHiddenWorksheet",
        maxVizResizeAttempts: "maxVizResizeAttempts"
      },
      true
    );
    ss.initEnum(
      x,
      a,
      {
        SUM: "SUM",
        AVG: "AVG",
        MIN: "MIN",
        MAX: "MAX",
        STDEV: "STDEV",
        STDEVP: "STDEVP",
        VAR: "VAR",
        VARP: "VARP",
        COUNT: "COUNT",
        COUNTD: "COUNTD",
        MEDIAN: "MEDIAN",
        ATTR: "ATTR",
        NONE: "NONE",
        PERCENTILE: "PERCENTILE",
        YEAR: "YEAR",
        QTR: "QTR",
        MONTH: "MONTH",
        DAY: "DAY",
        HOUR: "HOUR",
        MINUTE: "MINUTE",
        SECOND: "SECOND",
        WEEK: "WEEK",
        WEEKDAY: "WEEKDAY",
        MONTHYEAR: "MONTHYEAR",
        MDY: "MDY",
        END: "END",
        TRUNC_YEAR: "TRUNC_YEAR",
        TRUNC_QTR: "TRUNC_QTR",
        TRUNC_MONTH: "TRUNC_MONTH",
        TRUNC_WEEK: "TRUNC_WEEK",
        TRUNC_DAY: "TRUNC_DAY",
        TRUNC_HOUR: "TRUNC_HOUR",
        TRUNC_MINUTE: "TRUNC_MINUTE",
        TRUNC_SECOND: "TRUNC_SECOND",
        QUART1: "QUART1",
        QUART3: "QUART3",
        SKEWNESS: "SKEWNESS",
        KURTOSIS: "KURTOSIS",
        INOUT: "INOUT",
        SUM_XSQR: "SUM_XSQR",
        USER: "USER"
      },
      true
    );
    ss.initEnum(
      y,
      a,
      { dimension: "dimension", measure: "measure", unknown: "unknown" },
      true
    );
    ss.initEnum(
      z,
      a,
      {
        categorical: "categorical",
        quantitative: "quantitative",
        hierarchical: "hierarchical",
        relativedate: "relativedate"
      },
      true
    );
    ss.initEnum(
      A,
      a,
      { all: "all", replace: "replace", add: "add", remove: "remove" },
      true
    );
    ss.initClass(B, a, {
      handleEventNotification: function(e, bh) {
        throw new ss.NotImplementedException();
      }
    });
    ss.initClass(C, a, {
      get_handler: function() {
        return this.$0;
      },
      get_router: function() {
        return this.$1;
      },
      sendCommand: function(e) {
        return function(bh, bi) {
          this.$1.sendCommand(e).call(this.$1, this.$0, bh, bi);
        };
      },
      dispose: function() {
        this.$1.unregisterHandler(this.$0);
      }
    });
    ss.initEnum(
      D,
      a,
      {
        nullValues: "nullValues",
        nonNullValues: "nonNullValues",
        allValues: "allValues"
      },
      true
    );
    ss.initEnum(E, a, { all: "all", list: "list", range: "range" }, true);
    ss.initEnum(
      F,
      a,
      {
        float: "float",
        integer: "integer",
        string: "string",
        boolean: "boolean",
        date: "date",
        datetime: "datetime"
      },
      true
    );
    ss.initEnum(
      G,
      a,
      {
        year: "year",
        quarter: "quarter",
        month: "month",
        week: "week",
        day: "day",
        hour: "hour",
        minute: "minute",
        second: "second"
      },
      true
    );
    ss.initEnum(
      H,
      a,
      { replace: "replace", add: "add", remove: "remove" },
      true
    );
    ss.initEnum(
      I,
      a,
      {
        automatic: "automatic",
        exactly: "exactly",
        range: "range",
        atleast: "atleast",
        atmost: "atmost"
      },
      true
    );
    ss.initEnum(
      J,
      a,
      { worksheet: "worksheet", dashboard: "dashboard", story: "story" },
      true
    );
    ss.initEnum(
      K,
      a,
      {
        customviewload: "customviewload",
        customviewremove: "customviewremove",
        customviewsave: "customviewsave",
        customviewsetdefault: "customviewsetdefault",
        filterchange: "filterchange",
        firstinteractive: "firstinteractive",
        firstvizsizeknown: "firstvizsizeknown",
        marksselection: "marksselection",
        markshighlight: "markshighlight",
        parametervaluechange: "parametervaluechange",
        storypointswitch: "storypointswitch",
        tabswitch: "tabswitch",
        toolbarstatechange: "toolbarstatechange",
        vizresize: "vizresize"
      },
      true
    );
    ss.initEnum(L, a, { redo: "redo", undo: "undo" }, true);
    ss.initEnum(M, a, { top: "top", bottom: "bottom" }, true);
    ss.initClass(O, a, {
      registerHandler: function(e) {
        var bh = "host" + this.$8;
        if (ss.isValue(e.get_hostId()) || ss.isValue(this.$6[e.get_hostId()])) {
          throw q.createInternalError(
            "Host '" + e.get_hostId() + "' is already registered."
          );
        }
        this.$8++;
        e.set_hostId(bh);
        this.$6[bh] = e;
        e.add_stateReadyForQuery(ss.mkdel(this, this.$3));
      },
      unregisterHandler: function(e) {
        if (ss.isValue(e.get_hostId()) || ss.isValue(this.$6[e.get_hostId()])) {
          delete this.$6[e.get_hostId()];
          e.remove_stateReadyForQuery(ss.mkdel(this, this.$3));
        }
      },
      sendCommand: function(e) {
        return function(bh, bi, bj) {
          var bk = bh.get_iframe();
          var bl = bh.get_hostId();
          if (
            !r.hasWindowPostMessage() ||
            ss.isNullOrUndefined(bk) ||
            ss.isNullOrUndefined(bk.contentWindow)
          ) {
            return;
          }
          var bm = d.generateNextCommandId();
          var bn = this.$4[bl];
          if (ss.isNullOrUndefined(bn)) {
            bn = {};
            this.$4[bl] = bn;
          }
          bn[bm] = bj;
          var bo = bj.get_commandName();
          var bp = null;
          if (ss.isValue(bi)) {
            bp = JSON.stringify(bi);
          }
          var bq = new d(bo, bm, bl, bp);
          var br = bq.serialize();
          if (r.isPostMessageSynchronous()) {
            window.setTimeout(function() {
              bk.contentWindow.postMessage(br, "*");
            }, 0);
          } else {
            bk.contentWindow.postMessage(br, "*");
          }
        };
      },
      $3: function(e) {
        var bh = this.$5[e.get_hostId()];
        if (r.isNullOrEmpty(bh)) {
          return;
        }
        while (bh.length > 0) {
          var bi = bh.pop();
          if (ss.isValue(bi)) {
            bi();
          }
        }
      },
      $1: function(e) {
        var bh = e;
        if (ss.isNullOrUndefined(bh.data)) {
          return;
        }
        var bi = d.parse(bh.data.toString());
        var bj = bi.get_hostId();
        var bk = this.$6[bj];
        if (
          ss.isNullOrUndefined(bk) ||
          !ss.referenceEquals(bk.get_hostId(), bi.get_hostId())
        ) {
          bk = this.$0(bh);
        }
        if (bi.get_isApiCommandName()) {
          if (bi.get_commandId() === "xdomainSourceId") {
            bk.handleEventNotification(bi.get_name(), bi.get_parameters());
            if (bi.get_name() === "api.FirstVizSizeKnownEvent") {
              var bl = new W("tableau.bootstrap", []);
              bh.source.postMessage(bl.serialize(), "*");
            }
          } else {
            this.$2(bi);
          }
        } else if (!ss.isNullOrUndefined(this.$7)) {
          var bm = W.parse(bh.data.toString());
          this.$7(bm, bk);
        }
      },
      $2: function(e) {
        var bh = this.$4[e.get_hostId()];
        var bi = ss.isValue(bh) ? bh[e.get_commandId()] : null;
        if (ss.isNullOrUndefined(bi)) {
          return;
        }
        delete bh[e.get_commandId()];
        if (e.get_name() !== bi.get_commandName()) {
          return;
        }
        var bj = new h(e.get_parameters());
        var bk = bj.get_data();
        if (bj.get_result() === "api.success") {
          switch (bi.get_successCallbackTiming()) {
            case 0: {
              if (ss.isValue(bi.get_successCallback())) {
                bi.get_successCallback()(bk);
              }
              break;
            }
            case 1: {
              var bl = function() {
                if (ss.isValue(bi.get_successCallback())) {
                  bi.get_successCallback()(bk);
                }
              };
              var bm = this.$5[e.get_hostId()];
              if (ss.isNullOrUndefined(bm)) {
                bm = [];
                this.$5[e.get_hostId()] = bm;
              }
              bm.push(bl);
              break;
            }
            default: {
              throw q.createInternalError(
                "Unknown timing value: " + bi.get_successCallbackTiming()
              );
            }
          }
        } else if (ss.isValue(bi.get_errorCallback())) {
          var bn = bj.get_result() === "api.remotefailed";
          var bo = ss.isValue(bk) ? bk.toString() : "";
          bi.get_errorCallback()(bn, bo);
        }
      },
      $0: function(e) {
        var bh = new ss.ObjectEnumerator(this.$6);
        try {
          while (bh.moveNext()) {
            var bi = bh.current();
            if (
              this.$6.hasOwnProperty(bi.key) &&
              ss.referenceEquals(bi.value.get_iframe().contentWindow, e.source)
            ) {
              return bi.value;
            }
          }
        } finally {
          bh.dispose();
        }
        return new b();
      }
    });
    ss.initEnum(
      P,
      a,
      {
        float: "float",
        integer: "integer",
        string: "string",
        boolean: "boolean",
        date: "date",
        datetime: "datetime"
      },
      true
    );
    ss.initClass(Q, a, {}, Object);
    ss.initClass(R, a, {
      buildApplyFiltersCommandParams: function(e, bh, bi, bj) {
        if (r.isNullOrEmpty(e)) {
          throw q.createNullOrEmptyParameter("fieldName");
        }
        bi = Y.normalizeEnum(A).call(null, bi, "updateType");
        var bk = [];
        if (m.isArray(bh)) {
          for (var bl = 0; bl < bh.length; bl++) {
            bk.push(bh[bl].toString());
          }
        } else if (ss.isValue(bh)) {
          bk.push(bh.toString());
        }
        var bm = {};
        bm["api.fieldCaption"] = e;
        bm["api.filterUpdateType"] = bi;
        bm["api.exclude"] = ss.isValue(bj) && bj.isExcludeMode ? true : false;
        if (bi !== "all") {
          bm["api.filterCategoricalValues"] = bk;
        }
        return bm;
      },
      buildRangeFilterCommandParams: function(e, bh) {
        if (r.isNullOrEmpty(e)) {
          throw q.createNullOrEmptyParameter("fieldName");
        }
        if (ss.isNullOrUndefined(bh)) {
          throw q.createNullOrEmptyParameter("filterOptions");
        }
        var bi = {};
        bi["api.fieldCaption"] = e;
        if (ss.isValue(bh.min)) {
          if (r.isDate(bh.min)) {
            var bj = bh.min;
            if (r.isDateValid(bj)) {
              bi["api.filterRangeMin"] = r.serializeDateForServer(bj);
            } else {
              throw q.createInvalidDateParameter("filterOptions.min");
            }
          } else {
            bi["api.filterRangeMin"] = bh.min;
          }
        }
        if (ss.isValue(bh.max)) {
          if (r.isDate(bh.max)) {
            var bk = bh.max;
            if (r.isDateValid(bk)) {
              bi["api.filterRangeMax"] = r.serializeDateForServer(bk);
            } else {
              throw q.createInvalidDateParameter("filterOptions.max");
            }
          } else {
            bi["api.filterRangeMax"] = bh.max;
          }
        }
        if (ss.isValue(bh.nullOption)) {
          bi["api.filterRangeNullOption"] = bh.nullOption;
        }
        return bi;
      },
      buildRelativeDateFilterCommandParams: function(e, bh) {
        if (r.isNullOrEmpty(e)) {
          throw q.createInvalidParameter("fieldName");
        } else if (ss.isNullOrUndefined(bh)) {
          throw q.createInvalidParameter("filterOptions");
        }
        var bi = {};
        bi["api.fieldCaption"] = e;
        if (ss.isValue(bh)) {
          bi["api.filterPeriodType"] = bh.periodType;
          bi["api.filterDateRangeType"] = bh.rangeType;
          if (bh.rangeType === "lastn" || bh.rangeType === "nextn") {
            if (ss.isNullOrUndefined(bh.rangeN)) {
              throw q.create(
                "missingRangeNForRelativeDateFilters",
                "Missing rangeN field for a relative date filter of LASTN or NEXTN."
              );
            }
            bi["api.filterDateRange"] = bh.rangeN;
          }
          if (ss.isValue(bh.anchorDate)) {
            bi["api.filterDateArchorValue"] = r.serializeDateForServer(
              bh.anchorDate
            );
          }
        }
        return bi;
      },
      buildHierarchicalFilterCommandParams: function(e, bh, bi, bj) {
        if (r.isNullOrEmpty(e)) {
          throw q.createNullOrEmptyParameter("fieldName");
        }
        bi = Y.normalizeEnum(A).call(null, bi, "updateType");
        var bk = null;
        var bl = null;
        if (m.isArray(bh)) {
          bk = [];
          var bm = bh;
          for (var bn = 0; bn < bm.length; bn++) {
            bk.push(bm[bn].toString());
          }
        } else if (r.isString(bh)) {
          bk = [];
          bk.push(bh.toString());
        } else if (ss.isValue(bh) && ss.isValue(bh["levels"])) {
          var bo = bh["levels"];
          bl = [];
          if (m.isArray(bo)) {
            var bp = bo;
            for (var bq = 0; bq < bp.length; bq++) {
              bl.push(bp[bq].toString());
            }
          } else {
            bl.push(bo.toString());
          }
        } else if (ss.isValue(bh)) {
          throw q.createInvalidParameter("values");
        }
        var br = {};
        br["api.fieldCaption"] = e;
        br["api.filterUpdateType"] = bi;
        br["api.exclude"] = ss.isValue(bj) && bj.isExcludeMode ? true : false;
        if (ss.isValue(bk)) {
          br["api.filterHierarchicalValues"] = JSON.stringify(bk);
        }
        if (ss.isValue(bl)) {
          br["api.filterHierarchicalLevels"] = JSON.stringify(bl);
        }
        return br;
      },
      buildClearFilterCommandsParam: function(e) {
        if (r.isNullOrEmpty(e)) {
          throw q.createNullOrEmptyParameter("fieldName");
        }
        var bh = {};
        bh["api.fieldCaption"] = e;
        return bh;
      },
      filterCommandError: function(e) {
        var bh = e;
        if (ss.isValue(bh) && ss.isValue(bh.errorCode)) {
          var bi = ss.isValue(bh.additionalInformation)
            ? bh.additionalInformation.toString()
            : "";
          switch (bh.errorCode) {
            case "invalidFilterFieldName": {
              return q.create("invalidFilterFieldName", bi);
            }
            case "invalidFilterFieldValue": {
              return q.create("invalidFilterFieldValue", bi);
            }
            case "invalidAggregationFieldName": {
              return q.createInvalidAggregationFieldName(bi);
            }
            default: {
              return q.createServerError(bi);
            }
          }
        }
        return null;
      },
      normalizeRangeFilterOption: function(e) {
        if (ss.isNullOrUndefined(e)) {
          throw q.createNullOrEmptyParameter("filterOptions");
        }
        if (ss.isNullOrUndefined(e.min) && ss.isNullOrUndefined(e.max)) {
          throw q.create(
            "invalidParameter",
            "At least one of filterOptions.min or filterOptions.max must be specified."
          );
        }
        var bh = new Object();
        if (ss.isValue(e.min)) {
          bh.min = e.min;
        }
        if (ss.isValue(e.max)) {
          bh.max = e.max;
        }
        if (ss.isValue(e.nullOption)) {
          bh.nullOption = Y.normalizeEnum(D).call(
            null,
            e.nullOption,
            "filterOptions.nullOption"
          );
        }
        return bh;
      },
      normalizeRelativeDateFilterOptions: function(e) {
        if (ss.isNullOrUndefined(e)) {
          throw q.createNullOrEmptyParameter("filterOptions");
        }
        var bh = new Object();
        bh.rangeType = Y.normalizeEnum(t).call(
          null,
          e.rangeType,
          "filterOptions.rangeType"
        );
        bh.periodType = Y.normalizeEnum(G).call(
          null,
          e.periodType,
          "filterOptions.periodType"
        );
        if (bh.rangeType === "lastn" || bh.rangeType === "nextn") {
          if (ss.isNullOrUndefined(e.rangeN)) {
            throw q.create(
              "missingRangeNForRelativeDateFilters",
              "Missing rangeN field for a relative date filter of LASTN or NEXTN."
            );
          }
          bh.rangeN = r.toInt(e.rangeN);
        }
        if (ss.isValue(e.anchorDate)) {
          if (!r.isDate(e.anchorDate) || !r.isDateValid(e.anchorDate)) {
            throw q.createInvalidDateParameter("filterOptions.anchorDate");
          }
          bh.anchorDate = e.anchorDate;
        }
        return bh;
      },
      createFilterCommandReturnHandler: function(e, bh, bi) {
        return new (ss.makeGenericType(N, [Object]))(
          e,
          1,
          ss.mkdel(this, function(bj) {
            var bk = this.filterCommandError(bj);
            if (ss.isNullOrUndefined(bk)) {
              bi.resolve(bh);
            } else {
              bi.reject(bk);
            }
          }),
          function(bj, bk) {
            if (bj) {
              bi.reject(q.createInvalidFilterFieldNameOrValue(bh));
            } else {
              var bl = q.create("filterCannotBePerformed", bk);
              bi.reject(bl);
            }
          }
        );
      }
    });
    ss.initClass(S, a, {
      getSummaryDataCommandParams: function(e) {
        var bh = {};
        e = e || new Object();
        bh["api.ignoreAliases"] = ss.coalesce(e.ignoreAliases, false);
        bh["api.ignoreSelection"] = ss.coalesce(e.ignoreSelection, false);
        bh["api.maxRows"] = ss.coalesce(e.maxRows, 0);
        return bh;
      },
      getUnderlyingDataCommandParams: function(e) {
        var bh = {};
        e = e || new Object();
        bh["api.ignoreAliases"] = ss.coalesce(e.ignoreAliases, false);
        bh["api.ignoreSelection"] = ss.coalesce(e.ignoreSelection, false);
        bh["api.includeAllColumns"] = ss.coalesce(e.includeAllColumns, false);
        bh["api.maxRows"] = ss.coalesce(e.maxRows, 0);
        return bh;
      },
      getSummaryDataResponseHandler: function(e) {
        return new (ss.makeGenericType(N, [Object]))(
          "api.GetSummaryTableCommand",
          0,
          ss.mkdel(this, function(bh) {
            var bi = bh;
            var bj = this.processGetDataPresModel(bi);
            e.resolve(bj);
          }),
          function(bh, bi) {
            e.reject(q.createServerError(bi));
          }
        );
      },
      getUnderlyingDataResponseHandler: function(e) {
        return new (ss.makeGenericType(N, [Object]))(
          "api.GetUnderlyingTableCommand",
          0,
          ss.mkdel(this, function(bh) {
            var bi = bh;
            var bj = this.processGetDataPresModel(bi);
            e.resolve(bj);
          }),
          function(bh, bi) {
            e.reject(q.createServerError(bi));
          }
        );
      },
      processGetDataPresModel: function(e) {
        var bh = this.$1(e.dataTable);
        var bi = this.$0(e.headers);
        var bj = new k(bh, e.isSummary, bh.length, bi);
        return new be(bj);
      },
      $1: function(e) {
        var bh = [];
        for (var bi = 0; bi < e.length; bi++) {
          var bj = e[bi];
          var bk = [];
          for (var bl = 0; bl < bj.length; bl++) {
            var bm = bj[bl];
            bk.push(r.getDataValue(bm));
          }
          bh.push(bk);
        }
        return bh;
      },
      $0: function(e) {
        var bh = [];
        for (var bi = 0; bi < e.length; bi++) {
          var bj = e[bi];
          var bk = new j(
            bj.fieldName,
            v.convertDataType(bj.dataType),
            bj.isReferenced,
            bj.index
          );
          bh.push(new bd(bk));
        }
        return bh;
      }
    });
    ss.initClass(
      T,
      a,
      {
        add_stateReadyForQuery: function(e) {
          this.$2$1 = ss.delegateCombine(this.$2$1, e);
        },
        remove_stateReadyForQuery: function(e) {
          this.$2$1 = ss.delegateRemove(this.$2$1, e);
        },
        get_hostId: function() {
          return null;
        },
        set_hostId: function(e) {},
        get_iframe: function() {
          return null;
        }
      },
      B
    );
    ss.initClass(U, a, {
      registerHandler: function(e) {
        this.$0.registerHandler(e);
      },
      unregisterHandler: function(e) {
        this.$0.unregisterHandler(e);
      },
      sendCommand: function(e) {
        return function(bh, bi, bj) {
          this.$0.sendCommand(e).call(this.$0, bh, bi, bj);
        };
      }
    });
    ss.initClass(V, a, {
      get_pairs: function() {
        return this.$3;
      },
      get_tupleId: function() {
        return this.$4;
      },
      $1: function() {
        if (ss.isNullOrUndefined(this.$2)) {
          this.$2 = this.$3._toApiCollection();
        }
        return this.$2;
      },
      $0: function(e) {
        this.$3._add(e.fieldName, e);
      }
    });
    ss.initClass(W, a, {
      get_name: function() {
        return this.$1$1;
      },
      set_name: function(e) {
        this.$1$1 = e;
      },
      get_parameters: function() {
        return this.$0;
      },
      serialize: function() {
        var e = [];
        e.push(this.get_name().toString());
        e = e.concat.apply(e, this.$0);
        return e.join(",");
      }
    });
    ss.initClass(X, a, {}, Object);
    ss.initClass(Y, a, {});
    ss.initClass(Z, a, {
      addVisualIdForWorksheet: function(e, bh, bi) {
        e["api.worksheetName"] = bh;
        if (ss.isValue(bi)) {
          e["api.dashboardName"] = bi;
        }
      }
    });
    ss.initClass(ba, a, {}, Object);
    ss.initClass(bb, a, {});
    ss.initClass(bc, a, {}, Object);
    ss.initClass(bd, a, {
      getFieldName: function() {
        return this.$0.get_fieldName();
      },
      getDataType: function() {
        return this.$0.get_dataType();
      },
      getIsReferenced: function() {
        return this.$0.get_isReferenced();
      },
      getIndex: function() {
        return this.$0.get_index();
      }
    });
    ss.initClass(be, a, {
      getName: function() {
        return this.$0.get_name();
      },
      getData: function() {
        return this.$0.get_rows();
      },
      getColumns: function() {
        return this.$0.get_columns();
      },
      getTotalRowCount: function() {
        return this.$0.get_totalRowCount();
      },
      getIsSummaryData: function() {
        return this.$0.get_isSummaryData();
      }
    });
    ss.initClass(bf, a, {
      getPairs: function() {
        return this.impl.$1();
      }
    });
    ss.initClass(bg, a, {});
    (function() {
      d.crossDomainEventNotificationId = "xdomainSourceId";
      d.$0 = 0;
    })();
    (function() {
      var e = window["_ApiObjectRegistryGlobalState"];
      var bh = e;
      if (ss.isNullOrUndefined(bh)) {
        bh = new Object();
      }
      window["_ApiObjectRegistryGlobalState"] = bh;
      window._ApiObjectRegistryGlobalState.creationRegistry =
        window._ApiObjectRegistryGlobalState.creationRegistry || {};
      window._ApiObjectRegistryGlobalState.singletonInstanceRegistry =
        window._ApiObjectRegistryGlobalState.singletonInstanceRegistry || {};
    })();
    (function() {
      m.$0 = "array";
      m.$1 = "boolean";
      m.$2 = "date";
      m.$3 = "function";
      m.$4 = "number";
      m.$5 = "object";
      m.$6 = "regexp";
      m.$7 = "string";
      m.$8 = ss.mkdict([
        "[object Boolean]",
        "boolean",
        "[object Number]",
        "number",
        "[object String]",
        "string",
        "[object Function]",
        "function",
        "[object Array]",
        "array",
        "[object Date]",
        "date",
        "[object RegExp]",
        "regexp",
        "[object Object]",
        "object"
      ]);
      m.$e = String.prototype["trim"];
      m.$d = Object.prototype["toString"];
      m.$f = new RegExp("^[\\s\\xA0]+");
      m.$g = new RegExp("[\\s\\xA0]+$");
      m.$a = new RegExp("^[\\],:{}\\s]*$");
      m.$b = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', "g");
      m.$c = new RegExp(
        '"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?',
        "g"
      );
      m.$9 = new RegExp("(?:^|:|,)(?:\\s*\\[)+", "g");
    })();
    (function() {
      var e = global.tableauSoftware;
      e.DeviceType = {
        DEFAULT: "default",
        DESKTOP: "desktop",
        TABLET: "tablet",
        PHONE: "phone"
      };
      e.DashboardObjectType = {
        BLANK: "blank",
        WORKSHEET: "worksheet",
        QUICK_FILTER: "quickFilter",
        PARAMETER_CONTROL: "parameterControl",
        PAGE_FILTER: "pageFilter",
        LEGEND: "legend",
        TITLE: "title",
        TEXT: "text",
        IMAGE: "image",
        WEB_PAGE: "webPage",
        ADDIN: "addIn"
      };
      e.DataType = {
        FLOAT: "float",
        INTEGER: "integer",
        STRING: "string",
        BOOLEAN: "boolean",
        DATE: "date",
        DATETIME: "datetime"
      };
      e.DateRangeType = {
        LAST: "last",
        LASTN: "lastn",
        NEXT: "next",
        NEXTN: "nextn",
        CURR: "curr",
        TODATE: "todate"
      };
      e.ErrorCode = {
        INTERNAL_ERROR: "internalError",
        SERVER_ERROR: "serverError",
        INVALID_AGGREGATION_FIELD_NAME: "invalidAggregationFieldName",
        INVALID_TOOLBAR_BUTTON_NAME: "invalidToolbarButtonName",
        INVALID_PARAMETER: "invalidParameter",
        INVALID_URL: "invalidUrl",
        STALE_DATA_REFERENCE: "staleDataReference",
        VIZ_ALREADY_IN_MANAGER: "vizAlreadyInManager",
        NO_URL_OR_PARENT_ELEMENT_NOT_FOUND: "noUrlOrParentElementNotFound",
        INVALID_FILTER_FIELDNAME: "invalidFilterFieldName",
        INVALID_FILTER_FIELDVALUE: "invalidFilterFieldValue",
        INVALID_FILTER_FIELDNAME_OR_VALUE: "invalidFilterFieldNameOrValue",
        FILTER_CANNOT_BE_PERFORMED: "filterCannotBePerformed",
        NOT_ACTIVE_SHEET: "notActiveSheet",
        INVALID_CUSTOM_VIEW_NAME: "invalidCustomViewName",
        MISSING_RANGEN_FOR_RELATIVE_DATE_FILTERS:
          "missingRangeNForRelativeDateFilters",
        MISSING_MAX_SIZE: "missingMaxSize",
        MISSING_MIN_SIZE: "missingMinSize",
        MISSING_MINMAX_SIZE: "missingMinMaxSize",
        INVALID_SIZE: "invalidSize",
        INVALID_SIZE_BEHAVIOR_ON_WORKSHEET: "invalidSizeBehaviorOnWorksheet",
        SHEET_NOT_IN_WORKBOOK: "sheetNotInWorkbook",
        INDEX_OUT_OF_RANGE: "indexOutOfRange",
        DOWNLOAD_WORKBOOK_NOT_ALLOWED: "downloadWorkbookNotAllowed",
        NULL_OR_EMPTY_PARAMETER: "nullOrEmptyParameter",
        BROWSER_NOT_CAPABLE: "browserNotCapable",
        UNSUPPORTED_EVENT_NAME: "unsupportedEventName",
        INVALID_DATE_PARAMETER: "invalidDateParameter",
        INVALID_SELECTION_FIELDNAME: "invalidSelectionFieldName",
        INVALID_SELECTION_VALUE: "invalidSelectionValue",
        INVALID_SELECTION_DATE: "invalidSelectionDate",
        NO_URL_FOR_HIDDEN_WORKSHEET: "noUrlForHiddenWorksheet",
        MAX_VIZ_RESIZE_ATTEMPTS: "maxVizResizeAttempts"
      };
      e.FieldAggregationType = {
        SUM: "SUM",
        AVG: "AVG",
        MIN: "MIN",
        MAX: "MAX",
        STDEV: "STDEV",
        STDEVP: "STDEVP",
        VAR: "VAR",
        VARP: "VARP",
        COUNT: "COUNT",
        COUNTD: "COUNTD",
        MEDIAN: "MEDIAN",
        ATTR: "ATTR",
        NONE: "NONE",
        PERCENTILE: "PERCENTILE",
        YEAR: "YEAR",
        QTR: "QTR",
        MONTH: "MONTH",
        DAY: "DAY",
        HOUR: "HOUR",
        MINUTE: "MINUTE",
        SECOND: "SECOND",
        WEEK: "WEEK",
        WEEKDAY: "WEEKDAY",
        MONTHYEAR: "MONTHYEAR",
        MDY: "MDY",
        END: "END",
        TRUNC_YEAR: "TRUNC_YEAR",
        TRUNC_QTR: "TRUNC_QTR",
        TRUNC_MONTH: "TRUNC_MONTH",
        TRUNC_WEEK: "TRUNC_WEEK",
        TRUNC_DAY: "TRUNC_DAY",
        TRUNC_HOUR: "TRUNC_HOUR",
        TRUNC_MINUTE: "TRUNC_MINUTE",
        TRUNC_SECOND: "TRUNC_SECOND",
        QUART1: "QUART1",
        QUART3: "QUART3",
        SKEWNESS: "SKEWNESS",
        KURTOSIS: "KURTOSIS",
        INOUT: "INOUT",
        SUM_XSQR: "SUM_XSQR",
        USER: "USER"
      };
      e.FieldRoleType = {
        DIMENSION: "dimension",
        MEASURE: "measure",
        UNKNOWN: "unknown"
      };
      e.FilterUpdateType = {
        ALL: "all",
        REPLACE: "replace",
        ADD: "add",
        REMOVE: "remove"
      };
      e.FilterType = {
        CATEGORICAL: "categorical",
        QUANTITATIVE: "quantitative",
        HIERARCHICAL: "hierarchical",
        RELATIVEDATE: "relativedate"
      };
      e.NullOption = {
        NULL_VALUES: "nullValues",
        NON_NULL_VALUES: "nonNullValues",
        ALL_VALUES: "allValues"
      };
      e.ParameterAllowableValuesType = {
        ALL: "all",
        LIST: "list",
        RANGE: "range"
      };
      e.ParameterDataType = {
        FLOAT: "float",
        INTEGER: "integer",
        STRING: "string",
        BOOLEAN: "boolean",
        DATE: "date",
        DATETIME: "datetime"
      };
      e.PeriodType = {
        YEAR: "year",
        QUARTER: "quarter",
        MONTH: "month",
        WEEK: "week",
        DAY: "day",
        HOUR: "hour",
        MINUTE: "minute",
        SECOND: "second"
      };
      e.SelectionUpdateType = {
        REPLACE: "replace",
        ADD: "add",
        REMOVE: "remove"
      };
      e.SheetSizeBehavior = {
        AUTOMATIC: "automatic",
        EXACTLY: "exactly",
        RANGE: "range",
        ATLEAST: "atleast",
        ATMOST: "atmost"
      };
      e.SheetType = {
        WORKSHEET: "worksheet",
        DASHBOARD: "dashboard",
        STORY: "story"
      };
      e.TableauEventName = {
        CUSTOM_VIEW_LOAD: "customviewload",
        CUSTOM_VIEW_REMOVE: "customviewremove",
        CUSTOM_VIEW_SAVE: "customviewsave",
        CUSTOM_VIEW_SET_DEFAULT: "customviewsetdefault",
        FILTER_CHANGE: "filterchange",
        FIRST_INTERACTIVE: "firstinteractive",
        FIRST_VIZ_SIZE_KNOWN: "firstvizsizeknown",
        MARKS_SELECTION: "marksselection",
        MARKS_HIGHLIGHT: "markshighlight",
        PARAMETER_VALUE_CHANGE: "parametervaluechange",
        STORY_POINT_SWITCH: "storypointswitch",
        TAB_SWITCH: "tabswitch",
        TOOLBAR_STATE_CHANGE: "toolbarstatechange",
        VIZ_RESIZE: "vizresize"
      };
      e.ToolbarPosition = { TOP: "top", BOTTOM: "bottom" };
      e.ToolbarButtonName = { REDO: "redo", UNDO: "undo" };
    })();
  })();
  /*! API */
  (function() {
    "dont use strict";
    var a = {};
    global.tab = global.tab || {};
    global.tableauSoftware = global.tableauSoftware || {};
    ss.initAssembly(a, "Tableau.JavaScript.Vql.Api");
    var b = function(e, bm) {
      this.$2 = null;
      y.call(this, e, null);
      this.$2 = bm;
    };
    b.__typeName = "tab.$0";
    var c = function(e, bm, bn, bo) {
      this.$3 = null;
      this.$4 = null;
      y.call(this, e, bm);
      this.$3 = bn;
      this.$4 = bo;
    };
    c.__typeName = "tab.$1";
    var d = function(e, bm) {
      y.call(this, e, bm);
    };
    d.__typeName = "tab.$2";
    var f = function() {};
    f.__typeName = "tab.$3";
    f.isInstanceOfType = function() {
      return true;
    };
    var g = function(e) {
      this.$i = null;
      this.$h = null;
      this.$c = null;
      this.$d = null;
      this.$b = null;
      this.$a = null;
      this.$g = null;
      this.$f = null;
      this.$j = null;
      this.$e = null;
      this.$h = e.name;
      this.$c = tab._Utility.getDataValue(e.currentValue);
      this.$d = tab.ApiEnumConverter.convertParameterDataType(e.dataType);
      this.$b = tab.ApiEnumConverter.convertParameterAllowableValuesType(
        e.allowableValuesType
      );
      if (ss.isValue(e.allowableValues) && this.$b === "list") {
        this.$a = [];
        for (var bm = 0; bm < e.allowableValues.length; bm++) {
          var bn = e.allowableValues[bm];
          this.$a.push(tab._Utility.getDataValue(bn));
        }
      }
      if (this.$b === "range") {
        this.$g = tab._Utility.getDataValue(e.minValue);
        this.$f = tab._Utility.getDataValue(e.maxValue);
        this.$j = e.stepSize;
        if (
          (this.$d === "date" || this.$d === "datetime") &&
          ss.isValue(this.$j) &&
          ss.isValue(e.dateStepPeriod)
        ) {
          this.$e = tab.ApiEnumConverter.convertPeriodType(e.dateStepPeriod);
        }
      }
    };
    g.__typeName = "tab.$4";
    var h = function(e, bm) {
      y.call(this, e, bm);
    };
    h.__typeName = "tab.$5";
    var i = function(e, bm) {
      this.$2 = null;
      y.call(this, e, null);
      this.$2 = bm;
    };
    i.__typeName = "tab.$6";
    var j = function() {};
    j.__typeName = "tab._ApiBootstrap";
    j.initialize = function() {
      tab._ApiObjectRegistry.registerApiMessageRouter(function() {
        return new D();
      });
    };
    global.tab._ApiBootstrap = j;
    var k = function(e, bm, bn) {
      this.$c = null;
      this.$j = null;
      this.$l = null;
      this.$g = null;
      this.$h = null;
      this.$i = null;
      this.$k = null;
      this.$e = false;
      this.$d = false;
      this.$f = false;
      this.$l = e;
      this.$h = bm;
      this.$g = bn;
      this.$e = false;
      this.$d = false;
      this.$f = false;
    };
    k.__typeName = "tab._CustomViewImpl";
    k._getAsync = function(e) {
      var bm = new tab._Deferred();
      bm.resolve(e.get__customViewImpl().$5());
      return bm.get_promise();
    };
    k._createNew = function(e, bm, bn, bo) {
      var bp = new k(e, bn.name, bm);
      bp.$e = bn.isPublic;
      bp.$k = bn.url;
      bp.$i = bn.owner.friendlyName;
      bp.$d = ss.isValue(bo) && ss.unbox(bo) === bn.id;
      bp.$j = bn;
      return bp;
    };
    k._saveNewAsync = function(e, bm, bn) {
      var bo = new tab._Deferred();
      var bp = {};
      bp["api.customViewName"] = bn;
      var bq = k.$0("api.SaveNewCustomViewCommand", bo, function(br) {
        k._processCustomViewUpdate(e, bm, br, true);
        var bs = null;
        if (ss.isValue(e.$p())) {
          bs = e.$p().get_item(0);
        }
        bo.resolve(bs);
      });
      bm.sendCommand(Object).call(bm, bp, bq);
      return bo.get_promise();
    };
    k._showCustomViewAsync = function(e, bm, bn) {
      var bo = new tab._Deferred();
      var bp = {};
      if (ss.isValue(bn)) {
        bp["api.customViewParam"] = bn;
      }
      var bq = k.$0("api.ShowCustomViewCommand", bo, function(br) {
        var bs = e.get_activeCustomView();
        bo.resolve(bs);
      });
      bm.sendCommand(Object).call(bm, bp, bq);
      return bo.get_promise();
    };
    k._makeCurrentCustomViewDefaultAsync = function(e, bm) {
      var bn = new tab._Deferred();
      var bo = {};
      var bp = k.$0("api.MakeCurrentCustomViewDefaultCommand", bn, function(
        bq
      ) {
        var br = e.get_activeCustomView();
        bn.resolve(br);
      });
      bm.sendCommand(Object).call(bm, bo, bp);
      return bn.get_promise();
    };
    k._getCustomViewsAsync = function(e, bm) {
      var bn = new tab._Deferred();
      var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
        "api.FetchCustomViewsCommand",
        0,
        function(bp) {
          k._processCustomViews(e, bm, bp);
          bn.resolve(e.$i()._toApiCollection());
        },
        function(bp, bq) {
          bn.reject(tab._TableauException.create("serverError", bq));
        }
      );
      bm.sendCommand(Object).call(bm, null, bo);
      return bn.get_promise();
    };
    k._processCustomViews = function(e, bm, bn) {
      k._processCustomViewUpdate(e, bm, bn, false);
    };
    k._processCustomViewUpdate = function(e, bm, bn, bo) {
      if (bo) {
        e.$q(new tab._Collection());
      }
      e.$h(null);
      var bp = null;
      if (ss.isValue(bn.currentView)) {
        bp = bn.currentView.name;
      }
      var bq = bn.defaultCustomViewId;
      if (bo && ss.isValue(bn.newView)) {
        var br = k._createNew(e, bm, bn.newView, bq);
        e.$p()._add(br.$7(), br.$5());
      }
      e.$o(e.$i());
      e.$j(new tab._Collection());
      if (ss.isValue(bn.customViews)) {
        var bs = bn.customViews;
        if (bs.length > 0) {
          for (var bt = 0; bt < bs.length; bt++) {
            var bu = k._createNew(e, bm, bs[bt], bq);
            e.$i()._add(bu.$7(), bu.$5());
            if (e.$n()._has(bu.$7())) {
              e.$n()._remove(bu.$7());
            } else if (bo) {
              if (!e.$p()._has(bu.$7())) {
                e.$p()._add(bu.$7(), bu.$5());
              }
            }
            if (ss.isValue(bp) && ss.referenceEquals(bu.$7(), bp)) {
              e.$h(bu.$5());
            }
          }
        }
      }
    };
    k.$0 = function(e, bm, bn) {
      var bo = function(bp, bq) {
        bm.reject(tab._TableauException.create("serverError", bq));
      };
      return new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
        e,
        0,
        bn,
        bo
      );
    };
    var l = function(e, bm, bn) {
      this.$d = null;
      this.$f = new tab._Collection();
      this.$e = new tab._Collection();
      n.call(this, e, bm, bn);
    };
    l.__typeName = "tab._DashboardImpl";
    global.tab._DashboardImpl = l;
    var m = function(e, bm) {
      this.$3 = null;
      this.$1 = new tab._Collection();
      this.$2 = false;
      this.$0 = null;
      tab._Param.verifyString(e, "name");
      this.$3 = e;
      this.$2 = bm;
    };
    m.__typeName = "tab._DataSourceImpl";
    m.processDataSource = function(e) {
      var bm = new m(e.name, e.isPrimary);
      var bn = ss.coalesce(e.fields, []);
      for (var bo = 0; bo < bn.length; bo++) {
        var bp = bn[bo];
        var bq = tab.ApiEnumConverter.convertFieldRole(bp.role);
        var br = tab.ApiEnumConverter.convertFieldAggregation(bp.aggregation);
        var bs = new V(bm.get_dataSource(), bp.name, bq, br);
        bm.addField(bs);
      }
      return bm;
    };
    m.processDataSourcesForWorksheet = function(e) {
      var bm = new tab._Collection();
      var bn = null;
      for (var bo = 0; bo < e.dataSources.length; bo++) {
        var bp = e.dataSources[bo];
        var bq = m.processDataSource(bp);
        if (bp.isPrimary) {
          bn = bq;
        } else {
          bm._add(bp.name, bq.get_dataSource());
        }
      }
      if (ss.isValue(bn)) {
        bm._addToFirst(bn.get_name(), bn.get_dataSource());
      }
      return bm;
    };
    global.tab._DataSourceImpl = m;
    var n = function(e, bm, bn) {
      this.$5 = null;
      this.$1 = 0;
      this.$2 = false;
      this.$3 = false;
      this.$7 = null;
      this.$8 = null;
      this.$9 = null;
      this.$a = null;
      this.$4 = null;
      this.$6 = null;
      this.$b = 0;
      tab._Param.verifyValue(e, "sheetInfoImpl");
      tab._Param.verifyValue(bm, "workbookImpl");
      tab._Param.verifyValue(bn, "messagingOptions");
      this.$5 = e.name;
      this.$1 = e.index;
      this.$2 = e.isActive;
      this.$3 = e.isHidden;
      this.$7 = e.sheetType;
      this.$8 = e.size;
      this.$9 = e.url;
      this.$a = bm;
      this.$4 = bn;
      this.$b = e.zoneId;
    };
    n.__typeName = "tab._SheetImpl";
    n.$0 = function(e) {
      if (ss.isValue(e)) {
        return tab._Utility.toInt(e);
      }
      return e;
    };
    n.$1 = function(e) {
      var bm = tab.PublicEnums.normalizeEnum(tab.ApiSheetSizeBehavior).call(
        null,
        e.behavior,
        "size.behavior"
      );
      var bn = e.minSize;
      if (ss.isValue(bn)) {
        bn = tab.Size.$ctor(n.$0(e.minSize.width), n.$0(e.minSize.height));
      }
      var bo = e.maxSize;
      if (ss.isValue(bo)) {
        bo = tab.Size.$ctor(n.$0(e.maxSize.width), n.$0(e.maxSize.height));
      }
      return tab.SheetSize.$ctor(bm, bn, bo);
    };
    global.tab._SheetImpl = n;
    var o = function() {};
    o.__typeName = "tab._SheetInfoImpl";
    o.$ctor = function(e, bm, bn, bo, bp, bq, br, bs, bt) {
      var bu = new Object();
      bu.name = null;
      bu.index = 0;
      bu.workbook = null;
      bu.url = null;
      bu.isHidden = false;
      bu.sheetType = null;
      bu.zoneId = 0;
      bu.size = null;
      bu.isActive = false;
      bu.name = e;
      bu.sheetType = bm;
      bu.index = bn;
      bu.size = bo;
      bu.workbook = bp;
      bu.url = bq;
      bu.isActive = br;
      bu.isHidden = bs;
      bu.zoneId = bt;
      return bu;
    };
    o.isInstanceOfType = function() {
      return true;
    };
    global.tab._SheetInfoImpl = o;
    var p = function(e, bm, bn, bo, bp) {
      this.$g = null;
      this.$h = null;
      this.$i = null;
      this.$j = null;
      this.$2$1 = null;
      n.call(this, e, bm, bn);
      tab._Param.verifyValue(bo, "storyPm");
      tab._Param.verifyValue(bp, "findSheetFunc");
      this.$h = bp;
      this.update(bo);
    };
    p.__typeName = "tab._StoryImpl";
    global.tab._StoryImpl = p;
    var q = function(e, bm) {
      this.$1 = null;
      this.$3 = 0;
      this.$4 = false;
      this.$5 = false;
      this.$2 = null;
      this.$6 = null;
      this.$7 = null;
      this.$8 = 0;
      this.$4 = e.isActive;
      this.$5 = e.isUpdated;
      this.$1 = e.caption;
      this.$3 = e.index;
      this.$6 = e.parentStoryImpl;
      this.$8 = e.storyPointId;
      this.$2 = bm;
      if (ss.isValue(bm)) {
        this.$2.set_parentStoryPointImpl(this);
        if (bm.get_sheetType() === "dashboard") {
          var bn = this.$2;
          for (var bo = 0; bo < bn.get_worksheets().get__length(); bo++) {
            var bp = bn.get_worksheets().get_item(bo);
            bp._impl.set_parentStoryPointImpl(this);
          }
        }
      }
    };
    q.__typeName = "tab._StoryPointImpl";
    q.createContainedSheet = function(e, bm, bn, bo) {
      var bp = tab.ApiEnumConverter.convertSheetType(e.sheetType);
      var bq = -1;
      var br = tab.SheetSizeFactory.createAutomatic();
      var bs = false;
      var bt = bo(e.name);
      var bu = ss.isNullOrUndefined(bt);
      var bv = bu ? "" : bt.getUrl();
      var bw = o.$ctor(
        e.name,
        bp,
        bq,
        br,
        bm.get_workbook(),
        bv,
        bs,
        bu,
        e.zoneId
      );
      if (e.sheetType === "worksheet") {
        var bx = null;
        var by = new w(bw, bm, bn, bx);
        return by;
      } else if (e.sheetType === "dashboard") {
        var bz = new l(bw, bm, bn);
        var bA = v.$0(e.dashboardZones);
        bz.$c(bA, bo);
        return bz;
      } else if (e.sheetType === "story") {
        throw tab._TableauException.createInternalError(
          "Cannot have a story embedded within another story."
        );
      } else {
        throw tab._TableauException.createInternalError(
          "Unknown sheet type '" + e.sheetType + "'"
        );
      }
    };
    global.tab._StoryPointImpl = q;
    var r = function() {};
    r.__typeName = "tab._StoryPointInfoImpl";
    r.$ctor = function(e, bm, bn, bo, bp, bq) {
      var br = new Object();
      br.storyPointId = 0;
      br.parentStoryImpl = null;
      br.caption = null;
      br.index = 0;
      br.isActive = false;
      br.isUpdated = false;
      br.caption = e;
      br.index = bm;
      br.storyPointId = bn;
      br.isActive = bo;
      br.isUpdated = bp;
      br.parentStoryImpl = bq;
      return br;
    };
    r.isInstanceOfType = function() {
      return true;
    };
    global.tab._StoryPointInfoImpl = r;
    var s = function(e, bm) {
      this.$0 = null;
      this.$2 = null;
      this.$1 = null;
      this.$2 = e;
      this.$1 = bm;
    };
    s.__typeName = "tab._ToolbarStateImpl";
    global.tab._ToolbarStateImpl = s;
    var t = function() {};
    t.__typeName = "tab._VizManagerImpl";
    t.$4 = function() {
      return t.$5.concat();
    };
    t.$0 = function(e) {
      t.$3(e);
      t.$5.push(e);
    };
    t.$2 = function(e) {
      for (var bm = 0, bn = t.$5.length; bm < bn; bm++) {
        if (ss.referenceEquals(t.$5[bm], e)) {
          t.$5.splice(bm, 1);
          break;
        }
      }
    };
    t.$1 = function() {
      for (var e = 0, bm = t.$5.length; e < bm; e++) {
        t.$5[e]._impl.$O();
      }
    };
    t.$3 = function(e) {
      var bm = e.getParentElement();
      for (var bn = 0, bo = t.$5.length; bn < bo; bn++) {
        if (ss.referenceEquals(t.$5[bn].getParentElement(), bm)) {
          var bp =
            "Another viz is already present in element '" +
            tab._Utility.elementToString(bm) +
            "'.";
          throw tab._TableauException.create("vizAlreadyInManager", bp);
        }
      }
    };
    var u = function(e, bm, bn) {
      this.name = "";
      this.host_url = null;
      this.tabs = false;
      this.toolbar = false;
      this.toolBarPosition = null;
      this.device = null;
      this.hostId = null;
      this.width = null;
      this.height = null;
      this.parentElement = null;
      this.userSuppliedParameters = null;
      this.staticImageUrl = null;
      this.fixedSize = false;
      this.displayStaticImage = false;
      this.iframeSizedToWindow = false;
      this.$2 = null;
      this.$1 = null;
      if (ss.isNullOrUndefined(e) || ss.isNullOrUndefined(bm)) {
        throw tab._TableauException.create(
          "noUrlOrParentElementNotFound",
          "URL is empty or Parent element not found"
        );
      }
      if (ss.isNullOrUndefined(bn)) {
        bn = new Object();
        bn.hideTabs = false;
        bn.hideToolbar = false;
        bn.onFirstInteractive = null;
      }
      if (ss.isValue(bn.height) || ss.isValue(bn.width)) {
        this.fixedSize = true;
        if (tab._Utility.isNumber(bn.height)) {
          bn.height = bn.height.toString() + "px";
        }
        if (tab._Utility.isNumber(bn.width)) {
          bn.width = bn.width.toString() + "px";
        }
        this.height = ss.isValue(bn.height)
          ? tab._Utility.roundVizSizeInPixels(bn.height.toString())
          : null;
        this.width = ss.isValue(bn.width)
          ? tab._Utility.roundVizSizeInPixels(bn.width.toString())
          : null;
      } else {
        this.fixedSize = false;
      }
      this.displayStaticImage = bn.displayStaticImage || false;
      this.staticImageUrl = bn.staticImageUrl || "";
      this.tabs = !(bn.hideTabs || false);
      this.toolbar = !(bn.hideToolbar || false);
      this.device = bn.device;
      this.iframeSizedToWindow = bn.iframeSizedToWindow;
      this.parentElement = e;
      this.$1 = bn;
      this.toolBarPosition = bn.toolbarPosition;
      var bo = bm.split("?");
      this.$2 = bo[0];
      if (bo.length === 2) {
        this.userSuppliedParameters = bo[1];
      } else {
        this.userSuppliedParameters = "";
      }
      var bp = new RegExp(".*?[^/:]/", "").exec(this.$2);
      if (
        ss.isNullOrUndefined(bp) ||
        (bp[0].toLowerCase().indexOf("http://") === -1 &&
          bp[0].toLowerCase().indexOf("https://") === -1)
      ) {
        throw tab._TableauException.create("invalidUrl", "Invalid url");
      }
      this.host_url = bp[0].toLowerCase();
      this.name = this.$2.replace(bp[0], "");
      this.name = this.name.replace("views/", "");
    };
    u.__typeName = "tab._VizParameters";
    global.tab._VizParameters = u;
    var v = function(e, bm, bn) {
      this.$E = null;
      this.$D = null;
      this.$y = null;
      this.$s = null;
      this.$r = null;
      this.$A = new tab._Collection();
      this.$v = false;
      this.$x = null;
      this.$t = null;
      this.$u = new tab._Collection();
      this.$C = new tab._Collection();
      this.$B = new tab._Collection();
      this.$z = null;
      this.$w = null;
      this.$D = e;
      this.$x = bm;
      this.$5(bn);
    };
    v.__typeName = "tab._WorkbookImpl";
    v.$0 = function(e) {
      e = ss.coalesce(e, []);
      var bm = [];
      for (var bn = 0; bn < e.length; bn++) {
        var bo = e[bn];
        var bp = tab.ApiEnumConverter.convertDashboardObjectType(bo.zoneType);
        var bq = tab.Size.$ctor(bo.width, bo.height);
        var br = tab.Point.$ctor(bo.x, bo.y);
        var bs = bo.name;
        var bt = {
          name: bs,
          objectType: bp,
          position: br,
          size: bq,
          zoneId: bo.zoneId
        };
        bm.push(bt);
      }
      return bm;
    };
    v.$2 = function(e) {
      if (ss.isNullOrUndefined(e)) {
        return null;
      }
      if (tab._Utility.isString(e)) {
        return e;
      }
      var bm = ss.safeCast(e, bb);
      if (ss.isValue(bm)) {
        return bm.getName();
      }
      var bn = ss.safeCast(e, bc);
      if (ss.isValue(bn)) {
        return bn.getName();
      }
      return null;
    };
    v.$1 = function(e) {
      if (ss.isNullOrUndefined(e)) {
        return tab.SheetSizeFactory.createAutomatic();
      }
      return tab.SheetSizeFactory.fromSizeConstraints(e.sizeConstraints);
    };
    v.$4 = function(e) {
      var bm = new tab._Collection();
      for (var bn = 0; bn < e.parameters.length; bn++) {
        var bo = e.parameters[bn];
        var bp = new g(bo);
        bm._add(bp.$7(), bp.$8());
      }
      return bm;
    };
    v.$3 = function(e, bm) {
      for (var bn = 0; bn < bm.parameters.length; bn++) {
        var bo = bm.parameters[bn];
        if (ss.referenceEquals(bo.name, e)) {
          return new g(bo);
        }
      }
      return null;
    };
    global.tab._WorkbookImpl = v;
    var w = function(e, bm, bn, bo) {
      this.$N = null;
      this.$K = null;
      this.$J = new tab.GetDataCommandsBuilder();
      this.$H = new tab.FilterCommandsBuilder();
      this.$M = new tab.SharedUtils();
      this.$I = new tab._Collection();
      this.$L = new tab._Collection();
      this.highlightedMarks = null;
      n.call(this, e, bm, bn);
      this.$K = bo;
    };
    w.__typeName = "tab._WorksheetImpl";
    w.$1 = function(e) {
      var bm = e;
      if (ss.isValue(bm) && ss.isValue(bm.errorCode)) {
        var bn = ss.isValue(bm.additionalInformation)
          ? bm.additionalInformation.toString()
          : "";
        switch (bm.errorCode) {
          case "invalidFilterFieldName": {
            return tab._TableauException.create("invalidFilterFieldName", bn);
          }
          case "invalidFilterFieldValue": {
            return tab._TableauException.create("invalidFilterFieldValue", bn);
          }
          case "invalidAggregationFieldName": {
            return tab._TableauException.createInvalidAggregationFieldName(bn);
          }
          default: {
            return tab._TableauException.createServerError(bn);
          }
        }
      }
      return null;
    };
    w.$0 = function(e) {
      var bm = e;
      if (ss.isValue(bm) && ss.isValue(bm.errorCode)) {
        var bn = ss.isValue(bm.additionalInformation)
          ? bm.additionalInformation.toString()
          : "";
        switch (bm.errorCode) {
          case "invalidSelectionFieldName": {
            return tab._TableauException.create(
              "invalidSelectionFieldName",
              bn
            );
          }
          case "invalidSelectionValue": {
            return tab._TableauException.create("invalidSelectionValue", bn);
          }
          case "invalidSelectionDate": {
            return tab._TableauException.create("invalidSelectionDate", bn);
          }
        }
      }
      return null;
    };
    global.tab._WorksheetImpl = w;
    var x = function(e, bm, bn) {
      this.$2 = null;
      J.call(this, e, bm);
      this.$2 = new b(bm._impl.get__workbookImpl(), bn);
    };
    x.__typeName = "tab.CustomViewEvent";
    global.tab.CustomViewEvent = x;
    var y = function(e, bm) {
      this.$0 = null;
      this.$1 = null;
      this.$0 = e;
      this.$1 = bm;
    };
    y.__typeName = "tab.EventContext";
    global.tab.EventContext = y;
    var z = function(e, bm, bn, bo, bp) {
      this.$4 = null;
      this.$3 = null;
      P.call(this, e, bm, bn);
      this.$4 = bp;
      this.$3 = new c(bm._impl.get__workbookImpl(), bn, bo, bp);
    };
    z.__typeName = "tab.FilterEvent";
    global.tab.FilterEvent = z;
    var A = function(e, bm, bn) {
      this.$2 = null;
      J.call(this, e, bm);
      this.$2 = bn;
    };
    A.__typeName = "tab.FirstVizSizeKnownEvent";
    global.tab.FirstVizSizeKnownEvent = A;
    var B = function(e, bm, bn) {
      this.$3 = null;
      P.call(this, e, bm, bn);
      this.$3 = new d(bm._impl.get__workbookImpl(), bn);
    };
    B.__typeName = "tab.HighlightEvent";
    global.tab.HighlightEvent = B;
    var C = function() {};
    C.__typeName = "tab.IJsApiMessageHandler";
    global.tab.IJsApiMessageHandler = C;
    var D = function() {
      this.$3 = {};
      this.$2 = null;
      var e = ss.mkdel(this, function(bm, bn) {
        this.$1(bm, bn);
      });
      this.$2 = new tab.CrossDomainMessager(e);
    };
    D.__typeName = "tab.JsApiMessageRouter";
    global.tab.JsApiMessageRouter = D;
    var E = function(e, bm) {
      this.$1 = null;
      this.$0 = null;
      tab._Param.verifyValue(e, "router");
      tab._Param.verifyValue(bm, "handler");
      this.$1 = e;
      this.$0 = bm;
    };
    E.__typeName = "tab.JsApiMessagingOptions";
    global.tab.JsApiMessagingOptions = E;
    var F = function(e, bm, bn) {
      this.$3 = null;
      P.call(this, e, bm, bn);
      this.$3 = new h(bm._impl.get__workbookImpl(), bn);
    };
    F.__typeName = "tab.MarksEvent";
    global.tab.MarksEvent = F;
    var G = function(e, bm, bn) {
      this.$2 = null;
      J.call(this, e, bm);
      this.$2 = new i(bm._impl.get__workbookImpl(), bn);
    };
    G.__typeName = "tab.ParameterEvent";
    global.tab.ParameterEvent = G;
    var H = function() {};
    H.__typeName = "tab.StoryPointInfoImplUtil";
    H.clone = function(e) {
      return r.$ctor(
        e.caption,
        e.index,
        e.storyPointId,
        e.isActive,
        e.isUpdated,
        e.parentStoryImpl
      );
    };
    global.tab.StoryPointInfoImplUtil = H;
    var I = function(e, bm, bn, bo) {
      this.$3 = null;
      this.$2 = null;
      J.call(this, e, bm);
      this.$3 = bn;
      this.$2 = bo;
    };
    I.__typeName = "tab.StoryPointSwitchEvent";
    global.tab.StoryPointSwitchEvent = I;
    var J = function(e, bm) {
      this.$1 = null;
      this.$0 = null;
      this.$1 = bm;
      this.$0 = e;
    };
    J.__typeName = "tab.TableauEvent";
    global.tab.TableauEvent = J;
    var K = function(e, bm, bn, bo) {
      this.$3 = null;
      this.$2 = null;
      J.call(this, e, bm);
      this.$3 = bn;
      this.$2 = bo;
    };
    K.__typeName = "tab.TabSwitchEvent";
    global.tab.TabSwitchEvent = K;
    var L = function(e, bm, bn) {
      this.$2 = null;
      J.call(this, e, bm);
      this.$2 = bn;
    };
    L.__typeName = "tab.ToolbarStateEvent";
    global.tab.ToolbarStateEvent = L;
    var M = function(e, bm, bn, bo, bp) {
      this.$1b = null;
      this.$1p = null;
      this.$1e = null;
      this.$1o = null;
      this.$1n = null;
      this.$1f = null;
      this.$1h = null;
      this.$1s = null;
      this.$1l = null;
      this.$1m = null;
      this.$1k = false;
      this.$1d = false;
      this.$1i = false;
      this.$1c = false;
      this.$1j = null;
      this.$1q = null;
      this.$1r = null;
      this.$1g = false;
      this.$1$1 = null;
      this.$1$2 = null;
      this.$1$3 = null;
      this.$1$4 = null;
      this.$1$5 = null;
      this.$1$6 = null;
      this.$1$7 = null;
      this.$1$8 = null;
      this.$1$9 = null;
      this.$1$10 = null;
      this.$1$11 = null;
      this.$1$12 = null;
      this.$1$13 = null;
      this.$1$14 = null;
      if (
        !tab._Utility.hasWindowPostMessage() ||
        !tab._Utility.hasJsonParse()
      ) {
        throw tab._TableauException.createBrowserNotCapable();
      }
      this.$1j = new E(e, this);
      this.$1p = bm;
      if (ss.isNullOrUndefined(bn) || bn.nodeType !== 1) {
        bn = document.body;
      }
      this.$1n = new u(bn, bo, bp);
      if (ss.isValue(bp)) {
        this.$1l = bp.onFirstInteractive;
        this.$1m = bp.onFirstVizSizeKnown;
      }
    };
    M.__typeName = "tab.VizImpl";
    global.tab.VizImpl = M;
    var N = function(e, bm, bn) {
      this.$2 = null;
      J.call(this, e, bm);
      this.$2 = bn;
    };
    N.__typeName = "tab.VizResizeEvent";
    global.tab.VizResizeEvent = N;
    var O = function() {};
    O.__typeName = "tab.VizSize";
    O.$ctor = function(e, bm) {
      var bn = new Object();
      bn.sheetSize = null;
      bn.chromeHeight = 0;
      bn.sheetSize = e;
      bn.chromeHeight = bm;
      return bn;
    };
    O.isInstanceOfType = function() {
      return true;
    };
    global.tab.VizSize = O;
    var P = function(e, bm, bn) {
      this.$2 = null;
      J.call(this, e, bm);
      this.$2 = bn;
    };
    P.__typeName = "tab.WorksheetEvent";
    global.tab.WorksheetEvent = P;
    var Q = function(e, bm) {
      this.$a = false;
      this.$9 = null;
      W.call(this, e, bm);
      this.$8(bm);
    };
    Q.__typeName = "tableauSoftware.CategoricalFilter";
    global.tableauSoftware.CategoricalFilter = Q;
    var R = function(e) {
      this._impl = null;
      this._impl = e;
    };
    R.__typeName = "tableauSoftware.CustomView";
    global.tableauSoftware.CustomView = R;
    var S = function(e) {
      this._impl = null;
      bb.call(this, e);
    };
    S.__typeName = "tableauSoftware.Dashboard";
    global.tableauSoftware.Dashboard = S;
    var T = function(e, bm, bn) {
      this.$2 = null;
      this.$0 = null;
      this.$1 = null;
      if (e.objectType === "worksheet" && ss.isNullOrUndefined(bn)) {
        throw tab._TableauException.createInternalError(
          "worksheet parameter is required for WORKSHEET objects"
        );
      } else if (e.objectType !== "worksheet" && ss.isValue(bn)) {
        throw tab._TableauException.createInternalError(
          "worksheet parameter should be undefined for non-WORKSHEET objects"
        );
      }
      this.$2 = e;
      this.$0 = bm;
      this.$1 = bn;
    };
    T.__typeName = "tableauSoftware.DashboardObject";
    global.tableauSoftware.DashboardObject = T;
    var U = function(e) {
      this.$0 = null;
      this.$0 = e;
    };
    U.__typeName = "tableauSoftware.DataSource";
    global.tableauSoftware.DataSource = U;
    var V = function(e, bm, bn, bo) {
      this.$0 = null;
      this.$3 = null;
      this.$2 = null;
      this.$1 = null;
      this.$0 = e;
      this.$3 = bm;
      this.$2 = bn;
      this.$1 = bo;
    };
    V.__typeName = "tableauSoftware.Field";
    global.tableauSoftware.Field = V;
    var W = function(e, bm) {
      this.$7 = null;
      this.$6 = null;
      this.$1 = null;
      this.$3 = null;
      this.$2 = null;
      this.$5 = null;
      this.$4 = null;
      this.$7 = e;
      this.$0(bm);
    };
    W.__typeName = "tableauSoftware.Filter";
    W.$0 = function(e, bm) {
      switch (bm.filterType) {
        case "categorical": {
          return new Q(e, bm);
        }
        case "relativedate": {
          return new ba(e, bm);
        }
        case "hierarchical": {
          return new X(e, bm);
        }
        case "quantitative": {
          return new Z(e, bm);
        }
      }
      return null;
    };
    W.processFiltersList = function(e, bm) {
      var bn = new tab._Collection();
      for (var bo = 0; bo < bm.filters.length; bo++) {
        var bp = bm.filters[bo];
        if (!bn._has(bp.caption)) {
          bn._add(bp.caption, bp.caption);
        }
      }
      var bq = new tab._Collection();
      for (var br = 0; br < bm.filters.length; br++) {
        var bs = bm.filters[br];
        var bt = W.$0(e, bs);
        if (!bq._has(bs.caption)) {
          bq._add(bs.caption, bt);
          continue;
        }
        var bu = bs.caption.toString() + "_" + bs.filterType.toString();
        var bv = bu;
        var bw = 1;
        while (bn._has(bv)) {
          bv = bu + "_" + bw;
          bw++;
        }
        bq._add(bv, bt);
      }
      return bq;
    };
    global.tableauSoftware.Filter = W;
    var X = function(e, bm) {
      this.$9 = 0;
      W.call(this, e, bm);
      this.$8(bm);
    };
    X.__typeName = "tableauSoftware.HierarchicalFilter";
    global.tableauSoftware.HierarchicalFilter = X;
    var Y = function(e) {
      this._impl = null;
      this._impl = e;
    };
    Y.__typeName = "tableauSoftware.Parameter";
    global.tableauSoftware.Parameter = Y;
    var Z = function(e, bm) {
      this.$a = null;
      this.$9 = null;
      this.$d = null;
      this.$c = null;
      this.$b = false;
      W.call(this, e, bm);
      this.$8(bm);
    };
    Z.__typeName = "tableauSoftware.QuantitativeFilter";
    global.tableauSoftware.QuantitativeFilter = Z;
    var ba = function(e, bm) {
      this.$9 = null;
      this.$b = null;
      this.$a = 0;
      W.call(this, e, bm);
      this.$8(bm);
    };
    ba.__typeName = "tableauSoftware.RelativeDateFilter";
    global.tableauSoftware.RelativeDateFilter = ba;
    var bb = function(e) {
      this._impl = null;
      tab._Param.verifyValue(e, "sheetImpl");
      this._impl = e;
    };
    bb.__typeName = "tableauSoftware.Sheet";
    global.tableauSoftware.Sheet = bb;
    var bc = function(e) {
      this.$0 = null;
      this.$0 = e;
    };
    bc.__typeName = "tableauSoftware.SheetInfo";
    global.tableauSoftware.SheetInfo = bc;
    var bd = function(e) {
      this._impl = null;
      bb.call(this, e);
    };
    bd.__typeName = "tableauSoftware.Story";
    global.tableauSoftware.Story = bd;
    var be = function(e) {
      this.$0 = null;
      this.$0 = e;
    };
    be.__typeName = "tableauSoftware.StoryPoint";
    global.tableauSoftware.StoryPoint = be;
    var bf = function(e) {
      this._impl = null;
      this._impl = e;
    };
    bf.__typeName = "tableauSoftware.StoryPointInfo";
    global.tableauSoftware.StoryPointInfo = bf;
    var bg = function(e) {
      this._impl = null;
      this._impl = e;
    };
    bg.__typeName = "tableauSoftware.ToolbarState";
    global.tableauSoftware.ToolbarState = bg;
    var bh = function(e, bm, bn, bo) {
      this.$0 = 0;
      this.$2 = 0;
      this.$3 = 0;
      this.$1 = null;
      this.$0 = e;
      this.$2 = bm;
      this.$3 = bn;
      this.$1 = ss.coalesce(bo, null);
    };
    bh.__typeName = "tableauSoftware.Version";
    bh.getCurrent = function() {
      return bh.$0;
    };
    global.tableauSoftware.Version = bh;
    var bi = function(e, bm, bn) {
      this._impl = null;
      var bo = tab._ApiObjectRegistry.getApiMessageRouter();
      this._impl = new M(bo, this, e, bm, bn);
      this._impl.$4();
    };
    bi.__typeName = "tableauSoftware.Viz";
    global.tableauSoftware.Viz = bi;
    var bj = function() {};
    bj.__typeName = "tableauSoftware.VizManager";
    bj.getVizs = function() {
      return t.$4();
    };
    global.tableauSoftware.VizManager = bj;
    var bk = function(e) {
      this.$0 = null;
      this.$0 = e;
    };
    bk.__typeName = "tableauSoftware.Workbook";
    global.tableauSoftware.Workbook = bk;
    var bl = function(e) {
      this._impl = null;
      bb.call(this, e);
    };
    bl.__typeName = "tableauSoftware.Worksheet";
    global.tableauSoftware.Worksheet = bl;
    ss.initClass(y, a, {
      get__workbookImpl: function() {
        return this.$0;
      },
      get__worksheetImpl: function() {
        return this.$1;
      }
    });
    ss.initClass(
      b,
      a,
      {
        get__customViewImpl: function() {
          return this.$2;
        }
      },
      y
    );
    ss.initClass(
      c,
      a,
      {
        get__filterFieldName: function() {
          return this.$3;
        },
        $2: function() {
          return this.$4;
        }
      },
      y
    );
    ss.initClass(d, a, {}, y);
    ss.initClass(f, a, {});
    ss.initClass(g, a, {
      $8: function() {
        if (ss.isNullOrUndefined(this.$i)) {
          this.$i = new Y(this);
        }
        return this.$i;
      },
      $7: function() {
        return this.$h;
      },
      $2: function() {
        return this.$c;
      },
      $3: function() {
        return this.$d;
      },
      $1: function() {
        return this.$b;
      },
      $0: function() {
        return this.$a;
      },
      $6: function() {
        return this.$g;
      },
      $5: function() {
        return this.$f;
      },
      $9: function() {
        return this.$j;
      },
      $4: function() {
        return this.$e;
      }
    });
    ss.initClass(h, a, {}, y);
    ss.initClass(
      i,
      a,
      {
        get__parameterName: function() {
          return this.$2;
        }
      },
      y
    );
    ss.initClass(j, a, {});
    ss.initClass(k, a, {
      $5: function() {
        if (ss.isNullOrUndefined(this.$c)) {
          this.$c = new R(this);
        }
        return this.$c;
      },
      $b: function() {
        return this.$l.get_workbook();
      },
      $a: function() {
        return this.$k;
      },
      $7: function() {
        return this.$h;
      },
      $8: function(e) {
        if (this.$f) {
          throw tab._TableauException.create(
            "staleDataReference",
            "Stale data"
          );
        }
        this.$h = e;
      },
      $9: function() {
        return this.$i;
      },
      $3: function() {
        return this.$e;
      },
      $4: function(e) {
        if (this.$f) {
          throw tab._TableauException.create(
            "staleDataReference",
            "Stale data"
          );
        }
        this.$e = e;
      },
      $6: function() {
        return this.$d;
      },
      $2: function() {
        if (this.$f || ss.isNullOrUndefined(this.$j)) {
          throw tab._TableauException.create(
            "staleDataReference",
            "Stale data"
          );
        }
        this.$j.isPublic = this.$e;
        this.$j.name = this.$h;
        var e = new tab._Deferred();
        var bm = {};
        bm["api.customViewParam"] = this.$j;
        var bn = k.$0(
          "api.UpdateCustomViewCommand",
          e,
          ss.mkdel(this, function(bo) {
            k._processCustomViewUpdate(this.$l, this.$g, bo, true);
            e.resolve(this.$5());
          })
        );
        this.$g.sendCommand(Object).call(this.$g, bm, bn);
        return e.get_promise();
      },
      $1: function() {
        var e = new tab._Deferred();
        var bm = {};
        bm["api.customViewParam"] = this.$j;
        var bn = k.$0(
          "api.RemoveCustomViewCommand",
          e,
          ss.mkdel(this, function(bo) {
            this.$f = true;
            k._processCustomViews(this.$l, this.$g, bo);
            e.resolve(this.$5());
          })
        );
        this.$g.sendCommand(Object).call(this.$g, bm, bn);
        return e.get_promise();
      },
      _showAsync: function() {
        if (this.$f || ss.isNullOrUndefined(this.$j)) {
          throw tab._TableauException.create(
            "staleDataReference",
            "Stale data"
          );
        }
        return k._showCustomViewAsync(this.$l, this.$g, this.$j);
      },
      $0: function(e) {
        return (
          !ss.referenceEquals(this.$i, e.$i) ||
          !ss.referenceEquals(this.$k, e.$k) ||
          this.$e !== e.$e ||
          this.$d !== e.$d
        );
      }
    });
    ss.initClass(n, a, {
      get_sheet: null,
      get_name: function() {
        return this.$5;
      },
      get_index: function() {
        return this.$1;
      },
      get_workbookImpl: function() {
        return this.$a;
      },
      get_workbook: function() {
        return this.$a.get_workbook();
      },
      get_url: function() {
        if (this.$3) {
          throw tab._TableauException.createNoUrlForHiddenWorksheet();
        }
        return this.$9;
      },
      get_size: function() {
        return this.$8;
      },
      get_isHidden: function() {
        return this.$3;
      },
      get_isActive: function() {
        return this.$2;
      },
      set_isActive: function(e) {
        this.$2 = e;
      },
      get_isDashboard: function() {
        return this.$7 === "dashboard";
      },
      get_isStory: function() {
        return this.$7 === "story";
      },
      get_sheetType: function() {
        return this.$7;
      },
      get_parentStoryPoint: function() {
        if (ss.isValue(this.$6)) {
          return this.$6.get_storyPoint();
        }
        return null;
      },
      get_parentStoryPointImpl: function() {
        return this.$6;
      },
      set_parentStoryPointImpl: function(e) {
        if (this.$7 === "story") {
          throw tab._TableauException.createInternalError(
            "A story cannot be a child of another story."
          );
        }
        this.$6 = e;
      },
      get_zoneId: function() {
        return this.$b;
      },
      get_messagingOptions: function() {
        return this.$4;
      },
      changeSizeAsync: function(e) {
        e = n.$1(e);
        if (this.$7 === "worksheet" && e.behavior !== "automatic") {
          throw tab._TableauException.createInvalidSizeBehaviorOnWorksheet();
        }
        var bm = new tab._Deferred();
        if (this.$8.behavior === e.behavior && e.behavior === "automatic") {
          bm.resolve(e);
          return bm.get_promise();
        }
        var bn = this.$0(e);
        var bo = {};
        bo["api.setSheetSizeName"] = this.$5;
        bo["api.minWidth"] = bn["api.minWidth"];
        bo["api.minHeight"] = bn["api.minHeight"];
        bo["api.maxWidth"] = bn["api.maxWidth"];
        bo["api.maxHeight"] = bn["api.maxHeight"];
        var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.SetSheetSizeCommand",
          1,
          ss.mkdel(this, function(bq) {
            this.get_workbookImpl()._update(
              ss.mkdel(this, function() {
                var br = this.get_workbookImpl()
                  .get_publishedSheets()
                  ._get(this.get_name())
                  .getSize();
                bm.resolve(br);
              })
            );
          }),
          function(bq, br) {
            bm.reject(tab._TableauException.createServerError(br));
          }
        );
        this.sendCommand(Object).call(this, bo, bp);
        return bm.get_promise();
      },
      sendCommand: function(e) {
        return function(bm, bn) {
          this.$4.sendCommand(e).call(this.$4, bm, bn);
        };
      },
      $0: function(e) {
        var bm = null;
        if (
          ss.isNullOrUndefined(e) ||
          ss.isNullOrUndefined(e.behavior) ||
          (e.behavior !== "automatic" &&
            ss.isNullOrUndefined(e.minSize) &&
            ss.isNullOrUndefined(e.maxSize))
        ) {
          throw tab._TableauException.createInvalidSheetSizeParam();
        }
        var bn = 0;
        var bo = 0;
        var bp = 0;
        var bq = 0;
        var br = {};
        br["api.minWidth"] = 0;
        br["api.minHeight"] = 0;
        br["api.maxWidth"] = 0;
        br["api.maxHeight"] = 0;
        if (e.behavior === "automatic") {
          bm = tab.SheetSize.$ctor("automatic", undefined, undefined);
        } else if (e.behavior === "atmost") {
          if (
            ss.isNullOrUndefined(e.maxSize) ||
            ss.isNullOrUndefined(e.maxSize.width) ||
            ss.isNullOrUndefined(e.maxSize.height)
          ) {
            throw tab._TableauException.createMissingMaxSize();
          }
          if (e.maxSize.width < 0 || e.maxSize.height < 0) {
            throw tab._TableauException.createInvalidSizeValue();
          }
          br["api.maxWidth"] = e.maxSize.width;
          br["api.maxHeight"] = e.maxSize.height;
          bm = tab.SheetSize.$ctor("atmost", undefined, e.maxSize);
        } else if (e.behavior === "atleast") {
          if (
            ss.isNullOrUndefined(e.minSize) ||
            ss.isNullOrUndefined(e.minSize.width) ||
            ss.isNullOrUndefined(e.minSize.height)
          ) {
            throw tab._TableauException.createMissingMinSize();
          }
          if (e.minSize.width < 0 || e.minSize.height < 0) {
            throw tab._TableauException.createInvalidSizeValue();
          }
          br["api.minWidth"] = e.minSize.width;
          br["api.minHeight"] = e.minSize.height;
          bm = tab.SheetSize.$ctor("atleast", e.minSize, undefined);
        } else if (e.behavior === "range") {
          if (
            ss.isNullOrUndefined(e.minSize) ||
            ss.isNullOrUndefined(e.maxSize) ||
            ss.isNullOrUndefined(e.minSize.width) ||
            ss.isNullOrUndefined(e.maxSize.width) ||
            ss.isNullOrUndefined(e.minSize.height) ||
            ss.isNullOrUndefined(e.maxSize.height)
          ) {
            throw tab._TableauException.createMissingMinMaxSize();
          }
          if (
            e.minSize.width < 0 ||
            e.minSize.height < 0 ||
            e.maxSize.width < 0 ||
            e.maxSize.height < 0 ||
            e.minSize.width > e.maxSize.width ||
            e.minSize.height > e.maxSize.height
          ) {
            throw tab._TableauException.createInvalidRangeSize();
          }
          br["api.minWidth"] = e.minSize.width;
          br["api.minHeight"] = e.minSize.height;
          br["api.maxWidth"] = e.maxSize.width;
          br["api.maxHeight"] = e.maxSize.height;
          bm = tab.SheetSize.$ctor("range", e.minSize, e.maxSize);
        } else if (e.behavior === "exactly") {
          if (
            ss.isValue(e.minSize) &&
            ss.isValue(e.maxSize) &&
            ss.isValue(e.minSize.width) &&
            ss.isValue(e.maxSize.width) &&
            ss.isValue(e.minSize.height) &&
            ss.isValue(e.maxSize.height)
          ) {
            bn = e.minSize.width;
            bo = e.minSize.height;
            bp = e.maxSize.width;
            bq = e.maxSize.height;
            if (bn !== bp || bo !== bq) {
              throw tab._TableauException.createSizeConflictForExactly();
            }
          } else if (
            ss.isValue(e.minSize) &&
            ss.isValue(e.minSize.width) &&
            ss.isValue(e.minSize.height)
          ) {
            bn = e.minSize.width;
            bo = e.minSize.height;
            bp = bn;
            bq = bo;
          } else if (
            ss.isValue(e.maxSize) &&
            ss.isValue(e.maxSize.width) &&
            ss.isValue(e.maxSize.height)
          ) {
            bp = e.maxSize.width;
            bq = e.maxSize.height;
            bn = bp;
            bo = bq;
          }
          br["api.minWidth"] = bn;
          br["api.minHeight"] = bo;
          br["api.maxWidth"] = bp;
          br["api.maxHeight"] = bq;
          bm = tab.SheetSize.$ctor(
            "exactly",
            tab.Size.$ctor(bn, bo),
            tab.Size.$ctor(bp, bq)
          );
        }
        this.$8 = bm;
        return br;
      }
    });
    ss.initClass(
      l,
      a,
      {
        get_sheet: function() {
          return this.get_dashboard();
        },
        get_dashboard: function() {
          if (ss.isNullOrUndefined(this.$d)) {
            this.$d = new S(this);
          }
          return this.$d;
        },
        get_worksheets: function() {
          return this.$f;
        },
        get_objects: function() {
          return this.$e;
        },
        $c: function(e, bm) {
          this.$e = new tab._Collection();
          this.$f = new tab._Collection();
          for (var bn = 0; bn < e.length; bn++) {
            var bo = e[bn];
            var bp = null;
            if (e[bn].objectType === "worksheet") {
              var bq = bo.name;
              if (ss.isNullOrUndefined(bq)) {
                continue;
              }
              var br = this.$f.get__length();
              var bs = tab.SheetSizeFactory.createAutomatic();
              var bt = false;
              var bu = bm(bq);
              var bv = ss.isNullOrUndefined(bu);
              var bw = bv ? "" : bu.getUrl();
              var bx = o.$ctor(
                bq,
                "worksheet",
                br,
                bs,
                this.get_workbook(),
                bw,
                bt,
                bv,
                bo.zoneId
              );
              var by = new w(
                bx,
                this.get_workbookImpl(),
                this.get_messagingOptions(),
                this
              );
              bp = by.get_worksheet();
              this.$f._add(bq, by.get_worksheet());
            }
            var bz = new T(bo, this.get_dashboard(), bp);
            this.$e._add(bn.toString(), bz);
          }
        }
      },
      n
    );
    ss.initClass(m, a, {
      get_dataSource: function() {
        if (ss.isNullOrUndefined(this.$0)) {
          this.$0 = new U(this);
        }
        return this.$0;
      },
      get_name: function() {
        return this.$3;
      },
      get_fields: function() {
        return this.$1;
      },
      get_isPrimary: function() {
        return this.$2;
      },
      addField: function(e) {
        this.$1._add(e.getName(), e);
      }
    });
    ss.initClass(o, a, {}, Object);
    ss.initClass(
      p,
      a,
      {
        add_activeStoryPointChange: function(e) {
          this.$2$1 = ss.delegateCombine(this.$2$1, e);
        },
        remove_activeStoryPointChange: function(e) {
          this.$2$1 = ss.delegateRemove(this.$2$1, e);
        },
        get_activeStoryPointImpl: function() {
          return this.$g;
        },
        get_sheet: function() {
          return this.get_story();
        },
        get_story: function() {
          if (ss.isNullOrUndefined(this.$i)) {
            this.$i = new bd(this);
          }
          return this.$i;
        },
        get_storyPointsInfo: function() {
          return this.$j;
        },
        update: function(e) {
          var bm = null;
          var bn = null;
          this.$j = this.$j || new Array(e.storyPoints.length);
          for (var bo = 0; bo < e.storyPoints.length; bo++) {
            var bp = e.storyPoints[bo];
            var bq = bp.caption;
            var br = bo === e.activeStoryPointIndex;
            var bs = r.$ctor(bq, bo, bp.storyPointId, br, bp.isUpdated, this);
            if (ss.isNullOrUndefined(this.$j[bo])) {
              this.$j[bo] = new bf(bs);
            } else if (this.$j[bo]._impl.storyPointId === bs.storyPointId) {
              var bt = this.$j[bo]._impl;
              bt.caption = bs.caption;
              bt.index = bs.index;
              bt.isActive = br;
              bt.isUpdated = bs.isUpdated;
            } else {
              this.$j[bo] = new bf(bs);
            }
            if (br) {
              bm = bp.containedSheetInfo;
              bn = bs;
            }
          }
          var bu = this.$j.length - e.storyPoints.length;
          this.$j.splice(e.storyPoints.length, bu);
          var bv =
            ss.isNullOrUndefined(this.$g) ||
            this.$g.get_storyPointId() !== bn.storyPointId;
          if (ss.isValue(this.$g) && bv) {
            this.$g.set_isActive(false);
          }
          var bw = this.$g;
          if (bv) {
            var bx = q.createContainedSheet(
              bm,
              this.get_workbookImpl(),
              this.get_messagingOptions(),
              this.$h
            );
            this.$g = new q(bn, bx);
          } else {
            this.$g.set_isActive(bn.isActive);
            this.$g.set_isUpdated(bn.isUpdated);
          }
          if (bv && ss.isValue(bw)) {
            this.$d(this.$j[bw.get_index()], this.$g.get_storyPoint());
          }
        },
        activatePreviousStoryPointAsync: function() {
          return this.$c("api.ActivatePreviousStoryPoint");
        },
        activateNextStoryPointAsync: function() {
          return this.$c("api.ActivateNextStoryPoint");
        },
        activateStoryPointAsync: function(e) {
          var bm = new tab._Deferred();
          if (e < 0 || e >= this.$j.length) {
            throw tab._TableauException.createIndexOutOfRange(e);
          }
          var bn = {};
          bn["api.storyPointIndex"] = e;
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.ActivateStoryPoint",
            0,
            ss.mkdel(this, function(bp) {
              this.$e(bp);
              bm.resolve(this.$g.get_storyPoint());
            }),
            function(bp, bq) {
              bm.reject(tab._TableauException.createServerError(bq));
            }
          );
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        revertStoryPointAsync: function(e) {
          e = e || this.$g.get_index();
          if (e < 0 || e >= this.$j.length) {
            throw tab._TableauException.createIndexOutOfRange(e);
          }
          var bm = new tab._Deferred();
          var bn = {};
          bn["api.storyPointIndex"] = e;
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.RevertStoryPoint",
            0,
            ss.mkdel(this, function(bp) {
              this.$f(e, bp);
              bm.resolve(this.$j[e]);
            }),
            function(bp, bq) {
              bm.reject(tab._TableauException.createServerError(bq));
            }
          );
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        $c: function(e) {
          if (
            e !== "api.ActivatePreviousStoryPoint" &&
            e !== "api.ActivateNextStoryPoint"
          ) {
            throw tab._TableauException.createInternalError(
              "commandName '" + e + "' is invalid."
            );
          }
          var bm = new tab._Deferred();
          var bn = {};
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            e,
            0,
            ss.mkdel(this, function(bp) {
              this.$e(bp);
              bm.resolve(this.$g.get_storyPoint());
            }),
            function(bp, bq) {
              bm.reject(tab._TableauException.createServerError(bq));
            }
          );
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        $f: function(e, bm) {
          var bn = this.$j[e]._impl;
          if (bn.storyPointId !== bm.storyPointId) {
            throw tab._TableauException.createInternalError(
              "We should not be updating a story point where the IDs don't match. Existing storyPointID=" +
                bn.storyPointId +
                ", newStoryPointID=" +
                bm.storyPointId
            );
          }
          bn.caption = bm.caption;
          bn.isUpdated = bm.isUpdated;
          if (bm.storyPointId === this.$g.get_storyPointId()) {
            this.$g.set_isUpdated(bm.isUpdated);
          }
        },
        $e: function(e) {
          var bm = this.$g;
          var bn = e.index;
          if (bm.get_index() === bn) {
            return;
          }
          var bo = this.$j[bm.get_index()];
          var bp = this.$j[bn]._impl;
          var bq = q.createContainedSheet(
            e.containedSheetInfo,
            this.get_workbookImpl(),
            this.get_messagingOptions(),
            this.$h
          );
          bp.isActive = true;
          this.$g = new q(bp, bq);
          bm.set_isActive(false);
          bo._impl.isActive = false;
          this.$d(bo, this.$g.get_storyPoint());
        },
        $d: function(e, bm) {
          if (!ss.staticEquals(this.$2$1, null)) {
            this.$2$1(e, bm);
          }
        }
      },
      n
    );
    ss.initClass(q, a, {
      get_caption: function() {
        return this.$1;
      },
      get_containedSheetImpl: function() {
        return this.$2;
      },
      get_index: function() {
        return this.$3;
      },
      get_isActive: function() {
        return this.$4;
      },
      set_isActive: function(e) {
        this.$4 = e;
      },
      get_isUpdated: function() {
        return this.$5;
      },
      set_isUpdated: function(e) {
        this.$5 = e;
      },
      get_parentStoryImpl: function() {
        return this.$6;
      },
      get_storyPoint: function() {
        if (ss.isNullOrUndefined(this.$7)) {
          this.$7 = new be(this);
        }
        return this.$7;
      },
      get_storyPointId: function() {
        return this.$8;
      },
      $0: function() {
        return r.$ctor(this.$1, this.$3, this.$8, this.$4, this.$5, this.$6);
      }
    });
    ss.initClass(r, a, {}, Object);
    ss.initClass(s, a, {
      get_toolbarState: function() {
        if (ss.isNullOrUndefined(this.$0)) {
          this.$0 = new bg(this);
        }
        return this.$0;
      },
      get_viz: function() {
        return this.$2.$18();
      },
      isButtonEnabled: function(e) {
        switch (e) {
          case "redo": {
            return this.$1.canRedo;
          }
          case "undo": {
            return this.$1.canUndo;
          }
          default: {
            throw tab._TableauException.createInvalidToolbarButtonName(e);
          }
        }
      }
    });
    ss.initClass(t, a, {});
    ss.initClass(u, a, {
      get_url: function() {
        return this.$0();
      },
      get_baseUrl: function() {
        return this.$2;
      },
      $0: function() {
        var e = [];
        e.push(this.get_baseUrl());
        e.push("?");
        if (this.userSuppliedParameters.length > 0) {
          e.push(this.userSuppliedParameters);
          e.push("&");
        }
        var bm =
          !this.fixedSize &&
          !(this.userSuppliedParameters.indexOf(":size=") !== -1) &&
          this.parentElement.clientWidth * this.parentElement.clientHeight > 0;
        if (bm) {
          e.push(":size=");
          e.push(
            this.parentElement.clientWidth +
              "," +
              this.parentElement.clientHeight
          );
          e.push("&");
        }
        e.push(":embed=y");
        e.push("&:showVizHome=n");
        if (!this.fixedSize) {
          e.push("&:bootstrapWhenNotified=y");
        }
        if (!this.tabs) {
          e.push("&:tabs=n");
        }
        if (this.displayStaticImage) {
          e.push("&:display_static_image=y");
        }
        if (!this.toolbar) {
          e.push("&:toolbar=n");
        } else if (!ss.isNullOrUndefined(this.toolBarPosition)) {
          e.push("&:toolbar=");
          e.push(this.toolBarPosition.toString());
        }
        if (ss.isValue(this.device)) {
          e.push("&:device=");
          e.push(this.device.toString());
        }
        var bn = this.$1;
        var bo = new ss.ObjectEnumerator(bn);
        try {
          while (bo.moveNext()) {
            var bp = bo.current();
            if (
              bp.key !== "embed" &&
              bp.key !== "height" &&
              bp.key !== "width" &&
              bp.key !== "device" &&
              bp.key !== "autoSize" &&
              bp.key !== "hideTabs" &&
              bp.key !== "hideToolbar" &&
              bp.key !== "onFirstInteractive" &&
              bp.key !== "onFirstVizSizeKnown" &&
              bp.key !== "toolbarPosition" &&
              bp.key !== "instanceIdToClone" &&
              bp.key !== "display_static_image"
            ) {
              e.push("&");
              e.push(encodeURIComponent(bp.key));
              e.push("=");
              e.push(encodeURIComponent(bp.value.toString()));
            }
          }
        } finally {
          bo.dispose();
        }
        e.push("&:apiID=" + this.hostId);
        if (ss.isValue(this.$1.instanceIdToClone)) {
          e.push("#" + this.$1.instanceIdToClone);
        }
        return e.join("");
      }
    });
    ss.initClass(v, a, {
      get_workbook: function() {
        if (ss.isNullOrUndefined(this.$E)) {
          this.$E = new bk(this);
        }
        return this.$E;
      },
      get_viz: function() {
        return this.$D.$18();
      },
      get_publishedSheets: function() {
        return this.$A;
      },
      get_name: function() {
        return this.$y;
      },
      get_activeSheetImpl: function() {
        return this.$s;
      },
      get_activeCustomView: function() {
        return this.$t;
      },
      get_isDownloadAllowed: function() {
        return this.$v;
      },
      $4: function(e) {
        if (ss.isNullOrUndefined(this.$s)) {
          return null;
        }
        var bm = v.$2(e);
        if (ss.isNullOrUndefined(bm)) {
          return null;
        }
        if (ss.referenceEquals(bm, this.$s.get_name())) {
          return this.$s;
        }
        if (this.$s.get_isDashboard()) {
          var bn = this.$s;
          var bo = bn.get_worksheets()._get(bm);
          if (ss.isValue(bo)) {
            return bo._impl;
          }
        }
        return null;
      },
      _setActiveSheetAsync: function(e) {
        if (tab._Utility.isNumber(e)) {
          var bm = e;
          if (bm < this.$A.get__length() && bm >= 0) {
            return this.$1(this.$A.get_item(bm).$0);
          } else {
            throw tab._TableauException.createIndexOutOfRange(bm);
          }
        }
        var bn = v.$2(e);
        var bo = this.$A._get(bn);
        if (ss.isValue(bo)) {
          return this.$1(bo.$0);
        } else if (this.$s.get_isDashboard()) {
          var bp = this.$s;
          var bq = bp.get_worksheets()._get(bn);
          if (ss.isValue(bq)) {
            this.$r = null;
            var br = "";
            if (bq.getIsHidden()) {
              this.$r = bq._impl;
            } else {
              br = bq._impl.get_url();
            }
            return this.$0(bq._impl.get_name(), br);
          }
        }
        throw tab._TableauException.create(
          "sheetNotInWorkbook",
          "Sheet is not found in Workbook"
        );
      },
      _revertAllAsync: function() {
        var e = new tab._Deferred();
        var bm = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.RevertAllCommand",
          1,
          function(bn) {
            e.resolve();
          },
          function(bn, bo) {
            e.reject(tab._TableauException.createServerError(bo));
          }
        );
        this.$d(Object).call(this, null, bm);
        return e.get_promise();
      },
      _update: function(e) {
        this.$5(e);
      },
      $1: function(e) {
        return this.$0(e.name, e.url);
      },
      $0: function(e, bm) {
        var bn = new tab._Deferred();
        if (ss.isValue(this.$s) && ss.referenceEquals(e, this.$s.get_name())) {
          bn.resolve(this.$s.get_sheet());
          return bn.get_promise();
        }
        var bo = {};
        bo["api.switchToSheetName"] = e;
        bo["api.switchToRepositoryUrl"] = bm;
        bo["api.oldRepositoryUrl"] = this.$s.get_url();
        var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.SwitchActiveSheetCommand",
          0,
          ss.mkdel(this, function(bq) {
            this.$D.$1b = ss.mkdel(this, function() {
              this.$D.$1b = null;
              bn.resolve(this.$s.get_sheet());
            });
          }),
          function(bq, br) {
            bn.reject(tab._TableauException.createServerError(br));
          }
        );
        this.$d(Object).call(this, bo, bp);
        return bn.get_promise();
      },
      _updateActiveSheetAsync: function() {
        var e = new tab._Deferred();
        var bm = {};
        bm["api.switchToSheetName"] = this.$s.get_name();
        bm["api.switchToRepositoryUrl"] = this.$s.get_url();
        bm["api.oldRepositoryUrl"] = this.$s.get_url();
        var bn = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.UpdateActiveSheetCommand",
          0,
          ss.mkdel(this, function(bo) {
            e.resolve(this.$s.get_sheet());
          }),
          function(bo, bp) {
            e.reject(tab._TableauException.createServerError(bp));
          }
        );
        this.$d(Object).call(this, bm, bn);
        return e.get_promise();
      },
      $d: function(e) {
        return function(bm, bn) {
          this.$x.sendCommand(e).call(this.$x, bm, bn);
        };
      },
      $5: function(e) {
        var bm = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.GetClientInfoCommand",
          0,
          ss.mkdel(this, function(bn) {
            this.$a(bn);
            if (ss.isValue(e)) {
              e();
            }
          }),
          null
        );
        this.$d(Object).call(this, null, bm);
      },
      $a: function(e) {
        this.$y = e.workbookName;
        this.$v = e.isDownloadAllowed;
        this.$D.$P(!e.isAutoUpdate);
        this.$D.set_instanceId(e.instanceId);
        this.$3(e);
        this.$9(e);
      },
      $9: function(e) {
        var bm = e.currentSheetName;
        var bn = this.$A._get(bm);
        if (ss.isNullOrUndefined(bn) && ss.isNullOrUndefined(this.$r)) {
          throw tab._TableauException.createInternalError(
            "The active sheet was not specified in baseSheets"
          );
        }
        if (ss.isValue(this.$s) && ss.referenceEquals(this.$s.get_name(), bm)) {
          return;
        }
        if (ss.isValue(this.$s)) {
          this.$s.set_isActive(false);
          var bo = this.$A._get(this.$s.get_name());
          if (ss.isValue(bo)) {
            bo.$0.isActive = false;
          }
          if (this.$s.get_sheetType() === "story") {
            var bp = this.$s;
            bp.remove_activeStoryPointChange(
              ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch)
            );
          }
        }
        if (ss.isValue(this.$r)) {
          var bq = o.$ctor(
            this.$r.get_name(),
            "worksheet",
            -1,
            this.$r.get_size(),
            this.get_workbook(),
            "",
            true,
            true,
            4294967295
          );
          this.$r = null;
          this.$s = new w(bq, this, this.$x, null);
        } else {
          var br = null;
          for (var bs = 0, bt = e.publishedSheets.length; bs < bt; bs++) {
            if (ss.referenceEquals(e.publishedSheets[bs].name, bm)) {
              br = e.publishedSheets[bs];
              break;
            }
          }
          if (ss.isNullOrUndefined(br)) {
            throw tab._TableauException.createInternalError(
              "No base sheet was found corresponding to the active sheet."
            );
          }
          var bu = ss.mkdel(this, function(by) {
            return this.$A._get(by);
          });
          if (br.sheetType === "dashboard") {
            var bv = new l(bn.$0, this, this.$x);
            this.$s = bv;
            var bw = v.$0(e.dashboardZones);
            bv.$c(bw, bu);
          } else if (br.sheetType === "story") {
            var bx = new p(bn.$0, this, this.$x, e.story, bu);
            this.$s = bx;
            bx.add_activeStoryPointChange(
              ss.mkdel(this.$D, this.$D.raiseStoryPointSwitch)
            );
          } else {
            this.$s = new w(bn.$0, this, this.$x, null);
          }
          bn.$0.isActive = true;
        }
        this.$s.set_isActive(true);
      },
      $3: function(e) {
        var bm = e.publishedSheets;
        if (ss.isNullOrUndefined(bm)) {
          return;
        }
        for (var bn = 0; bn < bm.length; bn++) {
          var bo = bm[bn];
          var bp = bo.name;
          var bq = this.$A._get(bp);
          var br = v.$1(bo);
          if (ss.isNullOrUndefined(bq)) {
            var bs = ss.referenceEquals(bp, e.currentSheetName);
            var bt = tab.ApiEnumConverter.convertSheetType(bo.sheetType);
            var bu = o.$ctor(
              bp,
              bt,
              bn,
              br,
              this.get_workbook(),
              bo.repositoryUrl,
              bs,
              false,
              4294967295
            );
            bq = new bc(bu);
            this.$A._add(bp, bq);
          } else {
            bq.$0.size = br;
          }
        }
      },
      $i: function() {
        return this.$u;
      },
      $j: function(e) {
        this.$u = e;
      },
      $p: function() {
        return this.$C;
      },
      $q: function(e) {
        this.$C = e;
      },
      $n: function() {
        return this.$B;
      },
      $o: function(e) {
        this.$B = e;
      },
      $g: function() {
        return this.$t;
      },
      $h: function(e) {
        this.$t = e;
      },
      $6: function() {
        return k._getCustomViewsAsync(this, this.$x);
      },
      $f: function(e) {
        if (ss.isNullOrUndefined(e) || tab._Utility.isNullOrEmpty(e)) {
          return k._showCustomViewAsync(this, this.$x, null);
        } else {
          var bm = this.$u._get(e);
          if (ss.isNullOrUndefined(bm)) {
            var bn = new tab._Deferred();
            bn.reject(tab._TableauException.createInvalidCustomViewName(e));
            return bn.get_promise();
          }
          return bm._impl._showAsync();
        }
      },
      $c: function(e) {
        if (tab._Utility.isNullOrEmpty(e)) {
          throw tab._TableauException.createNullOrEmptyParameter(
            "customViewName"
          );
        }
        var bm = this.$u._get(e);
        if (ss.isNullOrUndefined(bm)) {
          var bn = new tab._Deferred();
          bn.reject(tab._TableauException.createInvalidCustomViewName(e));
          return bn.get_promise();
        }
        return bm._impl.$1();
      },
      $b: function(e) {
        if (tab._Utility.isNullOrEmpty(e)) {
          throw tab._TableauException.createInvalidParameter("customViewName");
        }
        return k._saveNewAsync(this, this.$x, e);
      },
      $e: function() {
        return k._makeCurrentCustomViewDefaultAsync(this, this.$x);
      },
      $k: function() {
        return this.$w;
      },
      $l: function(e) {
        this.$w = e;
      },
      $m: function() {
        return this.$z;
      },
      $8: function(e) {
        var bm = new tab._Deferred();
        if (ss.isValue(this.$w)) {
          bm.resolve(this.$w.$8());
          return bm.get_promise();
        }
        var bn = {};
        var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.FetchParametersCommand",
          0,
          ss.mkdel(this, function(bp) {
            var bq = v.$3(e, bp);
            this.$w = bq;
            bm.resolve(bq.$8());
          }),
          function(bp, bq) {
            bm.reject(tab._TableauException.createServerError(bq));
          }
        );
        this.$d(Object).call(this, bn, bo);
        return bm.get_promise();
      },
      $7: function() {
        var e = new tab._Deferred();
        var bm = {};
        var bn = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.FetchParametersCommand",
          0,
          ss.mkdel(this, function(bo) {
            this.$z = v.$4(bo);
            e.resolve(this.$m()._toApiCollection());
          }),
          function(bo, bp) {
            e.reject(tab._TableauException.createServerError(bp));
          }
        );
        this.$d(Object).call(this, bm, bn);
        return e.get_promise();
      },
      $2: function(e, bm) {
        var bn = new tab._Deferred();
        var bo = null;
        if (ss.isValue(this.$z)) {
          if (ss.isNullOrUndefined(this.$z._get(e))) {
            bn.reject(tab._TableauException.createInvalidParameter(e));
            return bn.get_promise();
          }
          bo = this.$z._get(e)._impl;
          if (ss.isNullOrUndefined(bo)) {
            bn.reject(tab._TableauException.createInvalidParameter(e));
            return bn.get_promise();
          }
        }
        var bp = {};
        bp["api.setParameterName"] = ss.isValue(this.$z) ? bo.$7() : e;
        if (ss.isValue(bm) && tab._Utility.isDate(bm)) {
          var bq = bm;
          var br = tab._Utility.serializeDateForServer(bq);
          bp["api.setParameterValue"] = br;
        } else {
          bp["api.setParameterValue"] = ss.isValue(bm) ? bm.toString() : null;
        }
        this.$w = null;
        var bs = new (ss.makeGenericType(tab.CommandReturnHandler$1, [Object]))(
          "api.SetParameterValueCommand",
          0,
          ss.mkdel(this, function(bt) {
            if (ss.isNullOrUndefined(bt)) {
              bn.reject(
                tab._TableauException.create("serverError", "server error")
              );
              return;
            }
            if (!bt.isValidPresModel) {
              bn.reject(tab._TableauException.createInvalidParameter(e));
              return;
            }
            var bu = new g(bt);
            this.$w = bu;
            bn.resolve(bu.$8());
          }),
          function(bt, bu) {
            bn.reject(tab._TableauException.createInvalidParameter(e));
          }
        );
        this.$d(Object).call(this, bp, bs);
        return bn.get_promise();
      }
    });
    ss.initClass(
      w,
      a,
      {
        get_sheet: function() {
          return this.get_worksheet();
        },
        get_worksheet: function() {
          if (ss.isNullOrUndefined(this.$N)) {
            this.$N = new bl(this);
          }
          return this.$N;
        },
        get_parentDashboardImpl: function() {
          return this.$K;
        },
        get_parentDashboard: function() {
          if (ss.isValue(this.$K)) {
            return this.$K.get_dashboard();
          }
          return null;
        },
        $r: function() {
          this.$G();
          var e = new tab._Deferred();
          var bm = {};
          bm["api.worksheetName"] = this.get_name();
          var bn = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.GetDataSourcesCommand",
            0,
            function(bo) {
              var bp = m.processDataSourcesForWorksheet(bo);
              e.resolve(bp._toApiCollection());
            },
            function(bo, bp) {
              e.reject(tab._TableauException.createServerError(bp));
            }
          );
          this.sendCommand(Object).call(this, bm, bn);
          return e.get_promise();
        },
        $q: function(e) {
          this.$G();
          var bm = new tab._Deferred();
          var bn = {};
          bn["api.dataSourceName"] = e;
          bn["api.worksheetName"] = this.get_name();
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.GetDataSourceCommand",
            0,
            function(bp) {
              var bq = m.processDataSource(bp);
              if (ss.isValue(bq)) {
                bm.resolve(bq.get_dataSource());
              } else {
                bm.reject(
                  tab._TableauException.createServerError(
                    "Data source '" + e + "' not found"
                  )
                );
              }
            },
            function(bp, bq) {
              bm.reject(tab._TableauException.createServerError(bq));
            }
          );
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        $G: function() {
          var e = this.get_isActive();
          var bm = ss.isValue(this.$K) && this.$K.get_isActive();
          var bn =
            ss.isValue(this.get_parentStoryPointImpl()) &&
            this.get_parentStoryPointImpl()
              .get_parentStoryImpl()
              .get_isActive();
          if (!e && !bm && !bn) {
            throw tab._TableauException.createNotActiveSheet();
          }
        },
        $d: function(e) {
          if (ss.isValue(this.get_parentStoryPointImpl())) {
            var bm = {};
            bm.worksheet = this.get_name();
            bm.dashboard = ss.isValue(this.get_parentDashboardImpl())
              ? this.$K.get_name()
              : this.get_name();
            bm.flipboardZoneId = this.get_parentStoryPointImpl()
              .get_containedSheetImpl()
              .get_zoneId();
            bm.storyboard = this.get_parentStoryPointImpl()
              .get_parentStoryImpl()
              .get_name();
            bm.storyPointId = this.get_parentStoryPointImpl().get_storyPointId();
            e["api.visualId"] = bm;
          } else {
            var bn = ss.isValue(this.get_parentDashboardImpl())
              ? this.get_parentDashboardImpl().get_name()
              : null;
            this.$M.addVisualIdForWorksheet(e, this.get_name(), bn);
          }
        },
        get__filters: function() {
          return this.$I;
        },
        set__filters: function(e) {
          this.$I = e;
        },
        $s: function(e, bm, bn) {
          if (
            !tab._Utility.isNullOrEmpty(e) &&
            !tab._Utility.isNullOrEmpty(bm)
          ) {
            throw tab._TableauException.createInternalError(
              "Only fieldName OR fieldCaption is allowed, not both."
            );
          }
          bn = bn || new Object();
          var bo = new tab._Deferred();
          var bp = {};
          this.$d(bp);
          if (
            !tab._Utility.isNullOrEmpty(bm) &&
            tab._Utility.isNullOrEmpty(e)
          ) {
            bp["api.fieldCaption"] = bm;
          }
          if (!tab._Utility.isNullOrEmpty(e)) {
            bp["api.fieldName"] = e;
          }
          bp["api.filterHierarchicalLevels"] = 0;
          bp["api.ignoreDomain"] = bn.ignoreDomain || false;
          var bq = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.GetOneFilterInfoCommand",
            0,
            ss.mkdel(this, function(br) {
              var bs = w.$1(br);
              if (ss.isNullOrUndefined(bs)) {
                var bt = br;
                var bu = W.$0(this, bt);
                bo.resolve(bu);
              } else {
                bo.reject(bs);
              }
            }),
            function(br, bs) {
              bo.reject(tab._TableauException.createServerError(bs));
            }
          );
          this.sendCommand(Object).call(this, bp, bq);
          return bo.get_promise();
        },
        $t: function(e) {
          this.$G();
          e = e || new Object();
          var bm = new tab._Deferred();
          var bn = {};
          this.$d(bn);
          bn["api.ignoreDomain"] = e.ignoreDomain || false;
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.GetFiltersListCommand",
            0,
            ss.mkdel(this, function(bp) {
              this.set__filters(W.processFiltersList(this, bp));
              bm.resolve(this.get__filters()._toApiCollection());
            }),
            function(bp, bq) {
              bm.reject(tab._TableauException.createServerError(bq));
            }
          );
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        $e: function(e, bm, bn, bo) {
          return this.$f(e, bm, bn, bo);
        },
        $m: function(e) {
          return this.$n(e);
        },
        $i: function(e, bm) {
          var bn = this.$H.normalizeRangeFilterOption(bm);
          return this.$j(e, bn);
        },
        $k: function(e, bm) {
          var bn = this.$H.normalizeRelativeDateFilterOptions(bm);
          return this.$l(e, bn);
        },
        $g: function(e, bm, bn, bo) {
          if (ss.isNullOrUndefined(bm) && bn !== "all") {
            throw tab._TableauException.createInvalidParameter("values");
          }
          return this.$h(e, bm, bn, bo);
        },
        $n: function(e) {
          this.$G();
          var bm = new tab._Deferred();
          var bn = this.$H.buildClearFilterCommandsParam(e);
          this.$d(bn);
          var bo = this.$H.createFilterCommandReturnHandler(
            "api.ClearFilterCommand",
            e,
            bm
          );
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        $f: function(e, bm, bn, bo) {
          this.$G();
          var bp = new tab._Deferred();
          var bq = this.$H.buildApplyFiltersCommandParams(e, bm, bn, bo);
          this.$d(bq);
          var br = this.$H.createFilterCommandReturnHandler(
            "api.ApplyCategoricalFilterCommand",
            e,
            bp
          );
          this.sendCommand(Object).call(this, bq, br);
          return bp.get_promise();
        },
        $j: function(e, bm) {
          this.$G();
          var bn = this.$H.buildRangeFilterCommandParams(e, bm);
          this.$d(bn);
          var bo = new tab._Deferred();
          var bp = this.$H.createFilterCommandReturnHandler(
            "api.ApplyRangeFilterCommand",
            e,
            bo
          );
          this.sendCommand(Object).call(this, bn, bp);
          return bo.get_promise();
        },
        $l: function(e, bm) {
          this.$G();
          var bn = this.$H.buildRelativeDateFilterCommandParams(e, bm);
          this.$d(bn);
          var bo = new tab._Deferred();
          var bp = this.$H.createFilterCommandReturnHandler(
            "api.ApplyRelativeDateFilterCommand",
            e,
            bo
          );
          this.sendCommand(Object).call(this, bn, bp);
          return bo.get_promise();
        },
        $h: function(e, bm, bn, bo) {
          this.$G();
          var bp = this.$H.buildHierarchicalFilterCommandParams(e, bm, bn, bo);
          this.$d(bp);
          var bq = new tab._Deferred();
          var br = this.$H.createFilterCommandReturnHandler(
            "api.ApplyHierarchicalFilterCommand",
            e,
            bq
          );
          this.sendCommand(Object).call(this, bp, br);
          return bq.get_promise();
        },
        get_selectedMarks: function() {
          return this.$L;
        },
        set_selectedMarks: function(e) {
          this.$L = e;
        },
        $p: function() {
          this.$G();
          var e = new tab._Deferred();
          var bm = {};
          this.$d(bm);
          var bn = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.ClearSelectedMarksCommand",
            1,
            function(bo) {
              e.resolve();
            },
            function(bo, bp) {
              e.reject(tab._TableauException.createServerError(bp));
            }
          );
          this.sendCommand(Object).call(this, bm, bn);
          return e.get_promise();
        },
        $B: function(e, bm, bn) {
          this.$G();
          if (ss.isNullOrUndefined(e) && ss.isNullOrUndefined(bm)) {
            return this.$p();
          }
          if (
            tab._Utility.isString(e) &&
            (tab._jQueryShim.isArray(bm) ||
              tab._Utility.isString(bm) ||
              !tab.PublicEnums.isValidEnum(tab.ApiSelectionUpdateType).call(
                null,
                bm
              ))
          ) {
            return this.$C(e, bm, bn);
          } else if (tab._jQueryShim.isArray(e)) {
            return this.$D(e, bm);
          } else {
            return this.$E(e, bm);
          }
        },
        $v: function() {
          this.$G();
          var e = new tab._Deferred();
          var bm = {};
          this.$d(bm);
          var bn = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.FetchSelectedMarksCommand",
            0,
            ss.mkdel(this, function(bo) {
              this.$L = tab.MarkImpl.processActiveMarks(bo);
              e.resolve(this.$L._toApiCollection());
            }),
            function(bo, bp) {
              e.reject(tab._TableauException.createServerError(bp));
            }
          );
          this.sendCommand(Object).call(this, bm, bn);
          return e.get_promise();
        },
        $C: function(e, bm, bn) {
          var bo = [];
          var bp = [];
          var bq = [];
          var br = [];
          var bs = [];
          var bt = [];
          this.$A(bo, bp, bq, br, bs, bt, e, bm);
          return this.$F(null, bo, bp, bq, br, bs, bt, bn);
        },
        $E: function(e, bm) {
          var bn = e;
          var bo = [];
          var bp = [];
          var bq = [];
          var br = [];
          var bs = [];
          var bt = [];
          var bu = new ss.ObjectEnumerator(bn);
          try {
            while (bu.moveNext()) {
              var bv = bu.current();
              if (e.hasOwnProperty(bv.key)) {
                if (!tab._jQueryShim.isFunction(bn[bv.key])) {
                  this.$A(bo, bp, bq, br, bs, bt, bv.key, bv.value);
                }
              }
            }
          } finally {
            bu.dispose();
          }
          return this.$F(null, bo, bp, bq, br, bs, bt, bm);
        },
        $D: function(e, bm) {
          var bn = [];
          var bo = [];
          var bp = [];
          var bq = [];
          var br = [];
          var bs = [];
          var bt = [];
          for (var bu = 0; bu < e.length; bu++) {
            var bv = e[bu];
            if (
              ss.isValue(bv.impl.get_tupleId()) &&
              bv.impl.get_tupleId() > 0
            ) {
              bt.push(bv.impl.get_tupleId());
            } else {
              var bw = bv.impl.get_pairs();
              for (var bx = 0; bx < bw.get__length(); bx++) {
                var by = bw.get_item(bx);
                if (
                  by.hasOwnProperty("fieldName") &&
                  by.hasOwnProperty("value") &&
                  !tab._jQueryShim.isFunction(by.fieldName) &&
                  !tab._jQueryShim.isFunction(by.value)
                ) {
                  this.$A(bn, bo, bp, bq, br, bs, by.fieldName, by.value);
                }
              }
            }
          }
          return this.$F(bt, bn, bo, bp, bq, br, bs, bm);
        },
        $A: function(e, bm, bn, bo, bp, bq, br, bs) {
          var bt = bs;
          if (w.$2.test(br)) {
            this.$c(bn, bo, br, bs);
          } else if (ss.isValue(bt.min) || ss.isValue(bt.max)) {
            var bu = new Object();
            if (ss.isValue(bt.min)) {
              if (tab._Utility.isDate(bt.min)) {
                var bv = bt.min;
                if (tab._Utility.isDateValid(bv)) {
                  bu.min = tab._Utility.serializeDateForServer(bv);
                } else {
                  throw tab._TableauException.createInvalidDateParameter(
                    "options.min"
                  );
                }
              } else {
                bu.min = bt.min;
              }
            }
            if (ss.isValue(bt.max)) {
              if (tab._Utility.isDate(bt.max)) {
                var bw = bt.max;
                if (tab._Utility.isDateValid(bw)) {
                  bu.max = tab._Utility.serializeDateForServer(bw);
                } else {
                  throw tab._TableauException.createInvalidDateParameter(
                    "options.max"
                  );
                }
              } else {
                bu.max = bt.max;
              }
            }
            if (ss.isValue(bt.nullOption)) {
              var bx = tab.PublicEnums.normalizeEnum(tab.ApiNullOption).call(
                null,
                bt.nullOption,
                "options.nullOption"
              );
              bu.nullOption = bx;
            } else {
              bu.nullOption = "allValues";
            }
            var by = JSON.stringify(bu);
            this.$c(bp, bq, br, by);
          } else {
            this.$c(e, bm, br, bs);
          }
        },
        $c: function(e, bm, bn, bo) {
          var bp = [];
          if (tab._jQueryShim.isArray(bo)) {
            var bq = bo;
            for (var br = 0; br < bq.length; br++) {
              bp.push(bq[br].toString());
            }
          } else {
            bp.push(bo.toString());
          }
          bm.push(bp);
          e.push(bn);
        },
        $F: function(e, bm, bn, bo, bp, bq, br, bs) {
          var bt = {};
          this.$d(bt);
          bs = tab.PublicEnums.normalizeEnum(tab.ApiSelectionUpdateType).call(
            null,
            bs,
            "updateType"
          );
          bt["api.filterUpdateType"] = bs;
          if (!tab._Utility.isNullOrEmpty(e)) {
            bt["api.tupleIds"] = JSON.stringify(e);
          }
          if (
            !tab._Utility.isNullOrEmpty(bm) &&
            !tab._Utility.isNullOrEmpty(bn)
          ) {
            bt["api.categoricalFieldCaption"] = JSON.stringify(bm);
            var bu = [];
            for (var bv = 0; bv < bn.length; bv++) {
              var bw = JSON.stringify(bn[bv]);
              bu.push(bw);
            }
            bt["api.categoricalMarkValues"] = JSON.stringify(bu);
          }
          if (
            !tab._Utility.isNullOrEmpty(bo) &&
            !tab._Utility.isNullOrEmpty(bp)
          ) {
            bt["api.hierarchicalFieldCaption"] = JSON.stringify(bo);
            var bx = [];
            for (var by = 0; by < bp.length; by++) {
              var bz = JSON.stringify(bp[by]);
              bx.push(bz);
            }
            bt["api.hierarchicalMarkValues"] = JSON.stringify(bx);
          }
          if (
            !tab._Utility.isNullOrEmpty(bq) &&
            !tab._Utility.isNullOrEmpty(br)
          ) {
            bt["api.rangeFieldCaption"] = JSON.stringify(bq);
            var bA = [];
            for (var bB = 0; bB < br.length; bB++) {
              var bC = JSON.stringify(br[bB]);
              bA.push(bC);
            }
            bt["api.rangeMarkValues"] = JSON.stringify(bA);
          }
          if (
            tab._Utility.isNullOrEmpty(bt["api.tupleIds"]) &&
            tab._Utility.isNullOrEmpty(bt["api.categoricalFieldCaption"]) &&
            tab._Utility.isNullOrEmpty(bt["api.hierarchicalFieldCaption"]) &&
            tab._Utility.isNullOrEmpty(bt["api.rangeFieldCaption"])
          ) {
            throw tab._TableauException.createInvalidParameter(
              "fieldNameOrFieldValuesMap"
            );
          }
          var bD = new tab._Deferred();
          var bE = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.SelectMarksCommand",
            1,
            function(bF) {
              var bG = w.$0(bF);
              if (ss.isNullOrUndefined(bG)) {
                bD.resolve();
              } else {
                bD.reject(bG);
              }
            },
            function(bF, bG) {
              bD.reject(tab._TableauException.createServerError(bG));
            }
          );
          this.sendCommand(Object).call(this, bt, bE);
          return bD.get_promise();
        },
        $w: function(e) {
          this.$G();
          var bm = new tab._Deferred();
          var bn = this.$J.getSummaryDataCommandParams(e);
          this.$d(bn);
          var bo = this.$J.getSummaryDataResponseHandler(bm);
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        $x: function(e) {
          this.$G();
          var bm = new tab._Deferred();
          var bn = this.$J.getUnderlyingDataCommandParams(e);
          this.$d(bn);
          var bo = this.$J.getUnderlyingDataResponseHandler(bm);
          this.sendCommand(Object).call(this, bn, bo);
          return bm.get_promise();
        },
        $o: function() {
          this.$G();
          var e = new tab._Deferred();
          var bm = {};
          this.$d(bm);
          var bn = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.ClearHighlightedMarksCommand",
            1,
            function(bo) {
              e.resolve();
            },
            function(bo, bp) {
              e.reject(tab._TableauException.createServerError(bp));
            }
          );
          this.sendCommand(Object).call(this, bm, bn);
          return e.get_promise();
        },
        $y: function(e, bm) {
          tab._Param.verifyString(e, "fieldName");
          this.$G();
          var bn = new tab._Deferred();
          var bo = {};
          bo["api.fieldCaption"] = e;
          bo["api.ObjectTextIDs"] = bm;
          this.$d(bo);
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.HighlightMarksCommand",
            0,
            function(bq) {
              bn.resolve();
            },
            function(bq, br) {
              bn.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return bn.get_promise();
        },
        $z: function(e, bm) {
          tab._Param.verifyString(e, "fieldName");
          tab._Param.verifyString(bm, "patternMatch");
          this.$G();
          var bn = new tab._Deferred();
          var bo = {};
          bo["api.filterUpdateType"] = "replace";
          bo["api.fieldCaption"] = e;
          bo["api.Pattern"] = bm;
          this.$d(bo);
          var bp = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.HighlightMarksByPatternMatch",
            0,
            function(bq) {
              bn.resolve();
            },
            function(bq, br) {
              bn.reject(tab._TableauException.createServerError(br));
            }
          );
          this.sendCommand(Object).call(this, bo, bp);
          return bn.get_promise();
        },
        $u: function() {
          this.$G();
          var e = new tab._Deferred();
          var bm = {};
          this.$d(bm);
          var bn = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.FetchHighlightedMarksCommand",
            0,
            ss.mkdel(this, function(bo) {
              this.highlightedMarks = tab.MarkImpl.processActiveMarks(bo);
              e.resolve(this.highlightedMarks._toApiCollection());
            }),
            function(bo, bp) {
              e.reject(tab._TableauException.createServerError(bp));
            }
          );
          this.sendCommand(Object).call(this, bm, bn);
          return e.get_promise();
        }
      },
      n
    );
    ss.initClass(J, a, {
      getViz: function() {
        return this.$1;
      },
      getEventName: function() {
        return this.$0;
      }
    });
    ss.initClass(
      x,
      a,
      {
        getCustomViewAsync: function() {
          var e = new tab._Deferred();
          var bm = null;
          if (ss.isValue(this.$2.get__customViewImpl())) {
            bm = this.$2.get__customViewImpl().$5();
          }
          e.resolve(bm);
          return e.get_promise();
        }
      },
      J
    );
    ss.initClass(
      P,
      a,
      {
        getWorksheet: function() {
          return this.$2.get_worksheet();
        }
      },
      J
    );
    ss.initClass(
      z,
      a,
      {
        getFieldName: function() {
          return this.$4;
        },
        getFilterAsync: function() {
          return this.$3
            .get__worksheetImpl()
            .$s(this.$3.get__filterFieldName(), null, null);
        }
      },
      P
    );
    ss.initClass(
      A,
      a,
      {
        getVizSize: function() {
          return this.$2;
        }
      },
      J
    );
    ss.initClass(
      B,
      a,
      {
        getHighlightedMarksAsync: function() {
          var e = this.$3.get__worksheetImpl();
          return e.$u();
        }
      },
      P
    );
    ss.initInterface(C, a, {
      add_customViewsListLoad: null,
      remove_customViewsListLoad: null,
      handleVizLoad: null,
      handleVizListening: null,
      sendScaleFactor: null
    });
    ss.initClass(D, a, {
      registerHandler: function(e) {
        this.$2.registerHandler(e);
        e.add_customViewsListLoad(ss.mkdel(this, this.$0));
      },
      unregisterHandler: function(e) {
        this.$2.unregisterHandler(e);
        e.remove_customViewsListLoad(ss.mkdel(this, this.$0));
      },
      sendCommand: function(e) {
        return function(bm, bn, bo) {
          this.$2.sendCommand(e).call(this.$2, bm, bn, bo);
          if (bo.get_commandName() === "api.ShowCustomViewCommand") {
            var bp = this.$3[bm.get_hostId()];
            if (ss.isNullOrUndefined(bp)) {
              bp = [];
              this.$3[bm.get_hostId()] = bp;
            }
            bp.push(bo);
          }
        };
      },
      $0: function(e) {
        var bm = e.get_hostId();
        var bn = this.$3[bm];
        if (ss.isNullOrUndefined(bn)) {
          return;
        }
        for (var bo = 0; bo < bn.length; bo++) {
          var bp = bn[bo];
          if (!ss.staticEquals(bp.get_successCallback(), null)) {
            bp.get_successCallback()(null);
          }
        }
        delete this.$3[bm];
      },
      $1: function(e, bm) {
        if (e.get_name() === "layoutInfoReq") {
          t.$1();
        } else if (
          e.get_name() === "tableau.completed" ||
          e.get_name() === "completed"
        ) {
          bm.handleVizLoad();
        } else if (e.get_name() === "tableau.listening") {
          bm.handleVizListening();
        } else if (e.get_name() === "sf?") {
          if (ss.count(e.get_parameters()) > 0) {
            var bn = ss.getItem(e.get_parameters(), 0);
            bm.sendScaleFactor(bn);
          }
        }
      }
    });
    ss.initClass(E, a, {
      get_handler: function() {
        return this.$0;
      },
      get_router: function() {
        return this.$1;
      },
      sendCommand: function(e) {
        return function(bm, bn) {
          this.$1.sendCommand(e).call(this.$1, this.$0, bm, bn);
        };
      },
      dispose: function() {
        this.$1.unregisterHandler(this.$0);
      }
    });
    ss.initClass(
      F,
      a,
      {
        getMarksAsync: function() {
          var e = this.$3.get__worksheetImpl();
          if (ss.isValue(e.get_selectedMarks())) {
            var bm = new tab._Deferred();
            return bm.resolve(e.get_selectedMarks()._toApiCollection());
          }
          return e.$v();
        }
      },
      P
    );
    ss.initClass(
      G,
      a,
      {
        getParameterName: function() {
          return this.$2.get__parameterName();
        },
        getParameterAsync: function() {
          return this.$2.get__workbookImpl().$8(this.$2.get__parameterName());
        }
      },
      J
    );
    ss.initClass(H, a, {});
    ss.initClass(
      I,
      a,
      {
        getOldStoryPointInfo: function() {
          return this.$3;
        },
        getNewStoryPoint: function() {
          return this.$2;
        }
      },
      J
    );
    ss.initClass(
      K,
      a,
      {
        getOldSheetName: function() {
          return this.$3;
        },
        getNewSheetName: function() {
          return this.$2;
        }
      },
      J
    );
    ss.initClass(
      L,
      a,
      {
        getToolbarState: function() {
          return this.$2.get_toolbarState();
        }
      },
      J
    );
    ss.initClass(
      M,
      a,
      {
        add_customViewsListLoad: function(e) {
          this.$1$1 = ss.delegateCombine(this.$1$1, e);
        },
        remove_customViewsListLoad: function(e) {
          this.$1$1 = ss.delegateRemove(this.$1$1, e);
        },
        add_stateReadyForQuery: function(e) {
          this.$1$2 = ss.delegateCombine(this.$1$2, e);
        },
        remove_stateReadyForQuery: function(e) {
          this.$1$2 = ss.delegateRemove(this.$1$2, e);
        },
        $1F: function(e) {
          this.$1$3 = ss.delegateCombine(this.$1$3, e);
        },
        $1G: function(e) {
          this.$1$3 = ss.delegateRemove(this.$1$3, e);
        },
        $1D: function(e) {
          this.$1$4 = ss.delegateCombine(this.$1$4, e);
        },
        $1E: function(e) {
          this.$1$4 = ss.delegateRemove(this.$1$4, e);
        },
        $1B: function(e) {
          this.$1$5 = ss.delegateCombine(this.$1$5, e);
        },
        $1C: function(e) {
          this.$1$5 = ss.delegateRemove(this.$1$5, e);
        },
        $1H: function(e) {
          this.$1$6 = ss.delegateCombine(this.$1$6, e);
        },
        $1I: function(e) {
          this.$1$6 = ss.delegateRemove(this.$1$6, e);
        },
        $1t: function(e) {
          this.$1$7 = ss.delegateCombine(this.$1$7, e);
        },
        $1u: function(e) {
          this.$1$7 = ss.delegateRemove(this.$1$7, e);
        },
        $1x: function(e) {
          this.$1$8 = ss.delegateCombine(this.$1$8, e);
        },
        $1y: function(e) {
          this.$1$8 = ss.delegateRemove(this.$1$8, e);
        },
        $1v: function(e) {
          this.$1$9 = ss.delegateCombine(this.$1$9, e);
        },
        $1w: function(e) {
          this.$1$9 = ss.delegateRemove(this.$1$9, e);
        },
        $1z: function(e) {
          this.$1$10 = ss.delegateCombine(this.$1$10, e);
        },
        $1A: function(e) {
          this.$1$10 = ss.delegateRemove(this.$1$10, e);
        },
        $1L: function(e) {
          this.$1$11 = ss.delegateCombine(this.$1$11, e);
        },
        $1M: function(e) {
          this.$1$11 = ss.delegateRemove(this.$1$11, e);
        },
        $1N: function(e) {
          this.$1$12 = ss.delegateCombine(this.$1$12, e);
        },
        $1O: function(e) {
          this.$1$12 = ss.delegateRemove(this.$1$12, e);
        },
        $1J: function(e) {
          this.$1$13 = ss.delegateCombine(this.$1$13, e);
        },
        $1K: function(e) {
          this.$1$13 = ss.delegateRemove(this.$1$13, e);
        },
        $1P: function(e) {
          this.$1$14 = ss.delegateCombine(this.$1$14, e);
        },
        $1Q: function(e) {
          this.$1$14 = ss.delegateRemove(this.$1$14, e);
        },
        get_hostId: function() {
          return this.$1n.hostId;
        },
        set_hostId: function(e) {
          this.$1n.hostId = e;
        },
        get_iframe: function() {
          return this.$1e;
        },
        get_instanceId: function() {
          return this.$1h;
        },
        set_instanceId: function(e) {
          this.$1h = e;
        },
        $18: function() {
          return this.$1p;
        },
        $13: function() {
          return this.$1d;
        },
        $15: function() {
          return this.$1i;
        },
        $14: function() {
          return this.$1e.style.display === "none";
        },
        $16: function() {
          return this.$1n.parentElement;
        },
        $17: function() {
          return this.$1n.get_baseUrl();
        },
        $1a: function() {
          return this.$1s.get_workbook();
        },
        get__workbookImpl: function() {
          return this.$1s;
        },
        $12: function() {
          return this.$1c;
        },
        $19: function() {
          return this.$1q;
        },
        getCurrentUrlAsync: function() {
          var e = new tab._Deferred();
          var bm = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            String
          ]))(
            "api.GetCurrentUrlCommand",
            0,
            function(bn) {
              e.resolve(bn);
            },
            function(bn, bo) {
              e.reject(tab._TableauException.createInternalError(bo));
            }
          );
          this._sendCommand(String).call(this, null, bm);
          return e.get_promise();
        },
        handleVizListening: function() {
          this.$8();
        },
        handleVizLoad: function() {
          if (ss.isNullOrUndefined(this.$1q)) {
            this.$Q(this.$1f.width + "px", this.$1f.height + "px");
            this.$S();
          }
          if (ss.isValue(this.$1o)) {
            this.$1o.style.display = "none";
          }
          if (ss.isNullOrUndefined(this.$1s)) {
            this.$1s = new v(
              this,
              this.$1j,
              ss.mkdel(this, function() {
                this.$x(null);
              })
            );
          } else if (!this.$1g) {
            this.$1s._update(
              ss.mkdel(this, function() {
                this.$x(null);
              })
            );
          }
          this.sendScaleFactor("-1");
        },
        $1: function(e) {
          var bm = this.$1q.chromeHeight;
          var bn = this.$1q.sheetSize;
          var bo = 0;
          var bp = 0;
          if (bn.behavior === "exactly") {
            bo = bn.maxSize.width;
            bp = bn.maxSize.height + bm;
          } else {
            var bq;
            var br;
            var bs;
            var bt;
            switch (bn.behavior) {
              case "range": {
                bq = bn.minSize.width;
                br = bn.maxSize.width;
                bs = bn.minSize.height + bm;
                bt = bn.maxSize.height + bm;
                bo = Math.max(bq, Math.min(br, e.width));
                bp = Math.max(bs, Math.min(bt, e.height));
                break;
              }
              case "atleast": {
                bq = bn.minSize.width;
                bs = bn.minSize.height + bm;
                bo = Math.max(bq, e.width);
                bp = Math.max(bs, e.height);
                break;
              }
              case "atmost": {
                br = bn.maxSize.width;
                bt = bn.maxSize.height + bm;
                bo = Math.min(br, e.width);
                bp = Math.min(bt, e.height);
                break;
              }
              case "automatic": {
                bo = e.width;
                bp = Math.max(e.height, bm);
                break;
              }
              default: {
                throw tab._TableauException.createInternalError(
                  "Unknown SheetSizeBehavior for viz: " + bn.behavior.toString()
                );
              }
            }
          }
          return tab.Size.$ctor(bo, bp);
        },
        $b: function() {
          var e;
          if (ss.isValue(this.$1f)) {
            e = this.$1f;
            this.$1f = null;
          } else {
            e = tab._Utility.computeContentSize(this.$16());
          }
          this.$H(e);
          return this.$1(e);
        },
        $K: function() {
          if (!ss.isValue(this.$1q)) {
            return;
          }
          var e = this.$b();
          if (e.height === this.$1q.chromeHeight) {
            return;
          }
          this.$Q(e.width + "px", e.height + "px");
          var bm = 10;
          for (var bn = 0; bn < bm; bn++) {
            var bo = this.$b();
            if (ss.referenceEquals(JSON.stringify(e), JSON.stringify(bo))) {
              return;
            }
            e = bo;
            this.$Q(e.width + "px", e.height + "px");
          }
          throw tab._TableauException.create(
            "maxVizResizeAttempts",
            "Viz resize limit hit. The calculated iframe size did not stabilize after " +
              bm +
              " resizes."
          );
        },
        handleEventNotification: function(e, bm) {
          var bn = tab._ApiServerNotification.deserialize(bm);
          switch (e) {
            case "api.FirstVizSizeKnownEvent": {
              this.$i(bn);
              break;
            }
            case "api.VizInteractiveEvent": {
              this.$q(bn);
              break;
            }
            case "api.MarksSelectionChangedEvent": {
              this.$l(bn);
              break;
            }
            case "api.MarksHighlightChangedEvent": {
              this.$k(bn);
              break;
            }
            case "api.FilterChangedEvent": {
              this.$h(bn);
              break;
            }
            case "api.ParameterChangedEvent": {
              this.$m(bn);
              break;
            }
            case "api.CustomViewsListLoadedEvent": {
              this.$g(bn);
              break;
            }
            case "api.CustomViewUpdatedEvent": {
              this.$f(bn);
              break;
            }
            case "api.CustomViewRemovedEvent": {
              this.$d();
              break;
            }
            case "api.CustomViewSetDefaultEvent": {
              this.$e(bn);
              break;
            }
            case "api.TabSwitchEvent": {
              this.$o(bn);
              break;
            }
            case "api.ToolbarStateChangedEvent": {
              this.$p(bn);
              break;
            }
            case "api.StorytellingStateChangedEvent": {
              this.$n(bn);
              break;
            }
          }
        },
        addEventListener: function(e, bm) {
          var bn = {};
          if (
            !tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(
              null,
              e,
              bn
            )
          ) {
            throw tab._TableauException.createUnsupportedEventName(
              e.toString()
            );
          }
          switch (bn.$) {
            case "marksselection": {
              this.$1F(bm);
              break;
            }
            case "markshighlight": {
              this.$1D(bm);
              break;
            }
            case "parametervaluechange": {
              this.$1H(bm);
              break;
            }
            case "filterchange": {
              this.$1B(bm);
              break;
            }
            case "customviewload": {
              this.$1t(bm);
              break;
            }
            case "customviewsave": {
              this.$1x(bm);
              break;
            }
            case "customviewremove": {
              this.$1v(bm);
              break;
            }
            case "customviewsetdefault": {
              this.$1z(bm);
              break;
            }
            case "tabswitch": {
              this.$1L(bm);
              break;
            }
            case "storypointswitch": {
              this.$1J(bm);
              break;
            }
            case "toolbarstatechange": {
              this.$1N(bm);
              break;
            }
            case "vizresize": {
              this.$1P(bm);
              break;
            }
          }
        },
        removeEventListener: function(e, bm) {
          var bn = {};
          if (
            !tab.PublicEnums.tryNormalizeEnum(tab.ApiTableauEventName).call(
              null,
              e,
              bn
            )
          ) {
            throw tab._TableauException.createUnsupportedEventName(
              e.toString()
            );
          }
          switch (bn.$) {
            case "marksselection": {
              this.$1G(bm);
              break;
            }
            case "markshighlight": {
              this.$1E(bm);
              break;
            }
            case "parametervaluechange": {
              this.$1I(bm);
              break;
            }
            case "filterchange": {
              this.$1C(bm);
              break;
            }
            case "customviewload": {
              this.$1u(bm);
              break;
            }
            case "customviewsave": {
              this.$1y(bm);
              break;
            }
            case "customviewremove": {
              this.$1w(bm);
              break;
            }
            case "customviewsetdefault": {
              this.$1A(bm);
              break;
            }
            case "tabswitch": {
              this.$1M(bm);
              break;
            }
            case "toolbarstatechange": {
              this.$1O(bm);
              break;
            }
            case "storypointswitch": {
              this.$1K(bm);
              break;
            }
            case "vizresize": {
              this.$1Q(bm);
              break;
            }
          }
        },
        $7: function() {
          if (ss.isValue(this.$1e)) {
            this.$1e.parentNode.removeChild(this.$1e);
            this.$1e = null;
          }
          t.$2(this.$1p);
          this.$1j.get_router().unregisterHandler(this);
          this.$L();
        },
        $S: function() {
          this.$1e.style.display = "block";
          this.$1e.style.visibility = "visible";
        },
        $r: function() {
          this.$1e.style.display = "none";
        },
        $u: function() {
          this.$1e.style.visibility = "hidden";
        },
        $W: function() {
          this.$t("showExportImageDialog");
        },
        $V: function(e) {
          var bm = this.$11(e);
          this.$t("showExportDataDialog", bm);
        },
        $U: function(e) {
          var bm = this.$11(e);
          this.$t("showExportCrosstabDialog", bm);
        },
        $X: function() {
          this.$t("showExportPDFDialog");
        },
        $N: function() {
          return tab._Utility.noResultPromiseHelper(
            "api.RevertAllCommand",
            null,
            this.$1j
          );
        },
        $J: function() {
          return tab._Utility.noResultPromiseHelper(
            "api.RefreshDataCommand",
            null,
            this.$1j
          );
        },
        $Y: function() {
          this.$t("showShareDialog");
        },
        $T: function() {
          if (this.get__workbookImpl().get_isDownloadAllowed()) {
            this.$t("showDownloadWorkbookDialog");
          } else {
            throw tab._TableauException.create(
              "downloadWorkbookNotAllowed",
              "Download workbook is not allowed"
            );
          }
        },
        $y: function() {
          return this.$s("pauseAutomaticUpdates");
        },
        $M: function() {
          return this.$s("resumeAutomaticUpdates");
        },
        $Z: function() {
          return this.$s("toggleAutomaticUpdates");
        },
        $R: function(e, bm) {
          this.$H(tab.Size.$ctor(-1, -1));
          this.$Q(e, bm);
          this.$1s._updateActiveSheetAsync();
        },
        $P: function(e) {
          this.$1c = e;
        },
        $3: function() {
          return this.$1n.parentElement;
        },
        $4: function() {
          try {
            t.$0(this.$1p);
          } catch (bm) {
            var e = ss.Exception.wrap(bm);
            this.$7();
            throw e;
          }
          if (!this.$1n.fixedSize) {
            this.$1f = tab._Utility.computeContentSize(this.$16());
            if (this.$1f.width === 0 || this.$1f.height === 0) {
              this.$1f = tab.Size.$ctor(800, 600);
            }
            this.$1e = this.$5();
            this.$u();
            if (this.$1n.displayStaticImage) {
              this.$1o = this.$6(this.$1f);
              this.$1o.style.display = "block";
            }
          } else {
            if (this.$1n.displayStaticImage) {
              this.$1o = this.$6(
                tab.Size.$ctor(
                  parseInt(this.$1n.width),
                  parseInt(this.$1n.height)
                )
              );
              this.$1o.style.display = "block";
            }
            this.$1e = this.$5();
            this.$S();
          }
          if (!tab._Utility.hasWindowPostMessage()) {
            if (tab._Utility.isIE()) {
              this.$1e["onreadystatechange"] = this.$c();
            } else {
              this.$1e.onload = this.$c();
            }
          }
          this.$1i = !this.$1n.toolbar;
          this.$1d = !this.$1n.tabs;
          this.$1j.get_router().registerHandler(this);
          this.$1e.src = this.$1n.get_url();
        },
        $O: function() {
          try {
            if (
              !tab._Utility.hasWindowPostMessage() ||
              ss.isNullOrUndefined(this.$1e) ||
              !ss.isValue(this.$1e.contentWindow)
            ) {
              return;
            }
          } catch (bo) {
            return;
          }
          var e = tab._Utility.visibleContentRectInDocumentCoordinates(
            this.get_iframe()
          );
          var bm = tab._Utility.contentRectInDocumentCoordinates(
            this.get_iframe()
          );
          var bn = new tab.NonApiCommand("layoutInfoResp", [
            (e.left - bm.left).toString(),
            (e.top - bm.top).toString(),
            e.width.toString(),
            e.height.toString()
          ]);
          this.$1e.contentWindow.postMessage(bn.serialize(), "*");
        },
        $8: function() {
          if (
            !tab._Utility.hasWindowPostMessage() ||
            ss.isNullOrUndefined(this.$1e) ||
            !ss.isValue(this.$1e.contentWindow)
          ) {
            return;
          }
          var e = new tab.NonApiCommand(
            "tableau.enableVisibleRectCommunication",
            []
          );
          this.$1e.contentWindow.postMessage(e.serialize(), "*");
        },
        $I: function() {
          return tab._Utility.noResultPromiseHelper("api.Redo", null, this.$1j);
        },
        $10: function() {
          return tab._Utility.noResultPromiseHelper("api.Undo", null, this.$1j);
        },
        sendScaleFactor: function(e) {
          var bm = document.documentElement.clientWidth / window.innerWidth;
          var bn = 0;
          var bo = 0;
          var bp = new tab.NonApiCommand("sf", [
            e,
            bm.toString(),
            bn.toString(),
            bo.toString()
          ]);
          if (ss.isValue(this.$1e) && ss.isValue(this.$1e.contentWindow)) {
            this.$1e.contentWindow.postMessage(bp.serialize(), "*");
          }
        },
        _sendCommand: function(e) {
          return function(bm, bn) {
            this.$1j.sendCommand(e).call(this.$1j, bm, bn);
          };
        },
        $E: function(e) {
          if (!ss.staticEquals(this.$1$6, null)) {
            this.$1$6(new G("parametervaluechange", this.$1p, e));
          }
        },
        $z: function(e) {
          this.get__workbookImpl()._update(
            ss.mkdel(this, function() {
              if (!ss.staticEquals(this.$1$7, null)) {
                this.$1$7(
                  new x(
                    "customviewload",
                    this.$1p,
                    ss.isValue(e) ? e._impl : null
                  )
                );
              }
            })
          );
        },
        $B: function(e) {
          this.get__workbookImpl()._update(
            ss.mkdel(this, function() {
              if (!ss.staticEquals(this.$1$8, null)) {
                this.$1$8(new x("customviewsave", this.$1p, e._impl));
              }
            })
          );
        },
        $A: function(e) {
          if (!ss.staticEquals(this.$1$9, null)) {
            this.$1$9(new x("customviewremove", this.$1p, e._impl));
          }
        },
        $C: function(e) {
          if (!ss.staticEquals(this.$1$10, null)) {
            this.$1$10(new x("customviewsetdefault", this.$1p, e._impl));
          }
        },
        $G: function(e, bm) {
          if (!ss.staticEquals(this.$1$11, null)) {
            this.$1$11(new K("tabswitch", this.$1p, e, bm));
          }
        },
        raiseStoryPointSwitch: function(e, bm) {
          if (!ss.staticEquals(this.$1$13, null)) {
            this.$1$13(new I("storypointswitch", this.$1p, e, bm));
          }
        },
        $F: function() {
          if (!ss.staticEquals(this.$1$2, null)) {
            this.$1$2(this);
          }
        },
        $D: function() {
          if (!ss.staticEquals(this.$1$1, null)) {
            this.$1$1(this);
          }
        },
        $H: function(e) {
          if (!ss.staticEquals(this.$1$14, null)) {
            this.$1$14(new N("vizresize", this.$1p, e));
          }
        },
        $Q: function(e, bm) {
          this.$1n.width = e;
          this.$1n.height = bm;
          this.$1e.style.width = this.$1n.width;
          this.$1e.style.height = this.$1n.height;
        },
        $11: function(e) {
          if (ss.isNullOrUndefined(e)) {
            return null;
          }
          var bm = this.$1s.$4(e);
          if (ss.isNullOrUndefined(bm)) {
            throw tab._TableauException.createNotActiveSheet();
          }
          return bm.get_name();
        },
        $s: function(e) {
          if (
            e !== "pauseAutomaticUpdates" &&
            e !== "resumeAutomaticUpdates" &&
            e !== "toggleAutomaticUpdates"
          ) {
            throw tab._TableauException.createInternalError(null);
          }
          var bm = {};
          bm["api.invokeCommandName"] = e;
          var bn = new tab._Deferred();
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.InvokeCommandCommand",
            0,
            ss.mkdel(this, function(bp) {
              if (ss.isValue(bp) && ss.isValue(bp.isAutoUpdate)) {
                this.$1c = !bp.isAutoUpdate;
              }
              bn.resolve(this.$1c);
            }),
            function(bp, bq) {
              bn.reject(tab._TableauException.createServerError(bq));
            }
          );
          this._sendCommand(Object).call(this, bm, bo);
          return bn.get_promise();
        },
        $t: function(e, bm) {
          if (
            e !== "showExportImageDialog" &&
            e !== "showExportDataDialog" &&
            e !== "showExportCrosstabDialog" &&
            e !== "showExportPDFDialog" &&
            e !== "showShareDialog" &&
            e !== "showDownloadWorkbookDialog"
          ) {
            throw tab._TableauException.createInternalError(null);
          }
          var bn = {};
          bn["api.invokeCommandName"] = e;
          if (ss.isValue(bm)) {
            bn["api.invokeCommandParam"] = bm;
          }
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))("api.InvokeCommandCommand", 0, null, null);
          this._sendCommand(Object).call(this, bn, bo);
        },
        $i: function(e) {
          var bm = JSON.parse(e.get_data());
          this.$j(bm);
        },
        $q: function(e) {
          if (
            ss.isValue(this.$1s) &&
            ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())
          ) {
            this.$x(null);
          } else {
            this.$F();
          }
        },
        $l: function(e) {
          if (
            ss.staticEquals(this.$1$3, null) ||
            !ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())
          ) {
            return;
          }
          var bm = null;
          var bn = this.$1s.get_activeSheetImpl();
          if (bn.get_isStory()) {
            bn = bn.get_activeStoryPointImpl().get_containedSheetImpl();
          }
          if (ss.referenceEquals(bn.get_name(), e.get_worksheetName())) {
            bm = bn;
          } else if (bn.get_isDashboard()) {
            var bo = bn;
            bm = bo.get_worksheets()._get(e.get_worksheetName())._impl;
          }
          if (ss.isValue(bm)) {
            bm.set_selectedMarks(null);
            this.$1$3(new F("marksselection", this.$1p, bm));
          }
        },
        $k: function(e) {
          if (
            ss.staticEquals(this.$1$4, null) ||
            !ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())
          ) {
            return;
          }
          var bm = null;
          var bn = this.$1s.get_activeSheetImpl();
          if (bn.get_isStory()) {
            bn = bn.get_activeStoryPointImpl().get_containedSheetImpl();
          }
          if (ss.referenceEquals(bn.get_name(), e.get_worksheetName())) {
            bm = bn;
          } else if (bn.get_isDashboard()) {
            var bo = bn;
            bm = bo.get_worksheets()._get(e.get_worksheetName())._impl;
          }
          if (ss.isValue(bm)) {
            bm.highlightedMarks = null;
            this.$1$4(new B("markshighlight", this.$1p, bm));
          }
        },
        $h: function(e) {
          if (
            ss.staticEquals(this.$1$5, null) ||
            !ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())
          ) {
            return;
          }
          var bm = null;
          var bn = this.$1s.get_activeSheetImpl();
          if (ss.referenceEquals(bn.get_name(), e.get_worksheetName())) {
            bm = bn;
          } else if (bn.get_isDashboard()) {
            var bo = bn;
            bm = bo.get_worksheets()._get(e.get_worksheetName())._impl;
          } else if (bn.get_isStory()) {
            var bp = bn;
            var bq = bp.get_activeStoryPointImpl();
            var br = bq.get_containedSheetImpl();
            if (br.get_isDashboard()) {
              var bs = br;
              bm = bs.get_worksheets()._get(e.get_worksheetName())._impl;
            } else if (
              ss.referenceEquals(br.get_name(), e.get_worksheetName())
            ) {
              bm = br;
            }
          }
          if (ss.isValue(bm)) {
            var bt = JSON.parse(e.get_data());
            var bu = bt[0];
            var bv = bt[1];
            this.$1$5(new z("filterchange", this.$1p, bm, bu, bv));
          }
        },
        $m: function(e) {
          if (!ss.staticEquals(this.$1$6, null)) {
            if (ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())) {
              this.$1s.$l(null);
              var bm = e.get_data();
              this.$E(bm);
            }
          }
        },
        $g: function(e) {
          var bm = JSON.parse(e.get_data());
          var bn = ss.mkdel(this, function() {
            k._processCustomViews(this.$1s, this.$1j, bm);
          });
          var bo = ss.mkdel(this, function() {
            this.$D();
            if (!ss.staticEquals(this.$1$7, null) && !bm.customViewLoaded) {
              this.$z(this.$1s.get_activeCustomView());
            }
          });
          if (ss.isNullOrUndefined(this.$1s)) {
            this.$1g = true;
            this.$1s = new v(
              this,
              this.$1j,
              ss.mkdel(this, function() {
                bn();
                this.$x(bo);
                this.$1g = false;
              })
            );
          } else {
            bn();
            this.$9(bo);
          }
        },
        $f: function(e) {
          var bm = JSON.parse(e.get_data());
          if (ss.isNullOrUndefined(this.$1s)) {
            this.$1s = new v(this, this.$1j, null);
          }
          if (ss.isValue(this.$1s)) {
            k._processCustomViewUpdate(this.$1s, this.$1j, bm, true);
          }
          if (!ss.staticEquals(this.$1$8, null)) {
            var bn = this.$1s.$p()._toApiCollection();
            for (var bo = 0, bp = bn.length; bo < bp; bo++) {
              this.$B(bn[bo]);
            }
          }
        },
        $d: function() {
          if (!ss.staticEquals(this.$1$9, null)) {
            var e = this.$1s.$n()._toApiCollection();
            for (var bm = 0, bn = e.length; bm < bn; bm++) {
              this.$A(e[bm]);
            }
          }
        },
        $e: function(e) {
          var bm = JSON.parse(e.get_data());
          if (ss.isValue(this.$1s)) {
            k._processCustomViews(this.$1s, this.$1j, bm);
          }
          if (
            !ss.staticEquals(this.$1$10, null) &&
            ss.isValue(bm.defaultCustomViewId)
          ) {
            var bn = this.$1s.$i();
            for (var bo = 0; bo < bn.get__length(); bo++) {
              var bp = bn.get_item(bo);
              if (bp.getDefault()) {
                this.$C(bp);
                break;
              }
            }
          }
        },
        $o: function(e) {
          this.$1s._update(
            ss.mkdel(this, function() {
              if (ss.isValue(this.$1b)) {
                this.$1b();
              }
              if (
                ss.referenceEquals(this.$1s.get_name(), e.get_workbookName())
              ) {
                var bm = e.get_worksheetName();
                var bn = e.get_data();
                this.$G(bm, bn);
              }
              this.$x(null);
            })
          );
        },
        $p: function(e) {
          var bm = JSON.parse(e.get_data());
          var bn = new s(this, bm);
          if (!ss.staticEquals(this.$1$12, null)) {
            this.$1$12(new L("toolbarstatechange", this.$1p, bn));
          }
        },
        $n: function(e) {
          var bm = this.$1s.get_activeSheetImpl();
          if (bm.get_sheetType() === "story") {
            bm.update(JSON.parse(e.get_data()));
          }
        },
        $x: function(e) {
          if (!this.$1k) {
            var bm = this.$1l;
            window.setTimeout(
              ss.mkdel(this, function() {
                if (!ss.staticEquals(bm, null)) {
                  bm(new J("firstinteractive", this.$1p));
                }
                if (!ss.staticEquals(e, null)) {
                  e();
                }
              }),
              0
            );
            this.$1k = true;
          }
          this.$F();
        },
        $9: function(e) {
          var bm = new Date();
          var bn = null;
          bn = ss.mkdel(this, function() {
            var bo = new Date();
            if (this.$1k) {
              e();
            } else if (bo - bm > 300000) {
              throw tab._TableauException.createInternalError(
                "Timed out while waiting for the viz to become interactive"
              );
            } else {
              window.setTimeout(bn, 10);
            }
          });
          bn();
        },
        $2: function() {
          if (tab._Utility.isIE()) {
            if (this.$1e["readyState"] === "complete") {
              this.handleVizLoad();
            }
          } else {
            this.handleVizLoad();
          }
        },
        $v: function() {
          window.setTimeout(ss.mkdel(this, this.$2), 3000);
        },
        $6: function(e) {
          var bm = document.createElement("div");
          bm.style.background =
            "transparent url('" +
            this.$1n.staticImageUrl +
            "') no-repeat scroll 0 0";
          bm.style.left = "8px";
          bm.style.top = this.$1n.tabs ? "31px" : "9px";
          bm.style.position = "absolute";
          bm.style.width = e.width + "px";
          bm.style.height = e.height + "px";
          this.$3().appendChild(bm);
          return bm;
        },
        $5: function() {
          if (ss.isNullOrUndefined(this.$3())) {
            return null;
          }
          var e = document.createElement("IFrame");
          e.frameBorder = "0";
          e.setAttribute("allowTransparency", "true");
          e.setAttribute("allowFullScreen", "true");
          e.setAttribute("title", this.$a());
          e.marginHeight = "0";
          e.marginWidth = "0";
          e.style.display = "block";
          if (this.$1n.fixedSize) {
            e.style.width = this.$1n.width;
            e.style.height = this.$1n.height;
            if (this.$1n.iframeSizedToWindow) {
              e.setAttribute("scrolling", "no");
            }
          } else {
            e.style.width = "1px";
            e.style.height = "1px";
            e.setAttribute("scrolling", "no");
          }
          if (tab._Utility.isSafari()) {
            e.addEventListener("mousewheel", ss.mkdel(this, this.$w), false);
          }
          this.$3().appendChild(e);
          return e;
        },
        $a: function() {
          var e = window.navigator.language;
          if (e === "zh-CN") {
            return "数据可视化";
          }
          switch (e.substr(0, 2)) {
            case "fr": {
              return "Visualisation de données";
            }
            case "es": {
              return "Visualización de datos";
            }
            case "pt": {
              return "Visualização de dados";
            }
            case "ja": {
              return "データ ビジュアライゼーション";
            }
            case "de": {
              return "Datenvisualisierung";
            }
            case "ko": {
              return "데이터 비주얼리제이션";
            }
            case "en":
            default: {
              return "data visualization";
            }
          }
        },
        $w: function(e) {},
        $c: function() {
          return ss.mkdel(this, function(e) {
            this.$v();
          });
        },
        $j: function(e) {
          var bm = tab.SheetSizeFactory.fromSizeConstraints(e.sizeConstraints);
          this.$1q = O.$ctor(bm, e.chromeHeight);
          if (ss.isValue(this.$1m)) {
            this.$1m(new A("firstvizsizeknown", this.$1p, this.$1q));
          }
          if (this.$1n.fixedSize) {
            return;
          }
          this.$K();
          this.$0();
          this.$S();
        },
        $L: function() {
          if (ss.isNullOrUndefined(this.$1r)) {
            return;
          }
          if (tab._Utility.hasWindowAddEventListener()) {
            window.removeEventListener("resize", this.$1r, false);
          } else {
            window.self.detachEvent("onresize", this.$1r);
          }
          this.$1r = null;
        },
        $0: function() {
          if (ss.isValue(this.$1r)) {
            return;
          }
          this.$1r = ss.mkdel(this, function() {
            this.$K();
          });
          if (tab._Utility.hasWindowAddEventListener()) {
            window.addEventListener("resize", this.$1r, false);
          } else {
            window.self.attachEvent("onresize", this.$1r);
          }
        },
        switchToViz: function(e) {
          var bm = new tab._Deferred();
          var bn = {};
          bn["api.invokeCommandParam"] = e;
          var bo = new (ss.makeGenericType(tab.CommandReturnHandler$1, [
            Object
          ]))(
            "api.SwitchViz",
            1,
            function(bp) {
              bm.resolve();
            },
            function(bp, bq) {
              bm.reject(tab._TableauException.createServerError(bq));
            }
          );
          this.$1j.sendCommand(Object).call(this.$1j, bn, bo);
          return bm.get_promise();
        }
      },
      null,
      [C]
    );
    ss.initClass(
      N,
      a,
      {
        getAvailableSize: function() {
          return this.$2;
        }
      },
      J
    );
    ss.initClass(O, a, {}, Object);
    ss.initClass(W, a, {
      getFilterType: function() {
        return this.$6;
      },
      getFieldName: function() {
        return this.$1;
      },
      getWorksheet: function() {
        return this.$7.get_worksheet();
      },
      getFieldAsync: function() {
        var e = new tab._Deferred();
        if (ss.isNullOrUndefined(this.$3)) {
          var bm = function(bo) {
            e.reject(bo);
            return null;
          };
          var bn = ss.mkdel(this, function(bo) {
            this.$3 = new V(bo, this.$1, this.$5, this.$4);
            e.resolve(this.$3);
            return null;
          });
          this.$7.$q(this.$2).then(bn, bm);
        } else {
          window.setTimeout(
            ss.mkdel(this, function() {
              e.resolve(this.$3);
            }),
            0
          );
        }
        return e.get_promise();
      },
      _update: function(e) {
        this.$0(e);
        this._updateFromJson(e);
      },
      _addFieldParams: function(e) {},
      _updateFromJson: null,
      $0: function(e) {
        this.$1 = e.caption;
        this.$6 = tab.ApiEnumConverter.convertFilterType(e.filterType);
        this.$3 = null;
        this.$2 = e.dataSourceName;
        this.$5 = tab.ApiEnumConverter.convertFieldRole(
          ss.coalesce(e.fieldRole, "unknown")
        );
        this.$4 = tab.ApiEnumConverter.convertFieldAggregation(
          ss.coalesce(e.fieldAggregation, "NONE")
        );
      }
    });
    ss.initClass(
      Q,
      a,
      {
        getIsExcludeMode: function() {
          return this.$a;
        },
        getAppliedValues: function() {
          return this.$9;
        },
        _updateFromJson: function(e) {
          this.$8(e);
        },
        $8: function(e) {
          this.$a = e.isExclude;
          if (ss.isValue(e.appliedValues)) {
            this.$9 = [];
            for (var bm = 0; bm < e.appliedValues.length; bm++) {
              var bn = e.appliedValues[bm];
              this.$9.push(tab._Utility.getDataValue(bn));
            }
          }
        }
      },
      W
    );
    ss.initClass(R, a, {
      getWorkbook: function() {
        return this._impl.$b();
      },
      getUrl: function() {
        return this._impl.$a();
      },
      getName: function() {
        return this._impl.$7();
      },
      setName: function(e) {
        this._impl.$8(e);
      },
      getOwnerName: function() {
        return this._impl.$9();
      },
      getAdvertised: function() {
        return this._impl.$3();
      },
      setAdvertised: function(e) {
        this._impl.$4(e);
      },
      getDefault: function() {
        return this._impl.$6();
      },
      saveAsync: function() {
        return this._impl.$2();
      }
    });
    ss.initClass(bb, a, {
      getName: function() {
        return this._impl.get_name();
      },
      getIndex: function() {
        return this._impl.get_index();
      },
      getWorkbook: function() {
        return this._impl.get_workbookImpl().get_workbook();
      },
      getSize: function() {
        return this._impl.get_size();
      },
      getIsHidden: function() {
        return this._impl.get_isHidden();
      },
      getIsActive: function() {
        return this._impl.get_isActive();
      },
      getSheetType: function() {
        return this._impl.get_sheetType();
      },
      getUrl: function() {
        return this._impl.get_url();
      },
      changeSizeAsync: function(e) {
        return this._impl.changeSizeAsync(e);
      }
    });
    ss.initClass(
      S,
      a,
      {
        getParentStoryPoint: function() {
          return this._impl.get_parentStoryPoint();
        },
        getObjects: function() {
          return this._impl.get_objects()._toApiCollection();
        },
        getWorksheets: function() {
          return this._impl.get_worksheets()._toApiCollection();
        }
      },
      bb
    );
    ss.initClass(T, a, {
      getObjectType: function() {
        return this.$2.objectType;
      },
      getDashboard: function() {
        return this.$0;
      },
      getWorksheet: function() {
        return this.$1;
      },
      getPosition: function() {
        return this.$2.position;
      },
      getSize: function() {
        return this.$2.size;
      }
    });
    ss.initClass(U, a, {
      getName: function() {
        return this.$0.get_name();
      },
      getFields: function() {
        return this.$0.get_fields()._toApiCollection();
      },
      getIsPrimary: function() {
        return this.$0.get_isPrimary();
      }
    });
    ss.initClass(V, a, {
      getDataSource: function() {
        return this.$0;
      },
      getName: function() {
        return this.$3;
      },
      getRole: function() {
        return this.$2;
      },
      getAggregation: function() {
        return this.$1;
      }
    });
    ss.initClass(
      X,
      a,
      {
        _addFieldParams: function(e) {
          e["api.filterHierarchicalLevels"] = this.$9;
        },
        _updateFromJson: function(e) {
          this.$8(e);
        },
        $8: function(e) {
          this.$9 = e.levels;
        }
      },
      W
    );
    ss.initClass(Y, a, {
      getName: function() {
        return this._impl.$7();
      },
      getCurrentValue: function() {
        return this._impl.$2();
      },
      getDataType: function() {
        return this._impl.$3();
      },
      getAllowableValuesType: function() {
        return this._impl.$1();
      },
      getAllowableValues: function() {
        return this._impl.$0();
      },
      getMinValue: function() {
        return this._impl.$6();
      },
      getMaxValue: function() {
        return this._impl.$5();
      },
      getStepSize: function() {
        return this._impl.$9();
      },
      getDateStepPeriod: function() {
        return this._impl.$4();
      }
    });
    ss.initClass(
      Z,
      a,
      {
        getMin: function() {
          return this.$d;
        },
        getMax: function() {
          return this.$c;
        },
        getIncludeNullValues: function() {
          return this.$b;
        },
        getDomainMin: function() {
          return this.$a;
        },
        getDomainMax: function() {
          return this.$9;
        },
        _updateFromJson: function(e) {
          this.$8(e);
        },
        $8: function(e) {
          this.$a = tab._Utility.getDataValue(e.domainMinValue);
          this.$9 = tab._Utility.getDataValue(e.domainMaxValue);
          this.$d = tab._Utility.getDataValue(e.minValue);
          this.$c = tab._Utility.getDataValue(e.maxValue);
          this.$b = e.includeNullValues;
        }
      },
      W
    );
    ss.initClass(
      ba,
      a,
      {
        getPeriod: function() {
          return this.$9;
        },
        getRange: function() {
          return this.$b;
        },
        getRangeN: function() {
          return this.$a;
        },
        _updateFromJson: function(e) {
          this.$8(e);
        },
        $8: function(e) {
          if (ss.isValue(e.periodType)) {
            this.$9 = tab.ApiEnumConverter.convertPeriodType(
              ss.unbox(e.periodType)
            );
          }
          if (ss.isValue(e.rangeType)) {
            this.$b = tab.ApiEnumConverter.convertDateRange(
              ss.unbox(e.rangeType)
            );
          }
          if (ss.isValue(e.rangeN)) {
            this.$a = ss.unbox(e.rangeN);
          }
        }
      },
      W
    );
    ss.initClass(bc, a, {
      getName: function() {
        return this.$0.name;
      },
      getSheetType: function() {
        return this.$0.sheetType;
      },
      getSize: function() {
        return this.$0.size;
      },
      getIndex: function() {
        return this.$0.index;
      },
      getUrl: function() {
        return this.$0.url;
      },
      getIsActive: function() {
        return this.$0.isActive;
      },
      getIsHidden: function() {
        return this.$0.isHidden;
      },
      getWorkbook: function() {
        return this.$0.workbook;
      }
    });
    ss.initClass(
      bd,
      a,
      {
        getActiveStoryPoint: function() {
          return this._impl.get_activeStoryPointImpl().get_storyPoint();
        },
        getStoryPointsInfo: function() {
          return this._impl.get_storyPointsInfo();
        },
        activatePreviousStoryPointAsync: function() {
          return this._impl.activatePreviousStoryPointAsync();
        },
        activateNextStoryPointAsync: function() {
          return this._impl.activateNextStoryPointAsync();
        },
        activateStoryPointAsync: function(e) {
          return this._impl.activateStoryPointAsync(e);
        },
        revertStoryPointAsync: function(e) {
          return this._impl.revertStoryPointAsync(e);
        }
      },
      bb
    );
    ss.initClass(be, a, {
      getCaption: function() {
        return this.$0.get_caption();
      },
      getContainedSheet: function() {
        return ss.isValue(this.$0.get_containedSheetImpl())
          ? this.$0.get_containedSheetImpl().get_sheet()
          : null;
      },
      getIndex: function() {
        return this.$0.get_index();
      },
      getIsActive: function() {
        return this.$0.get_isActive();
      },
      getIsUpdated: function() {
        return this.$0.get_isUpdated();
      },
      getParentStory: function() {
        return this.$0.get_parentStoryImpl().get_story();
      }
    });
    ss.initClass(bf, a, {
      getCaption: function() {
        return this._impl.caption;
      },
      getIndex: function() {
        return this._impl.index;
      },
      getIsActive: function() {
        return this._impl.isActive;
      },
      getIsUpdated: function() {
        return this._impl.isUpdated;
      },
      getParentStory: function() {
        return this._impl.parentStoryImpl.get_story();
      }
    });
    ss.initClass(bg, a, {
      getViz: function() {
        return this._impl.get_viz();
      },
      isButtonEnabled: function(e) {
        return this._impl.isButtonEnabled(e);
      }
    });
    ss.initClass(bh, a, {
      getMajor: function() {
        return this.$0;
      },
      getMinor: function() {
        return this.$2;
      },
      getPatch: function() {
        return this.$3;
      },
      getMetadata: function() {
        return this.$1;
      },
      toString: function() {
        var e = this.$0 + "." + this.$2 + "." + this.$3;
        if (ss.isValue(this.$1) && this.$1.length > 0) {
          e += "-" + this.$1;
        }
        return e;
      }
    });
    ss.initClass(bi, a, {
      getAreTabsHidden: function() {
        return this._impl.$13();
      },
      getIsToolbarHidden: function() {
        return this._impl.$15();
      },
      getIsHidden: function() {
        return this._impl.$14();
      },
      getInstanceId: function() {
        return this._impl.get_instanceId();
      },
      getParentElement: function() {
        return this._impl.$16();
      },
      getUrl: function() {
        return this._impl.$17();
      },
      getVizSize: function() {
        return this._impl.$19();
      },
      getWorkbook: function() {
        return this._impl.$1a();
      },
      getAreAutomaticUpdatesPaused: function() {
        return this._impl.$12();
      },
      getCurrentUrlAsync: function() {
        return this._impl.getCurrentUrlAsync();
      },
      addEventListener: function(e, bm) {
        this._impl.addEventListener(e, bm);
      },
      removeEventListener: function(e, bm) {
        this._impl.removeEventListener(e, bm);
      },
      dispose: function() {
        this._impl.$7();
      },
      switchToViz: function(e) {
        return this._impl.switchToViz(e);
      },
      show: function() {
        this._impl.$S();
      },
      hide: function() {
        this._impl.$r();
      },
      showExportDataDialog: function(e) {
        this._impl.$V(e);
      },
      showExportCrossTabDialog: function(e) {
        this._impl.$U(e);
      },
      showExportImageDialog: function() {
        this._impl.$W();
      },
      showExportPDFDialog: function() {
        this._impl.$X();
      },
      revertAllAsync: function() {
        return this._impl.$N();
      },
      refreshDataAsync: function() {
        return this._impl.$J();
      },
      showShareDialog: function() {
        this._impl.$Y();
      },
      showDownloadWorkbookDialog: function() {
        this._impl.$T();
      },
      pauseAutomaticUpdatesAsync: function() {
        return this._impl.$y();
      },
      resumeAutomaticUpdatesAsync: function() {
        return this._impl.$M();
      },
      toggleAutomaticUpdatesAsync: function() {
        return this._impl.$Z();
      },
      refreshSize: function() {
        this._impl.$K();
      },
      setFrameSize: function(e, bm) {
        var bn = e;
        var bo = bm;
        if (tab._Utility.isNumber(e)) {
          bn = e.toString() + "px";
        }
        if (tab._Utility.isNumber(bm)) {
          bo = bm.toString() + "px";
        }
        this._impl.$R(bn, bo);
      },
      redoAsync: function() {
        return this._impl.$I();
      },
      undoAsync: function() {
        return this._impl.$10();
      }
    });
    ss.initClass(bj, a, {});
    ss.initClass(bk, a, {
      getViz: function() {
        return this.$0.get_viz();
      },
      getPublishedSheetsInfo: function() {
        return this.$0.get_publishedSheets()._toApiCollection();
      },
      getName: function() {
        return this.$0.get_name();
      },
      getActiveSheet: function() {
        return this.$0.get_activeSheetImpl().get_sheet();
      },
      getActiveCustomView: function() {
        return this.$0.get_activeCustomView();
      },
      activateSheetAsync: function(e) {
        return this.$0._setActiveSheetAsync(e);
      },
      revertAllAsync: function() {
        return this.$0._revertAllAsync();
      },
      getCustomViewsAsync: function() {
        return this.$0.$6();
      },
      showCustomViewAsync: function(e) {
        return this.$0.$f(e);
      },
      removeCustomViewAsync: function(e) {
        return this.$0.$c(e);
      },
      rememberCustomViewAsync: function(e) {
        return this.$0.$b(e);
      },
      setActiveCustomViewAsDefaultAsync: function() {
        return this.$0.$e();
      },
      getParametersAsync: function() {
        return this.$0.$7();
      },
      changeParameterValueAsync: function(e, bm) {
        return this.$0.$2(e, bm);
      }
    });
    ss.initClass(
      bl,
      a,
      {
        getParentDashboard: function() {
          return this._impl.get_parentDashboard();
        },
        getParentStoryPoint: function() {
          return this._impl.get_parentStoryPoint();
        },
        getDataSourcesAsync: function() {
          return this._impl.$r();
        },
        getFilterAsync: function(e, bm) {
          return this._impl.$s(null, e, bm);
        },
        getFiltersAsync: function(e) {
          return this._impl.$t(e);
        },
        applyFilterAsync: function(e, bm, bn, bo) {
          return this._impl.$e(e, bm, bn, bo);
        },
        clearFilterAsync: function(e) {
          return this._impl.$m(e);
        },
        applyRangeFilterAsync: function(e, bm) {
          return this._impl.$i(e, bm);
        },
        applyRelativeDateFilterAsync: function(e, bm) {
          return this._impl.$k(e, bm);
        },
        applyHierarchicalFilterAsync: function(e, bm, bn, bo) {
          return this._impl.$g(e, bm, bn, bo);
        },
        clearSelectedMarksAsync: function() {
          return this._impl.$p();
        },
        selectMarksAsync: function(e, bm, bn) {
          return this._impl.$B(e, bm, bn);
        },
        getSelectedMarksAsync: function() {
          return this._impl.$v();
        },
        getSummaryDataAsync: function(e) {
          return this._impl.$w(e);
        },
        getUnderlyingDataAsync: function(e) {
          return this._impl.$x(e);
        },
        clearHighlightedMarksAsync: function() {
          return this._impl.$o();
        },
        highlightMarksAsync: function(e, bm) {
          return this._impl.$y(e, bm);
        },
        highlightMarksByPatternMatchAsync: function(e, bm) {
          return this._impl.$z(e, bm);
        },
        getHighlightedMarksAsync: function() {
          return this._impl.$u();
        }
      },
      bb
    );
    (function() {
      t.$5 = [];
    })();
    (function() {
      n.noZoneId = 4294967295;
    })();
    (function() {
      w.$2 = new RegExp("\\[[^\\]]+\\]\\.", "g");
    })();
    (function() {
      bh.$0 = new bh(2, 2, 1, "null");
    })();
  })();
  window.tableau = window.tableauSoftware = global.tableauSoftware;
  tableauSoftware.Promise = tab._PromiseImpl;
  tab._Deferred = tab._DeferredImpl;
  tab._Collection = tab._CollectionImpl;
  tab._ApiBootstrap.initialize();
  window.tableau._apiLoaded = true;
})();

module.exports = tableauSoftware;
