var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

// ../../node_modules/color-name/index.js
var require_color_name = __commonJS({
  "../../node_modules/color-name/index.js"(exports, module2) {
    "use strict";
    module2.exports = {
      "aliceblue": [240, 248, 255],
      "antiquewhite": [250, 235, 215],
      "aqua": [0, 255, 255],
      "aquamarine": [127, 255, 212],
      "azure": [240, 255, 255],
      "beige": [245, 245, 220],
      "bisque": [255, 228, 196],
      "black": [0, 0, 0],
      "blanchedalmond": [255, 235, 205],
      "blue": [0, 0, 255],
      "blueviolet": [138, 43, 226],
      "brown": [165, 42, 42],
      "burlywood": [222, 184, 135],
      "cadetblue": [95, 158, 160],
      "chartreuse": [127, 255, 0],
      "chocolate": [210, 105, 30],
      "coral": [255, 127, 80],
      "cornflowerblue": [100, 149, 237],
      "cornsilk": [255, 248, 220],
      "crimson": [220, 20, 60],
      "cyan": [0, 255, 255],
      "darkblue": [0, 0, 139],
      "darkcyan": [0, 139, 139],
      "darkgoldenrod": [184, 134, 11],
      "darkgray": [169, 169, 169],
      "darkgreen": [0, 100, 0],
      "darkgrey": [169, 169, 169],
      "darkkhaki": [189, 183, 107],
      "darkmagenta": [139, 0, 139],
      "darkolivegreen": [85, 107, 47],
      "darkorange": [255, 140, 0],
      "darkorchid": [153, 50, 204],
      "darkred": [139, 0, 0],
      "darksalmon": [233, 150, 122],
      "darkseagreen": [143, 188, 143],
      "darkslateblue": [72, 61, 139],
      "darkslategray": [47, 79, 79],
      "darkslategrey": [47, 79, 79],
      "darkturquoise": [0, 206, 209],
      "darkviolet": [148, 0, 211],
      "deeppink": [255, 20, 147],
      "deepskyblue": [0, 191, 255],
      "dimgray": [105, 105, 105],
      "dimgrey": [105, 105, 105],
      "dodgerblue": [30, 144, 255],
      "firebrick": [178, 34, 34],
      "floralwhite": [255, 250, 240],
      "forestgreen": [34, 139, 34],
      "fuchsia": [255, 0, 255],
      "gainsboro": [220, 220, 220],
      "ghostwhite": [248, 248, 255],
      "gold": [255, 215, 0],
      "goldenrod": [218, 165, 32],
      "gray": [128, 128, 128],
      "green": [0, 128, 0],
      "greenyellow": [173, 255, 47],
      "grey": [128, 128, 128],
      "honeydew": [240, 255, 240],
      "hotpink": [255, 105, 180],
      "indianred": [205, 92, 92],
      "indigo": [75, 0, 130],
      "ivory": [255, 255, 240],
      "khaki": [240, 230, 140],
      "lavender": [230, 230, 250],
      "lavenderblush": [255, 240, 245],
      "lawngreen": [124, 252, 0],
      "lemonchiffon": [255, 250, 205],
      "lightblue": [173, 216, 230],
      "lightcoral": [240, 128, 128],
      "lightcyan": [224, 255, 255],
      "lightgoldenrodyellow": [250, 250, 210],
      "lightgray": [211, 211, 211],
      "lightgreen": [144, 238, 144],
      "lightgrey": [211, 211, 211],
      "lightpink": [255, 182, 193],
      "lightsalmon": [255, 160, 122],
      "lightseagreen": [32, 178, 170],
      "lightskyblue": [135, 206, 250],
      "lightslategray": [119, 136, 153],
      "lightslategrey": [119, 136, 153],
      "lightsteelblue": [176, 196, 222],
      "lightyellow": [255, 255, 224],
      "lime": [0, 255, 0],
      "limegreen": [50, 205, 50],
      "linen": [250, 240, 230],
      "magenta": [255, 0, 255],
      "maroon": [128, 0, 0],
      "mediumaquamarine": [102, 205, 170],
      "mediumblue": [0, 0, 205],
      "mediumorchid": [186, 85, 211],
      "mediumpurple": [147, 112, 219],
      "mediumseagreen": [60, 179, 113],
      "mediumslateblue": [123, 104, 238],
      "mediumspringgreen": [0, 250, 154],
      "mediumturquoise": [72, 209, 204],
      "mediumvioletred": [199, 21, 133],
      "midnightblue": [25, 25, 112],
      "mintcream": [245, 255, 250],
      "mistyrose": [255, 228, 225],
      "moccasin": [255, 228, 181],
      "navajowhite": [255, 222, 173],
      "navy": [0, 0, 128],
      "oldlace": [253, 245, 230],
      "olive": [128, 128, 0],
      "olivedrab": [107, 142, 35],
      "orange": [255, 165, 0],
      "orangered": [255, 69, 0],
      "orchid": [218, 112, 214],
      "palegoldenrod": [238, 232, 170],
      "palegreen": [152, 251, 152],
      "paleturquoise": [175, 238, 238],
      "palevioletred": [219, 112, 147],
      "papayawhip": [255, 239, 213],
      "peachpuff": [255, 218, 185],
      "peru": [205, 133, 63],
      "pink": [255, 192, 203],
      "plum": [221, 160, 221],
      "powderblue": [176, 224, 230],
      "purple": [128, 0, 128],
      "rebeccapurple": [102, 51, 153],
      "red": [255, 0, 0],
      "rosybrown": [188, 143, 143],
      "royalblue": [65, 105, 225],
      "saddlebrown": [139, 69, 19],
      "salmon": [250, 128, 114],
      "sandybrown": [244, 164, 96],
      "seagreen": [46, 139, 87],
      "seashell": [255, 245, 238],
      "sienna": [160, 82, 45],
      "silver": [192, 192, 192],
      "skyblue": [135, 206, 235],
      "slateblue": [106, 90, 205],
      "slategray": [112, 128, 144],
      "slategrey": [112, 128, 144],
      "snow": [255, 250, 250],
      "springgreen": [0, 255, 127],
      "steelblue": [70, 130, 180],
      "tan": [210, 180, 140],
      "teal": [0, 128, 128],
      "thistle": [216, 191, 216],
      "tomato": [255, 99, 71],
      "turquoise": [64, 224, 208],
      "violet": [238, 130, 238],
      "wheat": [245, 222, 179],
      "white": [255, 255, 255],
      "whitesmoke": [245, 245, 245],
      "yellow": [255, 255, 0],
      "yellowgreen": [154, 205, 50]
    };
  }
});

// ../../node_modules/color-convert/conversions.js
var require_conversions = __commonJS({
  "../../node_modules/color-convert/conversions.js"(exports, module2) {
    var cssKeywords = require_color_name();
    var reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
      reverseKeywords[cssKeywords[key]] = key;
    }
    var convert = {
      rgb: { channels: 3, labels: "rgb" },
      hsl: { channels: 3, labels: "hsl" },
      hsv: { channels: 3, labels: "hsv" },
      hwb: { channels: 3, labels: "hwb" },
      cmyk: { channels: 4, labels: "cmyk" },
      xyz: { channels: 3, labels: "xyz" },
      lab: { channels: 3, labels: "lab" },
      lch: { channels: 3, labels: "lch" },
      hex: { channels: 1, labels: ["hex"] },
      keyword: { channels: 1, labels: ["keyword"] },
      ansi16: { channels: 1, labels: ["ansi16"] },
      ansi256: { channels: 1, labels: ["ansi256"] },
      hcg: { channels: 3, labels: ["h", "c", "g"] },
      apple: { channels: 3, labels: ["r16", "g16", "b16"] },
      gray: { channels: 1, labels: ["gray"] }
    };
    module2.exports = convert;
    for (const model of Object.keys(convert)) {
      if (!("channels" in convert[model])) {
        throw new Error("missing channels property: " + model);
      }
      if (!("labels" in convert[model])) {
        throw new Error("missing channel labels property: " + model);
      }
      if (convert[model].labels.length !== convert[model].channels) {
        throw new Error("channel and label counts mismatch: " + model);
      }
      const { channels, labels } = convert[model];
      delete convert[model].channels;
      delete convert[model].labels;
      Object.defineProperty(convert[model], "channels", { value: channels });
      Object.defineProperty(convert[model], "labels", { value: labels });
    }
    convert.rgb.hsl = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const min2 = Math.min(r, g, b);
      const max2 = Math.max(r, g, b);
      const delta = max2 - min2;
      let h;
      let s;
      if (max2 === min2) {
        h = 0;
      } else if (r === max2) {
        h = (g - b) / delta;
      } else if (g === max2) {
        h = 2 + (b - r) / delta;
      } else if (b === max2) {
        h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) {
        h += 360;
      }
      const l = (min2 + max2) / 2;
      if (max2 === min2) {
        s = 0;
      } else if (l <= 0.5) {
        s = delta / (max2 + min2);
      } else {
        s = delta / (2 - max2 - min2);
      }
      return [h, s * 100, l * 100];
    };
    convert.rgb.hsv = function(rgb) {
      let rdif;
      let gdif;
      let bdif;
      let h;
      let s;
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const v = Math.max(r, g, b);
      const diff = v - Math.min(r, g, b);
      const diffc = function(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };
      if (diff === 0) {
        h = 0;
        s = 0;
      } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) {
          h = bdif - gdif;
        } else if (g === v) {
          h = 1 / 3 + rdif - bdif;
        } else if (b === v) {
          h = 2 / 3 + gdif - rdif;
        }
        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }
      return [
        h * 360,
        s * 100,
        v * 100
      ];
    };
    convert.rgb.hwb = function(rgb) {
      const r = rgb[0];
      const g = rgb[1];
      let b = rgb[2];
      const h = convert.rgb.hsl(rgb)[0];
      const w = 1 / 255 * Math.min(r, Math.min(g, b));
      b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
      return [h, w * 100, b * 100];
    };
    convert.rgb.cmyk = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const k = Math.min(1 - r, 1 - g, 1 - b);
      const c = (1 - r - k) / (1 - k) || 0;
      const m = (1 - g - k) / (1 - k) || 0;
      const y = (1 - b - k) / (1 - k) || 0;
      return [c * 100, m * 100, y * 100, k * 100];
    };
    function comparativeDistance(x2, y) {
      return (x2[0] - y[0]) ** 2 + (x2[1] - y[1]) ** 2 + (x2[2] - y[2]) ** 2;
    }
    convert.rgb.keyword = function(rgb) {
      const reversed = reverseKeywords[rgb];
      if (reversed) {
        return reversed;
      }
      let currentClosestDistance = Infinity;
      let currentClosestKeyword;
      for (const keyword of Object.keys(cssKeywords)) {
        const value = cssKeywords[keyword];
        const distance = comparativeDistance(rgb, value);
        if (distance < currentClosestDistance) {
          currentClosestDistance = distance;
          currentClosestKeyword = keyword;
        }
      }
      return currentClosestKeyword;
    };
    convert.keyword.rgb = function(keyword) {
      return cssKeywords[keyword];
    };
    convert.rgb.xyz = function(rgb) {
      let r = rgb[0] / 255;
      let g = rgb[1] / 255;
      let b = rgb[2] / 255;
      r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
      g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
      b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
      const x2 = r * 0.4124 + g * 0.3576 + b * 0.1805;
      const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
      const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
      return [x2 * 100, y * 100, z * 100];
    };
    convert.rgb.lab = function(rgb) {
      const xyz = convert.rgb.xyz(rgb);
      let x2 = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x2 /= 95.047;
      y /= 100;
      z /= 108.883;
      x2 = x2 > 8856e-6 ? x2 ** (1 / 3) : 7.787 * x2 + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x2 - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.hsl.rgb = function(hsl) {
      const h = hsl[0] / 360;
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      let t2;
      let t3;
      let val;
      if (s === 0) {
        val = l * 255;
        return [val, val, val];
      }
      if (l < 0.5) {
        t2 = l * (1 + s);
      } else {
        t2 = l + s - l * s;
      }
      const t1 = 2 * l - t2;
      const rgb = [0, 0, 0];
      for (let i = 0; i < 3; i++) {
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) {
          t3++;
        }
        if (t3 > 1) {
          t3--;
        }
        if (6 * t3 < 1) {
          val = t1 + (t2 - t1) * 6 * t3;
        } else if (2 * t3 < 1) {
          val = t2;
        } else if (3 * t3 < 2) {
          val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        } else {
          val = t1;
        }
        rgb[i] = val * 255;
      }
      return rgb;
    };
    convert.hsl.hsv = function(hsl) {
      const h = hsl[0];
      let s = hsl[1] / 100;
      let l = hsl[2] / 100;
      let smin = s;
      const lmin = Math.max(l, 0.01);
      l *= 2;
      s *= l <= 1 ? l : 2 - l;
      smin *= lmin <= 1 ? lmin : 2 - lmin;
      const v = (l + s) / 2;
      const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
      return [h, sv * 100, v * 100];
    };
    convert.hsv.rgb = function(hsv) {
      const h = hsv[0] / 60;
      const s = hsv[1] / 100;
      let v = hsv[2] / 100;
      const hi = Math.floor(h) % 6;
      const f = h - Math.floor(h);
      const p = 255 * v * (1 - s);
      const q = 255 * v * (1 - s * f);
      const t = 255 * v * (1 - s * (1 - f));
      v *= 255;
      switch (hi) {
        case 0:
          return [v, t, p];
        case 1:
          return [q, v, p];
        case 2:
          return [p, v, t];
        case 3:
          return [p, q, v];
        case 4:
          return [t, p, v];
        case 5:
          return [v, p, q];
      }
    };
    convert.hsv.hsl = function(hsv) {
      const h = hsv[0];
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const vmin = Math.max(v, 0.01);
      let sl;
      let l;
      l = (2 - s) * v;
      const lmin = (2 - s) * vmin;
      sl = s * vmin;
      sl /= lmin <= 1 ? lmin : 2 - lmin;
      sl = sl || 0;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    convert.hwb.rgb = function(hwb) {
      const h = hwb[0] / 360;
      let wh = hwb[1] / 100;
      let bl = hwb[2] / 100;
      const ratio = wh + bl;
      let f;
      if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
      }
      const i = Math.floor(6 * h);
      const v = 1 - bl;
      f = 6 * h - i;
      if ((i & 1) !== 0) {
        f = 1 - f;
      }
      const n = wh + f * (v - wh);
      let r;
      let g;
      let b;
      switch (i) {
        default:
        case 6:
        case 0:
          r = v;
          g = n;
          b = wh;
          break;
        case 1:
          r = n;
          g = v;
          b = wh;
          break;
        case 2:
          r = wh;
          g = v;
          b = n;
          break;
        case 3:
          r = wh;
          g = n;
          b = v;
          break;
        case 4:
          r = n;
          g = wh;
          b = v;
          break;
        case 5:
          r = v;
          g = wh;
          b = n;
          break;
      }
      return [r * 255, g * 255, b * 255];
    };
    convert.cmyk.rgb = function(cmyk) {
      const c = cmyk[0] / 100;
      const m = cmyk[1] / 100;
      const y = cmyk[2] / 100;
      const k = cmyk[3] / 100;
      const r = 1 - Math.min(1, c * (1 - k) + k);
      const g = 1 - Math.min(1, m * (1 - k) + k);
      const b = 1 - Math.min(1, y * (1 - k) + k);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.rgb = function(xyz) {
      const x2 = xyz[0] / 100;
      const y = xyz[1] / 100;
      const z = xyz[2] / 100;
      let r;
      let g;
      let b;
      r = x2 * 3.2406 + y * -1.5372 + z * -0.4986;
      g = x2 * -0.9689 + y * 1.8758 + z * 0.0415;
      b = x2 * 0.0557 + y * -0.204 + z * 1.057;
      r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
      g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
      b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
      r = Math.min(Math.max(0, r), 1);
      g = Math.min(Math.max(0, g), 1);
      b = Math.min(Math.max(0, b), 1);
      return [r * 255, g * 255, b * 255];
    };
    convert.xyz.lab = function(xyz) {
      let x2 = xyz[0];
      let y = xyz[1];
      let z = xyz[2];
      x2 /= 95.047;
      y /= 100;
      z /= 108.883;
      x2 = x2 > 8856e-6 ? x2 ** (1 / 3) : 7.787 * x2 + 16 / 116;
      y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
      z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
      const l = 116 * y - 16;
      const a = 500 * (x2 - y);
      const b = 200 * (y - z);
      return [l, a, b];
    };
    convert.lab.xyz = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let x2;
      let y;
      let z;
      y = (l + 16) / 116;
      x2 = a / 500 + y;
      z = y - b / 200;
      const y2 = y ** 3;
      const x22 = x2 ** 3;
      const z2 = z ** 3;
      y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
      x2 = x22 > 8856e-6 ? x22 : (x2 - 16 / 116) / 7.787;
      z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
      x2 *= 95.047;
      y *= 100;
      z *= 108.883;
      return [x2, y, z];
    };
    convert.lab.lch = function(lab) {
      const l = lab[0];
      const a = lab[1];
      const b = lab[2];
      let h;
      const hr = Math.atan2(b, a);
      h = hr * 360 / 2 / Math.PI;
      if (h < 0) {
        h += 360;
      }
      const c = Math.sqrt(a * a + b * b);
      return [l, c, h];
    };
    convert.lch.lab = function(lch) {
      const l = lch[0];
      const c = lch[1];
      const h = lch[2];
      const hr = h / 360 * 2 * Math.PI;
      const a = c * Math.cos(hr);
      const b = c * Math.sin(hr);
      return [l, a, b];
    };
    convert.rgb.ansi16 = function(args, saturation = null) {
      const [r, g, b] = args;
      let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
      value = Math.round(value / 50);
      if (value === 0) {
        return 30;
      }
      let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
      if (value === 2) {
        ansi += 60;
      }
      return ansi;
    };
    convert.hsv.ansi16 = function(args) {
      return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    convert.rgb.ansi256 = function(args) {
      const r = args[0];
      const g = args[1];
      const b = args[2];
      if (r === g && g === b) {
        if (r < 8) {
          return 16;
        }
        if (r > 248) {
          return 231;
        }
        return Math.round((r - 8) / 247 * 24) + 232;
      }
      const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
      return ansi;
    };
    convert.ansi16.rgb = function(args) {
      let color = args % 10;
      if (color === 0 || color === 7) {
        if (args > 50) {
          color += 3.5;
        }
        color = color / 10.5 * 255;
        return [color, color, color];
      }
      const mult = (~~(args > 50) + 1) * 0.5;
      const r = (color & 1) * mult * 255;
      const g = (color >> 1 & 1) * mult * 255;
      const b = (color >> 2 & 1) * mult * 255;
      return [r, g, b];
    };
    convert.ansi256.rgb = function(args) {
      if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [c, c, c];
      }
      args -= 16;
      let rem;
      const r = Math.floor(args / 36) / 5 * 255;
      const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
      const b = rem % 6 / 5 * 255;
      return [r, g, b];
    };
    convert.rgb.hex = function(args) {
      const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
      const string2 = integer.toString(16).toUpperCase();
      return "000000".substring(string2.length) + string2;
    };
    convert.hex.rgb = function(args) {
      const match2 = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
      if (!match2) {
        return [0, 0, 0];
      }
      let colorString = match2[0];
      if (match2[0].length === 3) {
        colorString = colorString.split("").map((char) => {
          return char + char;
        }).join("");
      }
      const integer = parseInt(colorString, 16);
      const r = integer >> 16 & 255;
      const g = integer >> 8 & 255;
      const b = integer & 255;
      return [r, g, b];
    };
    convert.rgb.hcg = function(rgb) {
      const r = rgb[0] / 255;
      const g = rgb[1] / 255;
      const b = rgb[2] / 255;
      const max2 = Math.max(Math.max(r, g), b);
      const min2 = Math.min(Math.min(r, g), b);
      const chroma = max2 - min2;
      let grayscale;
      let hue;
      if (chroma < 1) {
        grayscale = min2 / (1 - chroma);
      } else {
        grayscale = 0;
      }
      if (chroma <= 0) {
        hue = 0;
      } else if (max2 === r) {
        hue = (g - b) / chroma % 6;
      } else if (max2 === g) {
        hue = 2 + (b - r) / chroma;
      } else {
        hue = 4 + (r - g) / chroma;
      }
      hue /= 6;
      hue %= 1;
      return [hue * 360, chroma * 100, grayscale * 100];
    };
    convert.hsl.hcg = function(hsl) {
      const s = hsl[1] / 100;
      const l = hsl[2] / 100;
      const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
      let f = 0;
      if (c < 1) {
        f = (l - 0.5 * c) / (1 - c);
      }
      return [hsl[0], c * 100, f * 100];
    };
    convert.hsv.hcg = function(hsv) {
      const s = hsv[1] / 100;
      const v = hsv[2] / 100;
      const c = s * v;
      let f = 0;
      if (c < 1) {
        f = (v - c) / (1 - c);
      }
      return [hsv[0], c * 100, f * 100];
    };
    convert.hcg.rgb = function(hcg) {
      const h = hcg[0] / 360;
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      if (c === 0) {
        return [g * 255, g * 255, g * 255];
      }
      const pure = [0, 0, 0];
      const hi = h % 1 * 6;
      const v = hi % 1;
      const w = 1 - v;
      let mg = 0;
      switch (Math.floor(hi)) {
        case 0:
          pure[0] = 1;
          pure[1] = v;
          pure[2] = 0;
          break;
        case 1:
          pure[0] = w;
          pure[1] = 1;
          pure[2] = 0;
          break;
        case 2:
          pure[0] = 0;
          pure[1] = 1;
          pure[2] = v;
          break;
        case 3:
          pure[0] = 0;
          pure[1] = w;
          pure[2] = 1;
          break;
        case 4:
          pure[0] = v;
          pure[1] = 0;
          pure[2] = 1;
          break;
        default:
          pure[0] = 1;
          pure[1] = 0;
          pure[2] = w;
      }
      mg = (1 - c) * g;
      return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
      ];
    };
    convert.hcg.hsv = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      let f = 0;
      if (v > 0) {
        f = c / v;
      }
      return [hcg[0], f * 100, v * 100];
    };
    convert.hcg.hsl = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const l = g * (1 - c) + 0.5 * c;
      let s = 0;
      if (l > 0 && l < 0.5) {
        s = c / (2 * l);
      } else if (l >= 0.5 && l < 1) {
        s = c / (2 * (1 - l));
      }
      return [hcg[0], s * 100, l * 100];
    };
    convert.hcg.hwb = function(hcg) {
      const c = hcg[1] / 100;
      const g = hcg[2] / 100;
      const v = c + g * (1 - c);
      return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    convert.hwb.hcg = function(hwb) {
      const w = hwb[1] / 100;
      const b = hwb[2] / 100;
      const v = 1 - b;
      const c = v - w;
      let g = 0;
      if (c < 1) {
        g = (v - c) / (1 - c);
      }
      return [hwb[0], c * 100, g * 100];
    };
    convert.apple.rgb = function(apple) {
      return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
    };
    convert.rgb.apple = function(rgb) {
      return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
    };
    convert.gray.rgb = function(args) {
      return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    convert.gray.hsl = function(args) {
      return [0, 0, args[0]];
    };
    convert.gray.hsv = convert.gray.hsl;
    convert.gray.hwb = function(gray) {
      return [0, 100, gray[0]];
    };
    convert.gray.cmyk = function(gray) {
      return [0, 0, 0, gray[0]];
    };
    convert.gray.lab = function(gray) {
      return [gray[0], 0, 0];
    };
    convert.gray.hex = function(gray) {
      const val = Math.round(gray[0] / 100 * 255) & 255;
      const integer = (val << 16) + (val << 8) + val;
      const string2 = integer.toString(16).toUpperCase();
      return "000000".substring(string2.length) + string2;
    };
    convert.rgb.gray = function(rgb) {
      const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
      return [val / 255 * 100];
    };
  }
});

// ../../node_modules/color-convert/route.js
var require_route = __commonJS({
  "../../node_modules/color-convert/route.js"(exports, module2) {
    var conversions = require_conversions();
    function buildGraph() {
      const graph = {};
      const models = Object.keys(conversions);
      for (let len = models.length, i = 0; i < len; i++) {
        graph[models[i]] = {
          distance: -1,
          parent: null
        };
      }
      return graph;
    }
    function deriveBFS(fromModel) {
      const graph = buildGraph();
      const queue = [fromModel];
      graph[fromModel].distance = 0;
      while (queue.length) {
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for (let len = adjacents.length, i = 0; i < len; i++) {
          const adjacent = adjacents[i];
          const node = graph[adjacent];
          if (node.distance === -1) {
            node.distance = graph[current].distance + 1;
            node.parent = current;
            queue.unshift(adjacent);
          }
        }
      }
      return graph;
    }
    function link(from, to) {
      return function(args) {
        return to(from(args));
      };
    }
    function wrapConversion(toModel, graph) {
      const path = [graph[toModel].parent, toModel];
      let fn = conversions[graph[toModel].parent][toModel];
      let cur = graph[toModel].parent;
      while (graph[cur].parent) {
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
      }
      fn.conversion = path;
      return fn;
    }
    module2.exports = function(fromModel) {
      const graph = deriveBFS(fromModel);
      const conversion = {};
      const models = Object.keys(graph);
      for (let len = models.length, i = 0; i < len; i++) {
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) {
          continue;
        }
        conversion[toModel] = wrapConversion(toModel, graph);
      }
      return conversion;
    };
  }
});

// ../../node_modules/color-convert/index.js
var require_color_convert = __commonJS({
  "../../node_modules/color-convert/index.js"(exports, module2) {
    var conversions = require_conversions();
    var route = require_route();
    var convert = {};
    var models = Object.keys(conversions);
    function wrapRaw(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        return fn(args);
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    function wrapRounded(fn) {
      const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === void 0 || arg0 === null) {
          return arg0;
        }
        if (arg0.length > 1) {
          args = arg0;
        }
        const result = fn(args);
        if (typeof result === "object") {
          for (let len = result.length, i = 0; i < len; i++) {
            result[i] = Math.round(result[i]);
          }
        }
        return result;
      };
      if ("conversion" in fn) {
        wrappedFn.conversion = fn.conversion;
      }
      return wrappedFn;
    }
    models.forEach((fromModel) => {
      convert[fromModel] = {};
      Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
      Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
      const routes = route(fromModel);
      const routeModels = Object.keys(routes);
      routeModels.forEach((toModel) => {
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
      });
    });
    module2.exports = convert;
  }
});

