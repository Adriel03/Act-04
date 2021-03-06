/// <reference types="node" />
import { BuildOptions as BuildOptions_2 } from 'esbuild';
import { ChangeEvent } from 'rollup';
import { CustomPluginOptions } from 'rollup';
import * as events from 'events';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import { IncomingMessage } from 'http';
import { InputOptions } from 'rollup';
import { LoadResult } from 'rollup';
import * as net from 'net';
import { OutputBundle } from 'rollup';
import { OutputChunk } from 'rollup';
import { PartialResolvedId } from 'rollup';
import { Plugin as Plugin_2 } from 'rollup';
import { PluginContext } from 'rollup';
import { PluginHooks } from 'rollup';
import * as Postcss from 'postcss';
import { RequestOptions } from 'http';
import { RequestOptions as RequestOptions_2 } from 'https';
import { ResolveIdResult } from 'rollup';
import { RollupOptions } from 'rollup';
import { RollupOutput } from 'rollup';
import { RollupWatcher } from 'rollup';
import { Server } from 'http';
import { ServerResponse } from 'http';
import { SourceDescription } from 'rollup';
import { SourceMap } from 'rollup';
import * as stream from 'stream';
import { TransformOptions as TransformOptions_2 } from 'esbuild';
import { TransformPluginContext } from 'rollup';
import { TransformResult as TransformResult_2 } from 'rollup';
import { TransformResult as TransformResult_3 } from 'esbuild';
import * as url from 'url';
import { WatcherOptions } from 'rollup';

export declare interface Alias {
  find: string | RegExp
  replacement: string
  /**
   * Instructs the plugin to use an alternative resolving algorithm,
   * rather than the Rollup's resolver.
   * @default null
   */
  customResolver?: ResolverFunction | ResolverObject | null
}

/**
 * Specifies an `Object`, or an `Array` of `Object`,
 * which defines aliases used to replace values in `import` or `require` statements.
 * With either format, the order of the entries is important,
 * in that the first defined rules are applied first.
 *
 * This is passed to \@rollup/plugin-alias as the "entries" field
 * https://github.com/rollup/plugins/tree/master/packages/alias#entries
 */
export declare type AliasOptions = readonly Alias[] | { [find: string]: string }

/**
 * Bundles the app for production.
 * Returns a Promise containing the build result.
 */
export declare function build(inlineConfig?: InlineConfig): Promise<RollupOutput | RollupOutput[] | RollupWatcher>;

export declare interface BuildOptions {
    /**
     * Base public path when served in production.
     * @deprecated `base` is now a root-level config option.
     */
    base?: string;
    /**
     * Compatibility transform target. The transform is performed with esbuild
     * and the lowest supported target is es2015/es6. Note this only handles
     * syntax transformation and does not cover polyfills (except for dynamic
     * import)
     *
     * Default: 'modules' - Similar to `@babel/preset-env`'s targets.esmodules,
     * transpile targeting browsers that natively support dynamic es module imports.
     * https://caniuse.com/es6-module-dynamic-import
     *
     * Another special value is 'esnext' - which only performs minimal transpiling
     * (for minification compat) and assumes native dynamic imports support.
     *
     * For custom targets, see https://esbuild.github.io/api/#target and
     * https://esbuild.github.io/content-types/#javascript for more details.
     */
    target?: 'modules' | TransformOptions_2['target'] | false;
    /**
     * whether to inject dynamic import polyfill.
     * Note: does not apply to library mode.
     * @deprecated the dynamic import polyfill has been removed
     */
    polyfillDynamicImport?: boolean;
    /**
     * Directory relative from `root` where build output will be placed. If the
     * directory exists, it will be removed before the build.
     * @default 'dist'
     */
    outDir?: string;
    /**
     * Directory relative from `outDir` where the built js/css/image assets will
     * be placed.
     * @default 'assets'
     */
    assetsDir?: string;
    /**
     * Static asset files smaller than this number (in bytes) will be inlined as
     * base64 strings. Default limit is `4096` (4kb). Set to `0` to disable.
     * @default 4096
     */
    assetsInlineLimit?: number;
    /**
     * Whether to code-split CSS. When enabled, CSS in async chunks will be
     * inlined as strings in the chunk and inserted via dynamically created
     * style tags when the chunk is loaded.
     * @default true
     */
    cssCodeSplit?: boolean;
    /**
     * Whether to generate sourcemap
     * @default false
     */
    sourcemap?: boolean | 'inline';
    /**
     * Set to `false` to disable minification, or specify the minifier to use.
     * Available options are 'terser' or 'esbuild'.
     * @default 'terser'
     */
    minify?: boolean | 'terser' | 'esbuild';
    /**
     * Options for terser
     * https://terser.org/docs/api-reference#minify-options
     */
    terserOptions?: Terser.MinifyOptions;
    /**
     * Options for clean-css
     * https://github.com/jakubpawlowicz/clean-css#constructor-options
     */
    cleanCssOptions?: CleanCSS.Options;
    /**
     * Will be merged with internal rollup options.
     * https://rollupjs.org/guide/en/#big-list-of-options
     */
    rollupOptions?: RollupOptions;
    /**
     * Options to pass on to `@rollup/plugin-commonjs`
     */
    commonjsOptions?: RollupCommonJSOptions;
    /**
     * Whether to write bundle to disk
     * @default true
     */
    write?: boolean;
    /**
     * Empty outDir on write.
     * @default true when outDir is a sub directory of project root
     */
    emptyOutDir?: boolean | null;
    /**
     * Whether to emit a manifest.json under assets dir to map hash-less filenames
     * to their hashed versions. Useful when you want to generate your own HTML
     * instead of using the one generated by Vite.
     *
     * Example:
     *
     * ```json
     * {
     *   "main.js": {
     *     "file": "main.68fe3fad.js",
     *     "css": "main.e6b63442.css",
     *     "imports": [...],
     *     "dynamicImports": [...]
     *   }
     * }
     * ```
     * @default false
     */
    manifest?: boolean;
    /**
     * Build in library mode. The value should be the global name of the lib in
     * UMD mode. This will produce esm + cjs + umd bundle formats with default
     * configurations that are suitable for distributing libraries.
     */
    lib?: LibraryOptions | false;
    /**
     * Produce SSR oriented build. Note this requires specifying SSR entry via
     * `rollupOptions.input`.
     */
    ssr?: boolean | string;
    /**
     * Generate SSR manifest for determining style links and asset preload
     * directives in production.
     */
    ssrManifest?: boolean;
    /**
     * Set to false to disable brotli compressed size reporting for build.
     * Can slightly improve build speed.
     */
    brotliSize?: boolean;
    /**
     * Adjust chunk size warning limit (in kbs).
     * @default 500
     */
    chunkSizeWarningLimit?: number;
    /**
     * Rollup watch options
     * https://rollupjs.org/guide/en/#watchoptions
     */
    watch?: WatcherOptions | null;
}

export declare namespace CleanCSS {
  /**
   * Shared options passed when initializing a new instance of CleanCSS that returns either a promise or output
   */
  export interface OptionsBase {
    /**
     * Controls compatibility mode used; defaults to ie10+ using `'*'`.
     *  Compatibility hash exposes the following properties: `colors`, `properties`, `selectors`, and `units`
     */
    compatibility?: '*' | 'ie9' | 'ie8' | 'ie7' | CompatibilityOptions

    /**
     * Controls a function for handling remote requests; Defaults to the build in `loadRemoteResource` function
     */
    fetch?: (
      uri: string,
      inlineRequest: RequestOptions | RequestOptions_2,
      inlineTimeout: number,
      done: (message: string | number, body: string) => void
    ) => void

    /**
     * Controls output CSS formatting; defaults to `false`.
     *  Format hash exposes the following properties: `breaks`, `breakWith`, `indentBy`, `indentWith`, `spaces`, and `wrapAt`.
     */
    format?: 'beautify' | 'keep-breaks' | FormatOptions | false

    /**
     * inline option whitelists which @import rules will be processed.  Defaults to `'local'`
     * Accepts the following values:
     *  'local': enables local inlining;
     *  'remote': enables remote inlining;
     *  'none': disables all inlining;
     *  'all': enables all inlining, same as ['local', 'remote'];
     *  '[uri]': enables remote inlining from the specified uri;
     *  '![url]': disables remote inlining from the specified uri;
     */
    inline?: ReadonlyArray<string> | false

    /**
     * Controls extra options for inlining remote @import rules
     */
    inlineRequest?: RequestOptions | RequestOptions_2

    /**
     * Controls number of milliseconds after which inlining a remote @import fails; defaults to `5000`;
     */
    inlineTimeout?: number

    /**
     * Controls optimization level used; defaults to `1`.
     * Level hash exposes `1`, and `2`.
     */
    level?: 0 | 1 | 2 | OptimizationsOptions

    /**
     * Controls URL rebasing; defaults to `true`;
     */
    rebase?: boolean

    /**
     * controls a directory to which all URLs are rebased, most likely the directory under which the output file
     * will live; defaults to the current directory;
     */
    rebaseTo?: string

    /**
     *  Controls whether an output source map is built; defaults to `false`
     */
    sourceMap?: boolean

    /**
     *  Controls embedding sources inside a source map's `sourcesContent` field; defaults to `false`
     */
    sourceMapInlineSources?: boolean
  }

