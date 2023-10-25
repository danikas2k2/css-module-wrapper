import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it('one css file is imported', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'one-css-file.tsx'),
    });
    expect(output).toMatchSnapshot();
});
