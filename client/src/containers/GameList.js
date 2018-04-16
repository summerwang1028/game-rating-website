
import React from 'react'
import { withRouteData, Link } from 'react-static'
//
import axios from '../../api';

class GameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();

        axios.post('/games', this.state);
        location.reload();

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Create New Game</h1>
                <label>
                    Title:
                    <input
                        type="text"
                        value={this.state.title}
                        onChange={(e) => {
                            this.setState({title: e.target.value});
                        }}
                    />
                </label>

                <input type="submit" value="Create new Game" />
            </form>
        );
    }
}
export default withRouteData(({ games }) => (
    <div>
        {/*<GameForm/>*/}
        <br />
        <h1>All games in the database</h1>
        <ul>
            {games.map(game => (
                <li key={game._id}>
                    <Link to={`/games/${game._id}/`}>{game.title}</Link>
                </li>
            ))}
        </ul>
    </div>
))
