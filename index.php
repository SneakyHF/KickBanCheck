<!DOCTYPE html>
<html>
<head>
    <title>Check Ban Status</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #282c36;
            font-family: Arial, sans-serif;
            color: #ffffff;
        }

        .container {
            text-align: center;
            background-color: #37474f;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        }

        label {
            display: block;
            margin-bottom: 10px;
        }

        input {
            padding: 8px;
            width: 200px;
            border: none;
            border-radius: 5px;
        }

        button {
            padding: 8px 20px;
            background-color: #4caf50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        #result {
            margin-top: 20px;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <label for="username">Enter Username:</label>
        <input type="text" id="username" required>
        <button onclick="checkBanStatus()">Check Ban Status</button>
        <p id="result"></p>
    </div>

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
