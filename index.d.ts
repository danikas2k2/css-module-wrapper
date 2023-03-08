declare module "loader" {
    import type { RawLoaderDefinitionFunction } from 'webpack';
    interface LoaderOptions {
        classNames?: boolean;
    }
    const Loader: RawLoaderDefinitionFunction<LoaderOptions>;
    export default Loader;
}
