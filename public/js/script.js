var Endpoint = React.createClass({ displayName: 'Endpoint',

    _sendRequest: function () {
        var url = this.props.base + this.props.endpoint;
        for (var i in this.refs) {
            url += '/' + this.refs[i].value;
        }

        $.ajax({
            type: this.props.method,
            url: url,
            dataType: 'json',
            crossDomain: true,
            cache: false,
            beforeSend: xhr => {
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.props.username + ':' + this.props.password));
            },
            success: data => {
                this.setState({ response: data });
            },
            error: (xhr, status, err) => {
                this.setState({ response: err.toString() });
                console.error(status, err.toString());
            }
        });
    },

    getInitialState: function () {
        return {
            response: undefined
        };
    },

    render: function () {

        // prepare fields if any
        var fields = this.props.fields.map(function (field, i) {
            return React.createElement(
                'span',
                { key: i },
                '/',
                React.createElement('input', { type: 'text', className: 'form-control input-sm', placeholder: field, ref: field })
            );
        });

        return React.createElement(
            'section',
            { className: 'Endpoint' },
            React.createElement(
                'div',
                { className: classNames('panel', 'panel-default') },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'h3',
                        { className: 'panel-title form-inline' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary btn-xs pull-right', onClick: this._sendRequest },
                            'Send'
                        ),
                        React.createElement(
                            'strong',
                            null,
                            this.props.method
                        ),
                        ' ',
                        this.props.endpoint,
                        fields
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    JSON.stringify(this.state.response)
                )
            )
        );
    }
});

var Client = React.createClass({ displayName: 'Client',

    getInitialState: function () {
        return {
            username: '',
            password: ''
        };
    },

    _onUsernameChange: function (e) {
        this.setState({ username: e.target.value });
    },

    _onPasswordChange: function (e) {
        this.setState({ password: e.target.value });
    },

    render: function () {
        return React.createElement(
            'div',
            { className: 'Client' },
            React.createElement(
                'section',
                { className: 'credentials' },
                React.createElement(
                    'div',
                    { className: classNames('panel', 'panel-default') },
                    React.createElement(
                        'div',
                        { className: 'panel-heading' },
                        React.createElement(
                            'h3',
                            { className: 'panel-title' },
                            'Credentials'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'form',
                            { className: 'form-inline' },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { type: 'text', className: 'form-control', id: 'username', onChange: this._onUsernameChange, placeholder: 'Username' })
                            ),
                            '   ',
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement('input', { type: 'text', className: 'form-control', id: 'password', onChange: this._onPasswordChange, placeholder: 'Password' })
                            )
                        )
                    )
                )
            ),
            React.createElement(Endpoint, { username: this.state.username, password: this.state.password, base: this.props.base, method: 'GET', fields: [], endpoint: '/todo' }),
            React.createElement(Endpoint, { username: this.state.username, password: this.state.password, base: this.props.base, method: 'POST', fields: ['done', 'text'], endpoint: '/todo' }),
            React.createElement(Endpoint, { username: this.state.username, password: this.state.password, base: this.props.base, method: 'PUT', fields: ['id', 'done', 'text'], endpoint: '/todo' }),
            React.createElement(Endpoint, { username: this.state.username, password: this.state.password, base: this.props.base, method: 'DELETE', fields: ['id'], endpoint: '/todo' }),
            React.createElement(Endpoint, { username: this.state.username, password: this.state.password, base: this.props.base, method: 'GET', fields: [], endpoint: '/user' }),
            React.createElement(Endpoint, { username: this.state.username, password: this.state.password, base: this.props.base, method: 'POST', fields: ['username', 'password'], endpoint: '/user' }),
            React.createElement(Endpoint, { username: this.state.username, password: this.state.password, base: this.props.base, method: 'DELETE', fields: [], endpoint: '/user' })
        );
    }

});

$(document).ready(function () {
    ReactDOM.render(React.createElement(Client, { base: 'http://127.0.0.1:3000' }), document.getElementById('ClientContainer'));
});