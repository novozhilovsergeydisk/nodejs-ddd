'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const MIME_TYPES = {
    default: 'application/octet-stream',
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    json: 'application/json',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    gif: 'image/gif',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
    txt: 'text/plain',
};

const STATIC_PATH = path.join(process.cwd(), './client');

const toBool = [() => true, () => false];

const statPath = (path => {
    try {
        return fs.statSync(path);
    } catch (ex) {
        // console.log('Error statPath')
        // console.log({ ex })
        return false;
    }
});

const prepareFile = async (url) => {

    console.log({url})


    const paths = [STATIC_PATH, url];
    if (url.endsWith('/')) paths.push('index.html');
    const filePath = path.join(...paths);

    console.log({filePath})

    const pathTraversal = !filePath.startsWith(STATIC_PATH);
    const exists = await fs.promises.access(filePath).then(...toBool);
    const found = !pathTraversal && exists;
    const streamPath = found ? filePath : STATIC_PATH + '/404.html';
    const ext = path.extname(streamPath).substring(1).toLowerCase();
    // console.log({ streamPath })
    const stats = statPath(streamPath);

    if (stats) {
        const stream = fs.createReadStream(streamPath);
        return {found, ext, stream};
    } else {
        const stream = null;
        return {found, ext, stream};
    }
};

const test = 'https://api.nodemailer.com'.replace(/\/+$/, '');

console.log({test});

// console.log({ 'process.cwd()': process.cwd()})

const receiveArgs = async (req) => {
    const buffers = [];
    for await (const chunk of req) buffers.push(chunk);
    const data = Buffer.concat(buffers).toString();
    return JSON.parse(data);
};

// function pipe(mimeType, stream, res, status = 200) {
//   res.setHeader('Content-Type', mimeType);
//   res.statusCode = status;
//
//   stream.pipe(res);
// }
//
// const html = (res, text, mimeType = 'text/html', status = 200) => {
//   res.setHeader('Content-Type', mimeType);
//   res.statusCode = status;
//   if ((typeof data) === 'string') {
//     res.setHeader('Content-Type', 'text/html');
//     res.end(data);
//   } else {
//     res.statusCode = 500;
//     res.end('Not valid data')
//   }
// }

const answer = (res, data, mimeType = '', status = 200) => {
    // if (mimeType) res.setHeader('Content-Type', mimeType);
    if ((typeof data) === 'string') {
        res.setHeader('Content-Type', 'text/html');
        res.end(data);
    }

    if ((typeof data) === 'object') {
        // res.setHeader('Content-Type', mimeType);
        res.end(JSON.stringify(data));
    }

    // res.statusCode = status;

}

// const removeLastSymbol = ((symbol, url) => {
//     let newUrl = url;
//     if (symbol === url) return url;
//     const lastSymbol = url.charAt(url.length - 1);
//     if (lastSymbol === symbol) {
//         newUrl = url.slice(0, -1);
//     }
//     return newUrl;
// });

// const resolveresource = (req, res) => {
//     const url = removeLastSymbol('/', req.url)
//     const stats = statPath(__STATIC(req.url))
//
//     if (!stats) {
//         res.setHeader('Content-type', 'text/plain')
//         res.statusCode = 404
//         res.end('404 - Not found')
//     } else {
//         const stream = fs.createReadStream(__STATIC(url))
//
//         if (stream !== null) {
//             const mimeType = this.getMimeType(req)
//             this.pipe(req, res, stream, mimeType)
//         } else {
//             this.error404(req, res)
//         }
//     }
//
//     if(stats && stats.isFile()) {
//         log('is file')
//         data = await fs.createReadStream(__STATIC(url));
//     }
// }

const { CONTENT_TYPES, ALLOWED_METHODS } = require(process.cwd() + '/const.js');

console.log({ CONTENT_TYPES, ALLOWED_METHODS })

module.exports = (routing, port) => {
    http.createServer(async (req, res) => {
        const {url, socket} = req;
        const [name, method, id] = url.substring(1).split('/');

        console.log('')

        console.log('START request ---------------')

        // check static files
        const file = await prepareFile(url);

        console.log({'file.found = ': file.found})

        const statusCode = file.found ? 200 : 404;
        const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
        // res.writeHead(statusCode, { 'Content-Type': mimeType });

        if (file.stream) {
            file.stream.pipe(res);

            console.log('END file.stream ---------------')

            console.log('')

        } else {
            console.log(`${req.method} ${req.url} ${statusCode} ${mimeType}`);
            // END STATIC

            console.log({ url })

            const entity = routing[name];

            console.log({ entity })

            if (!entity) {
                res.statusCode = 404;
                return void res.end('Not found routing')
            }
            ;
            const handler = entity[method];

            if (!handler) {
                res.status = 404;
                return void res.end('Not found handler')
            }
            ;
            const src = handler.toString();
            const signature = src.substring(0, src.indexOf(')'));
            const args = [];
            if (signature.includes('(id')) args.push(id);
            if (signature.includes('{')) args.push(await receiveArgs(req));
            console.log(`${socket.remoteAddress} ${method} ${url}`);
            const result = await handler(...args);

            // console.log({ result })
            // console.log({ 'result.rows = ': result.rows })
            // const json_stringify = JSON.stringify(result.rows)
            // console.log(typeof result.rows)
            // console.log({ json_stringify })
            // console.log('============================')
            // res.setHeader('Content-Type', 'text/html');
            // const contentType = req.headers;
            // console.log({ contentType })

            answer(res, result.rows);

            console.log('END answer ---------------')
            console.log('')

            // res.end(JSON.stringify(result.rows));
        }

    }).listen(port);

    console.log(`API on port ${port}`);
};
