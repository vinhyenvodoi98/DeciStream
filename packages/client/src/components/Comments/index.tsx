import React, { useEffect, useRef, useState } from 'react';

interface Comment {
  id: number;
  content: string;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const commentListRef = useRef<HTMLUListElement>(null);

  const handleCommentChange = (event: any) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      // Tạo một đối tượng comment mới với nội dung và ID ngẫu nhiên
      const newCommentObj: Comment = {
        id: Math.random(),
        content: newComment
      };

      // Thêm comment mới vào danh sách comments
      const updatedComments = [...comments, newCommentObj];
      // Cập nhật danh sách comments
      setComments(updatedComments);
      // Xóa nội dung trong ô input
      setNewComment('');
    }
  };

  useEffect(() => {
    // Tự động cuộn xuống phần tử mới nhất khi có comment mới
    if (commentListRef.current) {
      commentListRef.current.scrollTop = commentListRef.current.scrollHeight;
    }
  }, [comments]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCommentSubmit();
    }
  };

  return (
  <div className="p-4 flex flex-col h-full rounded-xl">
    <h2 className="text-xl font-bold mb-4">Comments</h2>
    <ul className="flex-grow overflow-y-auto" ref={commentListRef}>
      {comments.map((comment) => (
        <li
          key={comment.id}
          className={`ml-2 mb-2 rounded-xl ${
            comment.id % 2 === 0 ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`rounded-lg p-2 max-w-xs inline-block shadow ${
              comment.id % 2 === 0 ? 'ml-4' : 'mr-4'
            }`}
          >
            <p className="whitespace-pre-wrap break-words">{comment.content}</p>
          </div>
        </li>
      ))}
    </ul>
    <div className="flex mt-4">
      <input
        type="text"
        value={newComment}
        onChange={handleCommentChange}
        onKeyPress={handleKeyPress}
        placeholder="Write a comment..."
        className="flex-grow p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleCommentSubmit}
        className="flex items-center justify-center px-4 py-2 ml-2 bg-blue-500 text-white rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          />
        </svg>
      </button>
    </div>
  </div>
  );
};

export default Comments;
