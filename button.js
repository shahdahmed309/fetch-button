document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');

    fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                var postElement = document.createElement('div');
                postElement.classList.add('post', 'col-md-6');
                postElement.innerHTML = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <h2 class="card-title">${post.title}</h2>
                            <p class="card-text">${post.body}</p>
                            <button class="btn btn-primary btn-sm" data-post-id="${post.id}">Show comments</button>
                            <div class="comments" id="comments-${post.id}"></div>
                        </div>
                    </div>
                `;
                postsContainer.appendChild(postElement);

                postElement.querySelector('button').addEventListener('click', function() {
                    const postId = this.getAttribute('data-post-id');
                    const commentsContainer = document.getElementById(`comments-${postId}`);

                    if (commentsContainer.innerHTML === '') {
                        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
                            .then(response => response.json())
                            .then(comments => {
                                comments.forEach(comment => {
                                    const commentElement = document.createElement('div');
                                    commentElement.classList.add('comment');
                                    commentElement.innerHTML = `
                                        <p><strong>${comment.name} (${comment.email})</strong></p>
                                        <p>${comment.body}</p>
                                    `;
                                    commentsContainer.appendChild(commentElement);
                                });
                            });
                    } else {
                        commentsContainer.innerHTML = '';
                    }
                });
            });
        });
});