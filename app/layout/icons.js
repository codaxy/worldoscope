import { Icon, TreeNode } from 'cx/widgets';
import { VDOM } from 'cx/ui';

//TreeNode is loaded to register the loading icon. Figure out a better way to do that when is set to useSrc: true.

Icon.registerFactory((name, props) => {
    props.className = 'material-icons  ' + (props.className || '');
    return <i {...props}>{name}</i>;
});
