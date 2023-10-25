import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it('many css files are imported', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'many-css-files.tsx'),
    });
    expect(output).toMatchSnapshot();
});
