document.cookie = "yuki=True;max-age=2592000;";
        function getCookie(name) { let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)")); return matches ? decodeURIComponent(matches[1]) : undefined; }
        //document.getElementById("autonext").checked = getCookie("autonext");
        function checkautoplay(){document.cookie = "autonext="+document.getElementById("autonext").checked+";max-age=2592000;";}
        document.getElementById("loop").checked = getCookie("loop");
        document.getElementById("player").loop = document.getElementById("loop").checked;
        function changeloop(){document.cookie = "autonext="+document.getElementById("loop").checked+";max-age=2592000;";document.getElementById("player").loop = document.getElementById("loop").checked}
        //function sleep(waitMsec) {var startMsec = new Date();while (new Date() - startMsec < waitMsec);}
        //function autopage(){if (document.getElementById('autonext').checked) {sleep(5000);document.cookie = "autonext=true;max-age=2592000;";location.href = "/watch?v=i6R07n8gFM8";}else{document.cookie = "autonext=false;max-age=2592000;";}}
        function getUrlQueries() { var queryStr = window.location.search.slice(1); queries = {}; queryStr.split('&').forEach(function (queryStr) { var queryArr = queryStr.split('='); queries[queryArr[0]] = queryArr[1]; }); return queries; }
        if (typeof getUrlQueries().t === "undefined") { t = 0; } else { document.getElementById("player").currentTime = getUrlQueries().t; }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "/comments?v=" + getUrlQueries().v);
        xhr.onload = function () {
            if (xhr.status != 500) {
                document.getElementById('comments').innerHTML = xhr.responseText;
            }
            else { document.getElementById('comments').innerHTML = "エラーが発生しました。再読み込みを試してください"; }
        };
        xhr.send();
        if (document.domain != "yukigennumber.ddo.jp") { document.getElementById("ads_box").innerHTML = ""; }
        document.getElementById("player").style.maxHeight = document.documentElement.clientHeight * 0.8 + "px";
 
        document.onkeydown = keydown;
        function keydown(key) {
            var v = document.getElementById("player");
 
            if (key.keyCode == 32 || key.keyCode == 75) {
                if (v.paused == true) {
                    v.play();
                } else {
                    v.pause();
                }
            }
        }
            $('#searchbox').autocomplete({
            source: function (request, response) {
                {
                    var url = "/suggest?keyword=" + request.term
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.onload = function () {
                        response(JSON.parse(xhr.responseText));
                    }
                    xhr.send();
                }
            }, delay: 300
        });
