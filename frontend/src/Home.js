
import React from 'react';

class Home extends React.Component{
    render() {
        return (
            <div>
                <input type="text" id="url" name="url" size="50"/>
                <input type="button" value="Submit" />
            </div>
        );
    }
}

export default Home;