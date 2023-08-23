/**
 * Adding missing TypeScript declaration for Uglyfy JS lib
 */
declare module 'uglify-js' {
  function uglify(code: string): { error: any, code: string };
}

/**
 * Adding missing TypeScript declaration for Leaflet JS lib
 */
declare module 'leaflet' {
  function map(id: string, options: Record<string, any>): any;
  function tileLayer(url: string, options: Record<string, any>): any;
}

/**
 * Allow to include SCSS files, which are processed durring rollup stage, in html() plugin
 */
declare module '*.scss';
