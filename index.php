<!DOCTYPE html>
<html>
<head>
    <title>Check Ban Status</title>
</head>
<body>
    <form method="GET">
        <label for="username">Enter Username:</label>
        <input type="text" id="username" name="username" required>
        <button type="submit">Check Ban Status</button>
    </form>

    <?php
    if (isset($_GET['username'])) {
        $username = urlencode($_GET['username']);
        $url = "https://kick.com/emotes/{$username}";
        
        $response = file_get_contents($url);
        $data = json_decode($response, true);
        
        if (is_array($data) && count($data) > 0) {
            $isBanned = $data[0]['is_banned'];
            
            echo "<p>Ban Status: " . ($isBanned ? 'true' : 'false') . "</p>";
        } else {
            echo "<p>User not found or invalid response</p>";
        }
    }
    ?>
</body>
</html>
