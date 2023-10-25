import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it('has no class names used', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'has-no-class-names-used.tsx'),
    });
    expect(output).toMatchSnapshot();
});