// ../../node_modules/ansi-styles/index.js
var require_ansi_styles = __commonJS({
  "../../node_modules/ansi-styles/index.js"(exports, module2) {
    "use strict";
    var wrapAnsi16 = (fn, offset) => (...args) => {
      const code2 = fn(...args);
      return `\x1B[${code2 + offset}m`;
    };
    var wrapAnsi256 = (fn, offset) => (...args) => {
      const code2 = fn(...args);
      return `\x1B[${38 + offset};5;${code2}m`;
    };
    var wrapAnsi16m = (fn, offset) => (...args) => {
      const rgb = fn(...args);
      return `\x1B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    var ansi2ansi = (n) => n;
    var rgb2rgb = (r, g, b) => [r, g, b];
    var setLazyProperty = (object2, property2, get6) => {
      Object.defineProperty(object2, property2, {
        get: () => {
          const value = get6();
          Object.defineProperty(object2, property2, {
            value,
            enumerable: true,
            configurable: true
          });
          return value;
        },
        enumerable: true,
        configurable: true
      });
    };
    var colorConvert;
    var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
      if (colorConvert === void 0) {
        colorConvert = require_color_convert();
      }
      const offset = isBackground ? 10 : 0;
      const styles = {};
      for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) {
          styles[name] = wrap(identity, offset);
        } else if (typeof suite === "object") {
          styles[name] = wrap(suite[targetSpace], offset);
        }
      }
      return styles;
    };
    function assembleStyles() {
      const codes = /* @__PURE__ */ new Map();
      const styles = {
        modifier: {
          reset: [0, 0],
          bold: [1, 22],
          dim: [2, 22],
          italic: [3, 23],
          underline: [4, 24],
          inverse: [7, 27],
          hidden: [8, 28],
          strikethrough: [9, 29]
        },
        color: {
          black: [30, 39],
          red: [31, 39],
          green: [32, 39],
          yellow: [33, 39],
          blue: [34, 39],
          magenta: [35, 39],
          cyan: [36, 39],
          white: [37, 39],
          blackBright: [90, 39],
          redBright: [91, 39],
          greenBright: [92, 39],
          yellowBright: [93, 39],
          blueBright: [94, 39],
          magentaBright: [95, 39],
          cyanBright: [96, 39],
          whiteBright: [97, 39]
        },
        bgColor: {
          bgBlack: [40, 49],
          bgRed: [41, 49],
          bgGreen: [42, 49],
          bgYellow: [43, 49],
          bgBlue: [44, 49],
          bgMagenta: [45, 49],
          bgCyan: [46, 49],
          bgWhite: [47, 49],
          bgBlackBright: [100, 49],
          bgRedBright: [101, 49],
          bgGreenBright: [102, 49],
          bgYellowBright: [103, 49],
          bgBlueBright: [104, 49],
          bgMagentaBright: [105, 49],
          bgCyanBright: [106, 49],
          bgWhiteBright: [107, 49]
        }
      };
      styles.color.gray = styles.color.blackBright;
      styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
      styles.color.grey = styles.color.blackBright;
      styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
      for (const [groupName, group] of Object.entries(styles)) {
        for (const [styleName, style] of Object.entries(group)) {
          styles[styleName] = {
            open: `\x1B[${style[0]}m`,
            close: `\x1B[${style[1]}m`
          };
          group[styleName] = styles[styleName];
          codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
          value: group,
          enumerable: false
        });
      }
      Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
      });
      styles.color.close = "\x1B[39m";
      styles.bgColor.close = "\x1B[49m";
      setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
      setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
      setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
      setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
      return styles;
    }
    Object.defineProperty(module2, "exports", {
      enumerable: true,
      get: assembleStyles
    });
  }
});

// ../../node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "../../node_modules/has-flag/index.js"(exports, module2) {
    "use strict";
    module2.exports = (flag, argv4 = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv4.indexOf(prefix + flag);
      const terminatorPosition = argv4.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// ../../node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "../../node_modules/supports-color/index.js"(exports, module2) {
    "use strict";
    var os = require("os");
    var tty = require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor2(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min2 = forceColor || 0;
      if (env.TERM === "dumb") {
        return min2;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min2;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version2 = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version2 >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min2;
    }
    function getSupportLevel(stream) {
      const level = supportsColor2(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module2.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor2(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor2(true, tty.isatty(2)))
    };
  }
});

// ../../node_modules/chalk/source/util.js
var require_util = __commonJS({
  "../../node_modules/chalk/source/util.js"(exports, module2) {
    "use strict";
    var stringReplaceAll = (string2, substring, replacer) => {
      let index = string2.indexOf(substring);
      if (index === -1) {
        return string2;
      }
      const substringLength = substring.length;
      let endIndex = 0;
      let returnValue = "";
      do {
        returnValue += string2.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string2.indexOf(substring, endIndex);
      } while (index !== -1);
      returnValue += string2.substr(endIndex);
      return returnValue;
    };
    var stringEncaseCRLFWithFirstIndex = (string2, prefix, postfix, index) => {
      let endIndex = 0;
      let returnValue = "";
      do {
        const gotCR = string2[index - 1] === "\r";
        returnValue += string2.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string2.indexOf("\n", endIndex);
      } while (index !== -1);
      returnValue += string2.substr(endIndex);
      return returnValue;
    };
    module2.exports = {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    };
  }
});

// ../../node_modules/chalk/source/templates.js
var require_templates = __commonJS({
  "../../node_modules/chalk/source/templates.js"(exports, module2) {
    "use strict";
    var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    var ESCAPES = /* @__PURE__ */ new Map([
      ["n", "\n"],
      ["r", "\r"],
      ["t", "	"],
      ["b", "\b"],
      ["f", "\f"],
      ["v", "\v"],
      ["0", "\0"],
      ["\\", "\\"],
      ["e", "\x1B"],
      ["a", "\x07"]
    ]);
    function unescape(c) {
      const u = c[0] === "u";
      const bracket = c[1] === "{";
      if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
        return String.fromCharCode(parseInt(c.slice(1), 16));
      }
      if (u && bracket) {
        return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
      }
      return ESCAPES.get(c) || c;
    }
    function parseArguments(name, arguments_) {
      const results = [];
      const chunks = arguments_.trim().split(/\s*,\s*/g);
      let matches;
      for (const chunk of chunks) {
        const number = Number(chunk);
        if (!Number.isNaN(number)) {
          results.push(number);
        } else if (matches = chunk.match(STRING_REGEX)) {
          results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
        } else {
          throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
        }
      }
      return results;
    }
    function parseStyle(style) {
      STYLE_REGEX.lastIndex = 0;
      const results = [];
      let matches;
      while ((matches = STYLE_REGEX.exec(style)) !== null) {
        const name = matches[1];
        if (matches[2]) {
          const args = parseArguments(name, matches[2]);
          results.push([name].concat(args));
        } else {
          results.push([name]);
        }
      }
      return results;
    }
    function buildStyle(chalk, styles) {
      const enabled = {};
      for (const layer of styles) {
        for (const style of layer.styles) {
          enabled[style[0]] = layer.inverse ? null : style.slice(1);
        }
      }
      let current = chalk;
      for (const [styleName, styles2] of Object.entries(enabled)) {
        if (!Array.isArray(styles2)) {
          continue;
        }
        if (!(styleName in current)) {
          throw new Error(`Unknown Chalk style: ${styleName}`);
        }
        current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
      }
      return current;
    }
    module2.exports = (chalk, temporary) => {
      const styles = [];
      const chunks = [];
      let chunk = [];
      temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
        if (escapeCharacter) {
          chunk.push(unescape(escapeCharacter));
        } else if (style) {
          const string2 = chunk.join("");
          chunk = [];
          chunks.push(styles.length === 0 ? string2 : buildStyle(chalk, styles)(string2));
          styles.push({ inverse, styles: parseStyle(style) });
        } else if (close) {
          if (styles.length === 0) {
            throw new Error("Found extraneous } in Chalk template literal");
          }
          chunks.push(buildStyle(chalk, styles)(chunk.join("")));
          chunk = [];
          styles.pop();
        } else {
          chunk.push(character);
        }
      });
      chunks.push(chunk.join(""));
      if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
      }
      return chunks.join("");
    };
  }
});

// ../../node_modules/chalk/source/index.js
var require_source = __commonJS({
  "../../node_modules/chalk/source/index.js"(exports, module2) {
    "use strict";
    var ansiStyles = require_ansi_styles();
    var { stdout: stdoutColor, stderr: stderrColor } = require_supports_color();
    var {
      stringReplaceAll,
      stringEncaseCRLFWithFirstIndex
    } = require_util();
    var { isArray } = Array;
    var levelMapping = [
      "ansi",
      "ansi",
      "ansi256",
      "ansi16m"
    ];
    var styles = /* @__PURE__ */ Object.create(null);
    var applyOptions = (object2, options = {}) => {
      if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
        throw new Error("The `level` option should be an integer from 0 to 3");
      }
      const colorLevel = stdoutColor ? stdoutColor.level : 0;
      object2.level = options.level === void 0 ? colorLevel : options.level;
    };
    var ChalkClass = class {
      constructor(options) {
        return chalkFactory(options);
      }
    };
    var chalkFactory = (options) => {
      const chalk2 = {};
      applyOptions(chalk2, options);
      chalk2.template = (...arguments_) => chalkTag(chalk2.template, ...arguments_);
      Object.setPrototypeOf(chalk2, Chalk2.prototype);
      Object.setPrototypeOf(chalk2.template, chalk2);
      chalk2.template.constructor = () => {
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
      };
      chalk2.template.Instance = ChalkClass;
      return chalk2.template;
    };
    function Chalk2(options) {
      return chalkFactory(options);
    }
    for (const [styleName, style] of Object.entries(ansiStyles)) {
      styles[styleName] = {
        get() {
          const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
          Object.defineProperty(this, styleName, { value: builder });
          return builder;
        }
      };
    }
    styles.visible = {
      get() {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", { value: builder });
        return builder;
      }
    };
    var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
    for (const model of usedModels) {
      styles[model] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    for (const model of usedModels) {
      const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
      styles[bgModel] = {
        get() {
          const { level } = this;
          return function(...arguments_) {
            const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
          };
        }
      };
    }
    var proto = Object.defineProperties(() => {
    }, {
      ...styles,
      level: {
        enumerable: true,
        get() {
          return this._generator.level;
        },
        set(level) {
          this._generator.level = level;
        }
      }
    });
    var createStyler = (open, close, parent) => {
      let openAll;
      let closeAll;
      if (parent === void 0) {
        openAll = open;
        closeAll = close;
      } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
      }
      return {
        open,
        close,
        openAll,
        closeAll,
        parent
      };
    };
    var createBuilder = (self, _styler, _isEmpty) => {
      const builder = (...arguments_) => {
        if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
          return applyStyle(builder, chalkTag(builder, ...arguments_));
        }
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
      };
      Object.setPrototypeOf(builder, proto);
      builder._generator = self;
      builder._styler = _styler;
      builder._isEmpty = _isEmpty;
      return builder;
    };
    var applyStyle = (self, string2) => {
      if (self.level <= 0 || !string2) {
        return self._isEmpty ? "" : string2;
      }
      let styler = self._styler;
      if (styler === void 0) {
        return string2;
      }
      const { openAll, closeAll } = styler;
      if (string2.indexOf("\x1B") !== -1) {
        while (styler !== void 0) {
          string2 = stringReplaceAll(string2, styler.close, styler.open);
          styler = styler.parent;
        }
      }
      const lfIndex = string2.indexOf("\n");
      if (lfIndex !== -1) {
        string2 = stringEncaseCRLFWithFirstIndex(string2, closeAll, openAll, lfIndex);
      }
      return openAll + string2 + closeAll;
    };
    var template;
    var chalkTag = (chalk2, ...strings) => {
      const [firstString] = strings;
      if (!isArray(firstString) || !isArray(firstString.raw)) {
        return strings.join(" ");
      }
      const arguments_ = strings.slice(1);
      const parts = [firstString.raw[0]];
      for (let i = 1; i < firstString.length; i++) {
        parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
      }
      if (template === void 0) {
        template = require_templates();
      }
      return template(chalk2, parts.join(""));
    };
    Object.defineProperties(Chalk2.prototype, styles);
    var chalk = Chalk2();
    chalk.supportsColor = stdoutColor;
    chalk.stderr = Chalk2({ level: stderrColor ? stderrColor.level : 0 });
    chalk.stderr.supportsColor = stderrColor;
    module2.exports = chalk;
  }
});

// ../../node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "../../node_modules/picomatch/lib/constants.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      CHAR_0: 48,
      CHAR_9: 57,
      CHAR_UPPERCASE_A: 65,
      CHAR_LOWERCASE_A: 97,
      CHAR_UPPERCASE_Z: 90,
      CHAR_LOWERCASE_Z: 122,
      CHAR_LEFT_PARENTHESES: 40,
      CHAR_RIGHT_PARENTHESES: 41,
      CHAR_ASTERISK: 42,
      CHAR_AMPERSAND: 38,
      CHAR_AT: 64,
      CHAR_BACKWARD_SLASH: 92,
      CHAR_CARRIAGE_RETURN: 13,
      CHAR_CIRCUMFLEX_ACCENT: 94,
      CHAR_COLON: 58,
      CHAR_COMMA: 44,
      CHAR_DOT: 46,
      CHAR_DOUBLE_QUOTE: 34,
      CHAR_EQUAL: 61,
      CHAR_EXCLAMATION_MARK: 33,
      CHAR_FORM_FEED: 12,
      CHAR_FORWARD_SLASH: 47,
      CHAR_GRAVE_ACCENT: 96,
      CHAR_HASH: 35,
      CHAR_HYPHEN_MINUS: 45,
      CHAR_LEFT_ANGLE_BRACKET: 60,
      CHAR_LEFT_CURLY_BRACE: 123,
      CHAR_LEFT_SQUARE_BRACKET: 91,
      CHAR_LINE_FEED: 10,
      CHAR_NO_BREAK_SPACE: 160,
      CHAR_PERCENT: 37,
      CHAR_PLUS: 43,
      CHAR_QUESTION_MARK: 63,
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      CHAR_RIGHT_CURLY_BRACE: 125,
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      CHAR_SEMICOLON: 59,
      CHAR_SINGLE_QUOTE: 39,
      CHAR_SPACE: 32,
      CHAR_TAB: 9,
      CHAR_UNDERSCORE: 95,
      CHAR_VERTICAL_LINE: 124,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      SEP: path.sep,
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// ../../node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var path = require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match2) => {
        return match2 === "\\" ? "" : match2;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend2 = options.contains ? "" : "^";
      const append2 = options.contains ? "" : "$";
      let output = `${prepend2}(?:${input})${append2}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// ../../node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "../../node_modules/picomatch/lib/scan.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      CHAR_AT,
      CHAR_BACKWARD_SLASH,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_EXCLAMATION_MARK,
      CHAR_FORWARD_SLASH,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_LEFT_PARENTHESES,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_PLUS,
      CHAR_QUESTION_MARK,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_RIGHT_PARENTHESES,
      CHAR_RIGHT_SQUARE_BRACKET
    } = require_constants();
    var isPathSeparator = (code2) => {
      return code2 === CHAR_FORWARD_SLASH || code2 === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code2;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code2;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code2 = advance();
        let next;
        if (code2 === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code2 = advance();
          if (code2 === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code2 === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code2 = advance())) {
            if (code2 === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code2 === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code2 === CHAR_DOT && (code2 = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code2 === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code2 === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code2 === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code2 === CHAR_PLUS || code2 === CHAR_AT || code2 === CHAR_ASTERISK || code2 === CHAR_QUESTION_MARK || code2 === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code2 === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code2 = advance())) {
                if (code2 === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code2 = advance();
                  continue;
                }
                if (code2 === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code2 === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code2 === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code2 === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code2 === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code2 === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code2 = advance())) {
              if (code2 === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code2 = advance();
                continue;
              }
              if (code2 === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob)
          glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code2)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// ../../node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/picomatch/lib/parse.js"(exports, module2) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse4 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max2 = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max2) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max2}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append2 = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append2(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse4(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match2 = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match2 && match2[0].length > 2) {
            slashes = match2[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append2({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append2({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append2({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range2 = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range2.unshift(arr[i].value);
              }
            }
            output = expandRange(range2, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match2 = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match2) {
            value += match2[0];
            state.index += match2[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end2 = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end2})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse4.fastpaths = (input, options) => {
      const opts = { ...options };
      const max2 = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max2) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max2}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create2 = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match2 = /^(.*?)\.(\w+)$/.exec(str);
            if (!match2)
              return;
            const source2 = create2(match2[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match2[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create2(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse4;
  }
});

// ../../node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "../../node_modules/picomatch/lib/picomatch.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var scan = require_scan();
    var parse4 = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match: match2, output } = picomatch.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match: match2, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match2 = input === glob;
      let output = match2 && format ? format(input) : input;
      if (match2 === false) {
        output = format ? format(input) : input;
        match2 = output === glob;
      }
      if (match2 === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match2 = picomatch.matchBase(input, regex, options, posix);
        } else {
          match2 = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match2), match: match2, output };
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse4(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend2 = opts.contains ? "" : "^";
      const append2 = opts.contains ? "" : "$";
      let source = `${prepend2}(?:${state.output})${append2}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse4.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse4(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// ../../node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "../../node_modules/picomatch/index.js"(exports, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// ../../node_modules/readdirp/index.js
var require_readdirp = __commonJS({
  "../../node_modules/readdirp/index.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var { Readable } = require("stream");
    var sysPath = require("path");
    var { promisify } = require("util");
    var picomatch = require_picomatch2();
    var readdir = promisify(fs.readdir);
    var stat = promisify(fs.stat);
    var lstat = promisify(fs.lstat);
    var realpath = promisify(fs.realpath);
    var BANG = "!";
    var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
    var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
    var FILE_TYPE = "files";
    var DIR_TYPE = "directories";
    var FILE_DIR_TYPE = "files_directories";
    var EVERYTHING_TYPE = "all";
    var ALL_TYPES = [FILE_TYPE, DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE];
    var isNormalFlowError = (error2) => NORMAL_FLOW_ERRORS.has(error2.code);
    var [maj, min2] = process.versions.node.split(".").slice(0, 2).map((n) => Number.parseInt(n, 10));
    var wantBigintFsStats = process.platform === "win32" && (maj > 10 || maj === 10 && min2 >= 5);
    var normalizeFilter = (filter) => {
      if (filter === void 0)
        return;
      if (typeof filter === "function")
        return filter;
      if (typeof filter === "string") {
        const glob = picomatch(filter.trim());
        return (entry) => glob(entry.basename);
      }
      if (Array.isArray(filter)) {
        const positive = [];
        const negative = [];
        for (const item of filter) {
          const trimmed = item.trim();
          if (trimmed.charAt(0) === BANG) {
            negative.push(picomatch(trimmed.slice(1)));
          } else {
            positive.push(picomatch(trimmed));
          }
        }
        if (negative.length > 0) {
          if (positive.length > 0) {
            return (entry) => positive.some((f) => f(entry.basename)) && !negative.some((f) => f(entry.basename));
          }
          return (entry) => !negative.some((f) => f(entry.basename));
        }
        return (entry) => positive.some((f) => f(entry.basename));
      }
    };
    var ReaddirpStream = class extends Readable {
      static get defaultOptions() {
        return {
          root: ".",
          fileFilter: (path) => true,
          directoryFilter: (path) => true,
          type: FILE_TYPE,
          lstat: false,
          depth: 2147483648,
          alwaysStat: false
        };
      }
      constructor(options = {}) {
        super({
          objectMode: true,
          autoDestroy: true,
          highWaterMark: options.highWaterMark || 4096
        });
        const opts = { ...ReaddirpStream.defaultOptions, ...options };
        const { root, type } = opts;
        this._fileFilter = normalizeFilter(opts.fileFilter);
        this._directoryFilter = normalizeFilter(opts.directoryFilter);
        const statMethod = opts.lstat ? lstat : stat;
        if (wantBigintFsStats) {
          this._stat = (path) => statMethod(path, { bigint: true });
        } else {
          this._stat = statMethod;
        }
        this._maxDepth = opts.depth;
        this._wantsDir = [DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
        this._wantsFile = [FILE_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
        this._wantsEverything = type === EVERYTHING_TYPE;
        this._root = sysPath.resolve(root);
        this._isDirent = "Dirent" in fs && !opts.alwaysStat;
        this._statsProp = this._isDirent ? "dirent" : "stats";
        this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
        this.parents = [this._exploreDir(root, 1)];
        this.reading = false;
        this.parent = void 0;
      }
      async _read(batch) {
        if (this.reading)
          return;
        this.reading = true;
        try {
          while (!this.destroyed && batch > 0) {
            const { path, depth, files = [] } = this.parent || {};
            if (files.length > 0) {
              const slice2 = files.splice(0, batch).map((dirent) => this._formatEntry(dirent, path));
              for (const entry of await Promise.all(slice2)) {
                if (this.destroyed)
                  return;
                const entryType = await this._getEntryType(entry);
                if (entryType === "directory" && this._directoryFilter(entry)) {
                  if (depth <= this._maxDepth) {
                    this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
                  }
                  if (this._wantsDir) {
                    this.push(entry);
                    batch--;
                  }
                } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
                  if (this._wantsFile) {
                    this.push(entry);
                    batch--;
                  }
                }
              }
            } else {
              const parent = this.parents.pop();
              if (!parent) {
                this.push(null);
                break;
              }
              this.parent = await parent;
              if (this.destroyed)
                return;
            }
          }
        } catch (error2) {
          this.destroy(error2);
        } finally {
          this.reading = false;
        }
      }
      async _exploreDir(path, depth) {
        let files;
        try {
          files = await readdir(path, this._rdOptions);
        } catch (error2) {
          this._onError(error2);
        }
        return { files, depth, path };
      }
      async _formatEntry(dirent, path) {
        let entry;
        try {
          const basename = this._isDirent ? dirent.name : dirent;
          const fullPath = sysPath.resolve(sysPath.join(path, basename));
          entry = { path: sysPath.relative(this._root, fullPath), fullPath, basename };
          entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
        } catch (err) {
          this._onError(err);
        }
        return entry;
      }
      _onError(err) {
        if (isNormalFlowError(err) && !this.destroyed) {
          this.emit("warn", err);
        } else {
          this.destroy(err);
        }
      }
      async _getEntryType(entry) {
        const stats = entry && entry[this._statsProp];
        if (!stats) {
          return;
        }
        if (stats.isFile()) {
          return "file";
        }
        if (stats.isDirectory()) {
          return "directory";
        }
        if (stats && stats.isSymbolicLink()) {
          const full = entry.fullPath;
          try {
            const entryRealPath = await realpath(full);
            const entryRealPathStats = await lstat(entryRealPath);
            if (entryRealPathStats.isFile()) {
              return "file";
            }
            if (entryRealPathStats.isDirectory()) {
              const len = entryRealPath.length;
              if (full.startsWith(entryRealPath) && full.substr(len, 1) === sysPath.sep) {
                const recursiveError = new Error(`Circular symlink detected: "${full}" points to "${entryRealPath}"`);
                recursiveError.code = RECURSIVE_ERROR_CODE;
                return this._onError(recursiveError);
              }
              return "directory";
            }
          } catch (error2) {
            this._onError(error2);
          }
        }
      }
      _includeAsFile(entry) {
        const stats = entry && entry[this._statsProp];
        return stats && this._wantsEverything && !stats.isDirectory();
      }
    };
    var readdirp = (root, options = {}) => {
      let type = options.entryType || options.type;
      if (type === "both")
        type = FILE_DIR_TYPE;
      if (type)
        options.type = type;
      if (!root) {
        throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
      } else if (typeof root !== "string") {
        throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
      } else if (type && !ALL_TYPES.includes(type)) {
        throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
      }
      options.root = root;
      return new ReaddirpStream(options);
    };
    var readdirpPromise = (root, options = {}) => {
      return new Promise((resolve2, reject) => {
        const files = [];
        readdirp(root, options).on("data", (entry) => files.push(entry)).on("end", () => resolve2(files)).on("error", (error2) => reject(error2));
      });
    };
    readdirp.promise = readdirpPromise;
    readdirp.ReaddirpStream = ReaddirpStream;
    readdirp.default = readdirp;
    module2.exports = readdirp;
  }
});

// ../../node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "../../node_modules/normalize-path/index.js"(exports, module2) {
    module2.exports = function(path, stripTrailing) {
      if (typeof path !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path === "\\" || path === "/")
        return "/";
      var len = path.length;
      if (len <= 1)
        return path;
      var prefix = "";
      if (len > 4 && path[3] === "\\") {
        var ch = path[2];
        if ((ch === "?" || ch === ".") && path.slice(0, 2) === "\\\\") {
          path = path.slice(2);
          prefix = "//";
        }
      }
      var segs = path.split(/[/\\]+/);
      if (stripTrailing !== false && segs[segs.length - 1] === "") {
        segs.pop();
      }
      return prefix + segs.join("/");
    };
  }
});

// ../../node_modules/anymatch/index.js
var require_anymatch = __commonJS({
  "../../node_modules/anymatch/index.js"(exports, module2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var picomatch = require_picomatch2();
    var normalizePath = require_normalize_path();
    var BANG = "!";
    var DEFAULT_OPTIONS = { returnIndex: false };
    var arrify = (item) => Array.isArray(item) ? item : [item];
    var createPattern = (matcher, options) => {
      if (typeof matcher === "function") {
        return matcher;
      }
      if (typeof matcher === "string") {
        const glob = picomatch(matcher, options);
        return (string2) => matcher === string2 || glob(string2);
      }
      if (matcher instanceof RegExp) {
        return (string2) => matcher.test(string2);
      }
      return (string2) => false;
    };
    var matchPatterns = (patterns, negPatterns, args, returnIndex) => {
      const isList = Array.isArray(args);
      const _path = isList ? args[0] : args;
      if (!isList && typeof _path !== "string") {
        throw new TypeError("anymatch: second argument must be a string: got " + Object.prototype.toString.call(_path));
      }
      const path = normalizePath(_path);
      for (let index = 0; index < negPatterns.length; index++) {
        const nglob = negPatterns[index];
        if (nglob(path)) {
          return returnIndex ? -1 : false;
        }
      }
      const applied = isList && [path].concat(args.slice(1));
      for (let index = 0; index < patterns.length; index++) {
        const pattern = patterns[index];
        if (isList ? pattern(...applied) : pattern(path)) {
          return returnIndex ? index : true;
        }
      }
      return returnIndex ? -1 : false;
    };
    var anymatch = (matchers, testString, options = DEFAULT_OPTIONS) => {
      if (matchers == null) {
        throw new TypeError("anymatch: specify first argument");
      }
      const opts = typeof options === "boolean" ? { returnIndex: options } : options;
      const returnIndex = opts.returnIndex || false;
      const mtchers = arrify(matchers);
      const negatedGlobs = mtchers.filter((item) => typeof item === "string" && item.charAt(0) === BANG).map((item) => item.slice(1)).map((item) => picomatch(item, opts));
      const patterns = mtchers.filter((item) => typeof item !== "string" || typeof item === "string" && item.charAt(0) !== BANG).map((matcher) => createPattern(matcher, opts));
      if (testString == null) {
        return (testString2, ri = false) => {
          const returnIndex2 = typeof ri === "boolean" ? ri : false;
          return matchPatterns(patterns, negatedGlobs, testString2, returnIndex2);
        };
      }
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    };
    anymatch.default = anymatch;
    module2.exports = anymatch;
  }
});

// ../../node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "../../node_modules/is-extglob/index.js"(exports, module2) {
    module2.exports = function isExtglob(str) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      var match2;
      while (match2 = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
        if (match2[2])
          return true;
        str = str.slice(match2.index + match2[0].length);
      }
      return false;
    };
  }
});

// ../../node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "../../node_modules/is-glob/index.js"(exports, module2) {
    var isExtglob = require_is_extglob();
    var chars = { "{": "}", "(": ")", "[": "]" };
    var strictCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      var pipeIndex = -2;
      var closeSquareIndex = -2;
      var closeCurlyIndex = -2;
      var closeParenIndex = -2;
      var backSlashIndex = -2;
      while (index < str.length) {
        if (str[index] === "*") {
          return true;
        }
        if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) {
          return true;
        }
        if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf("]", index);
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
          }
        }
        if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
          closeCurlyIndex = str.indexOf("}", index);
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true;
            }
          }
        }
        if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
          closeParenIndex = str.indexOf(")", index);
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true;
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf("|", index);
          }
          if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
            closeParenIndex = str.indexOf(")", pipeIndex);
            if (closeParenIndex > pipeIndex) {
              backSlashIndex = str.indexOf("\\", pipeIndex);
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true;
              }
            }
          }
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    var relaxedCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true;
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    module2.exports = function isGlob(str, options) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      if (isExtglob(str)) {
        return true;
      }
      var check = strictCheck;
      if (options && options.strict === false) {
        check = relaxedCheck;
      }
      return check(str);
    };
  }
});

// ../../node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  "../../node_modules/glob-parent/index.js"(exports, module2) {
    "use strict";
    var isGlob = require_is_glob();
    var pathPosixDirname = require("path").posix.dirname;
    var isWin32 = require("os").platform() === "win32";
    var slash = "/";
    var backslash = /\\/g;
    var enclosure = /[\{\[].*[\}\]]$/;
    var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
    module2.exports = function globParent(str, opts) {
      var options = Object.assign({ flipBackslashes: true }, opts);
      if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
        str = str.replace(backslash, slash);
      }
      if (enclosure.test(str)) {
        str += slash;
      }
      str += "a";
      do {
        str = pathPosixDirname(str);
      } while (isGlob(str) || globby.test(str));
      return str.replace(escaped, "$1");
    };
  }
});

// ../../node_modules/braces/lib/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/braces/lib/utils.js"(exports) {
    "use strict";
    exports.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports.exceedsLimit = (min2, max2, step = 1, limit) => {
      if (limit === false)
        return false;
      if (!exports.isInteger(min2) || !exports.isInteger(max2))
        return false;
      return (Number(max2) - Number(min2)) / Number(step) >= limit;
    };
    exports.escapeNode = (block, n = 0, type) => {
      let node = block.nodes[n];
      if (!node)
        return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports.encloseBrace = (node) => {
      if (node.type !== "brace")
        return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports.isInvalidBrace = (block) => {
      if (block.type !== "brace")
        return false;
      if (block.invalid === true || block.dollar)
        return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text")
        acc.push(node.value);
      if (node.type === "range")
        node.type = "text";
      return acc;
    }, []);
    exports.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i];
          Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
        }
        return result;
      };
      flat(args);
      return result;
    };
  }
});

// ../../node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/braces/lib/stringify.js"(exports, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = (ast, options = {}) => {
      let stringify = (node, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});

// ../../node_modules/is-number/index.js
var require_is_number = __commonJS({
  "../../node_modules/is-number/index.js"(exports, module2) {
    "use strict";
    module2.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});

// ../../node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "../../node_modules/to-regex-range/index.js"(exports, module2) {
    "use strict";
    var isNumber = require_is_number();
    var toRegexRange = (min2, max2, options) => {
      if (isNumber(min2) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max2 === void 0 || min2 === max2) {
        return String(min2);
      }
      if (isNumber(max2) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min2 + ":" + max2 + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min2, max2);
      let b = Math.max(min2, max2);
      if (Math.abs(a - b) === 1) {
        let result = min2 + "|" + max2;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min2) || hasPadding(max2);
      let state = { min: min2, max: max2, a, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min2, max2) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min2, nines);
      let stops = /* @__PURE__ */ new Set([max2]);
      while (min2 <= stop && stop <= max2) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min2, nines);
      }
      stop = countZeros(max2 + 1, zeros) - 1;
      while (min2 < stop && stop <= max2) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max2 + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip2(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min2, max2, tok, options) {
      let ranges = splitToRanges(min2, max2);
      let tokens = [];
      let start = min2;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max3 = ranges[i];
        let obj = rangeToPattern(String(start), String(max3), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max3 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max3, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max3 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string: string2 } = ele;
        if (!intersection && !contains(comparison, "string", string2)) {
          result.push(prefix + string2);
        }
        if (intersection && contains(comparison, "string", string2)) {
          result.push(prefix + string2);
        }
      }
      return result;
    }
    function zip2(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++)
        arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min2, len) {
      return Number(String(min2).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module2.exports = toRegexRange;
  }
});

// ../../node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "../../node_modules/fill-range/index.js"(exports, module2) {
    "use strict";
    var util = require("util");
    var toRegexRange = require_to_regex_range();
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-")
        value = value.slice(1);
      if (value === "0")
        return false;
      while (value[++index] === "0")
        ;
      return index > 0;
    };
    var stringify = (start, end2, options) => {
      if (typeof start === "string" || typeof end2 === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash)
          input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength)
        input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options) => {
      parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives.join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b)
        return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end2, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end2, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end2, options) => {
      if (options.strictRanges === true)
        throw rangeError([start, end2]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end2, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end2);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true)
          throw rangeError([start, end2]);
        return [];
      }
      if (a === 0)
        a = 0;
      if (b === 0)
        b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end2);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify(start, end2, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end2, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range2 = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range2.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options) : toRegex(range2, null, { wrap: false, ...options });
      }
      return range2;
    };
    var fillLetters = (start, end2, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end2) && end2.length > 1) {
        return invalidRange(start, end2, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end2}`.charCodeAt(0);
      let descending = a > b;
      let min2 = Math.min(a, b);
      let max2 = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min2, max2, false, options);
      }
      let range2 = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range2.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range2, null, { wrap: false, options });
      }
      return range2;
    };
    var fill2 = (start, end2, step, options = {}) => {
      if (end2 == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end2)) {
        return invalidRange(start, end2, options);
      }
      if (typeof step === "function") {
        return fill2(start, end2, 1, { transform: step });
      }
      if (isObject(step)) {
        return fill2(start, end2, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true)
        opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber(step)) {
        if (step != null && !isObject(step))
          return invalidStep(step, opts);
        return fill2(start, end2, 1, step);
      }
      if (isNumber(start) && isNumber(end2)) {
        return fillNumbers(start, end2, step, opts);
      }
      return fillLetters(start, end2, Math.max(Math.abs(step), 1), opts);
    };
    module2.exports = fill2;
  }
});

// ../../node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "../../node_modules/braces/lib/compile.js"(exports, module2) {
    "use strict";
    var fill2 = require_fill_range();
    var utils = require_utils2();
    var compile2 = (ast, options = {}) => {
      let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let invalid = invalidBlock === true || invalidNode === true;
        let prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes);
          let range2 = fill2(...args, { ...options, wrap: false, toRegex: true });
          if (range2.length !== 0) {
            return args.length > 1 && range2.length > 1 ? `(${range2})` : range2;
          }
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += walk(child, node);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module2.exports = compile2;
  }
});