  /**
   * Fine grained configuration for compatibility option
   */
  export interface CompatibilityOptions {
    /**
     * A hash of compatibility options related to color
     */
    colors?: {
      /**
       * Controls `rgba()` / `hsla()` color support; defaults to `true`
       */
      opacity?: boolean
    }
    /**
     * A hash of properties that can be set with compatibility
     */
    properties?: {
      /**
       * Controls background-clip merging into shorthand; defaults to `true`
       */
      backgroundClipMerging?: boolean

      /**
       * Controls background-origin merging into shorthand; defaults to `true`
       */
      backgroundOriginMerging?: boolean

      /**
       * Controls background-size merging into shorthand; defaults to `true`
       */
      backgroundSizeMerging?: boolean

      /**
       * controls color optimizations; defaults to `true`
       */
      colors?: boolean

      /**
       * Controls keeping IE bang hack; defaults to `false`
       */
      ieBangHack?: boolean

      /**
       * Controls keeping IE `filter` / `-ms-filter`; defaults to `false`
       */
      ieFilters?: boolean

      /**
       * Controls keeping IE prefix hack; defaults to `false`
       */
      iePrefixHack?: boolean

      /**
       * Controls keeping IE suffix hack; defaults to `false`
       */
      ieSuffixHack?: boolean

      /**
       * Controls property merging based on understandably; defaults to `true`
       */
      merging?: boolean

      /**
       * Controls shortening pixel units into `pc`, `pt`, or `in` units; defaults to `false`
       */
      shorterLengthUnits?: false

      /**
       * Controls keeping space after closing brace - `url() no-repeat` into `url()no-repeat`; defaults to `true`
       */
      spaceAfterClosingBrace?: true

      /**
       * Controls keeping quoting inside `url()`; defaults to `false`
       */
      urlQuotes?: boolean

      /**
       * Controls removal of units `0` value; defaults to `true`
       */
      zeroUnits?: boolean
    }
    /**
     * A hash of options related to compatibility of selectors
     */
    selectors?: {
      /**
       * Controls extra space before `nav` element; defaults to `false`
       */
      adjacentSpace?: boolean

      /**
       * Controls removal of IE7 selector hacks, e.g. `*+html...`; defaults to `true`
       */
      ie7Hack?: boolean

      /**
       * Controls a whitelist of mergeable pseudo classes; defaults to `[':active', ...]`
       */
      mergeablePseudoClasses?: ReadonlyArray<string>

      /**
       * Controls a whitelist of mergeable pseudo elements; defaults to `['::after', ...]`
       */
      mergeablePseudoElements: ReadonlyArray<string>

      /**
       * Controls maximum number of selectors in a single rule (since 4.1.0); defaults to `8191`
       */
      mergeLimit: number

      /**
       * Controls merging of rules with multiple pseudo classes / elements (since 4.1.0); defaults to `true`
       */
      multiplePseudoMerging: boolean
    }
    /**
     * A hash of options related to comparability of supported units
     */
    units?: {
      /**
       * Controls treating `ch` as a supported unit; defaults to `true`
       */
      ch?: boolean

      /**
       * Controls treating `in` as a supported unit; defaults to `true`
       */
      in?: boolean

      /**
       * Controls treating `pc` as a supported unit; defaults to `true`
       */
      pc?: boolean

      /**
       * Controls treating `pt` as a supported unit; defaults to `true`
       */
      pt?: boolean

      /**
       * Controls treating `rem` as a supported unit; defaults to `true`
       */
      rem?: boolean

      /**
       * Controls treating `vh` as a supported unit; defaults to `true`
       */
      vh?: boolean

      /**
       * Controls treating `vm` as a supported unit; defaults to `true`
       */
      vm?: boolean

      /**
       * Controls treating `vmax` as a supported unit; defaults to `true`
       */
      vmax?: boolean

      /**
       * Controls treating `vmin` as a supported unit; defaults to `true`
       */
      vmin?: boolean
    }
  }

  /**
   * Fine grained options for configuring the CSS formatting
   */
  export interface FormatOptions {
    /**
     *  Controls where to insert breaks
     */
    breaks?: {
      /**
       * Controls if a line break comes after an at-rule; e.g. `@charset`; defaults to `false`
       */
      afterAtRule?: boolean

      /**
       * Controls if a line break comes after a block begins; e.g. `@media`; defaults to `false`
       */
      afterBlockBegins?: boolean

      /**
       * Controls if a line break comes after a block ends, defaults to `false`
       */
      afterBlockEnds?: boolean

      /**
       * Controls if a line break comes after a comment; defaults to `false`
       */
      afterComment?: boolean

      /**
       * Controls if a line break comes after a property; defaults to `false`
       */
      afterProperty?: boolean

      /**
       * Controls if a line break comes after a rule begins; defaults to `false`
       */
      afterRuleBegins?: boolean

      /**
       * Controls if a line break comes after a rule ends; defaults to `false`
       */
      afterRuleEnds?: boolean

      /**
       * Controls if a line break comes before a block ends; defaults to `false`
       */
      beforeBlockEnds?: boolean

      /**
       * Controls if a line break comes between selectors; defaults to `false`
       */
      betweenSelectors?: boolean
    }
    /**
     * Controls the new line character, can be `'\r\n'` or `'\n'`(aliased as `'windows'` and `'unix'`
     * or `'crlf'` and `'lf'`); defaults to system one, so former on Windows and latter on Unix
     */
    breakWith?: string

    /**
     * Controls number of characters to indent with; defaults to `0`
     */
    indentBy?: number

    /**
     * Controls a character to indent with, can be `'space'` or `'tab'`; defaults to `'space'`
     */
    indentWith?: 'space' | 'tab'

    /**
     * Controls where to insert spaces
     */
    spaces?: {
      /**
       * Controls if spaces come around selector relations; e.g. `div > a`; defaults to `false`
       */
      aroundSelectorRelation?: boolean

      /**
       * Controls if a space comes before a block begins; e.g. `.block {`; defaults to `false`
       */
      beforeBlockBegins?: boolean

      /**
       * Controls if a space comes before a value; e.g. `width: 1rem`; defaults to `false`
       */
      beforeValue?: boolean
    }
    /**
     * Controls maximum line length; defaults to `false`
     */
    wrapAt?: false | number

    /**
     * Controls removing trailing semicolons in rule; defaults to `false` - means remove
     */
    semicolonAfterLastProperty?: boolean
  }

  /**
   * Fine grained options for configuring optimizations
   */
  export interface OptimizationsOptions {
    1?: {
      /**
       * Sets all optimizations at this level unless otherwise specified
       */
      all?: boolean

      /**
       * Controls `@charset` moving to the front of a stylesheet; defaults to `true`
       */
      cleanupCharsets?: boolean

      /**
       * Controls URL normalization; defaults to `true`
       */
      normalizeUrls?: boolean

      /**
       * Controls `background` property optimizations; defaults to `true`
       */
      optimizeBackground?: boolean

      /**
       * Controls `border-radius` property optimizations; defaults to `true`
       */
      optimizeBorderRadius?: boolean

      /**
       * Controls `filter` property optimizations; defaults to `true`
       */
      optimizeFilter?: boolean

      /**
       * Controls `font` property optimizations; defaults to `true`
       */
      optimizeFont?: boolean

      /**
       * Controls `font-weight` property optimizations; defaults to `true`
       */
      optimizeFontWeight?: boolean

      /**
       * Controls `outline` property optimizations; defaults to `true`
       */
      optimizeOutline?: boolean

      /**
       * Controls removing empty rules and nested blocks; defaults to `true`
       */
      removeEmpty?: boolean

      /**
       * Controls removing negative paddings; defaults to `true`
       */
      removeNegativePaddings?: boolean

      /**
       * Controls removing quotes when unnecessary; defaults to `true`
       */
      removeQuotes?: boolean

      /**
       * Controls removing unused whitespace; defaults to `true`
       */
      removeWhitespace?: boolean

      /**
       * Contols removing redundant zeros; defaults to `true`
       */
      replaceMultipleZeros?: boolean

      /**
       * Controls replacing time units with shorter values; defaults to `true`
       */
      replaceTimeUnits?: boolean

      /**
       * Controls replacing zero values with units; defaults to `true`
       */
      replaceZeroUnits?: boolean

      /**
       * Rounds pixel values to `N` decimal places; `false` disables rounding; defaults to `false`
       */
      roundingPrecision?: boolean

      /**
       * denotes selector sorting method; can be `'natural'` or `'standard'`, `'none'`, or false (the last two
       * since 4.1.0); defaults to `'standard'`
       */
      selectorsSortingMethod?: 'standard' | 'natural' | 'none'

      /**
       * denotes a number of /*! ... * / comments preserved; defaults to `all`
       */
      specialComments?: 'all' | '1' | 1 | '0' | 0

      /**
       * Controls at-rules (e.g. `@charset`, `@import`) optimizing; defaults to `true`
       */
      tidyAtRules?: boolean

      /**
       * Controls block scopes (e.g. `@media`) optimizing; defaults to `true`
       */
      tidyBlockScopes?: boolean

      /**
       * Controls selectors optimizing; defaults to `true`
       */
      tidySelectors?: boolean

      /**
       * Defines a callback for fine-grained property optimization; defaults to no-op
       */
      transform?: (
        propertyName: string,
        propertyValue: string,
        selector?: string
      ) => string
    }
    2?: {
      /**
       * Sets all optimizations at this level unless otherwise specified
       */
      all?: boolean

      /**
       * Controls adjacent rules merging; defaults to true
       */
      mergeAdjacentRules?: boolean

      /**
       * Controls merging properties into shorthands; defaults to true
       */
      mergeIntoShorthands?: boolean

      /**
       * Controls `@media` merging; defaults to true
       */
      mergeMedia?: boolean

      /**
       * Controls non-adjacent rule merging; defaults to true
       */
      mergeNonAdjacentRules?: boolean

      /**
       * Controls semantic merging; defaults to false
       */
      mergeSemantically?: boolean

      /**
       * Controls property overriding based on understandably; defaults to true
       */
      overrideProperties?: boolean

      /**
       * Controls removing empty rules and nested blocks; defaults to `true`
       */
      removeEmpty?: boolean

      /**
       * Controls non-adjacent rule reducing; defaults to true
       */
      reduceNonAdjacentRules?: boolean

      /**
       * Controls duplicate `@font-face` removing; defaults to true
       */
      removeDuplicateFontRules?: boolean

      /**
       * Controls duplicate `@media` removing; defaults to true
       */
      removeDuplicateMediaBlocks?: boolean

      /**
       * Controls duplicate rules removing; defaults to true
       */
      removeDuplicateRules?: boolean

      /**
       * Controls unused at rule removing; defaults to false (available since 4.1.0)
       */
      removeUnusedAtRules?: boolean

      /**
       * Controls rule restructuring; defaults to false
       */
      restructureRules?: boolean

      /**
       * Controls which properties won't be optimized, defaults to `[]` which means all will be optimized (since 4.1.0)
       */
      skipProperties?: ReadonlyArray<string>
    }
  }

