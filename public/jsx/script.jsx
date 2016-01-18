var Endpoint = React.createClass({displayName: 'Endpoint',

    _sendRequest: function() {
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
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', 'Basic ' + btoa(this.props.username + ':' + this.props.password));
            },
            success: (data) => {
                this.setState({ response: data });
            },
            error: (xhr, status, err) => {
                this.setState({ response: err.toString() })
                console.error(status, err.toString());
            }
        });
    },

    getInitialState: function() {
        return {
            response: undefined,
        };
    },

    render: function() {

        // prepare fields if any
        var fields = this.props.fields.map(function(field, i) {
            return (
                <span key={i}>/
                    <input type='text' className='form-control input-sm' placeholder={field} ref={field} />
                </span>
            )
        });

        return (
            <section className='Endpoint'>
                <div className={classNames('panel', 'panel-default')}>
                    <div className='panel-heading'>
                        <h3 className='panel-title form-inline'>
                            <button type='button' className='btn btn-primary btn-xs pull-right' onClick={this._sendRequest}>Send</button>
                            <strong>{this.props.method}</strong>&nbsp;
                            {this.props.endpoint}
                            {fields}
                        </h3>

                    </div>
                    <div className='panel-body'>{JSON.stringify(this.state.response)}</div>
                </div>
            </section>
        );
    }
});

var Client = React.createClass({displayName: 'Client',

    getInitialState: function() {
        return {
            username: '',
            password: '',
        };
    },

    _onUsernameChange: function(e) {
        this.setState({ username: e.target.value });
    },

    _onPasswordChange: function(e) {
        this.setState({ password: e.target.value });
    },

    render: function() {
        return (
            <div className='Client'>

                <section className='credentials'>
                    <div className={classNames('panel', 'panel-default')}>
                        <div className='panel-heading'>
                            <h3 className='panel-title'>Credentials</h3>
                        </div>
                        <div className='panel-body'>
                            <form className='form-inline'>
                                <div className='form-group'>
                                    <input type='text' className='form-control' id='username' onChange={this._onUsernameChange} placeholder='Username' />
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <div className='form-group'>
                                    <input type='text' className='form-control' id='password' onChange={this._onPasswordChange} placeholder='Password' />
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Todos */}
                <Endpoint username={this.state.username} password={this.state.password} base={this.props.base} method='GET' fields={[]} endpoint='/todo' />
                <Endpoint username={this.state.username} password={this.state.password} base={this.props.base} method='POST' fields={['done', 'text']} endpoint='/todo' />
                <Endpoint username={this.state.username} password={this.state.password} base={this.props.base} method='PUT' fields={['id', 'done', 'text']} endpoint='/todo' />
                <Endpoint username={this.state.username} password={this.state.password} base={this.props.base} method='DELETE' fields={['id']} endpoint='/todo' />

                {/* Users */}
                <Endpoint username={this.state.username} password={this.state.password} base={this.props.base} method='GET' fields={[]} endpoint='/user' />
                <Endpoint username={this.state.username} password={this.state.password} base={this.props.base} method='POST' fields={['username', 'password']} endpoint='/user' />
                <Endpoint username={this.state.username} password={this.state.password} base={this.props.base} method='DELETE' fields={[]} endpoint='/user' />
            </div>
        );
    }

});

$(document).ready(function() {
    ReactDOM.render(<Client base='http://127.0.0.1:3000' />, document.getElementById('ClientContainer'));
});

