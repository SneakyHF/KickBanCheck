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
    userInfoElement.innerHTML = ''; // Clear user info
    banStatus.textContent = '';
}

function showUserInfo() {
    userInfoElement.style.display = "block";
}

function hideUserInfo() {
    userInfoElement.style.display = "none";
}

function checkBanStatus() {
    clearUserInfo(); // Clear previous user info

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

                    banStatus.textContent = isBanned ? "Banned" : "OK";
                    banStatus.classList.add(isBanned ? "red" : "green");
                    banStatus.classList.remove(isBanned ? "green" : "red");

                    if (data[0].user) {
                        // Display user info
                        userInfoElement.innerHTML = `
                            <center><img src="${data[0].user.profile_pic}" alt="Profile Picture"></center>
                            <br>
                            <center><p class="bio"><i>${data[0].user.bio}</i></p></center>
                            <br>
                            <p><b>User ID</b>: ${data[0].user_id}</p>
                            <p><b>Subscription Enabled</b>: ${data[0].subscription_enabled}</p>
                            <p><b>VOD Enabled</b>: ${data[0].vod_enabled}</p>
                            <p><b>Can Host</b>: ${data[0].can_host}</p>
                            <div class="social-links">
                                ${data[0].user.discord ? `<a href="https://discord.gg/${data[0].user.discord}">Discord</a>` : ''}
                                ${data[0].user.facebook ? `<a href="https://facebook.com/${data[0].user.facebook}">Facebook</a>` : ''}
                                ${data[0].user.instagram ? `<a href="https://instagram.com/${data[0].user.instagram}">Instagram</a>` : ''}
                                ${data[0].user.tiktok ? `<a href="https://tiktok.com/@${data[0].user.tiktok}">TikTok</a>` : ''}
                                ${data[0].user.twitter ? `<a href="https://twitter.com/${data[0].user.twitter}">Twitter</a>` : ''}
                                ${
                                    data[0].user.youtube
                                        ? generateYouTubeLink(data[0].user.youtube)
                                        : ''
                                }
                            </div>
                            <br>
                            <button id="playbackButton" class="playback-button" onclick="copyPlaybackURL('${data[0].playback_url}')">Copy Playback URL</button>
                        `;

                        // Show the user info div
                        showUserInfo();
                    } else {
                        // No user data found
                        userInfoElement.innerHTML = `<p>No user data found</p>`;
                        hideUserInfo();
                    }
                } else {
                    // No data found for the user
                    banStatus.textContent = "No data found";
                    hideUserInfo();
                }
            } else {
                // Error handling when request fails
                banStatus.textContent = "User not found";
                hideUserInfo();
            }
        }
    };

    xhr.send();
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

function generateYouTubeLink(youtubeUrl) {
    const youtubeLink = youtubeUrl
        ? youtubeUrl.includes("channel")
            ? `https://youtube.com/${youtubeUrl}` // Assume it's a channel URL
            : `https://youtube.com/@${youtubeUrl}` // User has a handle
        : '';

    return youtubeLink ? `<a href="${youtubeLink}">YouTube</a>` : '';
}
