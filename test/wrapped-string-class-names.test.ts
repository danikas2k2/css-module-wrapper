import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it.skip('wrapped string class names', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'wrapped-string-class-names.tsx'),
    });
    expect(output).toMatchSnapshot();
});
