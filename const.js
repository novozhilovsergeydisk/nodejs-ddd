'use strict';

const path = require('path');

const appPath = process.cwd();
// const views_path = process.env.VIEWS_PATH;

// console.log({ 'views_path': views_path })

const MIME_TYPES = {
  html: 'text/html',
  plain: 'text/plain',
  js: 'application/javascript',
  json: 'application/json',
  pdf: 'application/pdf',
  xml: 'application/xml',
  msexcel: 'application/vnd.ms-excel',
  css: 'text/css',
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  webp: 'image/webp',
  woff: 'application/x-font-woff',
  woff2: 'application/x-font-woff2',
  ttf: 'application/x-font-ttf',
  otf: 'application/x-font-otf',
  mp3: 'audio/mpeg',
  mp4: 'video/mp4'
};
const ALLOWED_METHODS = ['GET', 'POST', 'PUT'];

// ******* info
const os = require('os');
const hostname = os.hostname();
const info = {
  packageName: require('./package.json').name,
  packageVersion: require('./package.json').version,
  projectFolderFromScript: path.normalize(path.join(__dirname, path.sep, '..', path.sep)),
  hostname,
  protocol: 'http',
  address: process.env.HTTP_ADDRESS || '127.0.0.1',
  port: process.env.HTTP_PORT || 3000,
  folders: {
    serverName: 'server',
    servicesName: 'server/services',
    storageName: 'server/storage',
    uploadName: 'server/storage/upload',
    controllersName: 'controllers',
    sourcesName: 'src',
    staticName: 'static',
    templatesFolderName: 'templates',
    publicAssetsFolderName: 'public',
    cssAssetsFolderName: 'css',
    imagesAssetsFolderName: 'img',
    jsAssetsFolderName: 'js'
  }
};
info.imagesFolderFromScript = path.normalize(path.join(info.projectFolderFromScript, path.sep, info.folders.publicAssetsFolderName, path.sep, info.folders.imagesAssetsFolderName, path.sep));
info.serverUrl = `${info.protocol}://${info.address}:${info.port}`;
info.source = info.serverUrl;
info.queueName = `${info.packageName}-${info.packageVersion}`;
info.message = `трансплант.net web application just started at '${info.hostname}' and available at '${info.serverUrl}'!`;
// *******

const CONTENT_TYPES = {
  IMAGE_JPEG: 'image/jpeg',
  IMAGE_PNG: 'image/png',
  MULTIPART_FORMDATA: 'multipart/form-data',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  APPLICATION_JSON: 'application/json;charset=utf-8'
}

const STATIC_ROUTES = [
  '/css',
  '/fonts',
  '/iwebfonts',
  '/img',
  '/js',
  '/robots/robots.txt',
  '/favicon.ico',
  '/images',
  '/vendors',
  '/js-admin',
  '/nephrocenter',
  '/telerehab',
  '/doc',
  '/assets',
  '/star-admin-pro'
];

const CONSTANTS = {
  MIME_TYPES: MIME_TYPES,
  ALLOWED_METHODS: ALLOWED_METHODS,
  CONTENT_TYPES: CONTENT_TYPES,
  // APP_PATH: appPath,
  // SERVER_PATH: appPath + path.sep + info.folders.serverName,
  // SERVICES_PATH: appPath + path.sep + info.folders.servicesName,
  // STORAGE_PATH: appPath + path.sep + info.folders.storageName,
  // UPLOAD_PATH: appPath + path.sep + info.folders.uploadName,
  // SOURCES_PATH: appPath + path.sep + info.folders.sourcesName,
  // VIEWS_PATH: appPath + views_path,
  // CONTROLLERS_PATH: appPath + path.sep + info.folders.controllersName,
  // STATIC_PATH: appPath + path.sep + info.folders.staticName,
  INFO: info
};

module.exports = CONSTANTS;

// const HTTPMethod = {
//     'ACL': false,
//     'BIND': false,
//     'CHECKOUT': false,
//     'CONNECT': false,
//     'COPY': false,
//     'DELETE': false,
//     'GET': false,
//     'HEAD': false,
//     'LINK': false,
//     'LOCK': false,
//     'M-SEARCH': false,
//     'MERGE': false,
//     'MKACTIVITY': false,
//     'MKCALENDAR': false,
//     'MKCOL': false,
//     'MOVE': false,
//     'NOTIFY': false,
//     'OPTIONS': false,
//     'PATCH': false,
//     'POST': false,
//     'PROPFIND': false,
//     'PROPPATCH': false,
//     'PURGE': false,
//     'PUT': false,
//     'REBIND': false,
//     'REPORT': false,
//     'SEARCH': false,
//     'SOURCE': false,
//     'SUBSCRIBE': false,
//     'TRACE': false,
//     'UNBIND': false,
//     'UNLINK': false,
//     'UNLOCK': false,
//     'UNSUBSCRIBE' : false
// };
