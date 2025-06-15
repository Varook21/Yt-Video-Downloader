
            
            async function downloadYtVideo() {
    const availableQuality = document.getElementById("availableQuality");

    // Show skeleton loader
    let html = ``;
        for (let i = 0; i < 8; i++) {
            html += `
        <div class="quality-wrapper">
            <div class="quality skeleton" style="width: 50px; height: 1.2rem; "></div>
            <div class="downloadButton skeleton" style="width: 80px; height: 2rem; margin-left: 2rem;"></div>
        </div>`;
        }
        availableQuality.innerHTML = `
        <p class="selectText">Loading...</p> ${html}`;


    // Get and trim URL input
    const trimedUrl = document.getElementById('youtubeUrl').value.trim();

    // YouTube URL pattern validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.+)?$/;
    if (!youtubeRegex.test(trimedUrl)) {
        console.error("Error fetching video data:");
        availableQuality.innerHTML = `<p style="background-color: lightpink;
        border-radius: 4px;
        color:darkred;
        padding-top: 4px;
        padding-bottom: 4px;
        width: 540px;
        display: flex;
        margin-left: 48px;
        justify-content:center;

        ">Unsupported link, please enter a compliant YouTube video link</p>`;
        return;
    }

    try {
        // Fetch video data from API
        const response = await fetch(`https://youtube-video-and-shorts-downloader1.p.rapidapi.com/api/getYTVideo?url=${trimedUrl}`, {
            headers: {
                'x-rapidapi-key': '6bc875968cmsh56aa000a553812dp15ad5ejsnaeb81010e3b3',
                'x-rapidapi-host': 'youtube-video-and-shorts-downloader1.p.rapidapi.com',
            }
        });

        const data = await response.json();
        const links = data.links;
        let HTML = `<p class="selectText">Select the Quality</p>`;

        // Loop through qualities and add buttons
        for (let i = 0; i < links.length; i++) {
            HTML += `
                <div class="quality-wrapper">
                    <span class="quality">${links[i].quality}</span>
                    <button class="downloadButton" onclick="downloadVideo('${links[i].link}')">Download</button>
                </div>`;
        }

        // Show actual quality options
        availableQuality.innerHTML = HTML;

    } catch (error) {
        console.error("Error fetching video data:", error);
        availableQuality.innerHTML = `<p style="color:red;">Failed to fetch video. Please try again later.</p>`;
    }
} 

            function downloadVideo(url){
                window.open(url, "_blank");
            }