'use strict';

var gm = require('gm');
var path = require('path');
var querystring= require('querystring');

class CropPieces {

  /**
   * Pass through to gm
   * @param {Buffer|ReadableStream|String} any
   */
  static gm (any) {
    return gm(any);
  }

  /**
   * @param {Object} gmWrapped
   * @param {String} outdir
   * @param {Number} width
   * @param {Number} height
   * @param {Number} x
   * @param {Number} y
   * @returns {Promise}
   */
  static cutImg(gmWrapped, outdir, width, height, x, y) {
    return new Promise((resolve, reject) => {
      var filename = path.basename(gmWrapped.source);

      var boundingBox = {
        width: width,
        height: height,
        x: x,
        y: y
      };

      var outfile = outdir + filename + '?' + querystring.stringify(boundingBox, ';', ':');

      gmWrapped.crop(width, height, x, y).write(outfile, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(outfile);
        }
      });
    });
  }

  static cutImgList (any, list, outdir, callback) {
    var futures = list.map((e) => { return CropPieces.cutImg(CropPieces.gm(any), outdir, e.width, e.height, e.x, e.y) });

    Promise.all(futures).then((val) => callback(undefined, val))
                        .catch(callback);
  }
}

/**
 * @example {
 * var gmed = CropPieces.gm('youtube.png');
 * CropPieces.cutImg(gmed, 20, 20, 40, 50);
 * }
 */

module.exports = CropPieces;
