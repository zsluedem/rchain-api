const blake2 = require('blake2');
const crypto = require('crypto');
const { keccak256 } = require('js-sha3');
const RHOCore = require('./RHOCore');

/**
 * Compute a SHA256 hash over some data, the way that it will be computed in Rholang
 *
 * @param serializedData: Uint8Array of serialized Rholang data, used to compute the hash
 * @return Uint8Array of bytes representing the computed hash
 */
module.exports.sha256Hash = sha256Hash;
function sha256Hash(serializedData /*: Uint8Array*/) {
  const sha256 = crypto.createHash('sha256');
  sha256.update(Buffer.from(serializedData));
  return Uint8Array.from(sha256.digest());
}

/**
 * Compute a Keccak-256 hash over some data, the way that it will be computed in Rholang
 *
 * @param serializedData: Uint8Array of serialized Rholang data, used to compute the hash
 * @return Uint8Array of bytes representing the computed hash
 */
module.exports.keccak256Hash = keccak256Hash;
function keccak256Hash(serializedData /*: Uint8Array*/) {
  return new Uint8Array(keccak256.arrayBuffer(serializedData));
}

/**
 * Compute a Blake2b-256 hash over some data, the way that it will be computed in Rholang
 *
 * @param serializedData: Uint8Array of serialized Rholang data, used to compute the hash
 * @return Uint8Array of bytes representing the computed hash
 */
module.exports.blake2b256Hash = blake2b256Hash;
function blake2b256Hash(serializedData /*: Uint8Array*/) {
  const blake2b256 = blake2.createHash('blake2b', { digestLength: 32 });
  blake2b256.update(serializedData);
  return Uint8Array.from(blake2b256.digest());
}

/**
 * Compute a SHA256 hash for some Rholang-compatible data, then return the
 * string representing a HEX-encoded hash
 *
 * @param jsData: JS Data compatible with Rholang, used to compute the hash
 * @return HEX-formatted string representing the computed hash
 * @throws Error if the js_data contains a non-Rholang data structure
 */
module.exports.simplifiedSHA256Hash = simplifiedSHA256Hash;
function simplifiedSHA256Hash(jsData /*: Json*/) {
  const sha256 = crypto.createHash('sha256');
  const serializedData = RHOCore.toByteArray(RHOCore.fromJSData(jsData));
  sha256.update(Buffer.from(serializedData));
  return sha256.digest('hex');
}

/**
 * Compute a Keccak-256 hash for some Rholang-compatible data, then return the
 * string representing a HEX-encoded hash
 *
 * @param jsData: JS Data compatible with Rholang, used to compute the hash
 * @return HEX-formatted string representing the computed hash
 * @throws Error if the js_data contains a non-Rholang data structure
 */
module.exports.simplifiedKeccak256Hash = simplifiedKeccak256Hash;
function simplifiedKeccak256Hash(jsData /*: Json*/) {
  const serializedData = RHOCore.toByteArray(RHOCore.fromJSData(jsData));
  return keccak256(serializedData);
}

/**
 * Compute a Blake2b-256 hash for some Rholang-compatible data, then return the
 * string representing a HEX-encoded hash
 *
 * @param jsData: JS Data compatible with Rholang, used to compute the hash
 * @return HEX-formatted string representing the computed hash
 * @throws Error if the js_data contains a non-Rholang data structure
 */
module.exports.simplifiedBlake2b256Hash = simplifiedBlake2b256Hash;
function simplifiedBlake2b256Hash(jsData /*: Json*/) {
  const blake2b256 = blake2.createHash('blake2b', { digestLength: 32 });
  const serializedData = RHOCore.toByteArray(RHOCore.fromJSData(jsData));
  blake2b256.update(serializedData);
  return blake2b256.digest('hex');
}
