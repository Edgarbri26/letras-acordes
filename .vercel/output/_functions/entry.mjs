import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CaHvME1_.mjs';
import { manifest } from './manifest_B3DqoIha.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page2 = () => import('./pages/404.astro.mjs');
const _page3 = () => import('./pages/admin/roles.astro.mjs');
const _page4 = () => import('./pages/admin/songs.astro.mjs');
const _page5 = () => import('./pages/admin/users.astro.mjs');
const _page6 = () => import('./pages/debug.astro.mjs');
const _page7 = () => import('./pages/login.astro.mjs');
const _page8 = () => import('./pages/logout.astro.mjs');
const _page9 = () => import('./pages/misas/add.astro.mjs');
const _page10 = () => import('./pages/misas/view/_id_.astro.mjs');
const _page11 = () => import('./pages/misas/_id_.astro.mjs');
const _page12 = () => import('./pages/misas.astro.mjs');
const _page13 = () => import('./pages/register.astro.mjs');
const _page14 = () => import('./pages/search/_search_.astro.mjs');
const _page15 = () => import('./pages/songs/add.astro.mjs');
const _page16 = () => import('./pages/songs/edit/_id_.astro.mjs');
const _page17 = () => import('./pages/songs/print/_id_.astro.mjs');
const _page18 = () => import('./pages/songs/_id_.astro.mjs');
const _page19 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/astro/dist/actions/runtime/route.js", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/admin/roles.astro", _page3],
    ["src/pages/admin/songs.astro", _page4],
    ["src/pages/admin/users.astro", _page5],
    ["src/pages/debug.astro", _page6],
    ["src/pages/login.astro", _page7],
    ["src/pages/logout.astro", _page8],
    ["src/pages/misas/add.astro", _page9],
    ["src/pages/misas/view/[id].astro", _page10],
    ["src/pages/misas/[id].astro", _page11],
    ["src/pages/misas/index.astro", _page12],
    ["src/pages/register.astro", _page13],
    ["src/pages/search/[search].astro", _page14],
    ["src/pages/songs/add.astro", _page15],
    ["src/pages/songs/edit/[id].astro", _page16],
    ["src/pages/songs/print/[id].astro", _page17],
    ["src/pages/songs/[id].astro", _page18],
    ["src/pages/index.astro", _page19]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "c73b5936-2e16-476b-8b4f-3f30915a3c6e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
