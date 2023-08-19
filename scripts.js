const usernameInput = document.getElementById("username");
const submitButton = document.getElementById("submitButton");
const userInfoDiv = document.getElementById("userInfo");

usernameInput.addEventListener("input", () => {
    submitButton.disabled = usernameInput.value === "";
});

function checkBanStatus() {
    const username = document.getElementById("username").value;
    const url = "https://kick.com/emotes/" + encodeURIComponent(username);
    const xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const resultElement = document.getElementById("result");
                const userInfoElement = document.getElementById("userInfo");
                const playbackButton = document.getElementById(
                    "playbackButton"
                );

                if (Array.isArray(data) && data.length > 0) {
                    const isBanned = data[0].is_banned;
                    const banStatus = document.getElementById("banStatus");

                    banStatus.textContent = isBanned ? "true" : "false";
                    banStatus.classList.toggle("green", !isBanned);
                    banStatus.classList.toggle("red", isBanned);

                    // Display user info
                    userInfoElement.innerHTML = `
                        <center><img src="${
                            data[0].user.profile_pic
                        }" alt="Profile Picture"></center>
                        <br>
                        <center><p class="bio"><i>${
                            data[0].user.bio
                        }</i></p></center>
                        <br>
                        <p><b>User ID</b>: ${data[0].user_id}</p>
                        <p><b>Subscription Enabled</b>: ${
                            data[0].subscription_enabled
                        }</p>
                        <p><b>VOD Enabled</b>: ${data[0].vod_enabled}</p>
                        <p><b>Can Host</b>: ${data[0].can_host}</p>
                        <div class="social-links">
                            ${
                                data[0].user.discord
                                    ? `<a href="https://discord.gg/${data[0].user.discord}">Discord</a>`
                                    : ""
                            }
                            ${
                                data[0].user.facebook
                                    ? `<a href="https://facebook.com/${data[0].user.facebook}">Facebook</a>`
                                    : ""
                            }
                            ${
                                data[0].user.instagram
                                    ? `<a href="https://instagram.com/${data[0].user.instagram}">Instagram</a>`
                                    : ""
                            }
                            ${
                                data[0].user.tiktok
                                    ? `<a href="https://tiktok.com/@${data[0].user.tiktok}">TikTok</a>`
                                    : ""
                            }
                            ${
                                data[0].user.twitter
                                    ? `<a href="https://twitter.com/${data[0].user.twitter}">Twitter</a>`
                                    : ""
                            }
                            ${
                                data[0].user.youtube
                                    ? `<a href="https://youtube.com/@${data[0].user.youtube}">YouTube</a>`
                                    : ""
                            }
                        </div>
                        <br>
                        <button id="playbackButton" class="playback-button" onclick="copyPlaybackURL('${
                            data[0].playback_url
                        }')">Copy Playback URL</button>
                    `;

                    playbackButton.textContent = "Copy Playback URL";
                    playbackButton.disabled = false;
                } else {
                    // Clear user info
                    resultElement.textContent =
                        "User not found or invalid response";
                    banStatus.textContent = "unknown";
                    banStatus.classList.remove("green", "red");
                    userInfoElement.innerHTML = ""; // Clear previous user info
                    playbackButton.textContent = "Copy Playback URL";
                    playbackButton.disabled = true;
                }
            } else {
                const resultElement = document.getElementById("result");
                resultElement.textContent = "Error: " + xhr.statusText;
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
