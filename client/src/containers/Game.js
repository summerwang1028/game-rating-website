import React from 'react'
import { withRouteData, Link } from 'react-static'
import axios from '../../api';

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            context: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async handleSubmit(event) {
        event.preventDefault();

        let comment = {
            user: this.state.name,
            context: this.state.context,
            game: this.props.game._id,
        };

        await axios.post('/comments', comment);
        location.reload();

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.name}
                        onChange={(e) => {
                            this.setState({name: e.target.value});
                        }}
                    />
                </label>
                <label>
                    Context:
                    <input
                        type="text"
                        value={this.state.context}
                        onChange={(e) => {
                            this.setState({context: e.target.value});
                        }}
                    />
                </label>

                <input type="submit" value="Post new comment" />
            </form>
        );
    }
}
class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.fetchComments = this.fetchComments.bind(this);
        this.renderComments = this.renderComments.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.state = {
            comments: [],
        }
    }
    async fetchComments() {
        let { game } = this.props;
        const res = await axios.get(`comments/game/${game._id}`);
        this.setState({
            comments: res.data,
        });
    }

    componentWillMount() {
        this.fetchComments();
    }

    async deleteComment(commentId) {
        await axios.delete(`comments/${commentId}`);
        location.reload();
    }

    renderComments() {
        return this.state.comments.map((comment, ii) => {
            return (
                <div key={ii}>
                    <h2>{comment.context}</h2>
                    <h4>Author: {comment.user}</h4>
                    <button onClick={(e) => {
                        this.deleteComment(comment._id);
                    }}>
                        delete
                    </button>
                    <hr/>
                </div>

            );
        })
    }

    render() {
        return (
            <div>
                <CommentForm game={this.props.game}/>
                <hr/>
                {this.renderComments()}
            </div>
        )
    }
}

export default withRouteData(({ game }) => {
    return (
        <div>
            <Link to="/games/">{'<'} Back</Link>
            <br />
            <h1>Game Name: {game.title}</h1>
            <br/>
            <Comments game={game}/>
        </div>
    );
})