  /**
   * Options when returning a promise
   */
  export type OptionsPromise = OptionsBase & {
    /**
     * If you prefer clean-css to return a Promise object then you need to explicitly ask for it; defaults to `false`
     */
    returnPromise: true
  }

  /**
   * Options when returning an output
   */
  export type OptionsOutput = OptionsBase & {
    /**
     * If you prefer clean-css to return a Promise object then you need to explicitly ask for it; defaults to `false`
     */
    returnPromise?: false
  }

  /**
   * Discriminant union of both sets of options types.  If you initialize without setting `returnPromise: true`
   *  and want to return a promise, you will need to cast to the correct options type so that TypeScript
   *  knows what the expected return type will be:
   *  `(options = options as CleanCSS.OptionsPromise).returnPromise = true`
   */
  export type Options = OptionsPromise | OptionsOutput
}

export declare interface ConfigEnv {
    command: 'build' | 'serve';
    mode: string;
}

export declare namespace Connect {
  export type ServerHandle = HandleFunction | http.Server

  export class IncomingMessage extends http.IncomingMessage {
    originalUrl?: http.IncomingMessage['url']
  }

  export type NextFunction = (err?: any) => void

  export type SimpleHandleFunction = (
    req: IncomingMessage,
    res: http.ServerResponse
  ) => void
  export type NextHandleFunction = (
    req: IncomingMessage,
    res: http.ServerResponse,
    next: NextFunction
  ) => void
  export type ErrorHandleFunction = (
    err: any,
    req: IncomingMessage,
    res: http.ServerResponse,
    next: NextFunction
  ) => void
  export type HandleFunction =
    | SimpleHandleFunction
    | NextHandleFunction
    | ErrorHandleFunction

  export interface ServerStackItem {
    route: string
    handle: ServerHandle
  }

  export interface Server extends NodeJS.EventEmitter {
    (req: http.IncomingMessage, res: http.ServerResponse, next?: Function): void

    route: string
    stack: ServerStackItem[]

    /**
     * Utilize the given middleware `handle` to the given `route`,
     * defaulting to _/_. This "route" is the mount-point for the
     * middleware, when given a value other than _/_ the middleware
     * is only effective when that segment is present in the request's
     * pathname.
     *
     * For example if we were to mount a function at _/admin_, it would
     * be invoked on _/admin_, and _/admin/settings_, however it would
     * not be invoked for _/_, or _/posts_.
     */
    use(fn: NextHandleFunction): Server
    use(fn: HandleFunction): Server
    use(route: string, fn: NextHandleFunction): Server
    use(route: string, fn: HandleFunction): Server

    /**
     * Handle server requests, punting them down
     * the middleware stack.
     */
    handle(
      req: http.IncomingMessage,
      res: http.ServerResponse,
      next: Function
    ): void

    /**
     * Listen for connections.
     *
     * This method takes the same arguments
     * as node's `http.Server#listen()`.
     *
     * HTTP and HTTPS:
     *
     * If you run your application both as HTTP
     * and HTTPS you may wrap them individually,
     * since your Connect "server" is really just
     * a JavaScript `Function`.
     *
     *      var connect = require('connect')
     *        , http = require('http')
     *        , https = require('https');
     *
     *      var app = connect();
     *
     *      http.createServer(app).listen(80);
     *      https.createServer(options, app).listen(443);
     */
    listen(
      port: number,
      hostname?: string,
      backlog?: number,
      callback?: Function
    ): http.Server
    listen(port: number, hostname?: string, callback?: Function): http.Server
    listen(path: string, callback?: Function): http.Server
    listen(handle: any, listeningListener?: Function): http.Server
  }
}

export declare interface ConnectedPayload {
  type: 'connected'
}

/**
 * https://github.com/expressjs/cors#configuration-options
 */
export declare interface CorsOptions {
    origin?: CorsOrigin | ((origin: string, cb: (err: Error, origins: CorsOrigin) => void) => void);
    methods?: string | string[];
    allowedHeaders?: string | string[];
    exposedHeaders?: string | string[];
    credentials?: boolean;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
}

export declare type CorsOrigin = boolean | string | RegExp | (string | RegExp)[];

export declare function createLogger(level?: LogLevel, options?: LoggerOptions): Logger;

export declare function createServer(inlineConfig?: InlineConfig): Promise<ViteDevServer>;

export declare interface CSSModulesOptions {
    getJSON?: (cssFileName: string, json: Record<string, string>, outputFileName: string) => void;
    scopeBehaviour?: 'global' | 'local';
    globalModulePaths?: string[];
    generateScopedName?: string | ((name: string, filename: string, css: string) => string);
    hashPrefix?: string;
    /**
     * default: null
     */
    localsConvention?: 'camelCase' | 'camelCaseOnly' | 'dashes' | 'dashesOnly' | null;
}

export declare interface CSSOptions {
    /**
     * https://github.com/css-modules/postcss-modules
     */
    modules?: CSSModulesOptions | false;
    preprocessorOptions?: Record<string, any>;
    postcss?: string | (Postcss.ProcessOptions & {
        plugins?: Postcss.Plugin[];
    });
}

export declare interface CustomPayload {
  type: 'custom'
  event: string
  data?: any
}

/**
 * Type helper to make it easier to use vite.config.ts
 * accepts a direct {@link UserConfig} object, or a function that returns it.
 * The function receives a {@link ConfigEnv} object that exposes two properties:
 * `command` (either `'build'` or `'serve'`), and `mode`.
 */
export declare function defineConfig(config: UserConfigExport): UserConfigExport;

export declare interface DepOptimizationMetadata {
    /**
     * The main hash is determined by user config and dependency lockfiles.
     * This is checked on server startup to avoid unnecessary re-bundles.
     */
    hash: string;
    /**
     * The browser hash is determined by the main hash plus additional dependencies
     * discovered at runtime. This is used to invalidate browser requests to
     * optimized deps.
     */
    browserHash: string;
    optimized: Record<string, {
        file: string;
        src: string;
        needsInterop: boolean;
    }>;
}

export declare interface DepOptimizationOptions {
    /**
     * By default, Vite will crawl your index.html to detect dependencies that
     * need to be pre-bundled. If build.rollupOptions.input is specified, Vite
     * will crawl those entry points instead.
     *
     * If neither of these fit your needs, you can specify custom entries using
     * this option - the value should be a fast-glob pattern or array of patterns
     * (https://github.com/mrmlnc/fast-glob#basic-syntax) that are relative from
     * vite project root. This will overwrite default entries inference.
     */
    entries?: string | string[];
    /**
     * Force optimize listed dependencies (must be resolvable import paths,
     * cannot be globs).
     */
    include?: string[];
    /**
     * Do not optimize these dependencies (must be resolvable import paths,
     * cannot be globs).
     */
    exclude?: string[];
    /**
     * Options to pass to esbuild during the dep scanning and optimization
     *
     * Certain options are omitted since changing them would not be compatible
     * with Vite's dep optimization.
     *
     * - `external` is also omitted, use Vite's `optimizeDeps.exclude` option
     * - `plugins` are merged with Vite's dep plugin
     * - `keepNames` takes precedence over the deprecated `optimizeDeps.keepNames`
     *
     * https://esbuild.github.io/api
     */
    esbuildOptions?: Omit<BuildOptions_2, 'bundle' | 'entryPoints' | 'external' | 'write' | 'watch' | 'outdir' | 'outfile' | 'outbase' | 'outExtension' | 'metafile'>;
    /**
     * @deprecated use `esbuildOptions.keepNames`
     */
    keepNames?: boolean;
}

