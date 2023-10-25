import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it('has no classnames import', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'has-no-classnames-import.tsx'),
    });
    expect(output).toMatchSnapshot();
});
