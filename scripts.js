const usernameInput = document.getElementById("username");
const submitButton = document.getElementById("submitButton");
const userInfoElement = document.getElementById("userInfo");
const banStatus = document.getElementById("banStatus");

usernameInput.addEventListener("input", () => {
    submitButton.disabled = usernameInput.value === "";
});

usernameInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkBanStatus();
    }
});

function clearUserInfo() {
    userInfoElement.innerHTML = '';
    banStatus.textContent = '';
    banStatus.className = '';
}

function updateBanStatus(isBanned) {
    banStatus.textContent = isBanned ? "Banned" : "OK";
    banStatus.classList.add(isBanned ? "red" : "green");
    banStatus.classList.remove(isBanned ? "green" : "red");
}

function renderUserInfo(data) {
    if (data[0].user) {
        const socialLinks = Object.entries(data[0].user)
            .filter(([key, value]) => key !== 'profile_pic' && value)
            .map(([key, value]) => `<a href="${generateSocialLink(key, value)}">${key}</a>`)
            .join('');

        const youtubeLink = data[0].user.youtube ? generateYouTubeLink(data[0].user.youtube) : '';
        
        userInfoElement.innerHTML = `
            <center><img src="${data[0].user.profile_pic}" alt="Profile Picture"></center>
            <br>
            <center><p class="bio"><i>${data[0].user.bio}</i></p></center>
            <br>
            <p><b>User ID</b>: ${data[0].user_id}</p>
            <p><b>Subscription Enabled</b>: ${data[0].subscription_enabled}</p>
            <p><b>VOD Enabled</b>: ${data[0].vod_enabled}</p>
            <p><b>Can Host</b>: ${data[0].can_host}</p>
            <div class="social-links">${socialLinks}</div>
            <div class="youtube-link">${youtubeLink}</div>
            <br>
            <button id="playbackButton" class="playback-button" onclick="copyPlaybackURL('${data[0].playback_url}')">Copy Playback URL</button>
        `;

        showUserInfo();
    } else {
        userInfoElement.innerHTML = '<p>No user data found</p>';
        hideUserInfo();
    }
}

function checkBanStatus() {
    clearUserInfo();

    const username = usernameInput.value;
    const url = "https://kick.com/emotes/" + encodeURIComponent(username);
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);

                if (Array.isArray(data) && data.length > 0) {
                    const isBanned = data[0].is_banned;

                    updateBanStatus(isBanned);
                    renderUserInfo(data);
                } else {
                    banStatus.textContent = "No data found";
                    hideUserInfo();
                }
            } else {
                banStatus.textContent = "User not found";
                hideUserInfo();
            }
        }
    };

    xhr.send();
}

function generateSocialLink(platform, username) {
    const socialUrls = {
        discord: "https://discord.gg/",
        facebook: "https://facebook.com/",
        instagram: "https://instagram.com/",
        tiktok: "https://tiktok.com/@",
        twitter: "https://twitter.com/",
    };

    return socialUrls[platform] + username;
}

function generateYouTubeLink(youtubeUrl) {
    return youtubeUrl.includes("channel")
        ? `<a href="https://youtube.com/${youtubeUrl}">YouTube</a>` // Assume it's a channel URL
        : `<a href="https://youtube.com/@${youtubeUrl}">YouTube</a>`; // User has a handle
}

function copyPlaybackURL(url) {
    const tempInput = document.createElement("input");
    tempInput.value = url;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    const playbackButton = document.getElementById("playbackButton");
    playbackButton.textContent = "Copied";
}

submitButton.addEventListener("click", checkBanStatus);
