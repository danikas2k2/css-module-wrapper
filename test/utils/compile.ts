import type { Configuration } from 'webpack';
import compiler from './compiler';
import { ufs } from './ufs';

export async function compile(
    config: Configuration = {},
    loaderOptions = {},
    webpackOptions = {},
    incremental = false
): Promise<string[]> {
    const stats = await compiler(
        config,
        loaderOptions,
        webpackOptions,
        incremental,
        ufs
    );
    const json = stats?.toJson({ source: true });
    return getModuleSources(json?.modules);
}

function getModuleSources(modules?: StatsModule[]) {
    return modules
        ?.filter((m) => m?.name?.includes('.tsx'))
        ?.flatMap((m) => {
            if (m?.source) {
                return m?.source?.toString();
            }
            return getModuleSources(m?.modules);
        });
}
