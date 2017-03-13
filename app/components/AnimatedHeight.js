import {VDOM, ResizeManager} from 'cx/ui';

export class AnimatedHeight extends VDOM.Component
{
    constructor(props) {
        super(props);
        this.state = {
            height: 1
        }
    }

    render() {
        return <div className={`cxb-animatedheight ${this.props.className || ''}`} style={this.state}>
            <div ref={el => {
                this.el = el
            }}>
                {this.props.children}
            </div>
        </div>
    }

    componentDidMount() {
        this.componentDidUpdate();
        this.unsubscribe = ResizeManager.subscribe(::this.componentDidUpdate)
    }

    componentDidUpdate() {
        let newHeight = Math.round(this.el.offsetHeight);
        if (newHeight != this.state.height) {
            this.setState({
                height: Math.round(this.el.offsetHeight)
            });
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
}
