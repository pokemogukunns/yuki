document.addEventListener('DOMContentLoaded', () => {
    const videoId = new URLSearchParams(window.location.search).get('v');
    const videoInfoDiv = document.getElementById('video-info');
    const errorLogDiv = document.getElementById('error-log');
    const invidiousInstances = [
        "http://invidious.materialio.us/",
        "http://invidious.perennialte.ch/",
        "http://yewtu.be/",
        "https://iv.datura.network/",
        "https://invidious.private.coffee/",
        "https://invidious.protokolla.fi/",
        "https://invidious.perennialte.ch/",
        "https://yt.cdaut.de/",
        "https://invidious.materialio.us/",
        "https://yewtu.be/",
        "https://invidious.fdn.fr/",
        "https://inv.tux.pizza/",
        "https://invidious.privacyredirect.com/",
        "https://invidious.drgns.space/",
        "https://vid.puffyan.us",
        "https://invidious.jing.rocks/",
        "https://youtube.076.ne.jp/",
        "https://vid.puffyan.us/",
        "https://inv.riverside.rocks/",
        "https://invidio.xamh.de/",
        "https://y.com.sb/",
        "https://invidious.sethforprivacy.com/",
        "https://invidious.tiekoetter.com/",
        "https://inv.bp.projectsegfau.lt/",
        "https://inv.vern.cc/",
        "https://invidious.nerdvpn.de/",
        "https://inv.privacy.com.de/",
        "https://invidious.rhyshl.live/",
        "https://invidious.slipfox.xyz/",
        "https://invidious.weblibre.org/",
        "https://invidious.namazso.eu/",
        "https://invidious.jing.rocks"
    ];

    if (videoId) {
        fetchVideoInfo(videoId);
    } else {
        videoInfoDiv.innerText = '動画IDが指定されていません。';
    }

    async function fetchVideoInfo(videoId) {
        for (const instance of invidiousInstances) {
            try {
                const response = await fetch(`${instance}api/v1/videos/${videoId}`);
                if (response.ok) {
                    const data = await response.json();
                    displayVideoInfo(data, instance);
                    return; // 最初に成功したインスタンスで表示したら終了
                } else {
                    throw new Error(`HTTPエラー: ${response.status}`);
                }
            } catch (error) {
                errorLogDiv.innerHTML += `インスタンス: ${instance} - エラー: ${error.message}<br>`;
            }
        }
        errorLogDiv.innerHTML += '全てのインスタンスに対してリクエストを試みましたが、成功しませんでした。';
    }

    function displayVideoInfo(data, instance) {
        const title = document.createElement('h2');
        title.innerText = data.title;

        const description = document.createElement('p');
        description.innerText = data.description;

        const thumbnail = document.createElement('img');
        thumbnail.src = data.thumbnails[0].url; // サムネイルのURLを取得

        const views = document.createElement('p');
        views.innerText = `再生回数: ${data.view_count}`;

        const uploader = document.createElement('p');
        uploader.innerText = `アップロード者: ${data.author}`;

        videoInfoDiv.appendChild(title);
        videoInfoDiv.appendChild(thumbnail);
        videoInfoDiv.appendChild(description);
        videoInfoDiv.appendChild(views);
        videoInfoDiv.appendChild(uploader);
    }
});
