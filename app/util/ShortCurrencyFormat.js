import { Format } from 'cx/ui';

Format.register('short', v => {
    let suffix = '';
    if (v >= 1e12) {
        v /= 1e12;
        suffix = 'T';
    }
    else if (v >= 1e9) {
        v /= 1e9;
        suffix = 'B';
    }
    else if (v >= 1e6) {
        v /= 1e6;
        suffix = 'M';
    }
    else if (v >= 1e3) {
        v /= 1e3;
        suffix = 'K';
    }

    return Format.value(v, 'n;0;1') + suffix;
});


Format.register('shortcurrency', v => {
    let suffix = '';
    if (v >= 1e12) {
        v /= 1e12;
        suffix = 'T';
    }
    else if (v >= 1e9) {
        v /= 1e9;
        suffix = 'B';
    }
    else if (v >= 1e6) {
        v /= 1e6;
        suffix = 'M';
    }
    else if (v >= 1e3) {
        v /= 1e3;
        suffix = 'K';
    }

    return Format.value(v, 'currency;USD;0;1') + suffix;
});
