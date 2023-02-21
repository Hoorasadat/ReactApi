import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        this.setstate({ hasError: true });
    }

    render() {
        return this.state.hasError ? <h1>Ooooops!!</h1> : this.props.children;
    };
}

export default ErrorBoundry;
