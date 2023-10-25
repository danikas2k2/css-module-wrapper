import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it('simple class names', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'simple-class-names.tsx'),
    });
    expect(output).toMatchSnapshot();
});
