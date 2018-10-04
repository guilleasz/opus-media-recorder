var Module=typeof Module!=="undefined"?Module:{};!(function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=(function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})}),n.r=(function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}),n.t=(function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,(function(t){return e[t]}).bind(null,r));return s}),n.n=(function(e){var t=e&&e.__esModule?(function(){return e.default}):(function(){return e});return n.d(t,"a",t),t}),n.o=(function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}),n.p="",n(n.s=0)})([(function(e,t,n){e.exports=n(1)}),(function(e,t,n){var s,r,a;r=[n(2)],void 0===(a="function"==typeof (s=(function(e){"use strict";var t,n=(function(){function e(e,t){for(var n=0;n<t.length;n++){var s=t[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}return(function(t,n,s){return n&&e(t.prototype,n),s&&e(t,s),t})})(),s=(function(){function t(e,n,s){!(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")})(this,t),this.config=Object.assign({bufferLength:4096,encoderApplication:2049,encoderFrameSize:20,encoderSampleRate:48e3,maxBuffersPerPage:10,numberOfChannels:1,originalSampleRate:44100,resampleQuality:6,serial:Math.floor(4294967296*Math.random())},{numberOfChannels:n,originalSampleRate:e}),this.encodedBuffers=[],this._opus_encoder_create=s._opus_encoder_create,this._opus_encoder_ctl=s._opus_encoder_ctl,this._speex_resampler_process_interleaved_float=s._speex_resampler_process_interleaved_float,this._speex_resampler_init=s._speex_resampler_init,this._opus_encode_float=s._opus_encode_float,this._free=s._free,this._malloc=s._malloc,this._HEAPU8=s.HEAPU8,this._HEAP32=s.HEAP32,this._HEAPF32=s.HEAPF32,this.pageIndex=0,this.granulePosition=0,this.segmentData=new Uint8Array(65025),this.segmentDataIndex=0,this.segmentTable=new Uint8Array(255),this.segmentTableIndex=0,this.buffersInPage=0,this.OggInitChecksumTable(),this.OpusInitCodec(),this.SpeexInitResampler(),this.OggGenerateIdPage(),this.OggGenerateCommentPage(),1===this.config.numberOfChannels?this.interleave=(function(e){return e[0]}):this.interleavedBuffers=new Float32Array(this.config.bufferLength*this.config.numberOfChannels)}return n(t,[{key:"encode",value:(function(e,t,n){for(var s=this.interleave(e),r=0;r<s.length;){var a=Math.min(this.resampleBufferLength-this.resampleBufferIndex,s.length-r);if(this.resampleBuffer.set(s.subarray(r,r+a),this.resampleBufferIndex),r+=a,this.resampleBufferIndex+=a,this.resampleBufferIndex===this.resampleBufferLength){this._speex_resampler_process_interleaved_float(this.resampler,this.resampleBufferPointer,this.resampleSamplesPerChannelPointer,this.encoderBufferPointer,this.encoderSamplesPerChannelPointer);var i=this._opus_encode_float(this.encoder,this.encoderBufferPointer,this.encoderSamplesPerChannel,this.encoderOutputPointer,this.encoderOutputMaxLength);this.segmentPacket(i),this.resampleBufferIndex=0}}this.buffersInPage++,this.buffersInPage>=this.config.maxBuffersPerPage&&this.OggGeneratePage()})},{key:"encodeFinalFrame",value:(function(){for(var e=[],t=0;t<this.config.numberOfChannels;++t)e.push(new Float32Array(this.config.bufferLength-this.resampleBufferIndex/this.config.numberOfChannels));this.encode(e),this.headerType+=4,this.OggGeneratePage()})},{key:"interleave",value:(function(e){for(var t=0;t<this.config.bufferLength;t++)for(var n=0;n<this.config.numberOfChannels;n++)this.interleavedBuffers[t*this.config.numberOfChannels+n]=e[n][t];return this.interleavedBuffers})},{key:"segmentPacket",value:(function(e){for(var t=0;e>=0;){255===this.segmentTableIndex&&(this.OggGeneratePage(),this.headerType=1);var n=Math.min(e,255);this.segmentTable[this.segmentTableIndex++]=n,this.segmentData.set(this.encoderOutputBuffer.subarray(t,t+n),this.segmentDataIndex),this.segmentDataIndex+=n,t+=n,e-=255}this.granulePosition+=48*this.config.encoderFrameSize,255===this.segmentTableIndex&&(this.OggGeneratePage(),this.headerType=0)})},{key:"OpusInitCodec",value:(function(){var e=this.config,t=e.encoderSampleRate,n=e.numberOfChannels,s=e.encoderApplication,r=e.encoderBitRate,a=e.encoderComplexity,i=e.encoderFrameSize,o=this._malloc(4);this.encoder=this._opus_encoder_create(t,n,s,o),this._free(o),r&&this.OpusSetOpusControl(4002,r),a&&this.OpusSetOpusControl(4010,a);var h=t*i/1e3,l=this._malloc(4);this._HEAP32[l>>2]=h;var f=h*n,u=this._malloc(4*f),c=this._HEAPF32.subarray(u>>2,(u>>2)+f),d=this._malloc(4e3),g=this._HEAPU8.subarray(d,d+4e3);this.encoderSamplesPerChannel=h,this.encoderSamplesPerChannelPointer=l,this.encoderBufferLength=f,this.encoderBufferPointer=u,this.encoderBuffer=c,this.encoderOutputMaxLength=4e3,this.encoderOutputPointer=d,this.encoderOutputBuffer=g})},{key:"OpusSetOpusControl",value:(function(e,t){var n=this._malloc(4);this._HEAP32[n>>2]=t,this._opus_encoder_ctl(this.encoder,e,n),this._free(n)})},{key:"SpeexInitResampler",value:(function(){var e=this.config,t=e.numberOfChannels,n=e.originalSampleRate,s=e.encoderSampleRate,r=e.resampleQuality,a=e.encoderFrameSize,i=this._malloc(4);this.resampler=this._speex_resampler_init(t,n,s,r,i),this._free(i);var o=n*a/1e3,h=this._malloc(4);this._HEAP32[h>>2]=o;var l=o*t,f=this._malloc(4*l),u=this._HEAPF32.subarray(f>>2,(f>>2)+l);this.resampleBufferIndex=0,this.resampleSamplesPerChannel=o,this.resampleSamplesPerChannelPointer=h,this.resampleBufferLength=l,this.resampleBufferPointer=f,this.resampleBuffer=u})},{key:"OggInitChecksumTable",value:(function(){this.checksumTable=[];for(var e=0;e<256;e++){for(var t=e<<24,n=0;n<8;n++)t=0!=(2147483648&t)?t<<1^79764919:t<<1;this.checksumTable[e]=4294967295&t}})},{key:"OggGetChecksum",value:(function(e){for(var t=0,n=0;n<e.length;n++)t=t<<8^this.checksumTable[t>>>24&255^e[n]];return t>>>0})},{key:"OggGenerateIdPage",value:(function(){var t=this.config,n=t.numberOfChannels,s=t.originalSampleRateOverride,r=t.originalSampleRate,a=new DataView(this.segmentData.buffer);(0,e.writeString)(a,0,"OpusHead"),a.setUint8(8,1,!0),a.setUint8(9,n,!0),a.setUint16(10,3840,!0),a.setUint32(12,s||r,!0),a.setUint16(16,0,!0),a.setUint8(18,0,!0),this.segmentTableIndex=1,this.segmentDataIndex=this.segmentTable[0]=19,this.headerType=2,this.OggGeneratePage()})},{key:"OggGenerateCommentPage",value:(function(){var t=new DataView(this.segmentData.buffer);(0,e.writeString)(t,0,"OpusTags");var n="Opus-Media-Recorder";t.setUint32(8,n.length,!0),(0,e.writeString)(t,12,n);var s=12+n.length;t.setUint32(s,0,!0),s+=4,this.segmentTableIndex=1,this.segmentDataIndex=this.segmentTable[0]=26,this.headerType=0,this.OggGeneratePage()})},{key:"OggGeneratePage",value:(function(){var t=this.lastPositiveGranulePosition===this.granulePosition?-1:this.granulePosition,n=new ArrayBuffer(27+this.segmentTableIndex+this.segmentDataIndex),s=new DataView(n),r=new Uint8Array(n);(0,e.writeString)(s,0,"OggS"),s.setUint8(4,0,!0),s.setUint8(5,this.headerType,!0),s.setUint32(6,t,!0),t<0?s.setInt32(10,Math.ceil(t/4294967297)-1,!0):s.setInt32(10,Math.floor(t/4294967296),!0),s.setUint32(14,this.config.serial,!0),s.setUint32(18,this.pageIndex,!0),this.pageIndex+=1,s.setUint8(26,this.segmentTableIndex,!0),r.set(this.segmentTable.subarray(0,this.segmentTableIndex),27),r.set(this.segmentData.subarray(0,this.segmentDataIndex),27+this.segmentTableIndex),s.setUint32(22,this.OggGetChecksum(r),!0),this.encodedBuffers.push(n),this.segmentTableIndex=0,this.segmentDataIndex=0,this.buffersInPage=0,t>0&&(this.lastPositiveGranulePosition=t)})}]),t})();self.Module={},self.Module.onRuntimeInitialized=(function(){self.postMessage({command:"readyToInit"}),self.onmessage=(function(e){var n=e.data.command;switch(n){case"init":var r=e.data,a=r.sampleRate,i=r.channelCount;t=new s(a,i,self.Module);break;case"pushInputData":for(var o=e.data,h=o.channelBuffers,l=o.length,f=o.duration,u=0;u<t.config.numberOfChannels;u++)h[u]=new Float32Array(h[u].buffer);t.encode(h,l,f);break;case"getEncodedData":case"done":"done"===n&&t.encodeFinalFrame();var c=t.encodedBuffers;self.postMessage({command:"done"===n?"lastEncodedData":"encodedData",buffers:c},c),t.encodedBuffers=[],"done"===n&&self.close()}})})}))?s.apply(t,r):s)||(e.exports=a)}),(function(e,t,n){var s,r,a;r=[t],void 0===(a="function"==typeof (s=(function(e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.writeString=(function(e,t,n){for(var s=0;s<n.length;s++)e.setUint8(t+s,n.charCodeAt(s))})}))?s.apply(t,r):s)||(e.exports=a)})]);var moduleOverrides={};var key;for(key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}Module["arguments"]=[];Module["thisProgram"]="./this.program";Module["quit"]=(function(status,toThrow){throw toThrow});Module["preRun"]=[];Module["postRun"]=[];var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory="";function locateFile(path){if(Module["locateFile"]){return Module["locateFile"](path,scriptDirectory)}else{return scriptDirectory+path}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+"/";var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){var ret;if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}Module["arguments"]=process["argv"].slice(2);if(typeof module!=="undefined"){module["exports"]=Module}process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));process["on"]("unhandledRejection",(function(reason,p){process["exit"](1)}));Module["quit"]=(function(status){process["exit"](status)});Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(typeof read!="undefined"){Module["read"]=function shell_read(f){return read(f)}}Module["readBinary"]=function readBinary(f){var data;if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status){quit(status)})}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WEB){if(document.currentScript){scriptDirectory=document.currentScript.src}}else{scriptDirectory=self.location.href}if(scriptDirectory.indexOf("blob:")!==0){scriptDirectory=scriptDirectory.substr(0,scriptDirectory.lastIndexOf("/")+1)}else{scriptDirectory=""}Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null)};Module["setWindowTitle"]=(function(title){document.title=title})}else{}var out=Module["print"]||(typeof console!=="undefined"?console.log.bind(console):typeof print!=="undefined"?print:null);var err=Module["printErr"]||(typeof printErr!=="undefined"?printErr:typeof console!=="undefined"&&console.warn.bind(console)||out);for(key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var STACK_ALIGN=16;function staticAlloc(size){var ret=STATICTOP;STATICTOP=STATICTOP+size+15&-16;return ret}function alignMemory(size,factor){if(!factor)factor=STACK_ALIGN;var ret=size=Math.ceil(size/factor)*factor;return ret}var asm2wasmImports={"f64-rem":(function(x,y){return x%y}),"debugger":(function(){debugger})};var functionPointers=new Array(0);var GLOBAL_BASE=1024;var ABORT=false;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;var WASM_PAGE_SIZE=65536;var ASMJS_PAGE_SIZE=16777216;function alignUp(x,multiple){if(x%multiple>0){x+=multiple-x%multiple}return x}var buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBuffer(buf){Module["buffer"]=buffer=buf}function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(TOTAL_MEMORY<TOTAL_STACK)err("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{if(typeof WebAssembly==="object"&&typeof WebAssembly.Memory==="function"){Module["wasmMemory"]=new WebAssembly.Memory({"initial":TOTAL_MEMORY/WASM_PAGE_SIZE,"maximum":TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=Module["wasmMemory"].buffer}else{buffer=new ArrayBuffer(TOTAL_MEMORY)}Module["buffer"]=buffer}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var Math_cos=Math.cos;var Math_sin=Math.sin;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["preloadedImages"]={};Module["preloadedAudios"]={};var dataURIPrefix="data:application/octet-stream;base64,";function isDataURI(filename){return String.prototype.startsWith?filename.startsWith(dataURIPrefix):filename.indexOf(dataURIPrefix)===0}function integrateWasmJS(){var wasmTextFile="OggOpusWorker.wast";var wasmBinaryFile="OggOpusWorker.wasm";var asmjsCodeFile="OggOpusWorker.temp.asm.js";if(!isDataURI(wasmTextFile)){wasmTextFile=locateFile(wasmTextFile)}if(!isDataURI(wasmBinaryFile)){wasmBinaryFile=locateFile(wasmBinaryFile)}if(!isDataURI(asmjsCodeFile)){asmjsCodeFile=locateFile(asmjsCodeFile)}var wasmPageSize=64*1024;var info={"global":null,"env":null,"asm2wasm":asm2wasmImports,"parent":Module};var exports=null;function mergeMemory(newBuffer){var oldBuffer=Module["buffer"];if(newBuffer.byteLength<oldBuffer.byteLength){err("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here")}var oldView=new Int8Array(oldBuffer);var newView=new Int8Array(newBuffer);newView.set(oldView);updateGlobalBuffer(newBuffer);updateGlobalBufferViews()}function fixImports(imports){return imports}function getBinary(){try{if(Module["wasmBinary"]){return new Uint8Array(Module["wasmBinary"])}if(Module["readBinary"]){return Module["readBinary"](wasmBinaryFile)}else{throw"both async and sync fetching of the wasm failed"}}catch(err){abort(err)}}function getBinaryPromise(){if(!Module["wasmBinary"]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch==="function"){return fetch(wasmBinaryFile,{credentials:"same-origin"}).then((function(response){if(!response["ok"]){throw"failed to load wasm binary file at '"+wasmBinaryFile+"'"}return response["arrayBuffer"]()})).catch((function(){return getBinary()}))}return new Promise((function(resolve,reject){resolve(getBinary())}))}function doNativeWasm(global,env,providedBuffer){if(typeof WebAssembly!=="object"){err("no native wasm support detected");return false}if(!(Module["wasmMemory"]instanceof WebAssembly.Memory)){err("no native wasm Memory in use");return false}env["memory"]=Module["wasmMemory"];info["global"]={"NaN":NaN,"Infinity":Infinity};info["global.Math"]=Math;info["env"]=env;function receiveInstance(instance,module){exports=instance.exports;if(exports.memory)mergeMemory(exports.memory);Module["asm"]=exports;Module["usingWasm"]=true;removeRunDependency("wasm-instantiate")}addRunDependency("wasm-instantiate");if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err("Module.instantiateWasm callback failed with error: "+e);return false}}function receiveInstantiatedSource(output){receiveInstance(output["instance"],output["module"])}function instantiateArrayBuffer(receiver){getBinaryPromise().then((function(binary){return WebAssembly.instantiate(binary,info)})).then(receiver).catch((function(reason){err("failed to asynchronously prepare wasm: "+reason);abort(reason)}))}if(!Module["wasmBinary"]&&typeof WebAssembly.instantiateStreaming==="function"&&!isDataURI(wasmBinaryFile)&&typeof fetch==="function"){WebAssembly.instantiateStreaming(fetch(wasmBinaryFile,{credentials:"same-origin"}),info).then(receiveInstantiatedSource).catch((function(reason){err("wasm streaming compile failed: "+reason);err("falling back to ArrayBuffer instantiation");instantiateArrayBuffer(receiveInstantiatedSource)}))}else{instantiateArrayBuffer(receiveInstantiatedSource)}return{}}Module["asmPreload"]=Module["asm"];var asmjsReallocBuffer=Module["reallocBuffer"];var wasmReallocBuffer=(function(size){var PAGE_MULTIPLE=Module["usingWasm"]?WASM_PAGE_SIZE:ASMJS_PAGE_SIZE;size=alignUp(size,PAGE_MULTIPLE);var old=Module["buffer"];var oldSize=old.byteLength;if(Module["usingWasm"]){try{var result=Module["wasmMemory"].grow((size-oldSize)/wasmPageSize);if(result!==(-1|0)){return Module["buffer"]=Module["wasmMemory"].buffer}else{return null}}catch(e){return null}}});Module["reallocBuffer"]=(function(size){if(finalMethod==="asmjs"){return asmjsReallocBuffer(size)}else{return wasmReallocBuffer(size)}});var finalMethod="";Module["asm"]=(function(global,env,providedBuffer){env=fixImports(env);if(!env["table"]){var TABLE_SIZE=Module["wasmTableSize"];if(TABLE_SIZE===undefined)TABLE_SIZE=1024;var MAX_TABLE_SIZE=Module["wasmMaxTableSize"];if(typeof WebAssembly==="object"&&typeof WebAssembly.Table==="function"){if(MAX_TABLE_SIZE!==undefined){env["table"]=new WebAssembly.Table({"initial":TABLE_SIZE,"maximum":MAX_TABLE_SIZE,"element":"anyfunc"})}else{env["table"]=new WebAssembly.Table({"initial":TABLE_SIZE,element:"anyfunc"})}}else{env["table"]=new Array(TABLE_SIZE)}Module["wasmTable"]=env["table"]}if(!env["memoryBase"]){env["memoryBase"]=Module["STATIC_BASE"]}if(!env["tableBase"]){env["tableBase"]=0}var exports;exports=doNativeWasm(global,env,providedBuffer);assert(exports,"no binaryen method succeeded.");return exports})}integrateWasmJS();STATIC_BASE=GLOBAL_BASE;STATICTOP=STATIC_BASE+35744;__ATINIT__.push();var STATIC_BUMP=35744;Module["STATIC_BASE"]=STATIC_BASE;Module["STATIC_BUMP"]=STATIC_BUMP;STATICTOP+=16;var _llvm_cos_f64=Math_cos;function _llvm_exp2_f32(x){return Math.pow(2,x)}function _llvm_exp2_f64(){return _llvm_exp2_f32.apply(null,arguments)}function _llvm_log10_f32(x){return Math.log(x)/Math.LN10}function _llvm_log10_f64(){return _llvm_log10_f32.apply(null,arguments)}var _llvm_sin_f64=Math_sin;function _llvm_stackrestore(p){var self=_llvm_stacksave;var ret=self.LLVM_SAVEDSTACKS[p];self.LLVM_SAVEDSTACKS.splice(p,1);stackRestore(ret)}function _llvm_stacksave(){var self=_llvm_stacksave;if(!self.LLVM_SAVEDSTACKS){self.LLVM_SAVEDSTACKS=[]}self.LLVM_SAVEDSTACKS.push(stackSave());return self.LLVM_SAVEDSTACKS.length-1}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}DYNAMICTOP_PTR=staticAlloc(4);STACK_BASE=STACKTOP=alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;Module["wasmTableSize"]=10;Module["wasmMaxTableSize"]=10;Module.asmGlobalArg={};Module.asmLibraryArg={"abort":abort,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"___setErrNo":___setErrNo,"_emscripten_memcpy_big":_emscripten_memcpy_big,"_llvm_cos_f64":_llvm_cos_f64,"_llvm_exp2_f64":_llvm_exp2_f64,"_llvm_log10_f64":_llvm_log10_f64,"_llvm_sin_f64":_llvm_sin_f64,"_llvm_stackrestore":_llvm_stackrestore,"_llvm_stacksave":_llvm_stacksave,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"STACKTOP":STACKTOP};var asm=Module["asm"](Module.asmGlobalArg,Module.asmLibraryArg,buffer);Module["asm"]=asm;var _free=Module["_free"]=(function(){return Module["asm"]["_free"].apply(null,arguments)});var _malloc=Module["_malloc"]=(function(){return Module["asm"]["_malloc"].apply(null,arguments)});var _opus_encode_float=Module["_opus_encode_float"]=(function(){return Module["asm"]["_opus_encode_float"].apply(null,arguments)});var _opus_encoder_create=Module["_opus_encoder_create"]=(function(){return Module["asm"]["_opus_encoder_create"].apply(null,arguments)});var _opus_encoder_ctl=Module["_opus_encoder_ctl"]=(function(){return Module["asm"]["_opus_encoder_ctl"].apply(null,arguments)});var _speex_resampler_destroy=Module["_speex_resampler_destroy"]=(function(){return Module["asm"]["_speex_resampler_destroy"].apply(null,arguments)});var _speex_resampler_init=Module["_speex_resampler_init"]=(function(){return Module["asm"]["_speex_resampler_init"].apply(null,arguments)});var _speex_resampler_process_interleaved_float=Module["_speex_resampler_process_interleaved_float"]=(function(){return Module["asm"]["_speex_resampler_process_interleaved_float"].apply(null,arguments)});var stackRestore=Module["stackRestore"]=(function(){return Module["asm"]["stackRestore"].apply(null,arguments)});var stackSave=Module["stackSave"]=(function(){return Module["asm"]["stackSave"].apply(null,arguments)});Module["asm"]=asm;function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};function run(args){args=args||Module["arguments"];if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=run;function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){out(what);err(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;throw"abort("+what+"). Build with -s ASSERTIONS=1 for more info."}Module["abort"]=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}Module["noExitRuntime"]=true;run()



