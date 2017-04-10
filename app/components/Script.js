import {Widget, VDOM} from 'cx/ui';

export class Script extends Widget {
  render(context, instance, key) {
    return <ScriptComponent key={key} instance={instance} />;
  }
}

class ScriptComponent extends VDOM.Component {
  render() {
    return null;
  }

  componentDidMount() {
    let {widget} = this.props.instance;
    let script = (this.script = document.createElement('script'));

    script.src = widget.src;
    script.id = widget.id;
    script.async = true;

    document.body.appendChild(script);
  }

  componentWillUnomount() {
    document.body.removeChild(this.script);
  }
}