export declare interface ErrorPayload {
  type: 'error'
  err: {
    [name: string]: any
    message: string
    stack: string
    id?: string
    frame?: string
    plugin?: string
    pluginCode?: string
    loc?: {
      file?: string
      line: number
      column: number
    }
  }
}

export declare interface ESBuildOptions extends TransformOptions_2 {
    include?: string | RegExp | string[] | RegExp[];
    exclude?: string | RegExp | string[] | RegExp[];
    jsxInject?: string;
}

export declare type ESBuildTransformResult = Omit<TransformResult_3, 'map'> & {
    map: SourceMap;
};

export declare interface FileSystemServeOptions {
    /**
     * Strictly restrict file accessing outside of allowing paths.
     *
     * Default to false at this moment, will enabled by default in the future versions.
     * @expiremental
     * @default false
     */
    strict?: boolean;
    /**
     * Restrict accessing files outside this directory will result in a 403.
     *
     * Accepts absolute path or a path relative to project root.
     * Will try to search up for workspace root by default.
     *
     * @expiremental
     */
    root?: string;
}

export declare interface FSWatcher extends fs.FSWatcher {
  options: WatchOptions

  /**
   * Constructs a new FSWatcher instance with optional WatchOptions parameter.
   */
  (options?: WatchOptions): void

  /**
   * Add files, directories, or glob patterns for tracking. Takes an array of strings or just one
   * string.
   */
  add(paths: string | ReadonlyArray<string>): void

  /**
   * Stop watching files, directories, or glob patterns. Takes an array of strings or just one
   * string.
   */
  unwatch(paths: string | ReadonlyArray<string>): void

  /**
   * Returns an object representing all the paths on the file system being watched by this
   * `FSWatcher` instance. The object's keys are all the directories (using absolute paths unless
   * the `cwd` option was used), and the values are arrays of the names of the items contained in
   * each directory.
   */
  getWatched(): {
    [directory: string]: string[]
  }

  /**
   * Removes all listeners from watched files.
   */
  close(): Promise<void>

  on(
    event: 'add' | 'addDir' | 'change',
    listener: (path: string, stats?: fs.Stats) => void
  ): this

  on(
    event: 'all',
    listener: (
      eventName: 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir',
      path: string,
      stats?: fs.Stats
    ) => void
  ): this

  /**
   * Error occurred
   */
  on(event: 'error', listener: (error: Error) => void): this

  /**
   * Exposes the native Node `fs.FSWatcher events`
   */
  on(
    event: 'raw',
    listener: (eventName: string, path: string, details: any) => void
  ): this

  /**
   * Fires when the initial scan is complete
   */
  on(event: 'ready', listener: () => void): this

  on(event: 'unlink' | 'unlinkDir', listener: (path: string) => void): this

  on(event: string, listener: (...args: any[]) => void): this
}

export declare interface FullReloadPayload {
  type: 'full-reload'
  path?: string
}

export declare interface HmrContext {
    file: string;
    timestamp: number;
    modules: Array<ModuleNode>;
    read: () => string | Promise<string>;
    server: ViteDevServer;
}

export declare interface HmrOptions {
    protocol?: string;
    host?: string;
    port?: number;
    path?: string;
    timeout?: number;
    overlay?: boolean;
    server?: Server;
}

export declare type HMRPayload =
  | ConnectedPayload
  | UpdatePayload
  | FullReloadPayload
  | CustomPayload
  | ErrorPayload
  | PrunePayload

export declare interface HtmlTagDescriptor {
    tag: string;
    attrs?: Record<string, string | boolean | undefined>;
    children?: string | HtmlTagDescriptor[];
    /**
     * default: 'head-prepend'
     */
    injectTo?: 'head' | 'body' | 'head-prepend' | 'body-prepend';
}

export declare namespace HttpProxy {
  export type ProxyTarget = ProxyTargetUrl | ProxyTargetDetailed

  export type ProxyTargetUrl = string | Partial<url.Url>

  export interface ProxyTargetDetailed {
    host: string
    port: number
    protocol?: string
    hostname?: string
    socketPath?: string
    key?: string
    passphrase?: string
    pfx?: Buffer | string
    cert?: string
    ca?: string
    ciphers?: string
    secureProtocol?: string
  }

  export type ErrorCallback = (
    err: Error,
    req: http.IncomingMessage,
    res: http.ServerResponse,
    target?: ProxyTargetUrl
  ) => void

  export class Server extends events.EventEmitter {
    /**
     * Creates the proxy server with specified options.
     * @param options - Config object passed to the proxy
     */
    constructor(options?: ServerOptions)

    /**
     * Used for proxying regular HTTP(S) requests
     * @param req - Client request.
     * @param res - Client response.
     * @param options - Additionnal options.
     */
    web(
      req: http.IncomingMessage,
      res: http.ServerResponse,
      options?: ServerOptions,
      callback?: ErrorCallback
    ): void

    /**
     * Used for proxying regular HTTP(S) requests
     * @param req - Client request.
     * @param socket - Client socket.
     * @param head - Client head.
     * @param options - Additionnal options.
     */
    ws(
      req: http.IncomingMessage,
      socket: any,
      head: any,
      options?: ServerOptions,
      callback?: ErrorCallback
    ): void

    /**
     * A function that wraps the object in a webserver, for your convenience
     * @param port - Port to listen on
     */
    listen(port: number): Server

    /**
     * A function that closes the inner webserver and stops listening on given port
     */
    close(callback?: () => void): void

    /**
     * Creates the proxy server with specified options.
     * @param options - Config object passed to the proxy
     * @returns Proxy object with handlers for `ws` and `web` requests
     */
    static createProxyServer(options?: ServerOptions): Server

    /**
     * Creates the proxy server with specified options.
     * @param options - Config object passed to the proxy
     * @returns Proxy object with handlers for `ws` and `web` requests
     */
    static createServer(options?: ServerOptions): Server

    /**
     * Creates the proxy server with specified options.
     * @param options - Config object passed to the proxy
     * @returns Proxy object with handlers for `ws` and `web` requests
     */
    static createProxy(options?: ServerOptions): Server

    addListener(event: string, listener: () => void): this
    on(event: string, listener: () => void): this
    on(event: 'error', listener: ErrorCallback): this
    on(
      event: 'start',
      listener: (
        req: http.IncomingMessage,
        res: http.ServerResponse,
        target: ProxyTargetUrl
      ) => void
    ): this
    on(
      event: 'proxyReq',
      listener: (
        proxyReq: http.ClientRequest,
        req: http.IncomingMessage,
        res: http.ServerResponse,
        options: ServerOptions
      ) => void
    ): this
    on(
      event: 'proxyRes',
      listener: (
        proxyRes: http.IncomingMessage,
        req: http.IncomingMessage,
        res: http.ServerResponse
      ) => void
    ): this
    on(
      event: 'proxyReqWs',
      listener: (
        proxyReq: http.ClientRequest,
        req: http.IncomingMessage,
        socket: net.Socket,
        options: ServerOptions,
        head: any
      ) => void
    ): this
    on(
      event: 'econnreset',
      listener: (
        err: Error,
        req: http.IncomingMessage,
        res: http.ServerResponse,
        target: ProxyTargetUrl
      ) => void
    ): this
    on(
      event: 'end',
      listener: (
        req: http.IncomingMessage,
        res: http.ServerResponse,
        proxyRes: http.IncomingMessage
      ) => void
    ): this
    on(
      event: 'close',
      listener: (
        proxyRes: http.IncomingMessage,
        proxySocket: net.Socket,
        proxyHead: any
      ) => void
    ): this

    once(event: string, listener: () => void): this
    removeListener(event: string, listener: () => void): this
    removeAllListeners(event?: string): this
    getMaxListeners(): number
    setMaxListeners(n: number): this
    listeners(event: string): Array<() => void>
    emit(event: string, ...args: any[]): boolean
    listenerCount(type: string): number
  }

