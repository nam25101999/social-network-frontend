import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentsSection from './CommentsSection';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/posts/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data.posts);
      } catch (err) {
        console.error('Lỗi khi lấy bài viết:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="mt-5">
      <h3>Bài viết của tôi</h3>
      {posts.map((post) => (
        <div key={post.id} className="card mt-4">
          <div className="card-body">
            <p>{post.content}</p>
            {post.image_url && (
              <img src={post.image_url} alt="ảnh" className="img-fluid" />
            )}
            <hr />
            <CommentsSection postId={post.id} token={token} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
