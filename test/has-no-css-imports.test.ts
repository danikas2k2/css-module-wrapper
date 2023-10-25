import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it('has no css imports', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'has-no-css-imports.tsx'),
    });
    expect(output).toMatchSnapshot();
});
