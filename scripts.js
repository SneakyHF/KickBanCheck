const usernameInput = document.getElementById("username");
const submitButton = document.getElementById("submitButton");
const userInfoDiv = document.getElementById("userInfo");

usernameInput.addEventListener("input", () => {
    submitButton.disabled = usernameInput.value === "";
});

function clearUserInfo() {
    const userInfoElement = document.getElementById("userInfo");
    const banStatus = document.getElementById("banStatus");

    userInfoElement.innerHTML = ''; // Clear user info
    banStatus.textContent = '';
    banStatus.classList.remove("green", "red");
}

function checkBanStatus() {
    clearUserInfo(); // Clear previous user info

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
                const playbackButton = document.getElementById("playbackButton");
                const banStatus = document.getElementById("banStatus");

                if (Array.isArray(data) && data.length > 0) {
                    const isBanned = data[0].is_banned;

                    banStatus.textContent = isBanned ? "Banned" : "OK";
                    banStatus.classList.toggle("green", !isBanned);
                    banStatus.classList.toggle("red", isBanned);

                    // Display user info
                    userInfoElement.innerHTML = `
                        <!-- ... (rest of the code) ... -->
                    `;

                    playbackButton.textContent = "Copy Playback URL";
                    playbackButton.disabled = false;
                } else {
                    // No data found for the user
                    banStatus.textContent = "No data found";
                    banStatus.classList.remove("green", "red"); // Remove any previous styling
                    resultElement.classList.remove("green", "red"); // Remove color styling
                }
            } else {
                // Error handling when request fails
                banStatus.textContent = "User not found";
                banStatus.classList.remove("green", "red"); // Remove any previous styling
                resultElement.classList.remove("green", "red"); // Remove color styling
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
