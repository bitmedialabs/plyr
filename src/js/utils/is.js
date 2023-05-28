// ==========================================================================
// Type checking utils
// ==========================================================================

const getConstructor = (input) => (input != null ? input.constructor : null);
const instanceOf = (input, constructor) => Boolean(input && constructor && input instanceof constructor);
const isNullOrUndefined = (input) => input == null;
const isObject = (input) => getConstructor(input) === Object;
const isNumber = (input) => getConstructor(input) === Number && !Number.isNaN(input);
const isString = (input) => getConstructor(input) === String;
const isBoolean = (input) => getConstructor(input) === Boolean;
const isFunction = (input) => typeof input === 'function';
const isArray = (input) => Array.isArray(input);
const isWeakMap = (input) => instanceOf(input, WeakMap);
const isNodeList = (input) => instanceOf(input, NodeList);
const isTextNode = (input) => getConstructor(input) === Text;
const isEvent = (input) => instanceOf(input, Event);
const isKeyboardEvent = (input) => instanceOf(input, KeyboardEvent);
const isCue = (input) => instanceOf(input, window.TextTrackCue) || instanceOf(input, window.VTTCue);
const isTrack = (input) => instanceOf(input, TextTrack) || (!isNullOrUndefined(input) && isString(input.kind));
const isPromise = (input) => instanceOf(input, Promise) && isFunction(input.then);

const isElement = (input) =>
  input !== null &&
  typeof input === 'object' &&
  input.nodeType === 1 &&
  typeof input.style === 'object' &&
  typeof input.ownerDocument === 'object';

const isEmpty = (input) =>
  isNullOrUndefined(input) ||
  ((isString(input) || isArray(input) || isNodeList(input)) && !input.length) ||
  (isObject(input) && !Object.keys(input).length);

const isUrl = (input) => {
  // Accept a URL object
  if (instanceOf(input, window.URL)) {
    return true;
  }

  // Must be string from here
  if (!isString(input) || input.length === 0) {
    return false;
  }

  // Add the protocol if required
  let string = input;
  if (input.slice(0, 7) !== 'http://' && input.slice(0, 8) !== 'https://') {
    string = `http://${input}`;
  }

  try {
    return !isEmpty(new URL(string).hostname);
  } catch (_) {
    return false;
  }
};

export default {
  nullOrUndefined: isNullOrUndefined,
  object: isObject,
  number: isNumber,
  string: isString,
  boolean: isBoolean,
  function: isFunction,
  array: isArray,
  weakMap: isWeakMap,
  nodeList: isNodeList,
  element: isElement,
  textNode: isTextNode,
  event: isEvent,
  keyboardEvent: isKeyboardEvent,
  cue: isCue,
  track: isTrack,
  promise: isPromise,
  url: isUrl,
  empty: isEmpty,
};
