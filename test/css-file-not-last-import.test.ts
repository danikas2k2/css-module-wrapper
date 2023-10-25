import path from 'path';
import { compile } from './utils/compile';
import { DIR } from './utils/ufs';

it('css file is not last import', async () => {
    const [output] = await compile({
        entry: path.resolve(DIR, 'css-file-not-last-import.tsx'),
    });
    expect(output).toMatchSnapshot();
});
