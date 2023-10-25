import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it.skip('array class names', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'array-class-names.tsx'),
    });
    expect(output).toMatchSnapshot();
});
