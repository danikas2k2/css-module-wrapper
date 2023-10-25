import type { RawLoaderDefinitionFunction } from 'webpack';

interface LoaderOptions {
    classNames?: boolean;
}

const WebpackCssModuleWrapper: RawLoaderDefinitionFunction<LoaderOptions> =
    function (content: string | Buffer): Buffer {
        const { classNames = true } = this.getOptions() ?? {};

        const bindStyles: string[] = [];
        let result = content
            .toString()
            .replace(
                /\bimport\s+('[^']+\.(?:c|pc|le|s[ac])ss'|"[^"]+\.(?:c|pc|le|s[ac])ss")\s*;/gm,
                (found, path) => {
                    const name = path.replace(/\W/g, '_');
                    bindStyles.push(name);
                    return `import ${name} from ${path};`;
                }
            );
        if (!bindStyles.length) {
            // no styles imported, do nothing
            return Buffer.from(content);
        }

        let fnClassNames: string | undefined;
        let fnClassNamesBind: string | undefined;
        if (classNames) {
            result = result.replace(
                /import\s+(\w+)\s+from\s+['"]classnames['"]\s*;/,
                (found, name) => {
                    fnClassNames = name;
                    fnClassNamesBind = `${fnClassNames}__bind`;
                    return `import ${fnClassNamesBind} from 'classnames/bind.js';`;
                }
            );
        }

        if (!classNames) {
            return Buffer.from(
                result.replace(
                    /\bclassName\s*=\s*(['"])([^'"]+)\1/g,
                    (found, quote, classNames) => {
                        return `className={[${classNames
                            .split(/\s+/)
                            .map((s: string) =>
                                bindStyles.map((b) => `${b}.${s}`).join(', ')
                            )
                            .join(' ')}].filter(Boolean).join(' ')}`;
                    }
                )
            );
        }

        const lastImport = result.match(/(import[^;]+;)(?!.*\bimport\b)/s);
        let cursor = (lastImport?.index ?? 0) + (lastImport?.[1]?.length ?? 0);

        if (!fnClassNames) {
            const hasClassNames = result.match(/\bclassName\s*=/);
            if (!hasClassNames) {
                // no classNames imported and no classes used, do nothing
                return Buffer.from(content);
            }

            fnClassNames = '__classNames';
            fnClassNamesBind = `${fnClassNames}__bind`;
            const importBind = ` import ${fnClassNamesBind} from 'classnames/bind.js';`;
            result =
                result.slice(0, cursor) + importBind + result.slice(cursor);
            cursor += importBind.length;
        }

        const binding =
            bindStyles.length === 1
                ? bindStyles[0]
                : `{ ${bindStyles.map((s) => `...${s}`).join(', ')} }`;
        result =
            result.slice(0, cursor) +
            ` const ${fnClassNames} = ${fnClassNamesBind}.bind(${binding});` +
            result.slice(cursor);

        result = result.replace(
            /\bclassName\s*=\s*(['"])([^'"]+)\1/g,
            (found, quote, classNames) => {
                return `className={${fnClassNames}('${classNames
                    .split(/\s+/)
                    .join(`', '`)}')}`;
            }
        );
        return Buffer.from(result);
    };
export default WebpackCssModuleWrapper;
