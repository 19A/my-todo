/**
 * @since 2022-12-21 14:27:41
 * @lastTime 2022-12-21 15:52:46
 * @description md5加密
 */

const crypto = require("crypto");
function md5(s) {
  return crypto
    .createHash("md5")
    .update("" + s)
    .digest("hex");
}
module.exports = md5;
