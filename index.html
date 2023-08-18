<!DOCTYPE html>
<html>
<head>
    <title>Check Ban Status</title>
</head>
<body>
    <label for="username">Enter Username:</label>
    <input type="text" id="username" required>
    <button onclick="checkBanStatus()">Check Ban Status</button>
    <p id="result"></p>

    <script>
        function checkBanStatus() {
            var username = document.getElementById("username").value;
            var url = "https://kick.com/emotes/" + encodeURIComponent(username);

            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        var data = JSON.parse(xhr.responseText);
                        if (Array.isArray(data) && data.length > 0) {
                            var isBanned = data[0].is_banned;
                            document.getElementById("result").textContent = "Ban Status: " + (isBanned ? "true" : "false");
                        } else {
                            document.getElementById("result").textContent = "User not found or invalid response";
                        }
                    } else {
                        document.getElementById("result").textContent = "Error: " + xhr.statusText;
                    }
                }
            };
            xhr.send();
        }
    </script>
</body>
</html>
