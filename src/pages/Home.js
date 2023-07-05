import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Comment, Loader } from '../components';
import { getPosts } from '../api';
import styles from '../styles/home.module.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
        const response = await getPosts();
        //console.log('response',response);
        if(response.success){
            setPosts(response.data.posts);
        }
        setLoading(false);
        };
        fetchPosts();
    }, []);
    if(loading){
        return <Loader />
    }
    return (
        <div className={styles.postList}>
            {posts.map(post => 
            <div className={styles.postWrapper} key={`post-${post._id}`}>
                <div className={styles.postHeader}>
                    <div className={styles.postAvatar}>
                        <img 
                            src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                            alt="user-pic"
                        />
                        <div>
                            <span className={styles.postAuthor}>{post.user.name}</span>
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
                            <span>5</span>
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
    );
};

Home.propTypes = {
    posts: PropTypes.array.isRequired,
};

export default Home;