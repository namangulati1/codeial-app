import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Comment, FriendsList, Loader, CreatePost } from '../components';
import styles from '../styles/home.module.css';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
    const auth = useAuth();
    const posts = usePosts();

    if(posts.loading){
        return <Loader />
    }
    return (
        <div className={styles.home}>
        <div className={styles.postsList}>
            <CreatePost /> 
            {posts.data.map(post => 
            <div className={styles.postWrapper} key={`post-${post._id}`}>
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                            alt="user-pic"
                        />
                        <div>
                            <Link 
                            to={`/user/${post.user._id}`} 
                            state={{user: post.user}} 
                            className={styles.postAuthor}>
                            {post.user.name}
                            </Link>
                            <span className={styles.postTime}>a minute ago</span>
                        </div>
                    </div>
                    <div className={styles.postContent}>{post.content}</div>
                    <div className={styles.postActions}>
                        <div className={styles.postLike}>
                            <img 
                                src="https://cdn-icons-png.flaticon.com/128/889/889140.png"
                                alt="likes-icon"
                            />
                            <span>{post.likes.length}</span>
                        </div>
                        <div className={styles.postCommentsIcon}>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
                            alt="comments-icon"
                        />
                        <span>{post.comments.length}</span>
                        </div>
                    </div>
                    <div className={styles.postCommentBox}>
                        <input placeholder="Start typing comment" />
                    </div>
                    <div className={styles.postCommentsList}>
                        {post.comments.map((comment) => (
                            <Comment key={`post-${comment._id}`} comment={comment} />
                        ))}
                    </div>
                </div>
            </div>
            )}
        </div>
        {auth.user && <FriendsList />}
        </div>
    );
};

Home.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default Home;