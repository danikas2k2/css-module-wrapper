import { merge } from 'lodash';
import path from 'path';
import type { IUnionFs } from 'unionfs';
import type { Compiler, Configuration, Stats } from 'webpack';
import webpack from 'webpack';

let compiler: Compiler;

export default async (
    config: Configuration = {},
    loaderOptions = {},
    webpackOptions = {},
    incremental = false,
    fs?: IUnionFs
): Promise<Stats | undefined> => {
    if (!compiler || !incremental) {
        compiler = webpack(
            merge(
                {
                    context: __dirname,
                    output: {
                        path: path.resolve(__dirname),
                        filename: '[name].js',
                    },
                    cache: true,
                    module: {
                        rules: [
                            {
                                test: /\.css/,
                                exclude: /node_modules/,
                                use: [
                                    'style-loader',
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            modules: {
                                                mode: 'local',
                                                localIdentName:
                                                    '[path][name]__[local]',
                                            },
                                        },
                                    },
                                ],
                            },
                            {
                                test: /\.[jt]sx?$/,
                                exclude: /node_modules/,
                                use: [
                                    {
                                        loader: 'esbuild-loader',
                                        options: {
                                            target: 'esnext',
                                        },
                                    },
                                    {
                                        loader: path.resolve(
                                            __dirname,
                                            '../../src/loader.ts'
                                        ),
                                        options: loaderOptions,
                                    },
                                ],
                            },
                        ],
                    },
                    ...webpackOptions,
                } as Configuration,
                config
            )
        );

        if (fs) {
            compiler.inputFileSystem = fs;
            compiler.inputFileSystem.join = path.join.bind(path);
            compiler.outputFileSystem = fs;
            compiler.outputFileSystem.join = path.join.bind(path);
        }
    }

    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) reject(err);
            if (stats?.hasErrors()) reject(stats.toJson().errors);
            resolve(stats);
        });
    });
};
