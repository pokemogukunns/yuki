const apiKey = 'YOUR_API_KEY';  // ここに取得したYouTube Data APIキーを入力
const videoId = new URLSearchParams(window.location.search).get('v');
const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics&key=${apiKey}`;
const relatedVideosUrl = `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&part=snippet&key=${apiKey}`;
const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet&key=${apiKey}`;

// 動画の基本情報を取得
fetch(videoDetailsUrl)
    .then(response => response.json())
    .then(data => {
        const video = data.items[0];
        document.getElementById('title').textContent = video.snippet.title;
        document.getElementById('thumbnail').src = video.snippet.thumbnails.high.url;
        document.getElementById('likes').textContent = video.statistics.likeCount;
        document.getElementById('channel').textContent = video.snippet.channelTitle;

        // チャンネルアイコンの取得
        fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=${apiKey}`)
            .then(response => response.json())
            .then(channelData => {
                document.getElementById('channel-icon').src = channelData.items[0].snippet.thumbnails.default.url;
            });
    })
    .catch(error => console.error('Error fetching video details:', error));

// 関連動画を取得
fetch(relatedVideosUrl)
    .then(response => response.json())
    .then(data => {
        const relatedVideosContainer = document.getElementById('related-videos');
        data.items.forEach(item => {
            const videoElement = document.createElement('div');
            videoElement.innerHTML = `
                <img src="${item.snippet.thumbnails.default.url}" alt="${item.snippet.title}">
                <p>${item.snippet.title}</p>
            `;
            relatedVideosContainer.appendChild(videoElement);
        });
    })
    .catch(error => console.error('Error fetching related videos:', error));

// コメントを取得
fetch(commentsUrl)
    .then(response => response.json())
    .then(data => {
        const commentsContainer = document.getElementById('comments');
        data.items.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.innerHTML = `
                <p><strong>${comment.snippet.topLevelComment.snippet.authorDisplayName}:</strong> ${comment.snippet.topLevelComment.snippet.textDisplay}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    })
    .catch(error => console.error('Error fetching comments:', error));
