import fs from 'fs';
import { Volume } from 'memfs';
import { Union } from 'unionfs';

export const DIR = './test';

const vol = new Volume();
vol.fromJSON(
    {
        'test.tsx': '',
        'Input.css': '',
        'Button.css': '',
        'ButtonGroup.css': '',
    },
    DIR
);

export const ufs = new Union();
ufs.use(fs);
ufs.use(vol as any);
