/**
 * 描述: 全局管道方法
 * 作者: Jack Chen @懒人码农
 * 日期: 2021-09-05
 **/

const pipeMethod = {
  getIcon(value) {
    // 根据文件名后缀显示图标
    const iconEnum = {
      pdf: "icon-pdf",
      doc: "icon-doc",
      music: "icon-music",
      other: "icon-unknown",
      picture: "icon-jpg",
      video: "icon-video",
      apply: "icon-app",
      zip: "icon-zip",
      rar: "icon-rar",
      excel: "icon-excel",
      ps: "icon-ps",
      "3ds": "icon-3ds",
      ai: "icon-ai",
      asm: "icon-asm",
      c4d: "icon-c4d",
      catpart: "icon-catpart",
      catproduct: "icon-catproduct",
      cdr: "icon-cdr",
      drwdot: "icon-drwdot",
      dxf: "icon-dxf",
      fbx: "icon-fbx",
      indd: "icon-indd",
      max: "icon-max",
      obj: "icon-obj",
      pptx: "icon-pptx",
      prt: "icon-prt",
      sldasm: "icon-sldasm",
      slddrw: "icon-slddrw",
      sldprt: "icon-sldprt",
      stl: "icon-stl",
    };
    const fileIcon = {
      pdfEnum: ["pdf"],
      docTypeEnum: ["docx", "doc", "txt", "html", "js", "css", "word"],
      pictureEnum: ["jpg", "bmp", "png", "svg", "webp", "jpeg"],
      videoEnum: ["mp4", "avi", "rmvb", "rm", "flv", "3gp", "mkv"],
      musicEnum: ["mp3", "wma", "ogg", "flac"],
      applyEnum: ["exe", "apk"],
      zipEnum: ["zip"],
      rarEnum: ["rar"],
      excelEnum: ["excel", "xlsx"],
      psEnum: ["ps"],
      aiEnum: ["ai"],
      asmEnum: ["asm"],
      c4dEnum: ["c4d"],
      cadEnum: ["cad"],
      catpartEnum: ["catpart"],
      catproductEnum: ["catproduct"],
      cdrEnum: ["cdr"],
      drwdotEnum: ["drwdot"],
      dxfEnum: ["dxf"],
      fbxEnum: ["fbx"],
      inddEnum: ["indd"],
      maxEnum: ["max"],
      objEnum: ["obj"],
      pptxEnum: ["pptx"],
      prtEnum: ["prt"],
      sldasmEnum: ["sldasm"],
      slddrwEnum: ["slddrw"],
      sldprtEnum: ["sldprt"],
      stlEnum: ["stl"],
    };

    let dotPos = value.lastIndexOf(".");
    let suffix = value.substring(dotPos + 1, value.length);
    if (suffix) {
      switch (true) {
        case fileIcon.pdfEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["pdf"]}`;
        case fileIcon.applyEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["apply"]}`;
        case fileIcon.docTypeEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["doc"]}`;
        case fileIcon.pictureEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["picture"]}`;
        case fileIcon.videoEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["video"]}`;
        case fileIcon.musicEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["music"]}`;
        case fileIcon.zipEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["zip"]}`;
        case fileIcon.rarEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["rar"]}`;
        case fileIcon.excelEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["excel"]}`;
        case fileIcon.psEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["ps"]}`;
        case fileIcon.aiEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["ai"]}`;
        case fileIcon.asmEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["asm"]}`;
        case fileIcon.c4dEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["c4d"]}`;
        case fileIcon.cadEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["cad"]}`;
        case fileIcon.catpartEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["catpart"]}`;
        case fileIcon.catproductEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["catproduct"]}`;
        case fileIcon.cdrEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["cdr"]}`;
        case fileIcon.drwdotEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["drwdot"]}`;
        case fileIcon.dxfEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["dxf"]}`;
        case fileIcon.fbxEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["fbx"]}`;
        case fileIcon.inddEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["indd"]}`;
        case fileIcon.maxEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["max"]}`;
        case fileIcon.objEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["obj"]}`;
        case fileIcon.pptxEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["pptx"]}`;
        case fileIcon.prtEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["prt"]}`;
        case fileIcon.sldasmEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["sldasm"]}`;
        case fileIcon.slddrwEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["slddrw"]}`;
        case fileIcon.sldprtEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["sldprt"]}`;
        case fileIcon.stlEnum.indexOf(suffix.toLowerCase()) !== -1:
          return `file-icon ${iconEnum["stl"]}`;
        default:
          return `file-icon ${iconEnum["other"]}`;
      }
    } else {
      return `iconfont ${iconEnum["doc"]}`;
    }
  },
  // 字节单位转换
  renderSize(value, n) {
    if (!value) {
      return "0 Bytes";
    }
    const unitArr = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let index = 0;
    let srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    let size = srcsize / Math.pow(1024, index);
    size = size.toFixed(n); // n保留的小数位数
    return size + ` ${unitArr[index]}`;
  },
  // 是否可下载
  downloadStatus(value) {
    return value === 0 ? "不可下载" : "可下载";
  },
  // 是否已加密
  secretType(value) {
    return value === 0 ? "不加密" : "普通加密";
  },
};

export default pipeMethod;
