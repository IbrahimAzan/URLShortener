import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: "",
            error: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /* Returns true if the field is valid for submission */
    handleValidation() {
        let link = this.state.link;
        let error = "";
        //Link field is empty
        if (!link) {
            error = "Field cannot be empty";
            this.setState({ error: error });
            return false;
        }

        //the link is already shortened by our website :D
        if (link.includes("ez-url.com")) {
            error = "This link is already shortened";
            this.setState({ error: error });
            return false;
        }

        //Use Regex to check if URL is a valid one REGEX SOURCE: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
        let regexResult = link.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (regexResult === null) {
            error = "Please enter a valid URL";
            this.setState({ error: error });
            return false;
        }

        this.setState({ error: "" });
        return true;
    }

    handleChange(event) {
        this.setState({ link: event.target.value, error: "" });
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (this.handleValidation()) {
            let url = this.state.link;
            await fetch('http://127.0.0.1:5000/submit_url?url='+url, {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                    'Content-Type': 'text/plain'
                }
            }).then(function (response) {
                return response.text();
            }).then(data => {
                let shortLink = "http://ez-url.com/" + data;
                this.setState({ link: shortLink });
            }).catch(function (error) {
                alert("API ERROR: " + error)
            });
        }
    }

    render() {
        return (
            <div class="form-group">
                Enter your URL and share the short link, its that easy :)
                <form>
                    <input className="text-field" type="text" placeholder="https://google.ca" id="url" name="url" value={this.state.link} onChange={this.handleChange} />
                    <input className="btn" type="button" value="Shorten" onClick={this.handleSubmit} />
                </form>
                <span className="error">{this.state.error}</span>
            </div>
        );
    }
}

export default Home;