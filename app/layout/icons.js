import { Icon } from 'cx/widgets';
import { VDOM } from 'cx/ui';

Icon.registerFactory((name, props) => {
    props.className = 'material-icons  ' + (props.className || '');
    return <i {...props}>{name}</i>;
});