// ../../node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "../../node_modules/braces/lib/expand.js"(exports, module2) {
    "use strict";
    var fill2 = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils2();
    var append2 = (queue = "", stash = "", enclose = false) => {
      let result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length)
        return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (let item of queue) {
        if (Array.isArray(item)) {
          for (let value of item) {
            result.push(append2(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string")
              ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append2(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      let walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append2(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append2(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range2 = fill2(...args, options);
          if (range2.length === 0) {
            range2 = stringify(node, options);
          }
          q.push(append2(q.pop(), range2));
          node.nodes = [];
          return;
        }
        let enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1)
              queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append2(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append2(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module2.exports = expand;
  }
});

// ../../node_modules/braces/lib/constants.js
var require_constants2 = __commonJS({
  "../../node_modules/braces/lib/constants.js"(exports, module2) {
    "use strict";
    module2.exports = {
      MAX_LENGTH: 1024 * 64,
      CHAR_0: "0",
      CHAR_9: "9",
      CHAR_UPPERCASE_A: "A",
      CHAR_LOWERCASE_A: "a",
      CHAR_UPPERCASE_Z: "Z",
      CHAR_LOWERCASE_Z: "z",
      CHAR_LEFT_PARENTHESES: "(",
      CHAR_RIGHT_PARENTHESES: ")",
      CHAR_ASTERISK: "*",
      CHAR_AMPERSAND: "&",
      CHAR_AT: "@",
      CHAR_BACKSLASH: "\\",
      CHAR_BACKTICK: "`",
      CHAR_CARRIAGE_RETURN: "\r",
      CHAR_CIRCUMFLEX_ACCENT: "^",
      CHAR_COLON: ":",
      CHAR_COMMA: ",",
      CHAR_DOLLAR: "$",
      CHAR_DOT: ".",
      CHAR_DOUBLE_QUOTE: '"',
      CHAR_EQUAL: "=",
      CHAR_EXCLAMATION_MARK: "!",
      CHAR_FORM_FEED: "\f",
      CHAR_FORWARD_SLASH: "/",
      CHAR_HASH: "#",
      CHAR_HYPHEN_MINUS: "-",
      CHAR_LEFT_ANGLE_BRACKET: "<",
      CHAR_LEFT_CURLY_BRACE: "{",
      CHAR_LEFT_SQUARE_BRACKET: "[",
      CHAR_LINE_FEED: "\n",
      CHAR_NO_BREAK_SPACE: "\xA0",
      CHAR_PERCENT: "%",
      CHAR_PLUS: "+",
      CHAR_QUESTION_MARK: "?",
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      CHAR_RIGHT_CURLY_BRACE: "}",
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      CHAR_SEMICOLON: ";",
      CHAR_SINGLE_QUOTE: "'",
      CHAR_SPACE: " ",
      CHAR_TAB: "	",
      CHAR_UNDERSCORE: "_",
      CHAR_VERTICAL_LINE: "|",
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
    };
  }
});

// ../../node_modules/braces/lib/parse.js
var require_parse2 = __commonJS({
  "../../node_modules/braces/lib/parse.js"(exports, module2) {
    "use strict";
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      CHAR_BACKTICK,
      CHAR_COMMA,
      CHAR_DOT,
      CHAR_LEFT_PARENTHESES,
      CHAR_RIGHT_PARENTHESES,
      CHAR_LEFT_CURLY_BRACE,
      CHAR_RIGHT_CURLY_BRACE,
      CHAR_LEFT_SQUARE_BRACKET,
      CHAR_RIGHT_SQUARE_BRACKET,
      CHAR_DOUBLE_QUOTE,
      CHAR_SINGLE_QUOTE,
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants2();
    var parse4 = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      let opts = options || {};
      let max2 = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max2) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max2})`);
      }
      let ast = { type: "root", input, nodes: [] };
      let stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      let length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      let memo = {};
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let closed = true;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          let open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true)
                value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          let brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          let type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            let open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          let siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            let before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open")
                node.isOpen = true;
              if (node.type === "close")
                node.isClose = true;
              if (!node.nodes)
                node.type = "text";
              node.invalid = true;
            }
          });
          let parent = stack[stack.length - 1];
          let index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module2.exports = parse4;
  }
});

// ../../node_modules/braces/index.js
var require_braces = __commonJS({
  "../../node_modules/braces/index.js"(exports, module2) {
    "use strict";
    var stringify = require_stringify();
    var compile2 = require_compile();
    var expand = require_expand();
    var parse4 = require_parse2();
    var braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (let pattern of input) {
          let result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse4(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile2(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module2.exports = braces;
  }
});

// ../../node_modules/binary-extensions/binary-extensions.json
var require_binary_extensions = __commonJS({
  "../../node_modules/binary-extensions/binary-extensions.json"(exports, module2) {
    module2.exports = [
      "3dm",
      "3ds",
      "3g2",
      "3gp",
      "7z",
      "a",
      "aac",
      "adp",
      "ai",
      "aif",
      "aiff",
      "alz",
      "ape",
      "apk",
      "appimage",
      "ar",
      "arj",
      "asf",
      "au",
      "avi",
      "bak",
      "baml",
      "bh",
      "bin",
      "bk",
      "bmp",
      "btif",
      "bz2",
      "bzip2",
      "cab",
      "caf",
      "cgm",
      "class",
      "cmx",
      "cpio",
      "cr2",
      "cur",
      "dat",
      "dcm",
      "deb",
      "dex",
      "djvu",
      "dll",
      "dmg",
      "dng",
      "doc",
      "docm",
      "docx",
      "dot",
      "dotm",
      "dra",
      "DS_Store",
      "dsk",
      "dts",
      "dtshd",
      "dvb",
      "dwg",
      "dxf",
      "ecelp4800",
      "ecelp7470",
      "ecelp9600",
      "egg",
      "eol",
      "eot",
      "epub",
      "exe",
      "f4v",
      "fbs",
      "fh",
      "fla",
      "flac",
      "flatpak",
      "fli",
      "flv",
      "fpx",
      "fst",
      "fvt",
      "g3",
      "gh",
      "gif",
      "graffle",
      "gz",
      "gzip",
      "h261",
      "h263",
      "h264",
      "icns",
      "ico",
      "ief",
      "img",
      "ipa",
      "iso",
      "jar",
      "jpeg",
      "jpg",
      "jpgv",
      "jpm",
      "jxr",
      "key",
      "ktx",
      "lha",
      "lib",
      "lvp",
      "lz",
      "lzh",
      "lzma",
      "lzo",
      "m3u",
      "m4a",
      "m4v",
      "mar",
      "mdi",
      "mht",
      "mid",
      "midi",
      "mj2",
      "mka",
      "mkv",
      "mmr",
      "mng",
      "mobi",
      "mov",
      "movie",
      "mp3",
      "mp4",
      "mp4a",
      "mpeg",
      "mpg",
      "mpga",
      "mxu",
      "nef",
      "npx",
      "numbers",
      "nupkg",
      "o",
      "odp",
      "ods",
      "odt",
      "oga",
      "ogg",
      "ogv",
      "otf",
      "ott",
      "pages",
      "pbm",
      "pcx",
      "pdb",
      "pdf",
      "pea",
      "pgm",
      "pic",
      "png",
      "pnm",
      "pot",
      "potm",
      "potx",
      "ppa",
      "ppam",
      "ppm",
      "pps",
      "ppsm",
      "ppsx",
      "ppt",
      "pptm",
      "pptx",
      "psd",
      "pya",
      "pyc",
      "pyo",
      "pyv",
      "qt",
      "rar",
      "ras",
      "raw",
      "resources",
      "rgb",
      "rip",
      "rlc",
      "rmf",
      "rmvb",
      "rpm",
      "rtf",
      "rz",
      "s3m",
      "s7z",
      "scpt",
      "sgi",
      "shar",
      "snap",
      "sil",
      "sketch",
      "slk",
      "smv",
      "snk",
      "so",
      "stl",
      "suo",
      "sub",
      "swf",
      "tar",
      "tbz",
      "tbz2",
      "tga",
      "tgz",
      "thmx",
      "tif",
      "tiff",
      "tlz",
      "ttc",
      "ttf",
      "txz",
      "udf",
      "uvh",
      "uvi",
      "uvm",
      "uvp",
      "uvs",
      "uvu",
      "viv",
      "vob",
      "war",
      "wav",
      "wax",
      "wbmp",
      "wdp",
      "weba",
      "webm",
      "webp",
      "whl",
      "wim",
      "wm",
      "wma",
      "wmv",
      "wmx",
      "woff",
      "woff2",
      "wrm",
      "wvx",
      "xbm",
      "xif",
      "xla",
      "xlam",
      "xls",
      "xlsb",
      "xlsm",
      "xlsx",
      "xlt",
      "xltm",
      "xltx",
      "xm",
      "xmind",
      "xpi",
      "xpm",
      "xwd",
      "xz",
      "z",
      "zip",
      "zipx"
    ];
  }
});

// ../../node_modules/binary-extensions/index.js
var require_binary_extensions2 = __commonJS({
  "../../node_modules/binary-extensions/index.js"(exports, module2) {
    module2.exports = require_binary_extensions();
  }
});

// ../../node_modules/is-binary-path/index.js
var require_is_binary_path = __commonJS({
  "../../node_modules/is-binary-path/index.js"(exports, module2) {
    "use strict";
    var path = require("path");
    var binaryExtensions = require_binary_extensions2();
    var extensions = new Set(binaryExtensions);
    module2.exports = (filePath) => extensions.has(path.extname(filePath).slice(1).toLowerCase());
  }
});

// ../../node_modules/chokidar/lib/constants.js
var require_constants3 = __commonJS({
  "../../node_modules/chokidar/lib/constants.js"(exports) {
    "use strict";
    var { sep: sep2 } = require("path");
    var { platform } = process;
    var os = require("os");
    exports.EV_ALL = "all";
    exports.EV_READY = "ready";
    exports.EV_ADD = "add";
    exports.EV_CHANGE = "change";
    exports.EV_ADD_DIR = "addDir";
    exports.EV_UNLINK = "unlink";
    exports.EV_UNLINK_DIR = "unlinkDir";
    exports.EV_RAW = "raw";
    exports.EV_ERROR = "error";
    exports.STR_DATA = "data";
    exports.STR_END = "end";
    exports.STR_CLOSE = "close";
    exports.FSEVENT_CREATED = "created";
    exports.FSEVENT_MODIFIED = "modified";
    exports.FSEVENT_DELETED = "deleted";
    exports.FSEVENT_MOVED = "moved";
    exports.FSEVENT_CLONED = "cloned";
    exports.FSEVENT_UNKNOWN = "unknown";
    exports.FSEVENT_TYPE_FILE = "file";
    exports.FSEVENT_TYPE_DIRECTORY = "directory";
    exports.FSEVENT_TYPE_SYMLINK = "symlink";
    exports.KEY_LISTENERS = "listeners";
    exports.KEY_ERR = "errHandlers";
    exports.KEY_RAW = "rawEmitters";
    exports.HANDLER_KEYS = [exports.KEY_LISTENERS, exports.KEY_ERR, exports.KEY_RAW];
    exports.DOT_SLASH = `.${sep2}`;
    exports.BACK_SLASH_RE = /\\/g;
    exports.DOUBLE_SLASH_RE = /\/\//;
    exports.SLASH_OR_BACK_SLASH_RE = /[/\\]/;
    exports.DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
    exports.REPLACER_RE = /^\.[/\\]/;
    exports.SLASH = "/";
    exports.SLASH_SLASH = "//";
    exports.BRACE_START = "{";
    exports.BANG = "!";
    exports.ONE_DOT = ".";
    exports.TWO_DOTS = "..";
    exports.STAR = "*";
    exports.GLOBSTAR = "**";
    exports.ROOT_GLOBSTAR = "/**/*";
    exports.SLASH_GLOBSTAR = "/**";
    exports.DIR_SUFFIX = "Dir";
    exports.ANYMATCH_OPTS = { dot: true };
    exports.STRING_TYPE = "string";
    exports.FUNCTION_TYPE = "function";
    exports.EMPTY_STR = "";
    exports.EMPTY_FN = () => {
    };
    exports.IDENTITY_FN = (val) => val;
    exports.isWindows = platform === "win32";
    exports.isMacos = platform === "darwin";
    exports.isLinux = platform === "linux";
    exports.isIBMi = os.type() === "OS400";
  }
});

// ../../node_modules/chokidar/lib/nodefs-handler.js
var require_nodefs_handler = __commonJS({
  "../../node_modules/chokidar/lib/nodefs-handler.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var sysPath = require("path");
    var { promisify } = require("util");
    var isBinaryPath = require_is_binary_path();
    var {
      isWindows,
      isLinux,
      EMPTY_FN,
      EMPTY_STR,
      KEY_LISTENERS,
      KEY_ERR,
      KEY_RAW,
      HANDLER_KEYS,
      EV_CHANGE,
      EV_ADD,
      EV_ADD_DIR,
      EV_ERROR,
      STR_DATA,
      STR_END,
      BRACE_START,
      STAR
    } = require_constants3();
    var THROTTLE_MODE_WATCH = "watch";
    var open = promisify(fs.open);
    var stat = promisify(fs.stat);
    var lstat = promisify(fs.lstat);
    var close = promisify(fs.close);
    var fsrealpath = promisify(fs.realpath);
    var statMethods = { lstat, stat };
    var foreach = (val, fn) => {
      if (val instanceof Set) {
        val.forEach(fn);
      } else {
        fn(val);
      }
    };
    var addAndConvert = (main, prop, item) => {
      let container = main[prop];
      if (!(container instanceof Set)) {
        main[prop] = container = /* @__PURE__ */ new Set([container]);
      }
      container.add(item);
    };
    var clearItem = (cont) => (key) => {
      const set2 = cont[key];
      if (set2 instanceof Set) {
        set2.clear();
      } else {
        delete cont[key];
      }
    };
    var delFromSet = (main, prop, item) => {
      const container = main[prop];
      if (container instanceof Set) {
        container.delete(item);
      } else if (container === item) {
        delete main[prop];
      }
    };
    var isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
    var FsWatchInstances = /* @__PURE__ */ new Map();
    function createFsWatchInstance(path, options, listener, errHandler, emitRaw) {
      const handleEvent = (rawEvent, evPath) => {
        listener(path);
        emitRaw(rawEvent, evPath, { watchedPath: path });
        if (evPath && path !== evPath) {
          fsWatchBroadcast(sysPath.resolve(path, evPath), KEY_LISTENERS, sysPath.join(path, evPath));
        }
      };
      try {
        return fs.watch(path, options, handleEvent);
      } catch (error2) {
        errHandler(error2);
      }
    }
    var fsWatchBroadcast = (fullPath, type, val1, val2, val3) => {
      const cont = FsWatchInstances.get(fullPath);
      if (!cont)
        return;
      foreach(cont[type], (listener) => {
        listener(val1, val2, val3);
      });
    };
    var setFsWatchListener = (path, fullPath, options, handlers) => {
      const { listener, errHandler, rawEmitter } = handlers;
      let cont = FsWatchInstances.get(fullPath);
      let watcher;
      if (!options.persistent) {
        watcher = createFsWatchInstance(path, options, listener, errHandler, rawEmitter);
        return watcher.close.bind(watcher);
      }
      if (cont) {
        addAndConvert(cont, KEY_LISTENERS, listener);
        addAndConvert(cont, KEY_ERR, errHandler);
        addAndConvert(cont, KEY_RAW, rawEmitter);
      } else {
        watcher = createFsWatchInstance(path, options, fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS), errHandler, fsWatchBroadcast.bind(null, fullPath, KEY_RAW));
        if (!watcher)
          return;
        watcher.on(EV_ERROR, async (error2) => {
          const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
          cont.watcherUnusable = true;
          if (isWindows && error2.code === "EPERM") {
            try {
              const fd = await open(path, "r");
              await close(fd);
              broadcastErr(error2);
            } catch (err) {
            }
          } else {
            broadcastErr(error2);
          }
        });
        cont = {
          listeners: listener,
          errHandlers: errHandler,
          rawEmitters: rawEmitter,
          watcher
        };
        FsWatchInstances.set(fullPath, cont);
      }
      return () => {
        delFromSet(cont, KEY_LISTENERS, listener);
        delFromSet(cont, KEY_ERR, errHandler);
        delFromSet(cont, KEY_RAW, rawEmitter);
        if (isEmptySet(cont.listeners)) {
          cont.watcher.close();
          FsWatchInstances.delete(fullPath);
          HANDLER_KEYS.forEach(clearItem(cont));
          cont.watcher = void 0;
          Object.freeze(cont);
        }
      };
    };
    var FsWatchFileInstances = /* @__PURE__ */ new Map();
    var setFsWatchFileListener = (path, fullPath, options, handlers) => {
      const { listener, rawEmitter } = handlers;
      let cont = FsWatchFileInstances.get(fullPath);
      let listeners = /* @__PURE__ */ new Set();
      let rawEmitters = /* @__PURE__ */ new Set();
      const copts = cont && cont.options;
      if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
        listeners = cont.listeners;
        rawEmitters = cont.rawEmitters;
        fs.unwatchFile(fullPath);
        cont = void 0;
      }
      if (cont) {
        addAndConvert(cont, KEY_LISTENERS, listener);
        addAndConvert(cont, KEY_RAW, rawEmitter);
      } else {
        cont = {
          listeners: listener,
          rawEmitters: rawEmitter,
          options,
          watcher: fs.watchFile(fullPath, options, (curr, prev) => {
            foreach(cont.rawEmitters, (rawEmitter2) => {
              rawEmitter2(EV_CHANGE, fullPath, { curr, prev });
            });
            const currmtime = curr.mtimeMs;
            if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
              foreach(cont.listeners, (listener2) => listener2(path, curr));
            }
          })
        };
        FsWatchFileInstances.set(fullPath, cont);
      }
      return () => {
        delFromSet(cont, KEY_LISTENERS, listener);
        delFromSet(cont, KEY_RAW, rawEmitter);
        if (isEmptySet(cont.listeners)) {
          FsWatchFileInstances.delete(fullPath);
          fs.unwatchFile(fullPath);
          cont.options = cont.watcher = void 0;
          Object.freeze(cont);
        }
      };
    };
    var NodeFsHandler = class {
      constructor(fsW) {
        this.fsw = fsW;
        this._boundHandleError = (error2) => fsW._handleError(error2);
      }
      _watchWithNodeFs(path, listener) {
        const opts = this.fsw.options;
        const directory = sysPath.dirname(path);
        const basename = sysPath.basename(path);
        const parent = this.fsw._getWatchedDir(directory);
        parent.add(basename);
        const absolutePath = sysPath.resolve(path);
        const options = { persistent: opts.persistent };
        if (!listener)
          listener = EMPTY_FN;
        let closer;
        if (opts.usePolling) {
          options.interval = opts.enableBinaryInterval && isBinaryPath(basename) ? opts.binaryInterval : opts.interval;
          closer = setFsWatchFileListener(path, absolutePath, options, {
            listener,
            rawEmitter: this.fsw._emitRaw
          });
        } else {
          closer = setFsWatchListener(path, absolutePath, options, {
            listener,
            errHandler: this._boundHandleError,
            rawEmitter: this.fsw._emitRaw
          });
        }
        return closer;
      }
      _handleFile(file, stats, initialAdd) {
        if (this.fsw.closed) {
          return;
        }
        const dirname = sysPath.dirname(file);
        const basename = sysPath.basename(file);
        const parent = this.fsw._getWatchedDir(dirname);
        let prevStats = stats;
        if (parent.has(basename))
          return;
        const listener = async (path, newStats) => {
          if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5))
            return;
          if (!newStats || newStats.mtimeMs === 0) {
            try {
              const newStats2 = await stat(file);
              if (this.fsw.closed)
                return;
              const at2 = newStats2.atimeMs;
              const mt = newStats2.mtimeMs;
              if (!at2 || at2 <= mt || mt !== prevStats.mtimeMs) {
                this.fsw._emit(EV_CHANGE, file, newStats2);
              }
              if (isLinux && prevStats.ino !== newStats2.ino) {
                this.fsw._closeFile(path);
                prevStats = newStats2;
                this.fsw._addPathCloser(path, this._watchWithNodeFs(file, listener));
              } else {
                prevStats = newStats2;
              }
            } catch (error2) {
              this.fsw._remove(dirname, basename);
            }
          } else if (parent.has(basename)) {
            const at2 = newStats.atimeMs;
            const mt = newStats.mtimeMs;
            if (!at2 || at2 <= mt || mt !== prevStats.mtimeMs) {
              this.fsw._emit(EV_CHANGE, file, newStats);
            }
            prevStats = newStats;
          }
        };
        const closer = this._watchWithNodeFs(file, listener);
        if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
          if (!this.fsw._throttle(EV_ADD, file, 0))
            return;
          this.fsw._emit(EV_ADD, file, stats);
        }
        return closer;
      }
      async _handleSymlink(entry, directory, path, item) {
        if (this.fsw.closed) {
          return;
        }
        const full = entry.fullPath;
        const dir = this.fsw._getWatchedDir(directory);
        if (!this.fsw.options.followSymlinks) {
          this.fsw._incrReadyCount();
          let linkPath;
          try {
            linkPath = await fsrealpath(path);
          } catch (e) {
            this.fsw._emitReady();
            return true;
          }
          if (this.fsw.closed)
            return;
          if (dir.has(item)) {
            if (this.fsw._symlinkPaths.get(full) !== linkPath) {
              this.fsw._symlinkPaths.set(full, linkPath);
              this.fsw._emit(EV_CHANGE, path, entry.stats);
            }
          } else {
            dir.add(item);
            this.fsw._symlinkPaths.set(full, linkPath);
            this.fsw._emit(EV_ADD, path, entry.stats);
          }
          this.fsw._emitReady();
          return true;
        }
        if (this.fsw._symlinkPaths.has(full)) {
          return true;
        }
        this.fsw._symlinkPaths.set(full, true);
      }
      _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
        directory = sysPath.join(directory, EMPTY_STR);
        if (!wh.hasGlob) {
          throttler = this.fsw._throttle("readdir", directory, 1e3);
          if (!throttler)
            return;
        }
        const previous = this.fsw._getWatchedDir(wh.path);
        const current = /* @__PURE__ */ new Set();
        let stream = this.fsw._readdirp(directory, {
          fileFilter: (entry) => wh.filterPath(entry),
          directoryFilter: (entry) => wh.filterDir(entry),
          depth: 0
        }).on(STR_DATA, async (entry) => {
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          const item = entry.path;
          let path = sysPath.join(directory, item);
          current.add(item);
          if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path, item)) {
            return;
          }
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          if (item === target || !target && !previous.has(item)) {
            this.fsw._incrReadyCount();
            path = sysPath.join(dir, sysPath.relative(dir, path));
            this._addToNodeFs(path, initialAdd, wh, depth + 1);
          }
        }).on(EV_ERROR, this._boundHandleError);
        return new Promise((resolve2) => stream.once(STR_END, () => {
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          const wasThrottled = throttler ? throttler.clear() : false;
          resolve2();
          previous.getChildren().filter((item) => {
            return item !== directory && !current.has(item) && (!wh.hasGlob || wh.filterPath({
              fullPath: sysPath.resolve(directory, item)
            }));
          }).forEach((item) => {
            this.fsw._remove(directory, item);
          });
          stream = void 0;
          if (wasThrottled)
            this._handleRead(directory, false, wh, target, dir, depth, throttler);
        }));
      }
      async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath) {
        const parentDir = this.fsw._getWatchedDir(sysPath.dirname(dir));
        const tracked = parentDir.has(sysPath.basename(dir));
        if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
          if (!wh.hasGlob || wh.globFilter(dir))
            this.fsw._emit(EV_ADD_DIR, dir, stats);
        }
        parentDir.add(sysPath.basename(dir));
        this.fsw._getWatchedDir(dir);
        let throttler;
        let closer;
        const oDepth = this.fsw.options.depth;
        if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath)) {
          if (!target) {
            await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
            if (this.fsw.closed)
              return;
          }
          closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
            if (stats2 && stats2.mtimeMs === 0)
              return;
            this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
          });
        }
        return closer;
      }
      async _addToNodeFs(path, initialAdd, priorWh, depth, target) {
        const ready = this.fsw._emitReady;
        if (this.fsw._isIgnored(path) || this.fsw.closed) {
          ready();
          return false;
        }
        const wh = this.fsw._getWatchHelpers(path, depth);
        if (!wh.hasGlob && priorWh) {
          wh.hasGlob = priorWh.hasGlob;
          wh.globFilter = priorWh.globFilter;
          wh.filterPath = (entry) => priorWh.filterPath(entry);
          wh.filterDir = (entry) => priorWh.filterDir(entry);
        }
        try {
          const stats = await statMethods[wh.statMethod](wh.watchPath);
          if (this.fsw.closed)
            return;
          if (this.fsw._isIgnored(wh.watchPath, stats)) {
            ready();
            return false;
          }
          const follow = this.fsw.options.followSymlinks && !path.includes(STAR) && !path.includes(BRACE_START);
          let closer;
          if (stats.isDirectory()) {
            const absPath = sysPath.resolve(path);
            const targetPath = follow ? await fsrealpath(path) : path;
            if (this.fsw.closed)
              return;
            closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
            if (this.fsw.closed)
              return;
            if (absPath !== targetPath && targetPath !== void 0) {
              this.fsw._symlinkPaths.set(absPath, targetPath);
            }
          } else if (stats.isSymbolicLink()) {
            const targetPath = follow ? await fsrealpath(path) : path;
            if (this.fsw.closed)
              return;
            const parent = sysPath.dirname(wh.watchPath);
            this.fsw._getWatchedDir(parent).add(wh.watchPath);
            this.fsw._emit(EV_ADD, wh.watchPath, stats);
            closer = await this._handleDir(parent, stats, initialAdd, depth, path, wh, targetPath);
            if (this.fsw.closed)
              return;
            if (targetPath !== void 0) {
              this.fsw._symlinkPaths.set(sysPath.resolve(path), targetPath);
            }
          } else {
            closer = this._handleFile(wh.watchPath, stats, initialAdd);
          }
          ready();
          this.fsw._addPathCloser(path, closer);
          return false;
        } catch (error2) {
          if (this.fsw._handleError(error2)) {
            ready();
            return path;
          }
        }
      }
    };
    module2.exports = NodeFsHandler;
  }
});

// ../../node_modules/chokidar/lib/fsevents-handler.js
var require_fsevents_handler = __commonJS({
  "../../node_modules/chokidar/lib/fsevents-handler.js"(exports, module2) {
    "use strict";
    var fs = require("fs");
    var sysPath = require("path");
    var { promisify } = require("util");
    var fsevents;
    try {
      fsevents = require("fsevents");
    } catch (error2) {
      if (process.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR)
        console.error(error2);
    }
    if (fsevents) {
      const mtch = process.version.match(/v(\d+)\.(\d+)/);
      if (mtch && mtch[1] && mtch[2]) {
        const maj = Number.parseInt(mtch[1], 10);
        const min2 = Number.parseInt(mtch[2], 10);
        if (maj === 8 && min2 < 16) {
          fsevents = void 0;
        }
      }
    }
    var {
      EV_ADD,
      EV_CHANGE,
      EV_ADD_DIR,
      EV_UNLINK,
      EV_ERROR,
      STR_DATA,
      STR_END,
      FSEVENT_CREATED,
      FSEVENT_MODIFIED,
      FSEVENT_DELETED,
      FSEVENT_MOVED,
      FSEVENT_UNKNOWN,
      FSEVENT_TYPE_FILE,
      FSEVENT_TYPE_DIRECTORY,
      FSEVENT_TYPE_SYMLINK,
      ROOT_GLOBSTAR,
      DIR_SUFFIX,
      DOT_SLASH,
      FUNCTION_TYPE,
      EMPTY_FN,
      IDENTITY_FN
    } = require_constants3();
    var Depth = (value) => isNaN(value) ? {} : { depth: value };
    var stat = promisify(fs.stat);
    var lstat = promisify(fs.lstat);
    var realpath = promisify(fs.realpath);
    var statMethods = { stat, lstat };
    var FSEventsWatchers = /* @__PURE__ */ new Map();
    var consolidateThreshhold = 10;
    var wrongEventFlags = /* @__PURE__ */ new Set([
      69888,
      70400,
      71424,
      72704,
      73472,
      131328,
      131840,
      262912
    ]);
    var createFSEventsInstance = (path, callback) => {
      const stop = fsevents.watch(path, callback);
      return { stop };
    };
    function setFSEventsListener(path, realPath, listener, rawEmitter) {
      let watchPath = sysPath.extname(realPath) ? sysPath.dirname(realPath) : realPath;
      const parentPath = sysPath.dirname(watchPath);
      let cont = FSEventsWatchers.get(watchPath);
      if (couldConsolidate(parentPath)) {
        watchPath = parentPath;
      }
      const resolvedPath = sysPath.resolve(path);
      const hasSymlink = resolvedPath !== realPath;
      const filteredListener = (fullPath, flags, info2) => {
        if (hasSymlink)
          fullPath = fullPath.replace(realPath, resolvedPath);
        if (fullPath === resolvedPath || !fullPath.indexOf(resolvedPath + sysPath.sep))
          listener(fullPath, flags, info2);
      };
      let watchedParent = false;
      for (const watchedPath of FSEventsWatchers.keys()) {
        if (realPath.indexOf(sysPath.resolve(watchedPath) + sysPath.sep) === 0) {
          watchPath = watchedPath;
          cont = FSEventsWatchers.get(watchPath);
          watchedParent = true;
          break;
        }
      }
      if (cont || watchedParent) {
        cont.listeners.add(filteredListener);
      } else {
        cont = {
          listeners: /* @__PURE__ */ new Set([filteredListener]),
          rawEmitter,
          watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
            if (!cont.listeners.size)
              return;
            const info2 = fsevents.getInfo(fullPath, flags);
            cont.listeners.forEach((list) => {
              list(fullPath, flags, info2);
            });
            cont.rawEmitter(info2.event, fullPath, info2);
          })
        };
        FSEventsWatchers.set(watchPath, cont);
      }
      return () => {
        const lst = cont.listeners;
        lst.delete(filteredListener);
        if (!lst.size) {
          FSEventsWatchers.delete(watchPath);
          if (cont.watcher)
            return cont.watcher.stop().then(() => {
              cont.rawEmitter = cont.watcher = void 0;
              Object.freeze(cont);
            });
        }
      };
    }
    var couldConsolidate = (path) => {
      let count = 0;
      for (const watchPath of FSEventsWatchers.keys()) {
        if (watchPath.indexOf(path) === 0) {
          count++;
          if (count >= consolidateThreshhold) {
            return true;
          }
        }
      }
      return false;
    };
    var canUse = () => fsevents && FSEventsWatchers.size < 128;
    var calcDepth = (path, root) => {
      let i = 0;
      while (!path.indexOf(root) && (path = sysPath.dirname(path)) !== root)
        i++;
      return i;
    };
    var sameTypes = (info2, stats) => info2.type === FSEVENT_TYPE_DIRECTORY && stats.isDirectory() || info2.type === FSEVENT_TYPE_SYMLINK && stats.isSymbolicLink() || info2.type === FSEVENT_TYPE_FILE && stats.isFile();
    var FsEventsHandler = class {
      constructor(fsw) {
        this.fsw = fsw;
      }
      checkIgnored(path, stats) {
        const ipaths = this.fsw._ignoredPaths;
        if (this.fsw._isIgnored(path, stats)) {
          ipaths.add(path);
          if (stats && stats.isDirectory()) {
            ipaths.add(path + ROOT_GLOBSTAR);
          }
          return true;
        }
        ipaths.delete(path);
        ipaths.delete(path + ROOT_GLOBSTAR);
      }
      addOrChange(path, fullPath, realPath, parent, watchedDir, item, info2, opts) {
        const event = watchedDir.has(item) ? EV_CHANGE : EV_ADD;
        this.handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info2, opts);
      }
      async checkExists(path, fullPath, realPath, parent, watchedDir, item, info2, opts) {
        try {
          const stats = await stat(path);
          if (this.fsw.closed)
            return;
          if (sameTypes(info2, stats)) {
            this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info2, opts);
          } else {
            this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info2, opts);
          }
        } catch (error2) {
          if (error2.code === "EACCES") {
            this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info2, opts);
          } else {
            this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info2, opts);
          }
        }
      }
      handleEvent(event, path, fullPath, realPath, parent, watchedDir, item, info2, opts) {
        if (this.fsw.closed || this.checkIgnored(path))
          return;
        if (event === EV_UNLINK) {
          const isDirectory = info2.type === FSEVENT_TYPE_DIRECTORY;
          if (isDirectory || watchedDir.has(item)) {
            this.fsw._remove(parent, item, isDirectory);
          }
        } else {
          if (event === EV_ADD) {
            if (info2.type === FSEVENT_TYPE_DIRECTORY)
              this.fsw._getWatchedDir(path);
            if (info2.type === FSEVENT_TYPE_SYMLINK && opts.followSymlinks) {
              const curDepth = opts.depth === void 0 ? void 0 : calcDepth(fullPath, realPath) + 1;
              return this._addToFsEvents(path, false, true, curDepth);
            }
            this.fsw._getWatchedDir(parent).add(item);
          }
          const eventName = info2.type === FSEVENT_TYPE_DIRECTORY ? event + DIR_SUFFIX : event;
          this.fsw._emit(eventName, path);
          if (eventName === EV_ADD_DIR)
            this._addToFsEvents(path, false, true);
        }
      }
      _watchWithFsEvents(watchPath, realPath, transform, globFilter) {
        if (this.fsw.closed || this.fsw._isIgnored(watchPath))
          return;
        const opts = this.fsw.options;
        const watchCallback = async (fullPath, flags, info2) => {
          if (this.fsw.closed)
            return;
          if (opts.depth !== void 0 && calcDepth(fullPath, realPath) > opts.depth)
            return;
          const path = transform(sysPath.join(watchPath, sysPath.relative(watchPath, fullPath)));
          if (globFilter && !globFilter(path))
            return;
          const parent = sysPath.dirname(path);
          const item = sysPath.basename(path);
          const watchedDir = this.fsw._getWatchedDir(info2.type === FSEVENT_TYPE_DIRECTORY ? path : parent);
          if (wrongEventFlags.has(flags) || info2.event === FSEVENT_UNKNOWN) {
            if (typeof opts.ignored === FUNCTION_TYPE) {
              let stats;
              try {
                stats = await stat(path);
              } catch (error2) {
              }
              if (this.fsw.closed)
                return;
              if (this.checkIgnored(path, stats))
                return;
              if (sameTypes(info2, stats)) {
                this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info2, opts);
              } else {
                this.handleEvent(EV_UNLINK, path, fullPath, realPath, parent, watchedDir, item, info2, opts);
              }
            } else {
              this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info2, opts);
            }
          } else {
            switch (info2.event) {
              case FSEVENT_CREATED:
              case FSEVENT_MODIFIED:
                return this.addOrChange(path, fullPath, realPath, parent, watchedDir, item, info2, opts);
              case FSEVENT_DELETED:
              case FSEVENT_MOVED:
                return this.checkExists(path, fullPath, realPath, parent, watchedDir, item, info2, opts);
            }
          }
        };
        const closer = setFSEventsListener(watchPath, realPath, watchCallback, this.fsw._emitRaw);
        this.fsw._emitReady();
        return closer;
      }
      async _handleFsEventsSymlink(linkPath, fullPath, transform, curDepth) {
        if (this.fsw.closed || this.fsw._symlinkPaths.has(fullPath))
          return;
        this.fsw._symlinkPaths.set(fullPath, true);
        this.fsw._incrReadyCount();
        try {
          const linkTarget = await realpath(linkPath);
          if (this.fsw.closed)
            return;
          if (this.fsw._isIgnored(linkTarget)) {
            return this.fsw._emitReady();
          }
          this.fsw._incrReadyCount();
          this._addToFsEvents(linkTarget || linkPath, (path) => {
            let aliasedPath = linkPath;
            if (linkTarget && linkTarget !== DOT_SLASH) {
              aliasedPath = path.replace(linkTarget, linkPath);
            } else if (path !== DOT_SLASH) {
              aliasedPath = sysPath.join(linkPath, path);
            }
            return transform(aliasedPath);
          }, false, curDepth);
        } catch (error2) {
          if (this.fsw._handleError(error2)) {
            return this.fsw._emitReady();
          }
        }
      }
      emitAdd(newPath, stats, processPath, opts, forceAdd) {
        const pp = processPath(newPath);
        const isDir = stats.isDirectory();
        const dirObj = this.fsw._getWatchedDir(sysPath.dirname(pp));
        const base = sysPath.basename(pp);
        if (isDir)
          this.fsw._getWatchedDir(pp);
        if (dirObj.has(base))
          return;
        dirObj.add(base);
        if (!opts.ignoreInitial || forceAdd === true) {
          this.fsw._emit(isDir ? EV_ADD_DIR : EV_ADD, pp, stats);
        }
      }
      initWatch(realPath, path, wh, processPath) {
        if (this.fsw.closed)
          return;
        const closer = this._watchWithFsEvents(wh.watchPath, sysPath.resolve(realPath || wh.watchPath), processPath, wh.globFilter);
        this.fsw._addPathCloser(path, closer);
      }
      async _addToFsEvents(path, transform, forceAdd, priorDepth) {
        if (this.fsw.closed) {
          return;
        }
        const opts = this.fsw.options;
        const processPath = typeof transform === FUNCTION_TYPE ? transform : IDENTITY_FN;
        const wh = this.fsw._getWatchHelpers(path);
        try {
          const stats = await statMethods[wh.statMethod](wh.watchPath);
          if (this.fsw.closed)
            return;
          if (this.fsw._isIgnored(wh.watchPath, stats)) {
            throw null;
          }
          if (stats.isDirectory()) {
            if (!wh.globFilter)
              this.emitAdd(processPath(path), stats, processPath, opts, forceAdd);
            if (priorDepth && priorDepth > opts.depth)
              return;
            this.fsw._readdirp(wh.watchPath, {
              fileFilter: (entry) => wh.filterPath(entry),
              directoryFilter: (entry) => wh.filterDir(entry),
              ...Depth(opts.depth - (priorDepth || 0))
            }).on(STR_DATA, (entry) => {
              if (this.fsw.closed) {
                return;
              }
              if (entry.stats.isDirectory() && !wh.filterPath(entry))
                return;
              const joinedPath = sysPath.join(wh.watchPath, entry.path);
              const { fullPath } = entry;
              if (wh.followSymlinks && entry.stats.isSymbolicLink()) {
                const curDepth = opts.depth === void 0 ? void 0 : calcDepth(joinedPath, sysPath.resolve(wh.watchPath)) + 1;
                this._handleFsEventsSymlink(joinedPath, fullPath, processPath, curDepth);
              } else {
                this.emitAdd(joinedPath, entry.stats, processPath, opts, forceAdd);
              }
            }).on(EV_ERROR, EMPTY_FN).on(STR_END, () => {
              this.fsw._emitReady();
            });
          } else {
            this.emitAdd(wh.watchPath, stats, processPath, opts, forceAdd);
            this.fsw._emitReady();
          }
        } catch (error2) {
          if (!error2 || this.fsw._handleError(error2)) {
            this.fsw._emitReady();
            this.fsw._emitReady();
          }
        }
        if (opts.persistent && forceAdd !== true) {
          if (typeof transform === FUNCTION_TYPE) {
            this.initWatch(void 0, path, wh, processPath);
          } else {
            let realPath;
            try {
              realPath = await realpath(wh.watchPath);
            } catch (e) {
            }
            this.initWatch(realPath, path, wh, processPath);
          }
        }
      }
    };
    module2.exports = FsEventsHandler;
    module2.exports.canUse = canUse;
  }
});

// ../../node_modules/chokidar/index.js
var require_chokidar = __commonJS({
  "../../node_modules/chokidar/index.js"(exports) {
    "use strict";
    var { EventEmitter } = require("events");
    var fs = require("fs");
    var sysPath = require("path");
    var { promisify } = require("util");
    var readdirp = require_readdirp();
    var anymatch = require_anymatch().default;
    var globParent = require_glob_parent();
    var isGlob = require_is_glob();
    var braces = require_braces();
    var normalizePath = require_normalize_path();
    var NodeFsHandler = require_nodefs_handler();
    var FsEventsHandler = require_fsevents_handler();
    var {
      EV_ALL,
      EV_READY,
      EV_ADD,
      EV_CHANGE,
      EV_UNLINK,
      EV_ADD_DIR,
      EV_UNLINK_DIR,
      EV_RAW,
      EV_ERROR,
      STR_CLOSE,
      STR_END,
      BACK_SLASH_RE,
      DOUBLE_SLASH_RE,
      SLASH_OR_BACK_SLASH_RE,
      DOT_RE,
      REPLACER_RE,
      SLASH,
      SLASH_SLASH,
      BRACE_START,
      BANG,
      ONE_DOT,
      TWO_DOTS,
      GLOBSTAR,
      SLASH_GLOBSTAR,
      ANYMATCH_OPTS,
      STRING_TYPE,
      FUNCTION_TYPE,
      EMPTY_STR,
      EMPTY_FN,
      isWindows,
      isMacos,
      isIBMi
    } = require_constants3();
    var stat = promisify(fs.stat);
    var readdir = promisify(fs.readdir);
    var arrify = (value = []) => Array.isArray(value) ? value : [value];
    var flatten = (list, result = []) => {
      list.forEach((item) => {
        if (Array.isArray(item)) {
          flatten(item, result);
        } else {
          result.push(item);
        }
      });
      return result;
    };
    var unifyPaths = (paths_) => {
      const paths = flatten(arrify(paths_));
      if (!paths.every((p) => typeof p === STRING_TYPE)) {
        throw new TypeError(`Non-string provided as watch path: ${paths}`);
      }
      return paths.map(normalizePathToUnix);
    };
    var toUnix = (string2) => {
      let str = string2.replace(BACK_SLASH_RE, SLASH);
      let prepend2 = false;
      if (str.startsWith(SLASH_SLASH)) {
        prepend2 = true;
      }
      while (str.match(DOUBLE_SLASH_RE)) {
        str = str.replace(DOUBLE_SLASH_RE, SLASH);
      }
      if (prepend2) {
        str = SLASH + str;
      }
      return str;
    };
    var normalizePathToUnix = (path) => toUnix(sysPath.normalize(toUnix(path)));
    var normalizeIgnored = (cwd2 = EMPTY_STR) => (path) => {
      if (typeof path !== STRING_TYPE)
        return path;
      return normalizePathToUnix(sysPath.isAbsolute(path) ? path : sysPath.join(cwd2, path));
    };
    var getAbsolutePath = (path, cwd2) => {
      if (sysPath.isAbsolute(path)) {
        return path;
      }
      if (path.startsWith(BANG)) {
        return BANG + sysPath.join(cwd2, path.slice(1));
      }
      return sysPath.join(cwd2, path);
    };
    var undef = (opts, key) => opts[key] === void 0;
    var DirEntry = class {
      constructor(dir, removeWatcher) {
        this.path = dir;
        this._removeWatcher = removeWatcher;
        this.items = /* @__PURE__ */ new Set();
      }
      add(item) {
        const { items } = this;
        if (!items)
          return;
        if (item !== ONE_DOT && item !== TWO_DOTS)
          items.add(item);
      }
      async remove(item) {
        const { items } = this;
        if (!items)
          return;
        items.delete(item);
        if (items.size > 0)
          return;
        const dir = this.path;
        try {
          await readdir(dir);
        } catch (err) {
          if (this._removeWatcher) {
            this._removeWatcher(sysPath.dirname(dir), sysPath.basename(dir));
          }
        }
      }
      has(item) {
        const { items } = this;
        if (!items)
          return;
        return items.has(item);
      }
      getChildren() {
        const { items } = this;
        if (!items)
          return;
        return [...items.values()];
      }
      dispose() {
        this.items.clear();
        delete this.path;
        delete this._removeWatcher;
        delete this.items;
        Object.freeze(this);
      }
    };
    var STAT_METHOD_F = "stat";
    var STAT_METHOD_L = "lstat";
    var WatchHelper = class {
      constructor(path, watchPath, follow, fsw) {
        this.fsw = fsw;
        this.path = path = path.replace(REPLACER_RE, EMPTY_STR);
        this.watchPath = watchPath;
        this.fullWatchPath = sysPath.resolve(watchPath);
        this.hasGlob = watchPath !== path;
        if (path === EMPTY_STR)
          this.hasGlob = false;
        this.globSymlink = this.hasGlob && follow ? void 0 : false;
        this.globFilter = this.hasGlob ? anymatch(path, void 0, ANYMATCH_OPTS) : false;
        this.dirParts = this.getDirParts(path);
        this.dirParts.forEach((parts) => {
          if (parts.length > 1)
            parts.pop();
        });
        this.followSymlinks = follow;
        this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
      }
      checkGlobSymlink(entry) {
        if (this.globSymlink === void 0) {
          this.globSymlink = entry.fullParentDir === this.fullWatchPath ? false : { realPath: entry.fullParentDir, linkPath: this.fullWatchPath };
        }
        if (this.globSymlink) {
          return entry.fullPath.replace(this.globSymlink.realPath, this.globSymlink.linkPath);
        }
        return entry.fullPath;
      }
      entryPath(entry) {
        return sysPath.join(this.watchPath, sysPath.relative(this.watchPath, this.checkGlobSymlink(entry)));
      }
      filterPath(entry) {
        const { stats } = entry;
        if (stats && stats.isSymbolicLink())
          return this.filterDir(entry);
        const resolvedPath = this.entryPath(entry);
        const matchesGlob = this.hasGlob && typeof this.globFilter === FUNCTION_TYPE ? this.globFilter(resolvedPath) : true;
        return matchesGlob && this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
      }
      getDirParts(path) {
        if (!this.hasGlob)
          return [];
        const parts = [];
        const expandedPath = path.includes(BRACE_START) ? braces.expand(path) : [path];
        expandedPath.forEach((path2) => {
          parts.push(sysPath.relative(this.watchPath, path2).split(SLASH_OR_BACK_SLASH_RE));
        });
        return parts;
      }
      filterDir(entry) {
        if (this.hasGlob) {
          const entryParts = this.getDirParts(this.checkGlobSymlink(entry));
          let globstar = false;
          this.unmatchedGlob = !this.dirParts.some((parts) => {
            return parts.every((part, i) => {
              if (part === GLOBSTAR)
                globstar = true;
              return globstar || !entryParts[0][i] || anymatch(part, entryParts[0][i], ANYMATCH_OPTS);
            });
          });
        }
        return !this.unmatchedGlob && this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
      }
    };
    var FSWatcher = class extends EventEmitter {
      constructor(_opts) {
        super();
        const opts = {};
        if (_opts)
          Object.assign(opts, _opts);
        this._watched = /* @__PURE__ */ new Map();
        this._closers = /* @__PURE__ */ new Map();
        this._ignoredPaths = /* @__PURE__ */ new Set();
        this._throttled = /* @__PURE__ */ new Map();
        this._symlinkPaths = /* @__PURE__ */ new Map();
        this._streams = /* @__PURE__ */ new Set();
        this.closed = false;
        if (undef(opts, "persistent"))
          opts.persistent = true;
        if (undef(opts, "ignoreInitial"))
          opts.ignoreInitial = false;
        if (undef(opts, "ignorePermissionErrors"))
          opts.ignorePermissionErrors = false;
        if (undef(opts, "interval"))
          opts.interval = 100;
        if (undef(opts, "binaryInterval"))
          opts.binaryInterval = 300;
        if (undef(opts, "disableGlobbing"))
          opts.disableGlobbing = false;
        opts.enableBinaryInterval = opts.binaryInterval !== opts.interval;
        if (undef(opts, "useFsEvents"))
          opts.useFsEvents = !opts.usePolling;
        const canUseFsEvents = FsEventsHandler.canUse();
        if (!canUseFsEvents)
          opts.useFsEvents = false;
        if (undef(opts, "usePolling") && !opts.useFsEvents) {
          opts.usePolling = isMacos;
        }
        if (isIBMi) {
          opts.usePolling = true;
        }
        const envPoll = process.env.CHOKIDAR_USEPOLLING;
        if (envPoll !== void 0) {
          const envLower = envPoll.toLowerCase();
          if (envLower === "false" || envLower === "0") {
            opts.usePolling = false;
          } else if (envLower === "true" || envLower === "1") {
            opts.usePolling = true;
          } else {
            opts.usePolling = !!envLower;
          }
        }
        const envInterval = process.env.CHOKIDAR_INTERVAL;
        if (envInterval) {
          opts.interval = Number.parseInt(envInterval, 10);
        }
        if (undef(opts, "atomic"))
          opts.atomic = !opts.usePolling && !opts.useFsEvents;
        if (opts.atomic)
          this._pendingUnlinks = /* @__PURE__ */ new Map();
        if (undef(opts, "followSymlinks"))
          opts.followSymlinks = true;
        if (undef(opts, "awaitWriteFinish"))
          opts.awaitWriteFinish = false;
        if (opts.awaitWriteFinish === true)
          opts.awaitWriteFinish = {};
        const awf = opts.awaitWriteFinish;
        if (awf) {
          if (!awf.stabilityThreshold)
            awf.stabilityThreshold = 2e3;
          if (!awf.pollInterval)
            awf.pollInterval = 100;
          this._pendingWrites = /* @__PURE__ */ new Map();
        }
        if (opts.ignored)
          opts.ignored = arrify(opts.ignored);
        let readyCalls = 0;
        this._emitReady = () => {
          readyCalls++;
          if (readyCalls >= this._readyCount) {
            this._emitReady = EMPTY_FN;
            this._readyEmitted = true;
            process.nextTick(() => this.emit(EV_READY));
          }
        };
        this._emitRaw = (...args) => this.emit(EV_RAW, ...args);
        this._readyEmitted = false;
        this.options = opts;
        if (opts.useFsEvents) {
          this._fsEventsHandler = new FsEventsHandler(this);
        } else {
          this._nodeFsHandler = new NodeFsHandler(this);
        }
        Object.freeze(opts);
      }
      add(paths_, _origAdd, _internal) {
        const { cwd: cwd2, disableGlobbing } = this.options;
        this.closed = false;
        let paths = unifyPaths(paths_);
        if (cwd2) {
          paths = paths.map((path) => {
            const absPath = getAbsolutePath(path, cwd2);
            if (disableGlobbing || !isGlob(path)) {
              return absPath;
            }
            return normalizePath(absPath);
          });
        }
        paths = paths.filter((path) => {
          if (path.startsWith(BANG)) {
            this._ignoredPaths.add(path.slice(1));
            return false;
          }
          this._ignoredPaths.delete(path);
          this._ignoredPaths.delete(path + SLASH_GLOBSTAR);
          this._userIgnored = void 0;
          return true;
        });
        if (this.options.useFsEvents && this._fsEventsHandler) {
          if (!this._readyCount)
            this._readyCount = paths.length;
          if (this.options.persistent)
            this._readyCount *= 2;
          paths.forEach((path) => this._fsEventsHandler._addToFsEvents(path));
        } else {
          if (!this._readyCount)
            this._readyCount = 0;
          this._readyCount += paths.length;
          Promise.all(paths.map(async (path) => {
            const res = await this._nodeFsHandler._addToNodeFs(path, !_internal, 0, 0, _origAdd);
            if (res)
              this._emitReady();
            return res;
          })).then((results) => {
            if (this.closed)
              return;
            results.filter((item) => item).forEach((item) => {
              this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
            });
          });
        }
        return this;
      }
      unwatch(paths_) {
        if (this.closed)
          return this;
        const paths = unifyPaths(paths_);
        const { cwd: cwd2 } = this.options;
        paths.forEach((path) => {
          if (!sysPath.isAbsolute(path) && !this._closers.has(path)) {
            if (cwd2)
              path = sysPath.join(cwd2, path);
            path = sysPath.resolve(path);
          }
          this._closePath(path);
          this._ignoredPaths.add(path);
          if (this._watched.has(path)) {
            this._ignoredPaths.add(path + SLASH_GLOBSTAR);
          }
          this._userIgnored = void 0;
        });
        return this;
      }
      close() {
        if (this.closed)
          return this._closePromise;
        this.closed = true;
        this.removeAllListeners();
        const closers = [];
        this._closers.forEach((closerList) => closerList.forEach((closer) => {
          const promise = closer();
          if (promise instanceof Promise)
            closers.push(promise);
        }));
        this._streams.forEach((stream) => stream.destroy());
        this._userIgnored = void 0;
        this._readyCount = 0;
        this._readyEmitted = false;
        this._watched.forEach((dirent) => dirent.dispose());
        ["closers", "watched", "streams", "symlinkPaths", "throttled"].forEach((key) => {
          this[`_${key}`].clear();
        });
        this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
        return this._closePromise;
      }
      getWatched() {
        const watchList = {};
        this._watched.forEach((entry, dir) => {
          const key = this.options.cwd ? sysPath.relative(this.options.cwd, dir) : dir;
          watchList[key || ONE_DOT] = entry.getChildren().sort();
        });
        return watchList;
      }
      emitWithAll(event, args) {
        this.emit(...args);
        if (event !== EV_ERROR)
          this.emit(EV_ALL, ...args);
      }
      async _emit(event, path, val1, val2, val3) {
        if (this.closed)
          return;
        const opts = this.options;
        if (isWindows)
          path = sysPath.normalize(path);
        if (opts.cwd)
          path = sysPath.relative(opts.cwd, path);
        const args = [event, path];
        if (val3 !== void 0)
          args.push(val1, val2, val3);
        else if (val2 !== void 0)
          args.push(val1, val2);
        else if (val1 !== void 0)
          args.push(val1);
        const awf = opts.awaitWriteFinish;
        let pw;
        if (awf && (pw = this._pendingWrites.get(path))) {
          pw.lastChange = new Date();
          return this;
        }
        if (opts.atomic) {
          if (event === EV_UNLINK) {
            this._pendingUnlinks.set(path, args);
            setTimeout(() => {
              this._pendingUnlinks.forEach((entry, path2) => {
                this.emit(...entry);
                this.emit(EV_ALL, ...entry);
                this._pendingUnlinks.delete(path2);
              });
            }, typeof opts.atomic === "number" ? opts.atomic : 100);
            return this;
          }
          if (event === EV_ADD && this._pendingUnlinks.has(path)) {
            event = args[0] = EV_CHANGE;
            this._pendingUnlinks.delete(path);
          }
        }
        if (awf && (event === EV_ADD || event === EV_CHANGE) && this._readyEmitted) {
          const awfEmit = (err, stats) => {
            if (err) {
              event = args[0] = EV_ERROR;
              args[1] = err;
              this.emitWithAll(event, args);
            } else if (stats) {
              if (args.length > 2) {
                args[2] = stats;
              } else {
                args.push(stats);
              }
              this.emitWithAll(event, args);
            }
          };
          this._awaitWriteFinish(path, awf.stabilityThreshold, event, awfEmit);
          return this;
        }
        if (event === EV_CHANGE) {
          const isThrottled = !this._throttle(EV_CHANGE, path, 50);
          if (isThrottled)
            return this;
        }
        if (opts.alwaysStat && val1 === void 0 && (event === EV_ADD || event === EV_ADD_DIR || event === EV_CHANGE)) {
          const fullPath = opts.cwd ? sysPath.join(opts.cwd, path) : path;
          let stats;
          try {
            stats = await stat(fullPath);
          } catch (err) {
          }
          if (!stats || this.closed)
            return;
          args.push(stats);
        }
        this.emitWithAll(event, args);
        return this;
      }
      _handleError(error2) {
        const code2 = error2 && error2.code;
        if (error2 && code2 !== "ENOENT" && code2 !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code2 !== "EPERM" && code2 !== "EACCES")) {
          this.emit(EV_ERROR, error2);
        }
        return error2 || this.closed;
      }
      _throttle(actionType, path, timeout) {
        if (!this._throttled.has(actionType)) {
          this._throttled.set(actionType, /* @__PURE__ */ new Map());
        }
        const action = this._throttled.get(actionType);
        const actionPath = action.get(path);
        if (actionPath) {
          actionPath.count++;
          return false;
        }
        let timeoutObject;
        const clear = () => {
          const item = action.get(path);
          const count = item ? item.count : 0;
          action.delete(path);
          clearTimeout(timeoutObject);
          if (item)
            clearTimeout(item.timeoutObject);
          return count;
        };
        timeoutObject = setTimeout(clear, timeout);
        const thr = { timeoutObject, clear, count: 0 };
        action.set(path, thr);
        return thr;
      }
      _incrReadyCount() {
        return this._readyCount++;
      }
      _awaitWriteFinish(path, threshold, event, awfEmit) {
        let timeoutHandler;
        let fullPath = path;
        if (this.options.cwd && !sysPath.isAbsolute(path)) {
          fullPath = sysPath.join(this.options.cwd, path);
        }
        const now = new Date();
        const awaitWriteFinish = (prevStat) => {
          fs.stat(fullPath, (err, curStat) => {
            if (err || !this._pendingWrites.has(path)) {
              if (err && err.code !== "ENOENT")
                awfEmit(err);
              return;
            }
            const now2 = Number(new Date());
            if (prevStat && curStat.size !== prevStat.size) {
              this._pendingWrites.get(path).lastChange = now2;
            }
            const pw = this._pendingWrites.get(path);
            const df = now2 - pw.lastChange;
            if (df >= threshold) {
              this._pendingWrites.delete(path);
              awfEmit(void 0, curStat);
            } else {
              timeoutHandler = setTimeout(awaitWriteFinish, this.options.awaitWriteFinish.pollInterval, curStat);
            }
          });
        };
        if (!this._pendingWrites.has(path)) {
          this._pendingWrites.set(path, {
            lastChange: now,
            cancelWait: () => {
              this._pendingWrites.delete(path);
              clearTimeout(timeoutHandler);
              return event;
            }
          });
          timeoutHandler = setTimeout(awaitWriteFinish, this.options.awaitWriteFinish.pollInterval);
        }
      }
      _getGlobIgnored() {
        return [...this._ignoredPaths.values()];
      }
      _isIgnored(path, stats) {
        if (this.options.atomic && DOT_RE.test(path))
          return true;
        if (!this._userIgnored) {
          const { cwd: cwd2 } = this.options;
          const ign = this.options.ignored;
          const ignored = ign && ign.map(normalizeIgnored(cwd2));
          const paths = arrify(ignored).filter((path2) => typeof path2 === STRING_TYPE && !isGlob(path2)).map((path2) => path2 + SLASH_GLOBSTAR);
          const list = this._getGlobIgnored().map(normalizeIgnored(cwd2)).concat(ignored, paths);
          this._userIgnored = anymatch(list, void 0, ANYMATCH_OPTS);
        }
        return this._userIgnored([path, stats]);
      }
      _isntIgnored(path, stat2) {
        return !this._isIgnored(path, stat2);
      }
      _getWatchHelpers(path, depth) {
        const watchPath = depth || this.options.disableGlobbing || !isGlob(path) ? path : globParent(path);
        const follow = this.options.followSymlinks;
        return new WatchHelper(path, watchPath, follow, this);
      }
      _getWatchedDir(directory) {
        if (!this._boundRemove)
          this._boundRemove = this._remove.bind(this);
        const dir = sysPath.resolve(directory);
        if (!this._watched.has(dir))
          this._watched.set(dir, new DirEntry(dir, this._boundRemove));
        return this._watched.get(dir);
      }
      _hasReadPermissions(stats) {
        if (this.options.ignorePermissionErrors)
          return true;
        const md = stats && Number.parseInt(stats.mode, 10);
        const st = md & 511;
        const it = Number.parseInt(st.toString(8)[0], 10);
        return Boolean(4 & it);
      }
      _remove(directory, item, isDirectory) {
        const path = sysPath.join(directory, item);
        const fullPath = sysPath.resolve(path);
        isDirectory = isDirectory != null ? isDirectory : this._watched.has(path) || this._watched.has(fullPath);
        if (!this._throttle("remove", path, 100))
          return;
        if (!isDirectory && !this.options.useFsEvents && this._watched.size === 1) {
          this.add(directory, item, true);
        }
        const wp = this._getWatchedDir(path);
        const nestedDirectoryChildren = wp.getChildren();
        nestedDirectoryChildren.forEach((nested) => this._remove(path, nested));
        const parent = this._getWatchedDir(directory);
        const wasTracked = parent.has(item);
        parent.remove(item);
        if (this._symlinkPaths.has(fullPath)) {
          this._symlinkPaths.delete(fullPath);
        }
        let relPath = path;
        if (this.options.cwd)
          relPath = sysPath.relative(this.options.cwd, path);
        if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
          const event = this._pendingWrites.get(relPath).cancelWait();
          if (event === EV_ADD)
            return;
        }
        this._watched.delete(path);
        this._watched.delete(fullPath);
        const eventName = isDirectory ? EV_UNLINK_DIR : EV_UNLINK;
        if (wasTracked && !this._isIgnored(path))
          this._emit(eventName, path);
        if (!this.options.useFsEvents) {
          this._closePath(path);
        }
      }
      _closePath(path) {
        this._closeFile(path);
        const dir = sysPath.dirname(path);
        this._getWatchedDir(dir).remove(sysPath.basename(path));
      }
      _closeFile(path) {
        const closers = this._closers.get(path);
        if (!closers)
          return;
        closers.forEach((closer) => closer());
        this._closers.delete(path);
      }
      _addPathCloser(path, closer) {
        if (!closer)
          return;
        let list = this._closers.get(path);
        if (!list) {
          list = [];
          this._closers.set(path, list);
        }
        list.push(closer);
      }
      _readdirp(root, opts) {
        if (this.closed)
          return;
        const options = { type: EV_ALL, alwaysStat: true, lstat: true, ...opts };
        let stream = readdirp(root, options);
        this._streams.add(stream);
        stream.once(STR_CLOSE, () => {
          stream = void 0;
        });
        stream.once(STR_END, () => {
          if (stream) {
            this._streams.delete(stream);
            stream = void 0;
          }
        });
        return stream;
      }
    };
    exports.FSWatcher = FSWatcher;
    var watch3 = (paths, options) => {
      const watcher = new FSWatcher(options);
      watcher.add(paths);
      return watcher;
    };
    exports.watch = watch3;
  }
});

// ../describe-query-basic/index.js
var require_describe_query_basic = __commonJS({
  "../describe-query-basic/index.js"(exports) {
    var { Client: Client3, DatabaseError: DatabaseError3 } = require("pg");
    var DescribeClient = class {
      async _connect(options) {
        const pgClient = new Client3(options);
        await pgClient.connect();
        pgClient.connection.removeAllListeners();
        this._connection = pgClient.connection;
        const onFatalError = (error2) => {
          this._fatalError = error2;
          this._connection.end();
        };
        for (const name of [
          "rowDescription",
          "parameterDescription",
          "readyForQuery"
        ]) {
          this._connection.on(name, (msg) => {
            if (this._listener) {
              this._listener(name, msg);
            } else {
              console.warn(`Unexpected ${name} message from DB server:`, msg);
            }
          });
        }
        this._connection.on("errorMessage", (msg) => {
          if (this._listener) {
            this._latestRequestError = msg;
            this._listener("error", msg);
          } else {
            onFatalError(msg);
          }
        });
        this._connection.on("error", onFatalError);
        this._connection.on("end", () => {
          if (!this._terminating && this._fatalError == null) {
            if (this._latestRequestError != null && this._latestRequestError.severity === "FATAL") {
              this._fatalError = this._latestRequestError;
            } else {
              this._fatalError = new Error("Describe query client's connection has been terminated unexpectedly, without a error");
            }
          }
          this._connection.removeAllListeners();
          this._connection = null;
          if (this._listener) {
            this._listener("error", this._fatalError);
          }
          if (this._onUnexpectedTerminationCb && this._fatalError != null) {
            this._onUnexpectedTerminationCb(this._fatalError);
          }
        });
      }
      async describe(query) {
        while (this._promise != null) {
          try {
            await this._promise;
          } catch (_) {
          }
        }
        if (this._fatalError) {
          throw this._fatalError;
        }
        if (this._terminating || this._connection == null) {
          throw new Error("The describe-query-basic client has been terminated by the user");
        }
        this._promise = new Promise((resolve2, reject) => {
          let rowDescription;
          let parameterDescription;
          let error2;
          const done2 = () => {
            this._listener = null;
            this._promise = null;
            if (error2) {
              reject(error2);
            } else {
              resolve2({
                parameters: parameterDescription && parameterDescription.dataTypeIDs,
                row: rowDescription && rowDescription.fields
              });
            }
          };
          this._listener = (tag, arg) => {
            switch (tag) {
              case "rowDescription":
                rowDescription = arg;
                break;
              case "parameterDescription":
                parameterDescription = arg;
                break;
              case "error":
                if (error2 != null && error2 !== arg) {
                  console.error(arg);
                } else {
                  error2 = arg;
                }
                if (this._fatalError != null) {
                  done2();
                }
                break;
              case "readyForQuery":
                done2();
                break;
            }
          };
          this._connection.parse({ name: "", text: query });
          this._connection.describe({ name: "", type: "S" });
          this._connection.sync();
        });
        return this._promise;
      }
      terminate() {
        if (!this._terminating && this._connection != null) {
          this._terminating = true;
          this._connection.end();
        }
        return new Promise((resolve2) => {
          if (this._connection != null) {
            this._connection.once("end", resolve2);
          } else {
            resolve2();
          }
        });
      }
    };
    exports.createClient = async (options, onUnexpectedTermination) => {
      const client = new DescribeClient();
      client._onUnexpectedTerminationCb = onUnexpectedTermination;
      await client._connect(options);
      return client;
    };
  }
});

// ../../node_modules/minimist/index.js
var require_minimist = __commonJS({
  "../../node_modules/minimist/index.js"(exports, module2) {
    module2.exports = function(args, opts) {
      if (!opts)
        opts = {};
      var flags = { bools: {}, strings: {}, unknownFn: null };
      if (typeof opts["unknown"] === "function") {
        flags.unknownFn = opts["unknown"];
      }
      if (typeof opts["boolean"] === "boolean" && opts["boolean"]) {
        flags.allBools = true;
      } else {
        [].concat(opts["boolean"]).filter(Boolean).forEach(function(key2) {
          flags.bools[key2] = true;
        });
      }
      var aliases = {};
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function(x2) {
          aliases[x2] = [key2].concat(aliases[key2].filter(function(y) {
            return x2 !== y;
          }));
        });
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags.strings[key2] = true;
        if (aliases[key2]) {
          flags.strings[aliases[key2]] = true;
        }
      });
      var defaults = opts["default"] || {};
      var argv4 = { _: [] };
      Object.keys(flags.bools).forEach(function(key2) {
        setArg(key2, defaults[key2] === void 0 ? false : defaults[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      function argDefined(key2, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key2] || flags.bools[key2] || aliases[key2];
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
          if (flags.unknownFn(arg2) === false)
            return;
        }
        var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val;
        setKey(argv4, key2.split("."), value2);
        (aliases[key2] || []).forEach(function(x2) {
          setKey(argv4, x2.split("."), value2);
        });
      }
      function setKey(obj, keys, value2) {
        var o = obj;
        for (var i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2];
          if (isConstructorOrProto(o, key2))
            return;
          if (o[key2] === void 0)
            o[key2] = {};
          if (o[key2] === Object.prototype || o[key2] === Number.prototype || o[key2] === String.prototype)
            o[key2] = {};
          if (o[key2] === Array.prototype)
            o[key2] = [];
          o = o[key2];
        }
        var key2 = keys[keys.length - 1];
        if (isConstructorOrProto(o, key2))
          return;
        if (o === Object.prototype || o === Number.prototype || o === String.prototype)
          o = {};
        if (o === Array.prototype)
          o = [];
        if (o[key2] === void 0 || flags.bools[key2] || typeof o[key2] === "boolean") {
          o[key2] = value2;
        } else if (Array.isArray(o[key2])) {
          o[key2].push(value2);
        } else {
          o[key2] = [o[key2], value2];
        }
      }
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x2) {
          return flags.bools[x2];
        });
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          var key = m[1];
          var value = m[2];
          if (flags.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          var key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          var key = arg.match(/^--(.+)/)[1];
          var next = args[i + 1];
          if (next !== void 0 && !/^-/.test(next) && !flags.bools[key] && !flags.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
            setArg(key, next, arg);
            i++;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i++;
          } else {
            setArg(key, flags.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            var next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
              setArg(letters[j], next.split("=")[1], arg);
              broken = true;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
            }
          }
          var key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
              setArg(key, args[i + 1], arg);
              i++;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i++;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
            argv4._.push(flags.strings["_"] || !isNumber(arg) ? arg : Number(arg));
          }
          if (opts.stopEarly) {
            argv4._.push.apply(argv4._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults).forEach(function(key2) {
        if (!hasKey(argv4, key2.split("."))) {
          setKey(argv4, key2.split("."), defaults[key2]);
          (aliases[key2] || []).forEach(function(x2) {
            setKey(argv4, x2.split("."), defaults[key2]);
          });
        }
      });
      if (opts["--"]) {
        argv4["--"] = new Array();
        notFlags.forEach(function(key2) {
          argv4["--"].push(key2);
        });
      } else {
        notFlags.forEach(function(key2) {
          argv4._.push(key2);
        });
      }
      return argv4;
    };
    function hasKey(obj, keys) {
      var o = obj;
      keys.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      var key = keys[keys.length - 1];
      return key in o;
    }
    function isNumber(x2) {
      if (typeof x2 === "number")
        return true;
      if (/^0x[0-9a-f]+$/i.test(x2))
        return true;
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x2);
    }
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] === "function" || key === "__proto__";
    }
  }
});

// ../../node_modules/rescript/lib/es6/caml_array.js
function sub(x2, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while (j < len) {
    result[j] = x2[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  }
  ;
  return result;
}
function get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw {
      RE_EXN_ID: "Invalid_argument",
      _1: "index out of bounds",
      Error: new Error()
    };
  }
  return xs[index];
}

// ../../node_modules/rescript/lib/es6/curry.js
function app(_f, _args) {
  while (true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return function(f2, args2) {
        return function(x2) {
          return app(f2, args2.concat([x2]));
        };
      }(f, args);
    }
    _args = sub(args, arity, -d | 0);
    _f = f.apply(null, sub(args, 0, arity));
    continue;
  }
  ;
}
function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1:
        return o(a0);
      case 2:
        return function(param) {
          return o(a0, param);
        };
      case 3:
        return function(param, param$1) {
          return o(a0, param, param$1);
        };
      case 4:
        return function(param, param$1, param$2) {
          return o(a0, param, param$1, param$2);
        };
      case 5:
        return function(param, param$1, param$2, param$3) {
          return o(a0, param, param$1, param$2, param$3);
        };
      case 6:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, param, param$1, param$2, param$3, param$4);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4, param$5) {
          return o(a0, param, param$1, param$2, param$3, param$4, param$5);
        };
      default:
        return app(o, [a0]);
    }
  }
}
function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function(a0) {
      return _1(o, a0);
    };
  }
}
function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1:
        return app(o(a0), [a1]);
      case 2:
        return o(a0, a1);
      case 3:
        return function(param) {
          return o(a0, a1, param);
        };
      case 4:
        return function(param, param$1) {
          return o(a0, a1, param, param$1);
        };
      case 5:
        return function(param, param$1, param$2) {
          return o(a0, a1, param, param$1, param$2);
        };
      case 6:
        return function(param, param$1, param$2, param$3) {
          return o(a0, a1, param, param$1, param$2, param$3);
        };
      case 7:
        return function(param, param$1, param$2, param$3, param$4) {
          return o(a0, a1, param, param$1, param$2, param$3, param$4);
        };
      default:
        return app(o, [
          a0,
          a1
        ]);
    }
  }
}
function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return function(a0, a1) {
      return _2(o, a0, a1);
    };
  }
}

// ../../node_modules/rescript/lib/es6/caml_option.js
function some(x2) {
  if (x2 === void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: 0
    };
  } else if (x2 !== null && x2.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: x2.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
    };
  } else {
    return x2;
  }
}
function nullable_to_opt(x2) {
  if (x2 == null) {
    return;
  } else {
    return some(x2);
  }
}
function valFromOption(x2) {
  if (!(x2 !== null && x2.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
    return x2;
  }
  var depth = x2.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return;
  } else {
    return {
      BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
    };
  }
}

// ../../node_modules/rescript/lib/es6/belt_Array.js
function get2(arr, i) {
  if (i >= 0 && i < arr.length) {
    return some(arr[i]);
  }
}
function getExn(arr, i) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: [
        "belt_Array.ml",
        27,
        4
      ],
      Error: new Error()
    };
  }
  return arr[i];
}
function zip(xs, ys) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);
  for (var i = 0; i < len; ++i) {
    s[i] = [
      xs[i],
      ys[i]
    ];
  }
  return s;
}
function concat(a1, a2) {
  var l1 = a1.length;
  var l2 = a2.length;
  var a1a2 = new Array(l1 + l2 | 0);
  for (var i = 0; i < l1; ++i) {
    a1a2[i] = a1[i];
  }
  for (var i$1 = 0; i$1 < l2; ++i$1) {
    a1a2[l1 + i$1 | 0] = a2[i$1];
  }
  return a1a2;
}
function concatMany(arrs) {
  var lenArrs = arrs.length;
  var totalLen = 0;
  for (var i = 0; i < lenArrs; ++i) {
    totalLen = totalLen + arrs[i].length | 0;
  }
  var result = new Array(totalLen);
  totalLen = 0;
  for (var j = 0; j < lenArrs; ++j) {
    var cur = arrs[j];
    for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
      result[totalLen] = cur[k];
      totalLen = totalLen + 1 | 0;
    }
  }
  return result;
}
function mapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for (var i = 0; i < l; ++i) {
    r[i] = f(a[i]);
  }
  return r;
}
function map(a, f) {
  return mapU(a, __1(f));
}
function keepU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for (var i = 0; i < l; ++i) {
    var v = a[i];
    if (f(v)) {
      r[j] = v;
      j = j + 1 | 0;
    }
  }
  r.length = j;
  return r;
}
function keep(a, f) {
  return keepU(a, __1(f));
}
function mapWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for (var i = 0; i < l; ++i) {
    r[i] = f(i, a[i]);
  }
  return r;
}
function mapWithIndex(a, f) {
  return mapWithIndexU(a, __2(f));
}
function reduceU(a, x2, f) {
  var r = x2;
  for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
    r = f(r, a[i]);
  }
  return r;
}
function reduce(a, x2, f) {
  return reduceU(a, x2, __2(f));
}

// ../../node_modules/rescript/lib/es6/belt_Float.js
function fromString(i) {
  var i$1 = parseFloat(i);
  if (isNaN(i$1)) {
    return;
  } else {
    return i$1;
  }
}

// ../../node_modules/rescript-path-rebuild/lib/es6/PathRebuild.bs.js
var Path = __toESM(require("path"));

// ../../node_modules/rescript/lib/es6/caml_exceptions.js
var id = {
  contents: 0
};
function create(str) {
  id.contents = id.contents + 1 | 0;
  return str + ("/" + id.contents);
}
function caml_is_extension(e) {
  if (e == null) {
    return false;
  } else {
    return typeof e.RE_EXN_ID === "string";
  }
}

// ../../node_modules/rescript/lib/es6/caml_js_exceptions.js
var $$Error = /* @__PURE__ */ create("Caml_js_exceptions.Error");
function internalToOCamlException(e) {
  if (caml_is_extension(e)) {
    return e;
  } else {
    return {
      RE_EXN_ID: $$Error,
      _1: e
    };
  }
}

// ../../node_modules/rescript/lib/es6/js_exn.js
var anyToExnInternal = internalToOCamlException;
function raiseError(str) {
  throw new Error(str);
}
function raiseRangeError(str) {
  throw new RangeError(str);
}
var $$Error$1 = $$Error;

// ../../node_modules/rescript-path-rebuild/lib/es6/PathRebuild.bs.js
function $$int(str) {
  var result = Number(str);
  var result$p = result | 0;
  if (result === result$p) {
    return result$p;
  }
}
function commit(result, status) {
  switch (status.TAG | 0) {
    case 0:
      var s = status._0;
      if (s === "") {
        return {
          TAG: 0,
          _0: result
        };
      } else {
        return {
          TAG: 0,
          _0: result.concat({
            TAG: 1,
            _0: s
          })
        };
      }
    case 1:
      return raiseError("Cannot commit a Skip");
    case 2:
      var n = status._0;
      switch (n) {
        case "base":
          return {
            TAG: 0,
            _0: result.concat({
              TAG: 2,
              _0: "base"
            })
          };
        case "dir":
          return {
            TAG: 0,
            _0: result.concat({
              TAG: 2,
              _0: "dir"
            })
          };
        case "ext":
          return {
            TAG: 0,
            _0: result.concat({
              TAG: 2,
              _0: "ext"
            })
          };
        case "name":
          return {
            TAG: 0,
            _0: result.concat({
              TAG: 2,
              _0: "name"
            })
          };
        case "root":
          return {
            TAG: 0,
            _0: result.concat({
              TAG: 2,
              _0: "root"
            })
          };
        default:
          var n$p = $$int(n);
          if (n$p !== void 0) {
            return {
              TAG: 0,
              _0: result.concat({
                TAG: 0,
                _0: n$p,
                _1: n$p
              })
            };
          } else {
            return {
              TAG: 1,
              _0: "Bad range limit: " + n
            };
          }
      }
    case 3:
      return raiseError("Cannot commit a Dot");
    case 4:
      var m = status._1;
      var n$1 = status._0;
      var n$p$1 = $$int(n$1);
      if (n$p$1 === void 0) {
        return {
          TAG: 1,
          _0: "Bad range limit: " + n$1
        };
      }
      var m$p = $$int(m);
      if (m$p !== void 0) {
        if (n$p$1 >= 0 ? m$p >= 0 && m$p < n$p$1 : m$p >= 0 || n$p$1 > m$p) {
          return {
            TAG: 1,
            _0: "Bad range limits: " + n$1 + ".." + m
          };
        } else {
          return {
            TAG: 0,
            _0: result.concat({
              TAG: 0,
              _0: n$p$1,
              _1: m$p
            })
          };
        }
      } else {
        return {
          TAG: 1,
          _0: "Bad range limit: " + m
        };
      }
  }
}
function printError(str, i, msg) {
  return {
    TAG: 1,
    _0: msg + "\n" + str + "\n" + " ".repeat(i) + "^"
  };
}
function parse2(str) {
  var _i = 0;
  var _status = {
    TAG: 0,
    _0: ""
  };
  var _mResult = {
    TAG: 0,
    _0: []
  };
  while (true) {
    var mResult = _mResult;
    var status = _status;
    var i = _i;
    if (mResult.TAG !== 0) {
      return printError(str, i - 1 | 0, mResult._0);
    }
    var result = mResult._0;
    var ch = str.charAt(i);
    var i$p = i + 1 | 0;
    var exit3 = 0;
    var exit$1 = 0;
    var exit$2 = 0;
    var exit$3 = 0;
    var exit$4 = 0;
    switch (ch) {
      case "":
        switch (status.TAG | 0) {
          case 0:
            return commit(result, status);
          case 1:
            return printError(str, i, "Unexpected end of string. Expected a character after the escape symbol %");
          default:
            return printError(str, i, "Unexpected end of string. Did you forget to close a range?");
        }
      case "%":
        switch (status.TAG | 0) {
          case 0:
            _status = {
              TAG: 1,
              _0: status._0
            };
            _i = i$p;
            continue;
          case 1:
            exit$4 = 6;
            break;
          default:
            exit$3 = 5;
        }
        break;
      case ".":
        switch (status.TAG | 0) {
          case 0:
            exit3 = 1;
            break;
          case 1:
            exit$4 = 6;
            break;
          case 2:
            var n = status._0;
            if (n === "") {
              return printError(str, i, "Unexpected . symbol");
            }
            _status = {
              TAG: 3,
              _0: n
            };
            _i = i$p;
            continue;
          case 3:
            _status = {
              TAG: 4,
              _0: status._0,
              _1: ""
            };
            _i = i$p;
            continue;
          case 4:
            return printError(str, i, "Unexpected . symbol");
        }
        break;
      case "/":
        switch (status.TAG | 0) {
          case 0:
            var r = commit(result, status);
            var tmp;
            tmp = r.TAG === 0 ? {
              TAG: 0,
              _0: r._0.concat(0)
            } : r;
            _mResult = tmp;
            _status = {
              TAG: 0,
              _0: ""
            };
            _i = i$p;
            continue;
          case 1:
            exit$4 = 6;
            break;
          case 3:
            exit$2 = 4;
            break;
          case 2:
          case 4:
            exit$1 = 3;
            break;
        }
        break;
      case "{":
        switch (status.TAG | 0) {
          case 0:
            _mResult = commit(result, status);
            _status = {
              TAG: 2,
              _0: ""
            };
            _i = i$p;
            continue;
          case 1:
            exit$4 = 6;
            break;
          default:
            exit$3 = 5;
        }
        break;
      case "}":
        switch (status.TAG | 0) {
          case 1:
            exit$4 = 6;
            break;
          case 0:
          case 3:
            exit$3 = 5;
            break;
          case 2:
          case 4:
            exit3 = 2;
            break;
        }
        break;
      default:
        exit$4 = 6;
    }
    if (exit$4 === 6) {
      if (status.TAG === 1) {
        _status = {
          TAG: 0,
          _0: status._0 + ch
        };
        _i = i$p;
        continue;
      }
      exit$3 = 5;
    }
    if (exit$3 === 5) {
      switch (ch) {
        case "%":
          return printError(str, i, "Unexpected escape symbol % inside a range");
        case "{":
          return printError(str, i, "Unexpected { symbol inside a range");
        case "}":
          return printError(str, i, "Unexpected } symbol");
        default:
          exit$2 = 4;
      }
    }
    if (exit$2 === 4) {
      if (status.TAG === 3) {
        return printError(str, i, "Unexpected character: " + ch + ". Was expecting a . symbol");
      }
      exit$1 = 3;
    }
    if (exit$1 === 3) {
      if (ch === "/") {
        return printError(str, i, "Unexpected / symbol inside a range");
      }
      exit3 = 1;
    }
    switch (exit3) {
      case 1:
        switch (status.TAG | 0) {
          case 0:
            _status = {
              TAG: 0,
              _0: status._0 + ch
            };
            _i = i$p;
            continue;
          case 2:
            _status = {
              TAG: 2,
              _0: status._0 + ch
            };
            _i = i$p;
            continue;
          case 4:
            _status = {
              TAG: 4,
              _0: status._0,
              _1: status._1 + ch
            };
            _i = i$p;
            continue;
        }
      case 2:
        _mResult = commit(result, status);
        _status = {
          TAG: 0,
          _0: ""
        };
        _i = i$p;
        continue;
    }
  }
  ;
}
function printRange(parts, min2, max2, sep2) {
  if (min2 === max2) {
    return parts[min2];
  } else if (max2 === (parts.length - 1 | 0)) {
    return printRange(parts, min2, max2 - 1 | 0, sep2) + parts[max2];
  } else {
    return parts.slice(min2, max2 + 1 | 0).join(sep2);
  }
}
function print(nodes, path) {
  var sep2 = Path.sep;
  var parsed = Path.parse(path);
  var withoutRoot = path.slice(parsed.root.length);
  var withoutExt = withoutRoot.slice(0, withoutRoot.length - parsed.ext.length | 0);
  var parts = withoutExt.split(sep2).concat(parsed.ext);
  var _result = "";
  var _i = 0;
  var _skipSeparator = false;
  while (true) {
    var skipSeparator = _skipSeparator;
    var i = _i;
    var result = _result;
    if (i === nodes.length) {
      return result;
    }
    var s = nodes[i];
    if (typeof s === "number") {
      _skipSeparator = false;
      _i = i + 1 | 0;
      _result = result + (skipSeparator ? "" : sep2);
      continue;
    }
    switch (s.TAG | 0) {
      case 0:
        var max2 = s._1;
        var min2 = s._0;
        var len = parts.length;
        var min$1 = Math.max(0, min2 < 0 ? len + min2 | 0 : min2);
        var max$1 = Math.min(len - 1 | 0, max2 < 0 ? len + max2 | 0 : max2);
        if (max$1 < min$1) {
          _skipSeparator = true;
          _i = i + 1 | 0;
          continue;
        }
        _skipSeparator = false;
        _i = i + 1 | 0;
        _result = result + printRange(parts, min$1, max$1, sep2);
        continue;
      case 1:
        _skipSeparator = false;
        _i = i + 1 | 0;
        _result = result + s._0;
        continue;
      case 2:
        var match2 = s._0;
        if (match2 === "name") {
          _skipSeparator = false;
          _i = i + 1 | 0;
          _result = result + parsed.name;
          continue;
        }
        if (match2 === "root") {
          _skipSeparator = false;
          _i = i + 1 | 0;
          _result = result + parsed.root;
          continue;
        }
        if (match2 === "dir") {
          _skipSeparator = parsed.dir === parsed.root;
          _i = i + 1 | 0;
          _result = result + parsed.dir;
          continue;
        }
        if (match2 === "ext") {
          _skipSeparator = false;
          _i = i + 1 | 0;
          _result = result + parsed.ext;
          continue;
        }
        _skipSeparator = false;
        _i = i + 1 | 0;
        _result = result + parsed.base;
        continue;
    }
  }
  ;
}
function make(pattern) {
  var nodes = parse2(pattern);
  if (nodes.TAG !== 0) {
    return {
      TAG: 1,
      _0: nodes._0
    };
  }
  var nodes$1 = nodes._0;
  return {
    TAG: 0,
    _0: function(path) {
      return print(nodes$1, path);
    }
  };
}

// lib/es6/src/TTY.bs.js
var Util2 = __toESM(require("util"));
var Chalk = __toESM(require_source());

// ../../node_modules/rescript/lib/es6/caml_splice_call.js
var spliceObjApply = function(obj, name, args) {
  var i, argLen;
  argLen = args.length;
  var applied = [];
  for (i = 0; i < argLen - 1; ++i) {
    applied.push(args[i]);
  }
  var lastOne = args[argLen - 1];
  for (i = 0; i < lastOne.length; ++i) {
    applied.push(lastOne[i]);
  }
  return obj[name].apply(obj, applied);
};

// ../../node_modules/rescript/lib/es6/belt_Option.js
function getExn2(x2) {
  if (x2 !== void 0) {
    return valFromOption(x2);
  }
  throw {
    RE_EXN_ID: "Not_found",
    Error: new Error()
  };
}
function mapU2(opt, f) {
  if (opt !== void 0) {
    return some(f(valFromOption(opt)));
  }
}
function map2(opt, f) {
  return mapU2(opt, __1(f));
}
function getWithDefault(opt, $$default) {
  if (opt !== void 0) {
    return valFromOption(opt);
  } else {
    return $$default;
  }
}

// lib/es6/src/Context.bs.js
function quiet(ctx) {
  if (ctx.argv.quiet) {
    return true;
  } else {
    return ctx.config.quiet === true;
  }
}
function sources(ctx) {
  var match2 = ctx.argv.input;
  var match$1 = ctx.config.sources;
  if (match2 !== void 0) {
    return [{
      input: [match2],
      output: ctx.argv.output
    }];
  } else if (match$1 !== void 0 && match$1.length !== 0) {
    return match$1;
  } else {
    return;
  }
}
function orElse(a, b) {
  if (a !== void 0) {
    return a;
  } else {
    return b;
  }
}
function generator(ctx) {
  return orElse(ctx.argv.generator, ctx.config.generator);
}
function pgConfig(ctx) {
  var tmp = {
    application_name: "typesafe-pg"
  };
  var tmp$1 = orElse(ctx.argv.username, ctx.config.username);
  if (tmp$1 !== void 0) {
    tmp.user = tmp$1;
  }
  var tmp$2 = map2(orElse(ctx.argv.password, ctx.config.password), function(prim) {
    return prim;
  });
  if (tmp$2 !== void 0) {
    tmp.password = valFromOption(tmp$2);
  }
  var tmp$3 = orElse(ctx.argv.host, ctx.config.host);
  if (tmp$3 !== void 0) {
    tmp.host = tmp$3;
  }
  var tmp$4 = orElse(ctx.argv.dbname, ctx.config.dbname);
  if (tmp$4 !== void 0) {
    tmp.database = tmp$4;
  }
  var tmp$5 = orElse(ctx.argv.port, ctx.config.port);
  if (tmp$5 !== void 0) {
    tmp.port = tmp$5;
  }
  var tmp$6 = orElse(ctx.argv.connection, ctx.config.connection);
  if (tmp$6 !== void 0) {
    tmp.connectionString = tmp$6;
  }
  return tmp;
}

// ../rescript-errors/lib/es6/src/Loggable.bs.js
var Util = __toESM(require("util"));

// ../rescript-errors/lib/es6/src/Native.bs.js
var isInstanceOfError = (x2) => x2 instanceof Error;
function code(err) {
  var opt = err.code;
  if (opt !== void 0 && typeof opt === "string") {
    return opt;
  }
}
function fromJsExn(exn2) {
  if (isInstanceOfError(exn2)) {
    return some(exn2);
  }
}
function fromExn(exn2) {
  if (exn2.RE_EXN_ID === $$Error$1) {
    return fromJsExn(exn2._1);
  }
}
function rethrowAsNative(exn2) {
  if (exn2.RE_EXN_ID === $$Error$1) {
    throw exn2._1;
  }
  throw exn2;
}

// ../rescript-errors/lib/es6/src/Loggable.bs.js
function fromText(message) {
  return {
    cause: 0,
    message: [{
      TAG: 0,
      _0: message
    }]
  };
}
function fromUnknown(obj) {
  return {
    cause: 0,
    message: [{
      TAG: 4,
      _0: obj
    }]
  };
}
function fromNative(err) {
  return {
    cause: {
      TAG: 1,
      _0: err
    },
    message: [{
      TAG: 1,
      _0: err
    }]
  };
}
function fromNativeVerbose(err) {
  return {
    cause: {
      TAG: 1,
      _0: err
    },
    message: [{
      TAG: 2,
      _0: err
    }]
  };
}
function fromJsExn2(jsExn) {
  var err = fromJsExn(jsExn);
  if (err !== void 0) {
    return fromNative(valFromOption(err));
  } else {
    return {
      cause: {
        TAG: 2,
        _0: jsExn
      },
      message: [{
        TAG: 4,
        _0: jsExn
      }]
    };
  }
}
function fromJsExnVerbose(jsExn) {
  var err = fromJsExn(jsExn);
  if (err !== void 0) {
    return fromNativeVerbose(valFromOption(err));
  } else {
    return {
      cause: {
        TAG: 2,
        _0: jsExn
      },
      message: [{
        TAG: 4,
        _0: jsExn
      }]
    };
  }
}
function fromExn2(exn2) {
  if (exn2.RE_EXN_ID === $$Error$1) {
    return fromJsExn2(exn2._1);
  } else {
    return {
      cause: {
        TAG: 0,
        _0: exn2
      },
      message: [{
        TAG: 3,
        _0: exn2
      }]
    };
  }
}
function fromExnVerbose(exn2) {
  if (exn2.RE_EXN_ID === $$Error$1) {
    return fromJsExnVerbose(exn2._1);
  } else {
    return {
      cause: {
        TAG: 0,
        _0: exn2
      },
      message: [{
        TAG: 3,
        _0: exn2
      }]
    };
  }
}
function prepend(param, text) {
  return {
    cause: param.cause,
    message: [{
      TAG: 0,
      _0: text
    }].concat(param.message)
  };
}
function append(param, text) {
  return {
    cause: param.cause,
    message: param.message.concat([{
      TAG: 0,
      _0: text
    }])
  };
}
function compile(param) {
  return param.message.map(function(node) {
    switch (node.TAG | 0) {
      case 0:
        return {
          TAG: 0,
          _0: node._0
        };
      case 1:
        var err = node._0;
        var x2 = err.message;
        if (x2 === "") {
          return {
            TAG: 1,
            _0: err
          };
        } else {
          return {
            TAG: 0,
            _0: x2
          };
        }
      default:
        return {
          TAG: 1,
          _0: node._0
        };
    }
  });
}
function toStrings(nodeToStringOpt, separatorOpt, error2) {
  var nodeToString = nodeToStringOpt !== void 0 ? nodeToStringOpt : function(node) {
    if (node.TAG === 0) {
      return node._0;
    } else {
      return Util.inspect(node._0);
    }
  };
  var separator = separatorOpt !== void 0 ? separatorOpt : " ";
  var arr = compile(error2).map(__1(nodeToString));
  var result = [];
  for (var i = 0, i_finish = arr.length; i < i_finish; ++i) {
    var item = arr[i];
    result.push(item);
    if (i < (arr.length - 1 | 0) && !item.endsWith(" ") && !item.endsWith("\n")) {
      result.push(separator);
    }
  }
  return result;
}

// lib/es6/src/TTY.bs.js
var supportsColor = Chalk.stderr.supportsColor === false ? void 0 : Chalk.stderr.supportsColor;
function inspect3(obj) {
  return Util2.inspect(obj, {
    colors: supportsColor !== void 0
  });
}
function inspectDontWrapString(obj) {
  if (typeof obj === "string") {
    return obj;
  } else {
    return inspect3(obj);
  }
}
function blue(obj) {
  return Chalk.stderr.blue(inspectDontWrapString(obj));
}
function red(obj) {
  return Chalk.stderr.redBright(inspectDontWrapString(obj));
}
function green(obj) {
  return Chalk.stderr.green(inspectDontWrapString(obj));
}
function dim(obj) {
  return Chalk.stderr.dim(inspectDontWrapString(obj));
}
var Chalk$1 = {
  supportsColor,
  inspect: inspect3,
  inspectDontWrapString,
  blue,
  red,
  green,
  dim
};
function error(obj0) {
  console.error(Chalk.stderr.redBright(inspectDontWrapString(obj0)));
}
function printLoggable(err) {
  var obj0 = toStrings(function(node) {
    if (node.TAG === 0) {
      return node._0;
    } else {
      return inspect3(node._0);
    }
  }, void 0, err).join("");
  console.error(Chalk.stderr.redBright(inspectDontWrapString(obj0)));
}
function info(ctx, val0) {
  if (!quiet(ctx)) {
    console.error(val0);
    return;
  }
}
function infoNl(ctx) {
  return info(ctx, "");
}

// ../../node_modules/@rpominov/rescript-promise/lib/es6/Promise.bs.js
var Process = __toESM(require("process"));
function isPromiseLike(obj) {
  if (typeof obj === "object" && obj !== null) {
    return typeof obj.then === "function";
  } else {
    return false;
  }
}
function resolve(x2) {
  if (isPromiseLike(x2)) {
    return Promise.reject(new Error("Cannot create a Promise containing another Promise as this will break ReScript static types"));
  } else {
    return Promise.resolve(x2);
  }
}
function make2(fn) {
  return new Promise(function(resolve2, reject) {
    return _1(fn, function(x2) {
      if (isPromiseLike(x2)) {
        return reject(new Error("Cannot create a Promise containing another Promise as this will break ReScript static types"));
      } else {
        return resolve2(x2);
      }
    });
  });
}
function $$catch(promise, fn) {
  return promise.then(function(x2) {
    return resolve({
      TAG: 0,
      _0: x2
    });
  }, function(e) {
    return resolve({
      TAG: 1,
      _0: _1(fn, anyToExnInternal(e))
    });
  });
}
function chain(promise, fn) {
  return promise.then(__1(fn), void 0);
}
function map3(promise, fn) {
  return promise.then(function(x2) {
    return resolve(_1(fn, x2));
  }, void 0);
}
function crash(exn2) {
  console.error("Unrecoverable Promise rejection!");
  if (exn2.RE_EXN_ID === $$Error$1) {
    console.error(exn2._1);
  } else {
    console.error(exn2);
  }
  return Process.exit(1);
}
function done(promise, fn) {
  promise.then(function(x2) {
    try {
      _1(fn, x2);
      return resolve(void 0);
    } catch (raw_exn) {
      return crash(internalToOCamlException(raw_exn));
    }
  }, function(e) {
    return crash(anyToExnInternal(e));
  });
}
function chainOk(promise, fn) {
  return chain(promise, function(val) {
    if (val.TAG === 0) {
      return _1(fn, val._0);
    } else {
      return resolve({
        TAG: 1,
        _0: val._0
      });
    }
  });
}
function mapOk(promise, fn) {
  return chainOk(promise, function(val) {
    return resolve(_1(fn, val));
  });
}
function makeJsError(prim) {
  return new Error(prim);
}
function all(prim) {
  return Promise.all(prim);
}
function all2(prim) {
  return Promise.all(prim);
}
function all3(prim) {
  return Promise.all(prim);
}

// lib/es6/src/Process.bs.js
var Process2 = __toESM(require("process"));
var argv2 = Process2.argv;
function exitWithLoggableError(showUsageOpt, err) {
  var showUsage = showUsageOpt !== void 0 ? valFromOption(showUsageOpt) : void 0;
  error("ERROR!");
  printLoggable(err);
  if (showUsage !== void 0) {
    console.error("");
    console.error(Chalk$1.dim(valFromOption(showUsage)));
  }
  return Process2.exit(1);
}
function exitWithError(showUsage, err) {
  return exitWithLoggableError(showUsage, fromText(err));
}
function getSomeOrExitWithError(option, message) {
  if (option !== void 0) {
    return valFromOption(option);
  } else {
    return exitWithLoggableError(void 0, fromText(message));
  }
}
function getOkOrExitWithError(prepend2, result) {
  if (result.TAG === 0) {
    return result._0;
  }
  var error2 = result._0;
  return exitWithLoggableError(void 0, prepend2 !== void 0 ? prepend(error2, prepend2) : error2);
}
function catchAndExitWithError(prepend2, promise) {
  return map3($$catch(promise, fromExn2), function(param) {
    return getOkOrExitWithError(prepend2, param);
  });
}

// lib/es6/src/Require.bs.js
var Path2 = __toESM(require("path"));
var Module = __toESM(require("module"));
var Process3 = __toESM(require("process"));

// ../../node_modules/rescript/lib/es6/js_types.js
function classify(x2) {
  var ty = typeof x2;
  if (ty === "undefined") {
    return 3;
  } else if (x2 === null) {
    return 2;
  } else if (ty === "number") {
    return {
      TAG: 0,
      _0: x2
    };
  } else if (ty === "string") {
    return {
      TAG: 1,
      _0: x2
    };
  } else if (ty === "boolean") {
    if (x2 === true) {
      return 1;
    } else {
      return 0;
    }
  } else if (ty === "function") {
    return {
      TAG: 2,
      _0: x2
    };
  } else if (ty === "object") {
    return {
      TAG: 3,
      _0: x2
    };
  } else {
    return {
      TAG: 4,
      _0: x2
    };
  }
}

// lib/es6/src/Require.bs.js
function $$require(moduleId) {
  try {
    return {
      TAG: 0,
      _0: some(Module.createRequire(Path2.join(Process3.cwd(), "noop.js"))(moduleId))
    };
  } catch (raw_exn) {
    var exn2 = internalToOCamlException(raw_exn);
    var err = fromExn(exn2);
    if (err !== void 0 && code(valFromOption(err)) === "MODULE_NOT_FOUND") {
      return {
        TAG: 0,
        _0: void 0
      };
    } else {
      return {
        TAG: 1,
        _0: fromExnVerbose(exn2)
      };
    }
  }
}
var Validation_error = /* @__PURE__ */ create("Require-TypesafeSqlPgCli.Validation_error");
function validate(fn) {
  try {
    return {
      TAG: 0,
      _0: _1(fn, void 0)
    };
  } catch (raw_err) {
    var err = internalToOCamlException(raw_err);
    if (err.RE_EXN_ID === Validation_error) {
      return {
        TAG: 1,
        _0: err._1
      };
    } else {
      return rethrowAsNative(err);
    }
  }
}
function failed(err) {
  throw {
    RE_EXN_ID: Validation_error,
    _1: err,
    Error: new Error()
  };
}
function unknown_cast(val) {
  return some(val);
}
var unknown = {
  name: "unknown",
  cast: unknown_cast
};
function object_cast(val) {
  var x2 = classify(val);
  if (typeof x2 === "number" || x2.TAG !== 3) {
    return;
  } else {
    return some(x2._0);
  }
}
var object = {
  name: "object",
  cast: object_cast
};
function string_cast(val) {
  var x2 = classify(val);
  if (typeof x2 === "number" || x2.TAG !== 1) {
    return;
  } else {
    return x2._0;
  }
}
var string = {
  name: "string",
  cast: string_cast
};
function bool_cast(val) {
  var match2 = classify(val);
  if (typeof match2 === "number") {
    if (match2 !== 1) {
      if (match2 !== 0) {
        return;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
var bool = {
  name: "bool",
  cast: bool_cast
};
function int_cast(val) {
  var $$float = classify(val);
  if (typeof $$float === "number") {
    return;
  }
  if ($$float.TAG !== 0) {
    return;
  }
  var $$float$1 = $$float._0;
  if (($$float$1 | 0) === $$float$1) {
    return $$float$1 | 0;
  }
}
var $$int2 = {
  name: "int",
  cast: int_cast
};
function function_cast(val) {
  var f = classify(val);
  if (typeof f === "number" || f.TAG !== 2) {
    return;
  } else {
    return some(f._0);
  }
}
var $$function = {
  name: "function",
  cast: function_cast
};
function array_cast(val) {
  var arr = classify(val);
  if (typeof arr === "number") {
    return;
  }
  if (arr.TAG !== 3) {
    return;
  }
  var arr$1 = arr._0;
  if (Array.isArray(arr$1)) {
    return arr$1;
  }
}
var array = {
  name: "array",
  cast: array_cast
};
function arrayOf(validator) {
  return {
    name: "array<" + validator.name + ">",
    cast: function(val) {
      var arr = array_cast(val);
      if (arr === void 0) {
        return;
      }
      var acc = [];
      var _i = 0;
      while (true) {
        var i = _i;
        if (i >= arr.length) {
          return acc;
        }
        var x2 = validator.cast(arr[i]);
        if (x2 === void 0) {
          return;
        }
        acc.push(valFromOption(x2));
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
  };
}
function objectOf2(key1, validator1, key2, validator2, constructor) {
  return {
    name: "{" + key1 + ":" + validator1.name + "," + key2 + ":" + validator2.name + "}",
    cast: function(val) {
      var obj = object_cast(val);
      if (obj === void 0) {
        return;
      }
      var obj$1 = valFromOption(obj);
      var val1 = validator1.cast(obj$1[key1]);
      if (val1 === void 0) {
        return;
      }
      var val2 = validator2.cast(obj$1[key2]);
      if (val2 !== void 0) {
        return some(_2(constructor, valFromOption(val1), valFromOption(val2)));
      }
    }
  };
}
function nullable(validator) {
  return {
    name: "nullable<" + validator.name + ">",
    cast: function(val) {
      if (val == null) {
        return some(void 0);
      }
      var some3 = validator.cast(val);
      if (some3 !== void 0) {
        return some(some3);
      }
    }
  };
}
function either(validatorLeft, mapLeft, validatorRight, mapRight) {
  return {
    name: validatorLeft.name + "|" + validatorRight.name,
    cast: function(val) {
      var x2 = validatorLeft.cast(val);
      if (x2 !== void 0) {
        var x$1 = _1(mapLeft, valFromOption(x2));
        if (x$1.TAG === 0) {
          return some(x$1._0);
        }
        throw {
          RE_EXN_ID: Validation_error,
          _1: x$1._0,
          Error: new Error()
        };
      }
      var x$2 = validatorRight.cast(val);
      if (x$2 === void 0) {
        return;
      }
      var x$3 = _1(mapRight, valFromOption(x$2));
      if (x$3.TAG === 0) {
        return some(x$3._0);
      }
      throw {
        RE_EXN_ID: Validation_error,
        _1: x$3._0,
        Error: new Error()
      };
    }
  };
}
function cast(val, validator, name) {
  var x2 = validator.cast(val);
  if (x2 !== void 0) {
    return valFromOption(x2);
  }
  var err = prepend(fromUnknown(val), name + " is not of type " + validator.name + ":");
  throw {
    RE_EXN_ID: Validation_error,
    _1: err,
    Error: new Error()
  };
}
function property(obj, key, validator) {
  return cast(obj[key], validator, 'Property "' + key + '"');
}
var Validators = {
  failed,
  unknown,
  object,
  string,
  bool,
  $$int: $$int2,
  $$function,
  array,
  arrayOf,
  objectOf2,
  nullable,
  either,
  cast,
  property
};

// ../../node_modules/rescript/lib/es6/js_dict.js
function get3(dict, k) {
  if (k in dict) {
    return some(dict[k]);
  }
}
function entries(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values = new Array(l);
  for (var i = 0; i < l; ++i) {
    var key = keys[i];
    values[i] = [
      key,
      dict[key]
    ];
  }
  return values;
}
function map4(f, source) {
  var target = {};
  var keys = Object.keys(source);
  var l = keys.length;
  for (var i = 0; i < l; ++i) {
    var key = keys[i];
    target[key] = f(source[key]);
  }
  return target;
}

// lib/es6/src/Commands.bs.js
var Promises = __toESM(require("fs/promises"));

// lib/es6/src/Fs.bs.js
var Fs = __toESM(require("fs"));
var Path3 = __toESM(require("path"));

// ../../node_modules/rescript-chokidar/lib/es6/Chokidar.bs.js
var Chokidar = __toESM(require_chokidar());
function watchMany(options, dirs) {
  return Chokidar.watch(dirs, options);
}

// lib/es6/src/Array.bs.js
var getExn3 = getExn;
var concat2 = concat;
var concatMany2 = concatMany;
var map5 = map;
var keep2 = keep;
var mapWithIndex2 = mapWithIndex;
var reduce2 = reduce;

// lib/es6/src/Fs.bs.js
function resolveGlobs(globs) {
  var watcher = {
    contents: void 0
  };
  var close = function(param) {
    var watcher$p = watcher.contents;
    if (watcher$p !== void 0) {
      return valFromOption(watcher$p).close();
    } else {
      return resolve(void 0);
    }
  };
  var flatten = function(dict) {
    return concatMany2(map5(entries(dict), function(param) {
      var dir = param[0];
      return map5(param[1], function(file) {
        return Path3.join(dir, file);
      });
    }));
  };
  return chain(mapOk($$catch(make2(function(resolve2) {
    var watcher$p = watchMany(void 0, globs);
    watcher.contents = some(watcher$p);
    watcher$p.on("error", function(err) {
      return _1(resolve2, {
        TAG: 1,
        _0: fromJsExnVerbose(err)
      });
    }).on("ready", function(param) {
      return _1(resolve2, {
        TAG: 0,
        _0: keep2(flatten(watcher$p.getWatched()), function(path) {
          return Fs.statSync(path).isFile();
        })
      });
    });
  }), fromExnVerbose), function(x2) {
    return x2;
  }), function(res0) {
    return chain($$catch(close(void 0), fromExnVerbose), function(res1) {
      var tmp;
      tmp = res0.TAG === 0 ? res1.TAG === 0 ? {
        TAG: 0,
        _0: res0._0
      } : {
        TAG: 1,
        _0: res1._0
      } : {
        TAG: 1,
        _0: res0._0
      };
      return resolve(tmp);
    });
  });
}

// ../rescript-errors/lib/es6/src/Util.bs.js
function isZeroWidth(ch) {
  if (ch === "\n") {
    return true;
  } else {
    return false;
  }
}
function highlight(code2, start, end2) {
  if (start < 0) {
    raiseRangeError("start is out of range: " + start);
  }
  if (end2 < start) {
    raiseRangeError("end is out of range: " + end2);
  }
  var symbols = Array.from(code2);
  var result = [];
  var highlightSymbols = [];
  var highlightSymbolsEmpty = true;
  for (var i = 0, i_finish = Math.max(symbols.length - 1 | 0, end2); i <= i_finish; ++i) {
    var symbol = get2(symbols, i);
    if (!isZeroWidth(symbol)) {
      if (i < start) {
        highlightSymbols.push(" ");
      } else if (i <= end2) {
        highlightSymbols.push("^");
        highlightSymbolsEmpty = false;
      }
    }
    if (symbol !== void 0) {
      result.push(symbol);
    }
    if (symbol === "\n") {
      if (!highlightSymbolsEmpty) {
        spliceObjApply(result, "push", [highlightSymbols]);
        result.push("\n");
      }
      highlightSymbolsEmpty = true;
      highlightSymbols = [];
    }
  }
  if (!highlightSymbolsEmpty) {
    result.push("\n");
    spliceObjApply(result, "push", [highlightSymbols]);
  }
  return result.join("");
}

// lib/es6/src/Util.bs.js
function mapAsyncSeq(arr, fn) {
  return reduce2(arr, resolve([]), function(acc, item) {
    return chain(acc, function(arr2) {
      return map3(_1(fn, item), function(val) {
        return concat2(arr2, [val]);
      });
    });
  });
}

// ../rescript-extended-sql/lib/es6/src/Parser.bs.js
function end(state) {
  return state.pos > state.maxPos;
}
function at(state, pos) {
  if (pos <= state.maxPos && pos >= state.minPos) {
    return state.symbols[pos];
  } else {
    return "";
  }
}
function back(state, offset) {
  state.pos = state.pos - offset | 0;
  var minPos = state.minPos;
  var pos = state.pos;
  if (state.pos < minPos) {
    return raiseError("The position can't be less than " + minPos + " got: " + pos + ". This indicates a bug in the parser!");
  }
}
function skip(state, offset) {
  state.pos = state.pos + offset | 0;
  var pos = state.pos;
  var maxPos = state.maxPos + 1 | 0;
  if (state.pos > maxPos) {
    return raiseError("The position can't be more than " + maxPos + " got: " + pos + ". This indicates a bug in the parser!");
  }
}
function current2(state) {
  return [
    at(state, state.pos),
    at(state, state.pos + 1 | 0)
  ];
}
function skipUntil(state, predicate) {
  while (state.pos <= state.maxPos && !predicate(state.symbols[state.pos])) {
    state.pos = state.pos + 1 | 0;
  }
  ;
}
function cutStr(state, start, end2) {
  return state.symbols.slice(start, end2 + 1 | 0).join("");
}
function parseInlineComment(state) {
  skip(state, 2);
  var start = state.pos;
  skipUntil(state, function(x2) {
    return x2 === "\n";
  });
  back(state, 1);
  return {
    TAG: 0,
    _0: {
      NAME: "InlineComment",
      VAL: cutStr(state, start, state.pos)
    }
  };
}
function parseBlockComment(state) {
  skip(state, 2);
  var loop = function(_acc) {
    while (true) {
      var acc = _acc;
      if (end(state)) {
        return {
          TAG: 1,
          _0: {
            TAG: 2,
            _0: "Was expecting a block comment close sequence */, but reached the end of the string"
          }
        };
      }
      var match2 = current2(state);
      var s = match2[0];
      switch (s) {
        case "*":
          if (match2[1] === "/") {
            skip(state, 1);
            return {
              TAG: 0,
              _0: {
                NAME: "BlockComment",
                VAL: acc
              }
            };
          }
          break;
        case "/":
          if (match2[1] === "*") {
            skip(state, 2);
            var err = loop("");
            if (err.TAG !== 0) {
              return err;
            }
            var match$1 = err._0;
            if (typeof match$1 !== "object") {
              return err;
            }
            if (match$1.NAME !== "BlockComment") {
              return err;
            }
            skip(state, 1);
            _acc = acc + "/*" + match$1.VAL + "*/";
            continue;
          }
          break;
        default:
      }
      skip(state, 1);
      _acc = acc + s;
      continue;
    }
    ;
  };
  return loop("");
}
function isValidIdentifierCh(ch) {
  if (ch.length !== 1) {
    return false;
  }
  var match2 = ch.charCodeAt(0);
  if (match2 >= 91) {
    if (match2 >= 97) {
      return match2 < 123;
    } else {
      return match2 === 95;
    }
  } else if (match2 >= 58) {
    return match2 >= 65;
  } else {
    return match2 >= 48;
  }
}
function parseParameter(state) {
  skip(state, 1);
  var nameStart = state.pos;
  skipUntil(state, function(x2) {
    return !isValidIdentifierCh(x2);
  });
  if (nameStart === state.pos) {
    return {
      TAG: 1,
      _0: {
        TAG: 1,
        _0: "Unexpected : symbol not followed by a parameter name. If you meant to simply insert :, please escape it with a backslash \\:"
      }
    };
  }
  var name = cutStr(state, nameStart, state.pos - 1 | 0);
  if (at(state, state.pos + 0 | 0) === ":" && at(state, state.pos + 1 | 0) === "r" && at(state, state.pos + 2 | 0) === "a" && at(state, state.pos + 3 | 0) === "w" && at(state, state.pos + 4 | 0) === "<") {
    skip(state, 4);
    var seqStart = state.pos;
    skipUntil(state, function(x2) {
      return x2 !== "<";
    });
    var seqLen = state.pos - seqStart | 0;
    var items = [];
    var addItem = function(start) {
      items.push(cutStr(state, start, (state.pos - seqLen | 0) - 1 | 0));
    };
    var _itemStart = state.pos;
    var _delCount = 0;
    var _closeCount = 0;
    while (true) {
      var closeCount = _closeCount;
      var delCount = _delCount;
      var itemStart = _itemStart;
      if (closeCount === seqLen) {
        addItem(itemStart);
        back(state, 1);
        return {
          TAG: 0,
          _0: {
            NAME: "RawParameter",
            VAL: {
              name,
              options: items
            }
          }
        };
      }
      if (delCount === seqLen) {
        addItem(itemStart);
        _closeCount = 0;
        _delCount = 0;
        _itemStart = state.pos;
        continue;
      }
      if (end(state)) {
        var seq = ">".repeat(seqLen);
        return {
          TAG: 1,
          _0: {
            TAG: 2,
            _0: "Was expecting a raw parameter close sequence " + seq + ", but reached the end of the string"
          }
        };
      }
      var match2 = at(state, state.pos);
      switch (match2) {
        case ">":
          skip(state, 1);
          _closeCount = closeCount + 1 | 0;
          _delCount = 0;
          continue;
        case "|":
          skip(state, 1);
          _closeCount = 0;
          _delCount = delCount + 1 | 0;
          continue;
        default:
          skip(state, 1);
          _closeCount = 0;
          _delCount = 0;
          continue;
      }
    }
    ;
  } else if (at(state, state.pos + 0 | 0) === ":" && at(state, state.pos + 1 | 0) === "b" && at(state, state.pos + 2 | 0) === "a" && at(state, state.pos + 3 | 0) === "t" && at(state, state.pos + 4 | 0) === "c" && at(state, state.pos + 5 | 0) === "h" && at(state, state.pos + 6 | 0) === "<") {
    skip(state, 6);
    var seqStart$1 = state.pos;
    skipUntil(state, function(x2) {
      return x2 !== "<";
    });
    var seqLen$1 = state.pos - seqStart$1 | 0;
    var skipBody = function(_count) {
      while (true) {
        var count = _count;
        if (count === seqLen$1) {
          return {
            TAG: 0,
            _0: void 0
          };
        }
        if (end(state)) {
          var seq2 = ">".repeat(seqLen$1);
          return {
            TAG: 1,
            _0: "Was expecting a batch parameter close sequence " + seq2 + ", but reached the end of the string"
          };
        }
        var match3 = at(state, state.pos);
        if (match3 === ">") {
          skip(state, 1);
          _count = count + 1 | 0;
          continue;
        }
        skip(state, 1);
        _count = 0;
        continue;
      }
      ;
    };
    var bodyStart = state.pos;
    var message = skipBody(0);
    if (message.TAG !== 0) {
      return {
        TAG: 1,
        _0: {
          TAG: 2,
          _0: message._0
        }
      };
    }
    back(state, 1);
    var ast = toAst(state.symbols, bodyStart, state.pos - seqLen$1 | 0);
    if (ast.TAG === 0) {
      return {
        TAG: 0,
        _0: {
          NAME: "BatchParameter",
          VAL: {
            name,
            separator: ",",
            body: ast._0
          }
        }
      };
    } else {
      return {
        TAG: 1,
        _0: {
          TAG: 0,
          _0: ast._0
        }
      };
    }
  } else {
    back(state, 1);
    return {
      TAG: 0,
      _0: {
        NAME: "Parameter",
        VAL: {
          name
        }
      }
    };
  }
}
function toAst(symbols, min2, max2) {
  var state = {
    symbols,
    minPos: min2,
    maxPos: max2,
    pos: min2
  };
  var ast = [];
  var sqlChunkStart = {
    contents: void 0
  };
  var sqlChunkVal = {
    contents: ""
  };
  var pushSqlNode = function(param) {
    var start = sqlChunkStart.contents;
    if (start !== void 0) {
      ast.push({
        start,
        end: state.pos - 1 | 0,
        node: {
          NAME: "SqlChunk",
          VAL: sqlChunkVal.contents
        }
      });
      sqlChunkVal.contents = "";
      sqlChunkStart.contents = void 0;
      return;
    }
  };
  var pushSqlSymbol = function(symbol) {
    if (sqlChunkStart.contents === void 0) {
      sqlChunkStart.contents = state.pos;
    }
    sqlChunkVal.contents = sqlChunkVal.contents + symbol;
    return skip(state, 1);
  };
  var error2 = {
    contents: void 0
  };
  var parseWith = function(parser) {
    pushSqlNode(void 0);
    var start = state.pos;
    var node = _1(parser, state);
    if (node.TAG === 0) {
      ast.push({
        start,
        end: state.pos,
        node: node._0
      });
      return skip(state, 1);
    }
    var message = node._0;
    switch (message.TAG | 0) {
      case 0:
        error2.contents = message._0;
        return;
      case 1:
        error2.contents = {
          start,
          end: state.pos,
          message: message._0
        };
        return;
      case 2:
        error2.contents = {
          start: state.pos,
          end: null,
          message: message._0
        };
        return;
    }
  };
  while (!end(state) && error2.contents === void 0) {
    var match2 = current2(state);
    var s = match2[0];
    switch (s) {
      case "-":
        if (match2[1] === "-") {
          parseWith(parseInlineComment);
        } else {
          pushSqlSymbol(s);
        }
        break;
      case "/":
        if (match2[1] === "*") {
          parseWith(parseBlockComment);
        } else {
          pushSqlSymbol(s);
        }
        break;
      case ":":
        parseWith(parseParameter);
        break;
      case "\\":
        if (match2[1] === ":") {
          pushSqlSymbol(":");
          skip(state, 1);
        } else {
          pushSqlSymbol(s);
        }
        break;
      default:
        pushSqlSymbol(s);
    }
  }
  ;
  var err = error2.contents;
  if (err !== void 0) {
    return {
      TAG: 1,
      _0: err
    };
  } else {
    pushSqlNode(void 0);
    return {
      TAG: 0,
      _0: ast
    };
  }
}
function parseAttribute(text, id2) {
  var result = new RegExp("^\\s*\\*?\\s*@" + id2 + ":\\s*(.*?)\\s*$", "m").exec(text);
  if (result === null) {
    return;
  }
  var str = result[1];
  if (!(str == null)) {
    return str;
  }
  throw {
    RE_EXN_ID: "Assert_failure",
    _1: [
      "Parser.res",
      321,
      14
    ],
    Error: new Error()
  };
}
function parseAttributes(ast) {
  var _i = 0;
  while (true) {
    var i = _i;
    if (i >= ast.length) {
      return {
        TAG: 0,
        _0: {
          name: null
        }
      };
    }
    var match2 = ast[i];
    var match$1 = match2.node;
    if (typeof match$1 !== "object") {
      return {
        TAG: 0,
        _0: {
          name: null
        }
      };
    }
    var variant = match$1.NAME;
    if (variant === "BlockComment" || variant === "InlineComment") {
      var value = parseAttribute(match$1.VAL, "name");
      if (value !== void 0) {
        if (/^[a-zA-Z][0-9a-zA-Z_]*$/.test(value)) {
          return {
            TAG: 0,
            _0: {
              name: value
            }
          };
        } else {
          return {
            TAG: 1,
            _0: {
              start: match2.start,
              end: match2.end,
              message: "Invalid @name attribute: " + value
            }
          };
        }
      }
      _i = i + 1 | 0;
      continue;
    }
    if (variant !== "SqlChunk") {
      return {
        TAG: 0,
        _0: {
          name: null
        }
      };
    }
    if (match$1.VAL.trim() !== "") {
      return {
        TAG: 0,
        _0: {
          name: null
        }
      };
    }
    _i = i + 1 | 0;
    continue;
  }
  ;
}
function findDuplicateParameter(_index, _seen, ast) {
  while (true) {
    var seen = _seen;
    var index = _index;
    if (index >= ast.length) {
      return;
    }
    var node = ast[index];
    var match2 = node.node;
    if (typeof match2 === "object") {
      var variant = match2.NAME;
      if (variant === "BatchParameter") {
        var match$1 = match2.VAL;
        var name = match$1.name;
        if (seen.includes(name)) {
          return node;
        }
        var some3 = findDuplicateParameter(0, [], match$1.body);
        if (some3 !== void 0) {
          return some3;
        }
        _seen = seen.concat([name]);
        _index = index + 1 | 0;
        continue;
      }
      if (variant === "RawParameter" || variant === "Parameter") {
        var name$1 = match2.VAL.name;
        if (seen.includes(name$1)) {
          return node;
        }
        _seen = seen.concat([name$1]);
        _index = index + 1 | 0;
        continue;
      }
      _index = index + 1 | 0;
      continue;
    }
    _index = index + 1 | 0;
    continue;
  }
  ;
}
function parseSymbols(symbols, start, end2) {
  var err = toAst(symbols, start, end2);
  if (err.TAG !== 0) {
    return err;
  }
  var ast = err._0;
  var match2 = findDuplicateParameter(0, [], ast);
  if (match2 !== void 0) {
    var match$1 = match2.node;
    if (typeof match$1 === "object") {
      var variant = match$1.NAME;
      if (variant === "RawParameter" || variant === "Parameter" || variant === "BatchParameter") {
        return {
          TAG: 1,
          _0: {
            start: match2.start,
            end: match2.end,
            message: 'The name "' + match$1.VAL.name + '" is already used for another parameter'
          }
        };
      }
      throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "Parser.res",
          390,
          17
        ],
        Error: new Error()
      };
    }
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: [
        "Parser.res",
        390,
        17
      ],
      Error: new Error()
    };
  }
  var err$1 = parseAttributes(ast);
  if (err$1.TAG === 0) {
    return {
      TAG: 0,
      _0: {
        attributes: err$1._0,
        ast
      }
    };
  } else {
    return err$1;
  }
}
function parseFile(text) {
  var symbols = Array.from(text);
  var state = {
    symbols,
    minPos: 0,
    maxPos: symbols.length - 1 | 0,
    pos: 0
  };
  var parseComment = function(parser) {
    var start = state.pos;
    var match2 = _1(parser, state);
    if (match2.TAG === 0) {
      var match$1 = match2._0;
      if (typeof match$1 === "object") {
        var variant = match$1.NAME;
        if (variant === "BlockComment" || variant === "InlineComment") {
          var res = parseAttribute(match$1.VAL, "separator");
          if (res !== void 0) {
            if (res === "") {
              return {
                TAG: 1,
                _0: {
                  start,
                  end: state.pos,
                  message: "Invalid empty @separator attribute"
                }
              };
            } else {
              return {
                TAG: 0,
                _0: res
              };
            }
          } else {
            return {
              TAG: 0,
              _0: void 0
            };
          }
        }
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "Parser.res",
            429,
            15
          ],
          Error: new Error()
        };
      }
      throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "Parser.res",
          429,
          15
        ],
        Error: new Error()
      };
    }
    var message = match2._0;
    switch (message.TAG | 0) {
      case 0:
        return {
          TAG: 1,
          _0: message._0
        };
      case 1:
        return {
          TAG: 1,
          _0: {
            start,
            end: state.pos,
            message: message._0
          }
        };
      case 2:
        return {
          TAG: 1,
          _0: {
            start: state.pos,
            end: null,
            message: message._0
          }
        };
    }
  };
  var findSeparatorAttribute = function(_param2) {
    while (true) {
      if (end(state)) {
        return {
          TAG: 0,
          _0: void 0
        };
      }
      var match2 = current2(state);
      var symbol = match2[0];
      switch (symbol) {
        case "-":
          if (match2[1] === "-") {
            var res = parseComment(parseInlineComment);
            if (res.TAG !== 0) {
              return res;
            }
            if (res._0 !== void 0) {
              return res;
            }
            skip(state, 1);
            _param2 = void 0;
            continue;
          }
          break;
        case "/":
          if (match2[1] === "*") {
            var res$1 = parseComment(parseBlockComment);
            if (res$1.TAG !== 0) {
              return res$1;
            }
            if (res$1._0 !== void 0) {
              return res$1;
            }
            skip(state, 1);
            _param2 = void 0;
            continue;
          }
          break;
        default:
      }
      if (symbol.trim() !== "") {
        return {
          TAG: 0,
          _0: void 0
        };
      }
      skip(state, 1);
      _param2 = void 0;
      continue;
    }
    ;
  };
  var err = findSeparatorAttribute(void 0);
  if (err.TAG !== 0) {
    return err;
  }
  var x2 = err._0;
  var separator = x2 !== void 0 ? (skip(state, 1), Array.from(x2)) : (state.pos = 0, [";"]);
  var isSeparator = function(_i) {
    while (true) {
      var i = _i;
      if (i >= separator.length) {
        return true;
      }
      var pos = state.pos + i | 0;
      if (pos >= state.symbols.length || state.symbols[pos] !== separator[i]) {
        return false;
      }
      _i = i + 1 | 0;
      continue;
    }
    ;
  };
  var statements = [];
  var statementStart = {
    contents: void 0
  };
  var pushStatement = function(param) {
    var start = statementStart.contents;
    if (start === void 0) {
      return;
    }
    var statement2 = parseSymbols(state.symbols, start, state.pos - 1 | 0);
    if (statement2.TAG !== 0) {
      return statement2._0;
    }
    statements.push(statement2._0);
    statementStart.contents = void 0;
  };
  var _param;
  while (true) {
    if (end(state)) {
      var err$1 = pushStatement(void 0);
      if (err$1 !== void 0) {
        return {
          TAG: 1,
          _0: err$1
        };
      } else {
        return {
          TAG: 0,
          _0: {
            separator: separator.join(""),
            statements
          }
        };
      }
    }
    if (isSeparator(0)) {
      var err$2 = pushStatement(void 0);
      if (err$2 !== void 0) {
        return {
          TAG: 1,
          _0: err$2
        };
      }
      skip(state, separator.length);
      _param = void 0;
      continue;
    }
    if (statementStart.contents === void 0) {
      statementStart.contents = state.pos;
    }
    skip(state, 1);
    _param = void 0;
    continue;
  }
  ;
}

// ../rescript-extended-sql/lib/es6/src/Printer.bs.js
function setSafe(dict, key, val) {
  if (key !== "__proto__") {
    dict[key] = val;
  }
  return dict;
}
function print2(nextParamIndexOpt, ast) {
  var nextParamIndex = nextParamIndexOpt !== void 0 ? nextParamIndexOpt : {
    contents: 1
  };
  var genParamIndex = function(param) {
    var index = nextParamIndex.contents;
    nextParamIndex.contents = index + 1 | 0;
    return index;
  };
  var _nodeIndex = 0;
  var _sqlAcc = [""];
  var _paramsAcc = {};
  while (true) {
    var paramsAcc = _paramsAcc;
    var sqlAcc = _sqlAcc;
    var nodeIndex = _nodeIndex;
    if (nodeIndex >= ast.length) {
      return [
        sqlAcc,
        paramsAcc
      ];
    }
    var match2 = ast[nodeIndex];
    var match$1 = match2.node;
    var variant = match$1.NAME;
    if (variant === "BlockComment" || variant === "InlineComment") {
      _nodeIndex = nodeIndex + 1 | 0;
      continue;
    }
    if (variant === "Parameter") {
      var paramIndex = genParamIndex(void 0);
      _paramsAcc = setSafe(paramsAcc, match$1.VAL.name, {
        NAME: "Parameter",
        VAL: {
          dataType: paramIndex
        }
      });
      _sqlAcc = sqlAcc.map(function(paramIndex2) {
        return function(x2) {
          return x2 + "$" + paramIndex2.toString();
        };
      }(paramIndex));
      _nodeIndex = nodeIndex + 1 | 0;
      continue;
    }
    if (variant === "SqlChunk") {
      var code2 = match$1.VAL;
      _sqlAcc = sqlAcc.map(function(code3) {
        return function(x2) {
          return x2 + code3;
        };
      }(code2));
      _nodeIndex = nodeIndex + 1 | 0;
      continue;
    }
    if (variant === "RawParameter") {
      var match$2 = match$1.VAL;
      var options = match$2.options;
      if (options.length === 0) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "Printer.res",
            35,
            12
          ],
          Error: new Error()
        };
      }
      _paramsAcc = setSafe(paramsAcc, match$2.name, {
        NAME: "RawParameter",
        VAL: {
          options
        }
      });
      _sqlAcc = sqlAcc.flatMap(function(options2) {
        return function(x2) {
          return options2.map(function(y) {
            return x2 + y;
          });
        };
      }(options));
      _nodeIndex = nodeIndex + 1 | 0;
      continue;
    }
    var match$3 = match$1.VAL;
    var body = match$3.body;
    var separator = match$3.separator;
    var match$4 = print2(nextParamIndex, body);
    var subSql = match$4[0];
    var match$5 = print2(nextParamIndex, body);
    var subSql2 = match$5[0];
    _paramsAcc = setSafe(paramsAcc, match$3.name, {
      NAME: "BatchParameter",
      VAL: {
        separator,
        fields: match$4[1]
      }
    });
    _sqlAcc = sqlAcc.flatMap(function(subSql3) {
      return function(x2) {
        return subSql3.map(function(y) {
          return x2 + y;
        });
      };
    }(subSql)).flatMap(function(separator2, subSql22) {
      return function(x2) {
        return subSql22.map(function(y) {
          return x2 + separator2 + y;
        });
      };
    }(separator, subSql2));
    _nodeIndex = nodeIndex + 1 | 0;
    continue;
  }
  ;
}

// ../rescript-pg/lib/es6/Pg.bs.js
var Pg = __toESM(require("pg"));
var $$instanceof = (x2, C) => x2 instanceof C;
function fromJsExn3(exn2) {
  if ($$instanceof(exn2, Pg.DatabaseError)) {
    return exn2;
  }
}
function fromExn3(exn2) {
  if (exn2.RE_EXN_ID === $$Error$1) {
    return fromJsExn3(exn2._1);
  }
}
function DatabaseError_toJsExn(prim) {
  return prim;
}
var DatabaseError2 = {
  fromJsExn: fromJsExn3,
  fromExn: fromExn3,
  toJsExn: DatabaseError_toJsExn
};

// ../rescript-describe-query/lib/es6/src/Client.bs.js
var Pg$1 = __toESM(require("pg"));

// ../../node_modules/rescript/lib/es6/js_null.js
function fromOption(x2) {
  if (x2 !== void 0) {
    return valFromOption(x2);
  } else {
    return null;
  }
}

// ../../node_modules/rescript/lib/es6/belt_Int.js
function fromString2(i) {
  var i$1 = parseInt(i, 10);
  if (isNaN(i$1)) {
    return;
  } else {
    return i$1;
  }
}

// ../rescript-describe-query/lib/es6/src/Loader.bs.js
function make4(fetcher, keyToKey, valToKey) {
  return {
    cache: {},
    fetcher,
    keyToKey,
    valToKey,
    quenue: [],
    currentRequestResult: void 0
  };
}
function fetchQuenue(loader) {
  if (loader.currentRequestResult !== void 0) {
    return;
  }
  if (loader.quenue.length <= 0) {
    loader.currentRequestResult = some(make2(function(resolve2) {
      loader.currentRequestResult = void 0;
      return _1(resolve2, void 0);
    }));
    return;
  }
  var requestKeys = {
    contents: []
  };
  loader.currentRequestResult = some(map3(chain(resolve(void 0), function(param) {
    var keys = loader.quenue;
    loader.quenue = [];
    requestKeys.contents = keys;
    return _1(loader.fetcher, keys);
  }), function(values) {
    loader.currentRequestResult = void 0;
    var foundKeys = [];
    for (var i = 0, i_finish = values.length; i < i_finish; ++i) {
      var val = get(values, i);
      var keyStr = _1(loader.valToKey, val);
      foundKeys.push(keyStr);
      loader.cache["key_" + keyStr] = some(val);
    }
    for (var i$1 = 0, i_finish$1 = requestKeys.contents.length; i$1 < i_finish$1; ++i$1) {
      var keyStr$1 = _1(loader.keyToKey, get(requestKeys.contents, i$1));
      if (!foundKeys.includes(keyStr$1)) {
        loader.cache["key_" + keyStr$1] = void 0;
      }
    }
  }));
}
function get4(loader, key) {
  var keyStr = _1(loader.keyToKey, key);
  var val = get3(loader.cache, "key_" + keyStr);
  if (val !== void 0) {
    return resolve(valFromOption(val));
  } else {
    if (loader.quenue.every(function(k) {
      return _1(loader.keyToKey, k) !== keyStr;
    })) {
      loader.quenue.push(key);
    }
    fetchQuenue(loader);
    return chain(getExn2(loader.currentRequestResult), function(param) {
      return get4(loader, key);
    });
  }
}

// ../rescript-describe-query/lib/es6/src/Queries.bs.js
var statement = "-- @getTypes\nselect\n  t.oid,\n  t.typname,\n  t.typnamespace::regnamespace,\n  t.typlen,\n  t.typbyval,\n  t.typtype,\n  t.typcategory,\n  t.typispreferred,\n  t.typisdefined,\n  t.typdelim,\n  t.typrelid,\n  t.typelem,\n  t.typarray,\n  t.typnotnull,\n  t.typbasetype,\n  t.typtypmod,\n  t.typndims,\n  t.typcollation,\n  t.typdefault,\n  r.rngsubtype,\n  (select array_agg(a.attname::text order by a.attnum) \n    from pg_attribute a \n    where a.attrelid = t.typrelid \n    and a.attisdropped = false\n    and a.attnum >= 0) as attr_names,\n  (select array_agg(a.atttypid order by a.attnum) \n    from pg_attribute a where a.attrelid = t.typrelid \n    and a.attisdropped = false\n    and a.attnum >= 0) as attr_types,\n  (select array_agg(e.enumlabel::text order by e.enumsortorder)\n    from pg_enum e where e.enumtypid = t.oid) as enum_labels\nfrom pg_type t\nleft join pg_range r on r.rngtypid = t.oid\nwhere t.oid = ANY ($1::int[])";
function convertParameters(r) {
  return [r.typeIds];
}
function convertRow(param) {
  return {
    oid: nullable_to_opt(param[0]),
    typname: nullable_to_opt(param[1]),
    typnamespace: nullable_to_opt(param[2]),
    typlen: nullable_to_opt(param[3]),
    typbyval: nullable_to_opt(param[4]),
    typtype: nullable_to_opt(param[5]),
    typcategory: nullable_to_opt(param[6]),
    typispreferred: nullable_to_opt(param[7]),
    typisdefined: nullable_to_opt(param[8]),
    typdelim: nullable_to_opt(param[9]),
    typrelid: nullable_to_opt(param[10]),
    typelem: nullable_to_opt(param[11]),
    typarray: nullable_to_opt(param[12]),
    typnotnull: nullable_to_opt(param[13]),
    typbasetype: nullable_to_opt(param[14]),
    typtypmod: nullable_to_opt(param[15]),
    typndims: nullable_to_opt(param[16]),
    typcollation: nullable_to_opt(param[17]),
    typdefault: nullable_to_opt(param[18]),
    rngsubtype: nullable_to_opt(param[19]),
    attr_names: nullable_to_opt(param[20]),
    attr_types: nullable_to_opt(param[21]),
    enum_labels: nullable_to_opt(param[22])
  };
}
function runRaw(client, parameters) {
  return client.query({
    values: [parameters.typeIds],
    rowMode: "array",
    text: statement
  });
}
function run(client, parameters) {
  var __x = runRaw(client, parameters);
  return __x.then(function(res) {
    return Promise.resolve(res.rows.map(convertRow));
  });
}
var GetTypes = {
  statement,
  convertParameters,
  convertRow,
  runRaw,
  run
};
var statement$1 = "-- @getAttributes\nselect\n  a.attrelid,\n  a.attnum,\n  a.attrelid::regclass relname,\n  a.attname,\n  a.atttypid,\n  a.attndims,\n  a.atttypmod,\n  a.attnotnull,\n  a.attcollation,\n  a.attoptions,\n  a.attfdwoptions\nfrom pg_catalog.pg_attribute a where attrelid = ANY ($1::int[])";
function convertParameters$1(r) {
  return [r.relIds];
}
function convertRow$1(param) {
  return {
    attrelid: nullable_to_opt(param[0]),
    attnum: nullable_to_opt(param[1]),
    relname: nullable_to_opt(param[2]),
    attname: nullable_to_opt(param[3]),
    atttypid: nullable_to_opt(param[4]),
    attndims: nullable_to_opt(param[5]),
    atttypmod: nullable_to_opt(param[6]),
    attnotnull: nullable_to_opt(param[7]),
    attcollation: nullable_to_opt(param[8]),
    attoptions: nullable_to_opt(param[9]),
    attfdwoptions: nullable_to_opt(param[10])
  };
}
function runRaw$1(client, parameters) {
  return client.query({
    values: [parameters.relIds],
    rowMode: "array",
    text: statement$1
  });
}
function run$1(client, parameters) {
  var __x = runRaw$1(client, parameters);
  return __x.then(function(res) {
    return Promise.resolve(res.rows.map(convertRow$1));
  });
}
var GetAttributes = {
  statement: statement$1,
  convertParameters: convertParameters$1,
  convertRow: convertRow$1,
  runRaw: runRaw$1,
  run: run$1
};

// ../rescript-describe-query/lib/es6/src/Client.bs.js
var DescribeQueryBasic = __toESM(require_describe_query_basic());
function exn(opt, loc) {
  if (opt !== void 0) {
    return valFromOption(opt);
  } else {
    return raiseError("Unexpected None at: " + loc);
  }
}
function terminate(client) {
  client.terminating = true;
  var promise = client.terminationResult;
  if (promise !== void 0) {
    return valFromOption(promise);
  }
  var promise$1 = map3(all2([
    client.basicClient.terminate(),
    client.pgClient.end()
  ]), function(param) {
    var match2 = client.onUnexpectedTerminationCb;
    var match$1 = client.fatalError;
    if (match2 !== void 0 && match$1 !== void 0) {
      return _1(match2, valFromOption(match$1));
    }
  });
  client.terminationResult = some(promise$1);
  return promise$1;
}
function make5(pgConfig2, onUnexpectedTermination, param) {
  var config = pgConfig2 !== void 0 ? valFromOption(pgConfig2) : {};
  var error2;
  try {
    error2 = {
      TAG: 0,
      _0: new Pg$1.Client(config)
    };
  } catch (raw_exn) {
    var exn$1 = internalToOCamlException(raw_exn);
    error2 = {
      TAG: 1,
      _0: fromExnVerbose(exn$1)
    };
  }
  if (error2.TAG !== 0) {
    return resolve(error2);
  }
  var pgClient = error2._0;
  var clientRef = {
    contents: void 0
  };
  var onFatalError = function(error3) {
    var client = clientRef.contents;
    if (client === void 0) {
      return raiseError("A fatal error received before describe query client has beed initalised");
    }
    var match2 = client.fatalError;
    if (match2 !== void 0) {
      return;
    } else {
      client.fatalError = some(error3);
      terminate(client);
      return;
    }
  };
  var onEnd = function(param2) {
    var client = clientRef.contents;
    var terminating = client !== void 0 ? client.terminating : false;
    if (!terminating) {
      return onFatalError(makeJsError("Postgres client's connection has been terminated unexpectedly, without a error"));
    }
  };
  pgClient.once("error", onFatalError).once("end", onEnd);
  return mapOk(chainOk($$catch(pgClient.connect(), function(exn2) {
    return prepend(fromExn2(exn2), "Failed to connect to node-postgres client. Reason:");
  }), function(param2) {
    return $$catch(DescribeQueryBasic.createClient(config, onFatalError), function(exn2) {
      return prepend(fromExn2(exn2), "Failed to connect to describe-query-basic client. Reason:");
    });
  }), function(basicClient) {
    var client = {
      pgClient,
      basicClient,
      typesLoader: make4(function(keys) {
        return GetTypes.run(pgClient, {
          typeIds: keys
        });
      }, function(prim) {
        return prim.toString();
      }, function(row) {
        return exn(row.oid, 'File "Client.res", line 126, characters 32-39').toString();
      }),
      fieldsLoader: make4(function(keys) {
        return GetAttributes.run(pgClient, {
          relIds: keys.map(function(prim) {
            return prim[0];
          })
        });
      }, function(param2) {
        return [
          param2[0],
          param2[1]
        ].join("|");
      }, function(row) {
        return [
          exn(row.attrelid, 'File "Client.res", line 131, characters 38-45'),
          exn(row.attnum, 'File "Client.res", line 131, characters 64-71')
        ].join("|");
      }),
      onUnexpectedTerminationCb: onUnexpectedTermination,
      terminating: false,
      terminationResult: void 0,
      fatalError: void 0
    };
    clientRef.contents = client;
    return {
      TAG: 0,
      _0: client
    };
  });
}
function loadAll(items, loadItem) {
  return all(items.map(__1(loadItem)));
}
function loadType(client, oid) {
  return chain(resolve(void 0), function(param) {
    return chain(get4(client.typesLoader, oid), function(opt) {
      if (opt === void 0) {
        return raiseError("Data type with oid " + oid + " not found");
      }
      var x2 = exn(opt.typtype, 'File "Client.res", line 151, characters 50-57');
      var typeType;
      switch (x2) {
        case "b":
          typeType = "b";
          break;
        case "c":
          typeType = "c";
          break;
        case "d":
          typeType = "d";
          break;
        case "e":
          typeType = "e";
          break;
        case "m":
          typeType = "m";
          break;
        case "p":
          typeType = "p";
          break;
        case "r":
          typeType = "r";
          break;
        default:
          typeType = raiseError("Unexpected value of pg_type.typtype: " + x2);
      }
      var x$1 = exn(opt.typcategory, 'File "Client.res", line 162, characters 54-61');
      var category;
      switch (x$1) {
        case "A":
          category = "A";
          break;
        case "B":
          category = "B";
          break;
        case "C":
          category = "C";
          break;
        case "D":
          category = "D";
          break;
        case "E":
          category = "E";
          break;
        case "G":
          category = "G";
          break;
        case "I":
          category = "I";
          break;
        case "N":
          category = "N";
          break;
        case "P":
          category = "P";
          break;
        case "R":
          category = "R";
          break;
        case "S":
          category = "S";
          break;
        case "T":
          category = "T";
          break;
        case "U":
          category = "U";
          break;
        case "V":
          category = "V";
          break;
        case "X":
          category = "X";
          break;
        default:
          category = raiseError("Unexpected value of pg_type.typcategory: " + x$1);
      }
      var byVal = exn(opt.typbyval, 'File "Client.res", line 181, characters 41-48');
      var oid$1 = exn(opt.oid, 'File "Client.res", line 182, characters 34-41');
      var name = exn(opt.typname, 'File "Client.res", line 183, characters 39-46');
      var namespace = exn(opt.typnamespace, 'File "Client.res", line 184, characters 49-56');
      var len = exn(opt.typlen, 'File "Client.res", line 185, characters 37-44');
      var isPreferred = exn(opt.typispreferred, 'File "Client.res", line 186, characters 53-60');
      var isDefined = exn(opt.typisdefined, 'File "Client.res", line 187, characters 49-56');
      return map3(typeType === "c" ? map3(loadAll(exn(opt.attr_types, 'File "Client.res", line 209, characters 18-25'), function(oid2) {
        return loadType(client, oid2);
      }), function(dataTypes) {
        return {
          NAME: "Composite",
          VAL: {
            fields: zip(exn(opt.attr_names, 'File "Client.res", line 213, characters 60-67'), dataTypes)
          }
        };
      }) : typeType === "d" ? map3(loadType(client, exn(opt.typbasetype, 'File "Client.res", line 219, characters 45-52')), function(x3) {
        return {
          NAME: "Domain",
          VAL: {
            baseType: x3,
            notNull: exn(opt.typnotnull, 'File "Client.res", line 223, characters 46-53'),
            nDims: exn(opt.typndims, 'File "Client.res", line 224, characters 42-49'),
            default: fromOption(opt.typdefault),
            typmod: exn(opt.typtypmod, 'File "Client.res", line 226, characters 44-51'),
            collation: exn(opt.typcollation, 'File "Client.res", line 227, characters 50-57')
          }
        };
      }) : typeType === "e" ? resolve({
        NAME: "Enum",
        VAL: {
          enumValues: exn(opt.enum_labels, 'File "Client.res", line 205, characters 80-87')
        }
      }) : typeType === "r" || typeType === "m" ? map3(loadType(client, exn(opt.rngsubtype, 'File "Client.res", line 200, characters 44-51')), function(x3) {
        if (typeType === "m") {
          return {
            NAME: "MultiRange",
            VAL: {
              elemType: x3
            }
          };
        } else {
          return {
            NAME: "Range",
            VAL: {
              elemType: x3
            }
          };
        }
      }) : typeType === "p" ? resolve("Pseudo") : category === "A" ? map3(loadType(client, exn(opt.typelem, 'File "Client.res", line 192, characters 41-48')), function(x3) {
        return {
          NAME: "Array",
          VAL: {
            elemType: x3,
            delim: exn(opt.typdelim, 'File "Client.res", line 193, characters 78-85')
          }
        };
      }) : resolve("Base"), function(data) {
        return {
          oid: oid$1,
          name,
          namespace,
          len,
          byVal,
          typeType,
          category,
          isPreferred,
          isDefined,
          typeSpecificData: data
        };
      });
    });
  });
}
function describe(client, query) {
  var promise = chainOk($$catch(client.basicClient.describe(query), function(exn2) {
    var dbErr = DatabaseError2.fromExn(exn2);
    if (dbErr === void 0) {
      return prepend(fromExnVerbose(exn2), "Could not get types for the query:\n" + query + "\nError:");
    }
    var str = dbErr.position;
    var pos = str !== void 0 ? fromString2(str) : void 0;
    var highlighted = pos !== void 0 ? pos !== 0 ? highlight(query, pos - 1 | 0, pos - 1 | 0) : highlight(query, 0, 0) : query;
    var base = prepend(fromExn2(exn2), "Could not get types for the query:\n" + highlighted + "\nError:");
    var detail = dbErr.detail;
    var base$1 = detail !== void 0 && detail !== "" ? append(base, "\nDetail: " + detail) : base;
    var hint = dbErr.hint;
    if (hint !== void 0 && hint !== "") {
      return append(base$1, "\nHint: " + hint);
    } else {
      return base$1;
    }
  }), function(description) {
    var parametersTypes = loadAll(description.parameters, function(id2) {
      return loadType(client, id2);
    });
    var fieldsTypes = loadAll(getWithDefault(description.row, []), function(x2) {
      return loadType(client, x2.dataTypeID);
    });
    var tableColums = loadAll(getWithDefault(description.row, []), function(x2) {
      return get4(client.fieldsLoader, [
        x2.tableID,
        x2.columnID
      ]);
    });
    return mapOk($$catch(all3([
      parametersTypes,
      fieldsTypes,
      tableColums
    ]), function(exn2) {
      return prepend(fromExn2(exn2), "Failed to fetch additional information about query:\n" + query + "\nError:");
    }), function(param) {
      var row = description.row;
      return {
        TAG: 0,
        _0: {
          parameters: param[0],
          row: row !== void 0 ? zip(zip(row, param[1]), param[2]).map(function(param2) {
            var tableColumn = param2[1];
            var match2 = param2[0];
            return {
              name: match2[0].name,
              dataType: match2[1],
              tableColumn: tableColumn !== void 0 ? {
                attrelid: fromOption(tableColumn.attrelid),
                attrelname: fromOption(tableColumn.relname),
                attname: exn(tableColumn.attname, 'File "Client.res", line 325, characters 40-47'),
                attnotnull: exn(tableColumn.attnotnull, 'File "Client.res", line 326, characters 46-53'),
                attnum: fromOption(tableColumn.attnum),
                attndims: exn(tableColumn.attndims, 'File "Client.res", line 328, characters 42-49'),
                atttypmod: exn(tableColumn.atttypmod, 'File "Client.res", line 329, characters 44-51'),
                attoptions: fromOption(tableColumn.attoptions),
                attfdwoptions: fromOption(tableColumn.attfdwoptions)
              } : null
            };
          }) : null
        }
      };
    });
  });
  return chain($$catch(promise, function(err) {
    return err;
  }), function(param) {
    var match2 = client.fatalError;
    var match$1 = client.terminationResult;
    if (match2 !== void 0) {
      return resolve({
        TAG: 1,
        _0: prepend(fromJsExnVerbose(valFromOption(match2)), "While fetching information about query:\n" + query + "\nthe describe-query client has been terminated as a result of a fatal error:")
      });
    } else if (match$1 !== void 0) {
      return resolve({
        TAG: 1,
        _0: fromText("While fetching information about query:\n" + query + "\nthe describe-query client has been terminated by the user")
      });
    } else {
      return promise;
    }
  });
}

// lib/es6/src/Commands.bs.js
function mapParameters(parameters, fn) {
  return map4(function(x2) {
    var variant = x2.NAME;
    if (variant === "Parameter") {
      return {
        NAME: "Parameter",
        VAL: {
          dataType: _1(fn, x2.VAL.dataType)
        }
      };
    }
    if (variant === "RawParameter") {
      return x2;
    }
    var match2 = x2.VAL;
    return {
      NAME: "BatchParameter",
      VAL: {
        separator: match2.separator,
        fields: mapParameters(match2.fields, fn)
      }
    };
  }, parameters);
}
function build(ctx) {
  var sources2 = getSomeOrExitWithError(sources(ctx), "No sources specified");
  var generator2 = getSomeOrExitWithError(generator(ctx), "No generator specified");
  return done(chain(make5(some(pgConfig(ctx)), void 0, void 0), function(client) {
    var client$1 = getOkOrExitWithError(void 0, client);
    return chain(mapAsyncSeq(sources2, function(source) {
      return chain(resolveGlobs(source.input), function(files) {
        return mapAsyncSeq(getOkOrExitWithError("Could not turn glob(s) into a list of files. Reason:", files), function(path) {
          return chain(catchAndExitWithError('Unable to read file "' + path + '". Reason:', Promises.readFile(path, "utf8")), function(content) {
            var x2 = parseFile(content);
            var parsedFile;
            parsedFile = x2.TAG === 0 ? x2._0 : exitWithError(void 0, x2._0.message);
            var prinedStatements = map5(parsedFile.statements, function(statement2) {
              var match2 = print2(void 0, statement2.ast);
              return {
                statement: statement2,
                sqlQueries: match2[0],
                parameters: match2[1]
              };
            });
            return chain(chain(mapAsyncSeq(prinedStatements, function(data) {
              return mapAsyncSeq(data.sqlQueries, function(query) {
                return map3(describe(client$1, query.trim()), function(x3) {
                  return getOkOrExitWithError(void 0, x3);
                });
              });
            }), function(descriptions) {
              return _1(generator2.generate, {
                filePath: path,
                rawFileContent: content,
                separator: parsedFile.separator,
                statements: mapWithIndex2(prinedStatements, function(i, data) {
                  var match2 = getExn3(getExn3(descriptions, i), 0);
                  var parameters = match2.parameters;
                  return {
                    attributes: data.statement.attributes,
                    ast: data.statement.ast,
                    parameters: mapParameters(data.parameters, function(index) {
                      return getExn3(parameters, index);
                    }),
                    row: match2.row
                  };
                })
              });
            }), function(generatedCode) {
              var getOutputPath = getWithDefault(source.output, generator2.defaultOutputPath);
              var outputPath;
              try {
                outputPath = _1(getOutputPath, path);
              } catch (raw_exn) {
                var exn2 = internalToOCamlException(raw_exn);
                outputPath = exitWithLoggableError(void 0, fromExnVerbose(exn2));
              }
              return catchAndExitWithError(void 0, Promises.writeFile(outputPath, generatedCode, "utf8"));
            });
          });
        });
      });
    }), function(param) {
      return catchAndExitWithError(void 0, terminate(client$1));
    });
  }), function(param) {
  });
}
function watch2(ctx) {
  return info(ctx, "TODO: watch");
}
function pipe(ctx) {
  return info(ctx, "TODO: pipe");
}

// lib/es6/src/Minimist.bs.js
var import_minimist = __toESM(require_minimist());
function get5(r, k) {
  var $$float = classify(r[k]);
  if (typeof $$float === "number") {
    switch ($$float) {
      case 0:
        return {
          TAG: 0,
          _0: false
        };
      case 1:
        return {
          TAG: 0,
          _0: true
        };
      case 2:
      case 3:
        return 0;
    }
  } else {
    switch ($$float.TAG | 0) {
      case 0:
        return {
          TAG: 2,
          _0: $$float._0
        };
      case 1:
        return {
          TAG: 1,
          _0: $$float._0
        };
      default:
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "Minimist.res",
            15,
            9
          ],
          Error: new Error()
        };
    }
  }
}
function parse3(parametersOpt, flags, aliases, stopEarly, separate, onUnknown, argv4) {
  var parameters = parametersOpt !== void 0 ? parametersOpt : [];
  return (0, import_minimist.default)(argv4, {
    string: ["_"].concat(parameters),
    boolean: flags,
    alias: aliases,
    stopEarly,
    "--": separate,
    unknown: onUnknown
  });
}

// lib/es6/src/Cli.bs.js
var version = "0.1.0";
var header = "Typesafe SQL CLI for PostgreSQL [ver. " + version + "]\n\nThis is a tool for generating typings for PostgreSQL queries.";
var usage = 'Usage: typesafe-pg [--version | -v] <command> \n       [--input | -i <glob>] [--output | -o <pattern>] [--generator | -g <generator>]\n       [--config | -c <path>] [--host | -h <db-host>] [--port | -p <db-port>]\n       [--username | -U <db-user>] [--password | -W <db-password>]\n       [--dbname | -d <db-database-name>] [--connection | -C <db-connection-string>]\n       [--debug | -D] [--quiet | -q] [--color | --no-color]\n\ntypesafe-pg build - Generate typings\ntypesafe-pg watch - Generate, and continue updating as the input files change\ntypesafe-pg pipe  - Generate using stdin as the input and output to stdout \n\nExample:\n\n  $ typesafe-pg build \\\n    --connection "postgres://user:password@host:5432/database" \\\n    --input "queries/*.sql" \\\n    --output "{dir}/{name}.res" \\\n    --generator rescript\n       \nFull documentation is available at \nhttps://github.com/rpominov/typesafe-sql/tree/master/packages/pg-cli\n';
var quiet2 = {
  contents: false
};
function exitWithError2(err) {
  return exitWithError(some(quiet2.contents ? void 0 : usage), err);
}
function exitWithLoggableError2(err) {
  return exitWithLoggableError(some(quiet2.contents ? void 0 : usage), err);
}
var x = get2(argv2, 2);
var match = x !== void 0 ? x.startsWith("-") ? [
  void 0,
  argv2.slice(2)
] : [
  x,
  argv2.slice(3)
] : [
  void 0,
  []
];
var unparsedArgv = match[1];
var command = match[0];
var command$1;
if (command !== void 0) {
  switch (command) {
    case "build":
      command$1 = "build";
      break;
    case "pipe":
      command$1 = "pipe";
      break;
    case "watch":
      command$1 = "watch";
      break;
    default:
      command$1 = exitWithError2("Unknown command: " + command);
  }
} else {
  command$1 = "help";
}
function outputValidator(name) {
  return Validators.either(Validators.string, function(str) {
    if (str === "") {
      return {
        TAG: 1,
        _0: fromText('Invalid "' + name + '" value. It cannot be an empty string.')
      };
    }
    var fn = make(str);
    if (fn.TAG === 0) {
      return {
        TAG: 0,
        _0: fn._0
      };
    } else {
      return {
        TAG: 1,
        _0: fromText('Invalid "' + name + '" value. ' + fn._0)
      };
    }
  }, Validators.$$function, function(fn) {
    return {
      TAG: 0,
      _0: function(str) {
        return fn(str);
      }
    };
  });
}
function resolveGenerator(moduleId) {
  var err = $$require(moduleId);
  var ok;
  if (err.TAG === 0) {
    var obj = err._0;
    if (obj !== void 0) {
      var obj$1 = valFromOption(obj);
      ok = validate(function(param) {
        var obj$2 = Validators.cast(obj$1, Validators.object, "The export");
        return {
          name: moduleId,
          defaultOutputPath: Validators.property(obj$2, "defaultOutputPath", outputValidator("defaultOutputPath")),
          generate: Validators.property(obj$2, "generate", Validators.$$function)
        };
      });
    } else {
      ok = {
        TAG: 1,
        _0: fromText("Not found")
      };
    }
  } else {
    ok = err;
  }
  if (ok.TAG === 0) {
    return ok;
  } else {
    return {
      TAG: 1,
      _0: prepend(ok._0, 'Failed to load generator from "' + moduleId + '". Reason:\n')
    };
  }
}
var ArgsParseError = /* @__PURE__ */ create("Cli-TypesafeSqlPgCli.ArgsParseError");
var argv3;
try {
  result = parse3([
    "generator",
    "output",
    "input",
    "config",
    "host",
    "port",
    "username",
    "password",
    "dbname",
    "connection"
  ], [
    "version",
    "debug",
    "quiet",
    "color"
  ], {
    version: "v",
    generator: "g",
    debug: "D",
    input: "i",
    output: "o",
    quiet: "q",
    config: "c",
    host: "h",
    port: "p",
    username: "U",
    password: "W",
    dbname: "d",
    connection: "C"
  }, void 0, true, function(s) {
    throw {
      RE_EXN_ID: ArgsParseError,
      _1: {
        TAG: 1,
        _0: s
      },
      Error: new Error()
    };
  }, unparsedArgv);
  getFlagExn = function(name2) {
    var v = get5(result, name2);
    if (typeof v === "number") {
      throw {
        RE_EXN_ID: ArgsParseError,
        _1: {
          TAG: 0,
          _0: name2,
          _1: v
        },
        Error: new Error()
      };
    }
    switch (v.TAG | 0) {
      case 0:
        return v._0;
      case 1:
        switch (v._0) {
          case "false":
            return false;
          case "true":
            return true;
          default:
            throw {
              RE_EXN_ID: ArgsParseError,
              _1: {
                TAG: 0,
                _0: name2,
                _1: v
              },
              Error: new Error()
            };
        }
      case 2:
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 0,
            _0: name2,
            _1: v
          },
          Error: new Error()
        };
    }
  };
  getParam = function(name2) {
    var val = get5(result, name2);
    if (typeof val === "number" || val.TAG !== 1) {
      return;
    } else {
      return val._0;
    }
  };
  quiet2.contents = getFlagExn("quiet");
  if (unparsedArgv.includes("--")) {
    throw {
      RE_EXN_ID: ArgsParseError,
      _1: {
        TAG: 1,
        _0: "--"
      },
      Error: new Error()
    };
  }
  arr = result._;
  if (arr.length !== 0) {
    throw {
      RE_EXN_ID: ArgsParseError,
      _1: {
        TAG: 1,
        _0: arr[0]
      },
      Error: new Error()
    };
  }
  name = getParam("generator");
  if (name !== void 0) {
    generator$1 = resolveGenerator(name);
    if (generator$1.TAG === 0) {
      generator2 = generator$1._0;
    } else {
      throw {
        RE_EXN_ID: ArgsParseError,
        _1: {
          TAG: 3,
          _0: "generator",
          _1: generator$1._0
        },
        Error: new Error()
      };
    }
  } else {
    generator2 = void 0;
  }
  str = getParam("output");
  if (str !== void 0) {
    if (str === "") {
      throw {
        RE_EXN_ID: ArgsParseError,
        _1: {
          TAG: 2,
          _0: "output",
          _1: "It cannot be an empty string."
        },
        Error: new Error()
      };
    }
    fn = make(str);
    if (fn.TAG === 0) {
      tmp = fn._0;
    } else {
      throw {
        RE_EXN_ID: ArgsParseError,
        _1: {
          TAG: 2,
          _0: "output",
          _1: fn._0
        },
        Error: new Error()
      };
    }
  } else {
    tmp = void 0;
  }
  str$1 = getParam("port");
  if (str$1 !== void 0) {
    $$float = fromString(str$1);
    if ($$float !== void 0) {
      if (($$float | 0) === $$float) {
        tmp$1 = $$float | 0;
      } else {
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 2,
            _0: "port",
            _1: "Not an integer: " + str$1
          },
          Error: new Error()
        };
      }
    } else {
      throw {
        RE_EXN_ID: ArgsParseError,
        _1: {
          TAG: 2,
          _0: "port",
          _1: "Not an integer: " + str$1
        },
        Error: new Error()
      };
    }
  } else {
    tmp$1 = void 0;
  }
  argv3 = {
    version: getFlagExn("version"),
    debug: getFlagExn("debug"),
    quiet: getFlagExn("quiet"),
    generator: generator2,
    input: getParam("input"),
    output: tmp,
    config: getParam("config"),
    host: getParam("host"),
    port: tmp$1,
    username: getParam("username"),
    password: getParam("password"),
    dbname: getParam("dbname"),
    connection: getParam("connection")
  };
} catch (raw_error) {
  error2 = internalToOCamlException(raw_error);
  if (error2.RE_EXN_ID === ArgsParseError) {
    error$1 = error2._1;
    switch (error$1.TAG | 0) {
      case 0:
        str$2 = error$1._1;
        name$1 = error$1._0;
        if (typeof str$2 === "number") {
          argv3 = exitWithError2("Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value.");
        } else {
          switch (str$2.TAG | 0) {
            case 0:
              argv3 = exitWithError2("Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value.");
              break;
            case 1:
              argv3 = exitWithError2("Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value, got: " + str$2._0);
              break;
            case 2:
              argv3 = exitWithError2("Invalid --" + name$1 + " value. A boolen flag can have values true/false or no value, got: " + str$2._0.toString());
              break;
          }
        }
        break;
      case 1:
        argv3 = exitWithError2("Unknown argument: " + error$1._0);
        break;
      case 2:
        argv3 = exitWithError2("Invalid --" + error$1._0 + " value. " + error$1._1);
        break;
      case 3:
        argv3 = exitWithLoggableError2(prepend(error$1._1, "Invalid --" + error$1._0 + " value."));
        break;
    }
  } else {
    argv3 = rethrowAsNative(error2);
  }
}
var result;
var getFlagExn;
var getParam;
var arr;
var name;
var generator2;
var generator$1;
var str;
var tmp;
var fn;
var str$1;
var tmp$1;
var $$float;
var error2;
var error$1;
var str$2;
var name$1;
if (argv3.version) {
  console.log(version);
} else {
  path = argv3.config;
  if (path !== void 0) {
    result$1 = $$require(path);
    res = result$1.TAG === 0 && result$1._0 === void 0 ? [
      path,
      {
        TAG: 1,
        _0: fromText("File doesn't exist")
      }
    ] : [
      path,
      result$1
    ];
  } else {
    res$1 = $$require("./typesafe-pg.config.json");
    if (res$1.TAG === 0 && res$1._0 === void 0) {
      res$2 = $$require("./typesafe-pg.config.js");
      if (res$2.TAG === 0 && res$2._0 === void 0) {
        res$3 = $$require("./package.json");
        if (res$3.TAG === 0) {
          obj = res$3._0;
          if (obj !== void 0) {
            obj$1 = valFromOption(obj);
            res = [
              "./package.json",
              validate(function(param) {
                return Validators.property(Validators.cast(obj$1, Validators.object, "This"), "typesafe-pg", Validators.nullable(Validators.unknown));
              })
            ];
          } else {
            res = [
              "./package.json",
              res$3
            ];
          }
        } else {
          res = [
            "./package.json",
            res$3
          ];
        }
      } else {
        res = [
          "./typesafe-pg.config.js",
          res$2
        ];
      }
    } else {
      res = [
        "./typesafe-pg.config.json",
        res$1
      ];
    }
  }
  match$1 = res[1];
  if (match$1.TAG === 0) {
    obj$2 = match$1._0;
    if (obj$2 !== void 0) {
      obj$3 = valFromOption(obj$2);
      match$2 = [
        res[0],
        validate(function(param) {
          var obj$4 = Validators.cast(obj$3, Validators.object, "This");
          var name = Validators.property(obj$4, "generator", Validators.nullable(Validators.string));
          var generator2;
          if (name !== void 0) {
            var error2 = resolveGenerator(name);
            generator2 = error2.TAG === 0 ? error2._0 : Validators.failed(error2._0);
          } else {
            generator2 = void 0;
          }
          var some3 = Validators.property(obj$4, "sources", Validators.nullable(Validators.arrayOf(Validators.objectOf2("input", Validators.either(Validators.string, function(x2) {
            return {
              TAG: 0,
              _0: [x2]
            };
          }, Validators.arrayOf(Validators.string), function(xs) {
            return {
              TAG: 0,
              _0: xs
            };
          }), "output", Validators.nullable(outputValidator("output")), function(i, o) {
            return {
              input: i,
              output: o
            };
          }))));
          return {
            debug: Validators.property(obj$4, "debug", Validators.nullable(Validators.bool)),
            quiet: Validators.property(obj$4, "quiet", Validators.nullable(Validators.bool)),
            generator: generator2,
            host: Validators.property(obj$4, "host", Validators.nullable(Validators.string)),
            port: Validators.property(obj$4, "port", Validators.nullable(Validators.$$int)),
            username: Validators.property(obj$4, "username", Validators.nullable(Validators.string)),
            password: Validators.property(obj$4, "password", Validators.nullable(Validators.string)),
            dbname: Validators.property(obj$4, "dbname", Validators.nullable(Validators.string)),
            connection: Validators.property(obj$4, "connection", Validators.nullable(Validators.string)),
            sources: some3 !== void 0 && some3.length !== 0 ? some3 : void 0
          };
        })
      ];
    } else {
      match$2 = [
        "%fallback",
        {
          TAG: 0,
          _0: {
            debug: void 0,
            quiet: void 0,
            generator: void 0,
            host: void 0,
            port: void 0,
            username: void 0,
            password: void 0,
            dbname: void 0,
            connection: void 0,
            sources: void 0
          }
        }
      ];
    }
  } else {
    match$2 = res;
  }
  data = match$2[1];
  path$1 = match$2[0];
  if (data.TAG === 0) {
    if (!quiet2.contents && command$1 !== "help") {
      console.error(Chalk$1.dim("Using config from:"), Chalk$1.dim(path$1));
    }
    config = data._0;
  } else {
    config = exitWithLoggableError2(prepend(data._0, 'Failed to load config file "' + path$1 + '"! Reason:\n\n'));
  }
  ctx = {
    config,
    argv: argv3
  };
  if (command$1 === "watch") {
    watch2(ctx);
  } else if (command$1 === "pipe") {
    pipe(ctx);
  } else if (command$1 === "build") {
    build(ctx);
  } else {
    info(ctx, header);
    infoNl(ctx);
    info(ctx, usage);
  }
}
var path;
var res;
var result$1;
var res$1;
var res$2;
var res$3;
var obj;
var obj$1;
var match$1;
var match$2;
var obj$2;
var obj$3;
var data;
var path$1;
var config;
var ctx;
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-extglob <https://github.com/jonschlinkert/is-extglob>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * is-glob <https://github.com/jonschlinkert/is-glob>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