  export interface ServerOptions {
    /** URL string to be parsed with the url module. */
    target?: ProxyTarget
    /** URL string to be parsed with the url module. */
    forward?: ProxyTargetUrl
    /** Object to be passed to http(s).request. */
    agent?: any
    /** Object to be passed to https.createServer(). */
    ssl?: any
    /** If you want to proxy websockets. */
    ws?: boolean
    /** Adds x- forward headers. */
    xfwd?: boolean
    /** Verify SSL certificate. */
    secure?: boolean
    /** Explicitly specify if we are proxying to another proxy. */
    toProxy?: boolean
    /** Specify whether you want to prepend the target's path to the proxy path. */
    prependPath?: boolean
    /** Specify whether you want to ignore the proxy path of the incoming request. */
    ignorePath?: boolean
    /** Local interface string to bind for outgoing connections. */
    localAddress?: string
    /** Changes the origin of the host header to the target URL. */
    changeOrigin?: boolean
    /** specify whether you want to keep letter case of response header key */
    preserveHeaderKeyCase?: boolean
    /** Basic authentication i.e. 'user:password' to compute an Authorization header. */
    auth?: string
    /** Rewrites the location hostname on (301 / 302 / 307 / 308) redirects, Default: null. */
    hostRewrite?: string
    /** Rewrites the location host/ port on (301 / 302 / 307 / 308) redirects based on requested host/ port.Default: false. */
    autoRewrite?: boolean
    /** Rewrites the location protocol on (301 / 302 / 307 / 308) redirects to 'http' or 'https'.Default: null. */
    protocolRewrite?: string
    /** rewrites domain of set-cookie headers. */
    cookieDomainRewrite?: false | string | { [oldDomain: string]: string }
    /** rewrites path of set-cookie headers. Default: false */
    cookiePathRewrite?: false | string | { [oldPath: string]: string }
    /** object with extra headers to be added to target requests. */
    headers?: { [header: string]: string }
    /** Timeout (in milliseconds) when proxy receives no response from target. Default: 120000 (2 minutes) */
    proxyTimeout?: number
    /** Timeout (in milliseconds) for incoming requests */
    timeout?: number
    /** Specify whether you want to follow redirects. Default: false */
    followRedirects?: boolean
    /** If set to true, none of the webOutgoing passes are called and it's your responsibility to appropriately return the response by listening and acting on the proxyRes event */
    selfHandleResponse?: boolean
    /** Buffer */
    buffer?: stream.Stream
  }
}

export declare type IndexHtmlTransform = IndexHtmlTransformHook | {
    enforce?: 'pre' | 'post';
    transform: IndexHtmlTransformHook;
};

export declare interface IndexHtmlTransformContext {
    /**
     * public path when served
     */
    path: string;
    /**
     * filename on disk
     */
    filename: string;
    server?: ViteDevServer;
    bundle?: OutputBundle;
    chunk?: OutputChunk;
    originalUrl?: string;
}

export declare type IndexHtmlTransformHook = (html: string, ctx: IndexHtmlTransformContext) => IndexHtmlTransformResult | void | Promise<IndexHtmlTransformResult | void>;

export declare type IndexHtmlTransformResult = string | HtmlTagDescriptor[] | {
    html: string;
    tags: HtmlTagDescriptor[];
};

export declare interface InlineConfig extends UserConfig {
    configFile?: string | false;
    envFile?: false;
}

export declare interface InternalResolveOptions extends ResolveOptions {
    root: string;
    isBuild: boolean;
    isProduction: boolean;
    ssrTarget?: SSRTarget;
    /**
     * src code mode also attempts the following:
     * - resolving /xxx as URLs
     * - resolving bare imports from optimized deps
     */
    asSrc?: boolean;
    tryIndex?: boolean;
    tryPrefix?: string;
    preferRelative?: boolean;
    isRequire?: boolean;
}

export declare interface JsonOptions {
    /**
     * Generate a named export for every property of the JSON object
     * @default true
     */
    namedExports?: boolean;
    /**
     * Generate performant output as JSON.parse("stringified").
     * Enabling this will disable namedExports.
     * @default false
     */
    stringify?: boolean;
}

export declare type LibraryFormats = 'es' | 'cjs' | 'umd' | 'iife';

export declare interface LibraryOptions {
    entry: string;
    name?: string;
    formats?: LibraryFormats[];
    fileName?: string;
}

export declare function loadConfigFromFile(configEnv: ConfigEnv, configFile?: string, configRoot?: string, logLevel?: LogLevel): Promise<{
    path: string;
    config: UserConfig;
    dependencies: string[];
} | null>;

export declare function loadEnv(mode: string, root: string, prefix?: string): Record<string, string>;

export declare interface Logger {
    info(msg: string, options?: LogOptions): void;
    warn(msg: string, options?: LogOptions): void;
    warnOnce(msg: string, options?: LogOptions): void;
    error(msg: string, options?: LogOptions): void;
    clearScreen(type: LogType): void;
    hasWarned: boolean;
}

export declare interface LoggerOptions {
    prefix?: string;
    allowClearScreen?: boolean;
}

export declare type LogLevel = LogType | 'silent';

export declare interface LogOptions {
    clear?: boolean;
    timestamp?: boolean;
}

export declare type LogType = 'error' | 'warn' | 'info';

export declare type Manifest = Record<string, ManifestChunk>;

export declare interface ManifestChunk {
    src?: string;
    file: string;
    css?: string[];
    assets?: string[];
    isEntry?: boolean;
    isDynamicEntry?: boolean;
    imports?: string[];
    dynamicImports?: string[];
}

export declare function mergeConfig(a: Record<string, any>, b: Record<string, any>, isRoot?: boolean): Record<string, any>;

export declare class ModuleGraph {
    urlToModuleMap: Map<string, ModuleNode>;
    idToModuleMap: Map<string, ModuleNode>;
    fileToModulesMap: Map<string, Set<ModuleNode>>;
    container: PluginContainer;
    constructor(container: PluginContainer);
    getModuleByUrl(rawUrl: string): Promise<ModuleNode | undefined>;
    getModuleById(id: string): ModuleNode | undefined;
    getModulesByFile(file: string): Set<ModuleNode> | undefined;
    onFileChange(file: string): void;
    invalidateModule(mod: ModuleNode, seen?: Set<ModuleNode>): void;
    invalidateAll(): void;
    /**
     * Update the module graph based on a module's updated imports information
     * If there are dependencies that no longer have any importers, they are
     * returned as a Set.
     */
    updateModuleInfo(mod: ModuleNode, importedModules: Set<string | ModuleNode>, acceptedModules: Set<string | ModuleNode>, isSelfAccepting: boolean): Promise<Set<ModuleNode> | undefined>;
    ensureEntryFromUrl(rawUrl: string): Promise<ModuleNode>;
    createFileOnlyEntry(file: string): ModuleNode;
    resolveUrl(url: string): Promise<[string, string]>;
}

export declare class ModuleNode {
    /**
     * Public served url path, starts with /
     */
    url: string;
    /**
     * Resolved file system path + query
     */
    id: string | null;
    file: string | null;
    type: 'js' | 'css';
    importers: Set<ModuleNode>;
    importedModules: Set<ModuleNode>;
    acceptedHmrDeps: Set<ModuleNode>;
    isSelfAccepting: boolean;
    transformResult: TransformResult | null;
    ssrTransformResult: TransformResult | null;
    ssrModule: Record<string, any> | null;
    lastHMRTimestamp: number;
    constructor(url: string);
}

export declare function normalizePath(id: string): string;

export declare function optimizeDeps(config: ResolvedConfig, force?: boolean | undefined, asCommand?: boolean, newDeps?: Record<string, string>): Promise<DepOptimizationMetadata | null>;

export declare interface PackageData {
    dir: string;
    hasSideEffects: (id: string) => boolean;
    webResolvedImports: Record<string, string | undefined>;
    nodeResolvedImports: Record<string, string | undefined>;
    setResolvedCache: (key: string, entry: string, targetWeb: boolean) => void;
    getResolvedCache: (key: string, targetWeb: boolean) => string | undefined;
    data: {
        [field: string]: any;
        version: string;
        main: string;
        module: string;
        browser: string | Record<string, string | false>;
        exports: string | Record<string, any> | string[];
        dependencies: Record<string, string>;
    };
}

/**
 * Vite plugins extends the Rollup plugin interface with a few extra
 * vite-specific options. A valid vite plugin is also a valid Rollup plugin.
 * On the contrary, a Rollup plugin may or may NOT be a valid vite universal
 * plugin, since some Rollup features do not make sense in an unbundled
 * dev server context. That said, as long as a rollup plugin doesn't have strong
 * coupling between its bundle phase and output phase hooks then it should
 * just work (that means, most of them).
 *
 * By default, the plugins are run during both serve and build. When a plugin
 * is applied during serve, it will only run **non output plugin hooks** (see
 * rollup type definition of {@link rollup#PluginHooks}). You can think of the
 * dev server as only running `const bundle = rollup.rollup()` but never calling
 * `bundle.generate()`.
 *
 * A plugin that expects to have different behavior depending on serve/build can
 * export a factory function that receives the command being run via options.
 *
 * If a plugin should be applied only for server or build, a function format
 * config file can be used to conditional determine the plugins to use.
 */
