declare module "loader" {
    import type { RawLoaderDefinitionFunction } from 'webpack';
    interface LoaderOptions {
        classNames?: boolean;
    }
    const WebpackCssModuleWrapper: RawLoaderDefinitionFunction<LoaderOptions>;
    export default WebpackCssModuleWrapper;
}
