import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it.skip('template string class names', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'template-string-class-names.tsx'),
    });
    expect(output).toMatchSnapshot();
});