export declare interface Plugin extends Plugin_2 {
    /**
     * Enforce plugin invocation tier similar to webpack loaders.
     *
     * Plugin invocation order:
     * - alias resolution
     * - `enforce: 'pre'` plugins
     * - vite core plugins
     * - normal plugins
     * - vite build plugins
     * - `enforce: 'post'` plugins
     * - vite build post plugins
     */
    enforce?: 'pre' | 'post';
    /**
     * Apply the plugin only for serve or for build.
     */
    apply?: 'serve' | 'build';
    /**
     * Modify vite config before it's resolved. The hook can either mutate the
     * passed-in config directly, or return a partial config object that will be
     * deeply merged into existing config.
     *
     * Note: User plugins are resolved before running this hook so injecting other
     * plugins inside  the `config` hook will have no effect.
     */
    config?: (config: UserConfig, env: ConfigEnv) => UserConfig | null | void | Promise<UserConfig | null | void>;
    /**
     * Use this hook to read and store the final resolved vite config.
     */
    configResolved?: (config: ResolvedConfig) => void | Promise<void>;
    /**
     * Configure the vite server. The hook receives the {@link ViteDevServer}
     * instance. This can also be used to store a reference to the server
     * for use in other hooks.
     *
     * The hooks will be called before internal middlewares are applied. A hook
     * can return a post hook that will be called after internal middlewares
     * are applied. Hook can be async functions and will be called in series.
     */
    configureServer?: ServerHook;
    /**
     * Transform index.html.
     * The hook receives the following arguments:
     *
     * - html: string
     * - ctx?: vite.ServerContext (only present during serve)
     * - bundle?: rollup.OutputBundle (only present during build)
     *
     * It can either return a transformed string, or a list of html tag
     * descriptors that will be injected into the <head> or <body>.
     *
     * By default the transform is applied **after** vite's internal html
     * transform. If you need to apply the transform before vite, use an object:
     * `{ enforce: 'pre', transform: hook }`
     */
    transformIndexHtml?: IndexHtmlTransform;
    /**
     * Perform custom handling of HMR updates.
     * The handler receives a context containing changed filename, timestamp, a
     * list of modules affected by the file change, and the dev server instance.
     *
     * - The hook can return a filtered list of modules to narrow down the update.
     *   e.g. for a Vue SFC, we can narrow down the part to update by comparing
     *   the descriptors.
     *
     * - The hook can also return an empty array and then perform custom updates
     *   by sending a custom hmr payload via server.ws.send().
     *
     * - If the hook doesn't return a value, the hmr update will be performed as
     *   normal.
     */
    handleHotUpdate?(ctx: HmrContext): Array<ModuleNode> | void | Promise<Array<ModuleNode> | void>;
    /**
     * extend hooks with ssr flag
     */
    resolveId?(this: PluginContext, source: string, importer: string | undefined, options: {
        custom?: CustomPluginOptions;
    }, ssr?: boolean): Promise<ResolveIdResult> | ResolveIdResult;
    load?(this: PluginContext, id: string, ssr?: boolean): Promise<LoadResult> | LoadResult;
    transform?(this: TransformPluginContext, code: string, id: string, ssr?: boolean): Promise<TransformResult_2> | TransformResult_2;
}

export declare interface PluginContainer {
    options: InputOptions;
    buildStart(options: InputOptions): Promise<void>;
    watchChange(id: string, event?: ChangeEvent): void;
    resolveId(id: string, importer?: string, skip?: Set<Plugin>, ssr?: boolean): Promise<PartialResolvedId | null>;
    transform(code: string, id: string, inMap?: SourceDescription['map'], ssr?: boolean): Promise<SourceDescription | null>;
    load(id: string, ssr?: boolean): Promise<LoadResult | null>;
    close(): Promise<void>;
}

export declare type PluginOption = Plugin | false | null | undefined;

export declare interface ProxyOptions extends HttpProxy.ServerOptions {
    /**
     * rewrite path
     */
    rewrite?: (path: string) => string;
    /**
     * configure the proxy server (e.g. listen to events)
     */
    configure?: (proxy: HttpProxy.Server, options: ProxyOptions) => void;
    /**
     * webpack-dev-server style bypass function
     */
    bypass?: (req: http.IncomingMessage, res: http.ServerResponse, options: ProxyOptions) => void | null | undefined | false | string;
}

export declare interface PrunePayload {
  type: 'prune'
  paths: string[]
}

export declare function resolveConfig(inlineConfig: InlineConfig, command: 'build' | 'serve', defaultMode?: string): Promise<ResolvedConfig>;

export declare type ResolvedBuildOptions = Required<Omit<BuildOptions, 'base' | 'polyfillDynamicImport'>>;

export declare type ResolvedConfig = Readonly<Omit<UserConfig, 'plugins' | 'alias' | 'dedupe' | 'assetsInclude' | 'optimizeDeps'> & {
    configFile: string | undefined;
    configFileDependencies: string[];
    inlineConfig: InlineConfig;
    root: string;
    base: string;
    publicDir: string;
    command: 'build' | 'serve';
    mode: string;
    isProduction: boolean;
    env: Record<string, any>;
    resolve: ResolveOptions & {
        alias: Alias[];
    };
    plugins: readonly Plugin[];
    server: ResolvedServerOptions;
    build: ResolvedBuildOptions;
    assetsInclude: (file: string) => boolean;
    logger: Logger;
    createResolver: (options?: Partial<InternalResolveOptions>) => ResolveFn;
    optimizeDeps: Omit<DepOptimizationOptions, 'keepNames'>;
}>;

export declare interface ResolvedServerOptions extends ServerOptions {
    fsServe: Required<FileSystemServeOptions>;
}

export declare type ResolveFn = (id: string, importer?: string, aliasOnly?: boolean) => Promise<string | undefined>;

export declare interface ResolveOptions {
    mainFields?: string[];
    conditions?: string[];
    extensions?: string[];
    dedupe?: string[];
}

export declare function resolvePackageData(id: string, basedir: string): PackageData | undefined;

export declare function resolvePackageEntry(id: string, { dir, data, setResolvedCache, getResolvedCache }: PackageData, options: InternalResolveOptions, targetWeb: boolean): string | undefined;

export declare type ResolverFunction = PluginHooks['resolveId']

export declare interface ResolverObject {
  buildStart?: PluginHooks['buildStart']
  resolveId: ResolverFunction
}

/**
 * https://github.com/rollup/plugins/blob/master/packages/commonjs/types/index.d.ts
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file at
 * https://github.com/rollup/plugins/blob/master/LICENSE
 */
export declare interface RollupCommonJSOptions {
  /**
   * A minimatch pattern, or array of patterns, which specifies the files in
   * the build the plugin should operate on. By default, all files with
   * extension `".cjs"` or those in `extensions` are included, but you can narrow
   * this list by only including specific files. These files will be analyzed
   * and transpiled if either the analysis does not find ES module specific
   * statements or `transformMixedEsModules` is `true`.
   * @default undefined
   */
  include?: string | RegExp | readonly (string | RegExp)[]
  /**
   * A minimatch pattern, or array of patterns, which specifies the files in
   * the build the plugin should _ignore_. By default, all files with
   * extensions other than those in `extensions` or `".cjs"` are ignored, but you
   * can exclude additional files. See also the `include` option.
   * @default undefined
   */
  exclude?: string | RegExp | readonly (string | RegExp)[]
  /**
   * For extensionless imports, search for extensions other than .js in the
   * order specified. Note that you need to make sure that non-JavaScript files
   * are transpiled by another plugin first.
   * @default [ '.js' ]
   */
  extensions?: ReadonlyArray<string>
  /**
   * If true then uses of `global` won't be dealt with by this plugin
   * @default false
   */
  ignoreGlobal?: boolean
  /**
   * If false, skips source map generation for CommonJS modules. This will improve performance.
   * @default true
   */
  sourceMap?: boolean
  /**
   * Instructs the plugin whether to enable mixed module transformations. This
   * is useful in scenarios with modules that contain a mix of ES `import`
   * statements and CommonJS `require` expressions. Set to `true` if `require`
   * calls should be transformed to imports in mixed modules, or `false` if the
   * `require` expressions should survive the transformation. The latter can be
   * important if the code contains environment detection, or you are coding
   * for an environment with special treatment for `require` calls such as
   * ElectronJS. See also the `ignore` option.
   * @default false
   */
  transformMixedEsModules?: boolean
  /**
   * Sometimes you have to leave require statements unconverted. Pass an array
   * containing the IDs or a `id => boolean` function.
   * @default []
   */
  ignore?: ReadonlyArray<string> | ((id: string) => boolean)
  /**
   * Controls how to render imports from external dependencies. By default,
   * this plugin assumes that all external dependencies are CommonJS. This
   * means they are rendered as default imports to be compatible with e.g.
   * NodeJS where ES modules can only import a default export from a CommonJS
   * dependency.
   *
   * If you set `esmExternals` to `true`, this plugins assumes that all
   * external dependencies are ES modules and respect the
   * `requireReturnsDefault` option. If that option is not set, they will be
   * rendered as namespace imports.
   *
   * You can also supply an array of ids to be treated as ES modules, or a
   * function that will be passed each external id to determine if it is an ES
   * module.
   * @default false
   */
  esmExternals?: boolean | ReadonlyArray<string> | ((id: string) => boolean)
  /**
   * Controls what is returned when requiring an ES module from a CommonJS file.
   * When using the `esmExternals` option, this will also apply to external
   * modules. By default, this plugin will render those imports as namespace
   * imports i.e.
   *
   * ```js
   * // input
   * const foo = require('foo');
   *
   * // output
   * import * as foo from 'foo';
   * ```
   *
   * However there are some situations where this may not be desired.
   * For these situations, you can change Rollup's behaviour either globally or
   * per module. To change it globally, set the `requireReturnsDefault` option
   * to one of the following values:
   *
   * - `false`: This is the default, requiring an ES module returns its
   *   namespace. This is the only option that will also add a marker
   *   `__esModule: true` to the namespace to support interop patterns in
   *   CommonJS modules that are transpiled ES modules.
   * - `"namespace"`: Like `false`, requiring an ES module returns its
   *   namespace, but the plugin does not add the `__esModule` marker and thus
   *   creates more efficient code. For external dependencies when using
   *   `esmExternals: true`, no additional interop code is generated.
   * - `"auto"`: This is complementary to how `output.exports: "auto"` works in
   *   Rollup: If a module has a default export and no named exports, requiring
   *   that module returns the default export. In all other cases, the namespace
   *   is returned. For external dependencies when using `esmExternals: true`, a
   *   corresponding interop helper is added.
   * - `"preferred"`: If a module has a default export, requiring that module
   *   always returns the default export, no matter whether additional named
   *   exports exist. This is similar to how previous versions of this plugin
   *   worked. Again for external dependencies when using `esmExternals: true`,
   *   an interop helper is added.
   * - `true`: This will always try to return the default export on require
   *   without checking if it actually exists. This can throw at build time if
   *   there is no default export. This is how external dependencies are handled
   *   when `esmExternals` is not used. The advantage over the other options is
   *   that, like `false`, this does not add an interop helper for external
   *   dependencies, keeping the code lean.
   *
   * To change this for individual modules, you can supply a function for
   * `requireReturnsDefault` instead. This function will then be called once for
   * each required ES module or external dependency with the corresponding id
   * and allows you to return different values for different modules.
   * @default false
   */
  requireReturnsDefault?:
    | boolean
    | 'auto'
    | 'preferred'
    | 'namespace'
    | ((id: string) => boolean | 'auto' | 'preferred' | 'namespace')
  /**
   * Some modules contain dynamic `require` calls, or require modules that
   * contain circular dependencies, which are not handled well by static
   * imports. Including those modules as `dynamicRequireTargets` will simulate a
   * CommonJS (NodeJS-like)  environment for them with support for dynamic and
   * circular dependencies.
   *
   * Note: In extreme cases, this feature may result in some paths being
   * rendered as absolute in the final bundle. The plugin tries to avoid
   * exposing paths from the local machine, but if you are `dynamicRequirePaths`
   * with paths that are far away from your project's folder, that may require
   * replacing strings like `"/Users/John/Desktop/foo-project/"` -\> `"/"`.
   */
  dynamicRequireTargets?: string | ReadonlyArray<string>
}

export declare function send(req: IncomingMessage, res: ServerResponse, content: string | Buffer, type: string, etag?: string, cacheControl?: string, map?: SourceMap | null): void;

export declare type ServerHook = (server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>;

export declare interface ServerOptions {
    host?: string | boolean;
    port?: number;
    /**
     * Enable TLS + HTTP/2.
     * Note: this downgrades to TLS only when the proxy option is also used.
     */
    https?: boolean | https.ServerOptions;
    /**
     * Open browser window on startup
     */
    open?: boolean | string;
    /**
     * Force dep pre-optimization regardless of whether deps have changed.
     */
    force?: boolean;
    /**
     * Configure HMR-specific options (port, host, path & protocol)
     */
    hmr?: HmrOptions | boolean;
    /**
     * chokidar watch options
     * https://github.com/paulmillr/chokidar#api
     */
    watch?: WatchOptions;
    /**
     * Configure custom proxy rules for the dev server. Expects an object
     * of `{ key: options }` pairs.
     * Uses [`http-proxy`](https://github.com/http-party/node-http-proxy).
     * Full options [here](https://github.com/http-party/node-http-proxy#options).
     *
     * Example `vite.config.js`:
     * ``` js
     * module.exports = {
     *   proxy: {
     *     // string shorthand
     *     '/foo': 'http://localhost:4567/foo',
     *     // with options
     *     '/api': {
     *       target: 'http://jsonplaceholder.typicode.com',
     *       changeOrigin: true,
     *       rewrite: path => path.replace(/^\/api/, '')
     *     }
     *   }
     * }
     * ```
     */
    proxy?: Record<string, string | ProxyOptions>;
    /**
     * Configure CORS for the dev server.
     * Uses https://github.com/expressjs/cors.
     * Set to `true` to allow all methods from any origin, or configure separately
     * using an object.
     */
    cors?: CorsOptions | boolean;
    /**
     * If enabled, vite will exit if specified port is already in use
     */
    strictPort?: boolean;
    /**
     * Create Vite dev server to be used as a middleware in an existing server
     */
    middlewareMode?: boolean;
    /**
     * Prepend this folder to http requests, for use when proxying vite as a subfolder
     * Should start and end with the `/` character
     */
    base?: string;
    /**
     * Options for files served via '/\@fs/'.
     */
    fsServe?: FileSystemServeOptions;
}

export declare function sortUserPlugins(plugins: (Plugin | Plugin[])[] | undefined): [Plugin[], Plugin[], Plugin[]];

export declare interface SSROptions {
    external?: string[];
    noExternal?: string[];
    /**
     * Define the target for the ssr build. The browser field in package.json
     * is ignored for node but used if webworker is the target
     * Default: 'node'
     */
    target?: SSRTarget;
}

export declare type SSRTarget = 'node' | 'webworker';

export declare namespace Terser {
  export type ECMA = 5 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020

  export interface ParseOptions {
    bare_returns?: boolean
    ecma?: ECMA
    html5_comments?: boolean
    shebang?: boolean
  }

  export interface CompressOptions {
    arguments?: boolean
    arrows?: boolean
    booleans_as_integers?: boolean
    booleans?: boolean
    collapse_vars?: boolean
    comparisons?: boolean
    computed_props?: boolean
    conditionals?: boolean
    dead_code?: boolean
    defaults?: boolean
    directives?: boolean
    drop_console?: boolean
    drop_debugger?: boolean
    ecma?: ECMA
    evaluate?: boolean
    expression?: boolean
    global_defs?: object
    hoist_funs?: boolean
    hoist_props?: boolean
    hoist_vars?: boolean
    ie8?: boolean
    if_return?: boolean
    inline?: boolean | InlineFunctions
    join_vars?: boolean
    keep_classnames?: boolean | RegExp
    keep_fargs?: boolean
    keep_fnames?: boolean | RegExp
    keep_infinity?: boolean
    loops?: boolean
    module?: boolean
    negate_iife?: boolean
    passes?: number
    properties?: boolean
    pure_funcs?: string[]
    pure_getters?: boolean | 'strict'
    reduce_funcs?: boolean
    reduce_vars?: boolean
    sequences?: boolean | number
    side_effects?: boolean
    switches?: boolean
    toplevel?: boolean
    top_retain?: null | string | string[] | RegExp
    typeofs?: boolean
    unsafe_arrows?: boolean
    unsafe?: boolean
    unsafe_comps?: boolean
    unsafe_Function?: boolean
    unsafe_math?: boolean
    unsafe_symbols?: boolean
    unsafe_methods?: boolean
    unsafe_proto?: boolean
    unsafe_regexp?: boolean
    unsafe_undefined?: boolean
    unused?: boolean
  }

  export enum InlineFunctions {
    Disabled = 0,
    SimpleFunctions = 1,
    WithArguments = 2,
    WithArgumentsAndVariables = 3
  }

  export interface MangleOptions {
    eval?: boolean
    keep_classnames?: boolean | RegExp
    keep_fnames?: boolean | RegExp
    module?: boolean
    properties?: boolean | ManglePropertiesOptions
    reserved?: string[]
    safari10?: boolean
    toplevel?: boolean
  }

  export interface ManglePropertiesOptions {
    builtins?: boolean
    debug?: boolean
    keep_quoted?: boolean | 'strict'
    regex?: RegExp | string
    reserved?: string[]
  }

  export interface FormatOptions {
    ascii_only?: boolean
    beautify?: boolean
    braces?: boolean
    comments?:
      | boolean
      | 'all'
      | 'some'
      | RegExp
      | ((
          node: any,
          comment: {
            value: string
            type: 'comment1' | 'comment2' | 'comment3' | 'comment4'
            pos: number
            line: number
            col: number
          }
        ) => boolean)
    ecma?: ECMA
    ie8?: boolean
    indent_level?: number
    indent_start?: number
    inline_script?: boolean
    keep_quoted_props?: boolean
    max_line_len?: number | false
    preamble?: string
    preserve_annotations?: boolean
    quote_keys?: boolean
    quote_style?: OutputQuoteStyle
    safari10?: boolean
    semicolons?: boolean
    shebang?: boolean
    shorthand?: boolean
    source_map?: SourceMapOptions
    webkit?: boolean
    width?: number
    wrap_iife?: boolean
    wrap_func_args?: boolean
  }

  export enum OutputQuoteStyle {
    PreferDouble = 0,
    AlwaysSingle = 1,
    AlwaysDouble = 2,
    AlwaysOriginal = 3
  }

  export interface MinifyOptions {
    compress?: boolean | CompressOptions
    ecma?: ECMA
    ie8?: boolean
    keep_classnames?: boolean | RegExp
    keep_fnames?: boolean | RegExp
    mangle?: boolean | MangleOptions
    module?: boolean
    nameCache?: object
    format?: FormatOptions
    /** @deprecated use format instead */
    output?: FormatOptions
    parse?: ParseOptions
    safari10?: boolean
    sourceMap?: boolean | SourceMapOptions
    toplevel?: boolean
  }

  export interface MinifyOutput {
    code?: string
    map?: object | string
  }

  export interface SourceMapOptions {
    /** Source map object, 'inline' or source map file content */
    content?: object | string
    includeSources?: boolean
    filename?: string
    root?: string
    url?: string | 'inline'
  }
}

export declare interface TransformOptions {
    ssr?: boolean;
    html?: boolean;
}

export declare interface TransformResult {
    code: string;
    map: SourceMap | null;
    etag?: string;
    deps?: string[];
}

export declare interface Update {
  type: 'js-update' | 'css-update'
  path: string
  acceptedPath: string
  timestamp: number
}

export declare interface UpdatePayload {
  type: 'update'
  updates: Update[]
}

export declare interface UserConfig {
    /**
     * Project root directory. Can be an absolute path, or a path relative from
     * the location of the config file itself.
     * @default process.cwd()
     */
    root?: string;
    /**
     * Base public path when served in development or production.
     * @default '/'
     */
    base?: string;
    /**
     * Directory to serve as plain static assets. Files in this directory are
     * served and copied to build dist dir as-is without transform. The value
     * can be either an absolute file system path or a path relative to <root>.
     *
     * Set to `false` or an empty string to disable copied static assets to build dist dir.
     * @default 'public'
     */
    publicDir?: string | false;
    /**
     * Directory to save cache files. Files in this directory are pre-bundled
     * deps or some other cache files that generated by vite, which can improve
     * the performance. You can use `--force` flag or manually delete the directory
     * to regenerate the cache files. The value can be either an absolute file
     * system path or a path relative to <root>.
     * @default 'node_modules/.vite'
     */
    cacheDir?: string;
    /**
     * Explicitly set a mode to run in. This will override the default mode for
     * each command, and can be overridden by the command line --mode option.
     */
    mode?: string;
    /**
     * Define global variable replacements.
     * Entries will be defined on `window` during dev and replaced during build.
     */
    define?: Record<string, any>;
    /**
     * Array of vite plugins to use.
     */
    plugins?: (PluginOption | PluginOption[])[];
    /**
     * Configure resolver
     */
    resolve?: ResolveOptions & {
        alias?: AliasOptions;
    };
    /**
     * CSS related options (preprocessors and CSS modules)
     */
    css?: CSSOptions;
    /**
     * JSON loading options
     */
    json?: JsonOptions;
    /**
     * Transform options to pass to esbuild.
     * Or set to `false` to disable esbuild.
     */
    esbuild?: ESBuildOptions | false;
    /**
     * Specify additional files to be treated as static assets.
     */
    assetsInclude?: string | RegExp | (string | RegExp)[];
    /**
     * Server specific options, e.g. host, port, https...
     */
    server?: ServerOptions;
    /**
     * Build specific options
     */
    build?: BuildOptions;
    /**
     * Dep optimization options
     */
    optimizeDeps?: DepOptimizationOptions;
    /* Excluded from this release type: ssr */
    /**
     * Log level.
     * Default: 'info'
     */
    logLevel?: LogLevel;
    /**
     * Default: true
     */
    clearScreen?: boolean;
    /**
     * Import aliases
     * @deprecated use `resolve.alias` instead
     */
    alias?: AliasOptions;
    /**
     * Force Vite to always resolve listed dependencies to the same copy (from
     * project root).
     * @deprecated use `resolve.dedupe` instead
     */
    dedupe?: string[];
}

export declare type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFn;

export declare type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;

export declare interface ViteDevServer {
    /**
     * The resolved vite config object
     */
    config: ResolvedConfig;
    /**
     * A connect app instance.
     * - Can be used to attach custom middlewares to the dev server.
     * - Can also be used as the handler function of a custom http server
     *   or as a middleware in any connect-style Node.js frameworks
     *
     * https://github.com/senchalabs/connect#use-middleware
     */
    middlewares: Connect.Server;
    /**
     * @deprecated use `server.middlewares` instead
     */
    app: Connect.Server;
    /**
     * native Node http server instance
     * will be null in middleware mode
     */
    httpServer: http.Server | null;
    /**
     * chokidar watcher instance
     * https://github.com/paulmillr/chokidar#api
     */
    watcher: FSWatcher;
    /**
     * web socket server with `send(payload)` method
     */
    ws: WebSocketServer;
    /**
     * Rollup plugin container that can run plugin hooks on a given file
     */
    pluginContainer: PluginContainer;
    /**
     * Module graph that tracks the import relationships, url to file mapping
     * and hmr state.
     */
    moduleGraph: ModuleGraph;
    /**
     * Programmatically resolve, load and transform a URL and get the result
     * without going through the http request pipeline.
     */
    transformRequest(url: string, options?: TransformOptions): Promise<TransformResult_2 | null>;
    /**
     * Apply vite built-in HTML transforms and any plugin HTML transforms.
     */
    transformIndexHtml(url: string, html: string, originalUrl?: string): Promise<string>;
    /**
     * Util for transforming a file with esbuild.
     * Can be useful for certain plugins.
     */
    transformWithEsbuild(code: string, filename: string, options?: TransformOptions_2, inMap?: object): Promise<ESBuildTransformResult>;
    /**
     * Load a given URL as an instantiated module for SSR.
     */
    ssrLoadModule(url: string): Promise<Record<string, any>>;
    /**
     * Fix ssr error stacktrace
     */
    ssrFixStacktrace(e: Error): void;
    /**
     * Start the server.
     */
    listen(port?: number, isRestart?: boolean): Promise<ViteDevServer>;
    /**
     * Stop the server.
     */
    close(): Promise<void>;
    /* Excluded from this release type: _optimizeDepsMetadata */
    /* Excluded from this release type: _ssrExternals */
    /* Excluded from this release type: _globImporters */
    /* Excluded from this release type: _isRunningOptimizer */
    /* Excluded from this release type: _registerMissingImport */
    /* Excluded from this release type: _pendingReload */
}

export declare interface WatchOptions {
  /**
   * Indicates whether the process should continue to run as long as files are being watched. If
   * set to `false` when using `fsevents` to watch, no more events will be emitted after `ready`,
   * even if the process continues to run.
   */
  persistent?: boolean

  /**
   * ([anymatch](https://github.com/micromatch/anymatch)-compatible definition) Defines files/paths to
   * be ignored. The whole relative or absolute path is tested, not just filename. If a function
   * with two arguments is provided, it gets called twice per path - once with a single argument
   * (the path), second time with two arguments (the path and the
   * [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object of that path).
   */
  ignored?: any

  /**
   * If set to `false` then `add`/`addDir` events are also emitted for matching paths while
   * instantiating the watching as chokidar discovers these file paths (before the `ready` event).
   */
  ignoreInitial?: boolean

  /**
   * When `false`, only the symlinks themselves will be watched for changes instead of following
   * the link references and bubbling events through the link's path.
   */
  followSymlinks?: boolean

  /**
   * The base directory from which watch `paths` are to be derived. Paths emitted with events will
   * be relative to this.
   */
  cwd?: string

  /**
   *  If set to true then the strings passed to .watch() and .add() are treated as literal path
   *  names, even if they look like globs. Default: false.
   */
  disableGlobbing?: boolean

  /**
   * Whether to use fs.watchFile (backed by polling), or fs.watch. If polling leads to high CPU
   * utilization, consider setting this to `false`. It is typically necessary to **set this to
   * `true` to successfully watch files over a network**, and it may be necessary to successfully
   * watch files in other non-standard situations. Setting to `true` explicitly on OS X overrides
   * the `useFsEvents` default.
   */
  usePolling?: boolean

  /**
   * Whether to use the `fsevents` watching interface if available. When set to `true` explicitly
   * and `fsevents` is available this supersedes the `usePolling` setting. When set to `false` on
   * OS X, `usePolling: true` becomes the default.
   */
  useFsEvents?: boolean

  /**
   * If relying upon the [`fs.Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) object that
   * may get passed with `add`, `addDir`, and `change` events, set this to `true` to ensure it is
   * provided even in cases where it wasn't already available from the underlying watch events.
   */
  alwaysStat?: boolean

  /**
   * If set, limits how many levels of subdirectories will be traversed.
   */
  depth?: number

  /**
   * Interval of file system polling.
   */
  interval?: number

  /**
   * Interval of file system polling for binary files. ([see list of binary extensions](https://gi
   * thub.com/sindresorhus/binary-extensions/blob/master/binary-extensions.json))
   */
  binaryInterval?: number

  /**
   *  Indicates whether to watch files that don't have read permissions if possible. If watching
   *  fails due to `EPERM` or `EACCES` with this set to `true`, the errors will be suppressed
   *  silently.
   */
  ignorePermissionErrors?: boolean

  /**
   * `true` if `useFsEvents` and `usePolling` are `false`). Automatically filters out artifacts
   * that occur when using editors that use "atomic writes" instead of writing directly to the
   * source file. If a file is re-added within 100 ms of being deleted, Chokidar emits a `change`
   * event rather than `unlink` then `add`. If the default of 100 ms does not work well for you,
   * you can override it by setting `atomic` to a custom value, in milliseconds.
   */
  atomic?: boolean | number

  /**
   * can be set to an object in order to adjust timing params:
   */
  awaitWriteFinish?:
    | {
        /**
         * Amount of time in milliseconds for a file size to remain constant before emitting its event.
         */
        stabilityThreshold?: number

        /**
         * File size polling interval.
         */
        pollInterval?: number
      }
    | boolean
}

export declare interface WebSocketServer {
    send(payload: HMRPayload): void;
    close(): Promise<void>;
}

export { }
