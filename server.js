<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Logga in – Leverantörsportalen</title>
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script>
  const supabaseUrl = "https://vkcefoaqsgumbgatjxwj.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2Vmb2Fxc2d1bWJnYXRqeHdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTQ5NDIzNiwiZXhwIjoyMDYxMDcwMjM2fQ.HLxnYL9dLXRkpkkXj9K36K2uaLhtH93X5cOSc9o07vE";
  const supabase = supabase.createClient(supabaseUrl, supabaseKey);
</script>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f7f7f7;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .login-container {
      background-color: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      text-align: left;
    }
    h2 {
      text-align: center;
      color: #222;
    }
    label {
      display: block;
      margin: 1rem 0 0.5rem;
      font-weight: 500;
    }
    input {
      width: 100%;
      padding: 0.6rem;
      border-radius: 4px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }
    button {
      margin-top: 1.5rem;
      width: 100%;
      padding: 0.75rem;
      background-color: #0070f3;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
    }
    button:hover {
      background-color: #0059c9;
    }
    .info {
      margin-top: 1rem;
      font-size: 0.9rem;
      color: #666;
      text-align: center;
    }
    .error {
      color: red;
      text-align: center;
      margin-top: 1rem;
    }
  </style>
</head>
<body>
  <div class="login-container">
    <h2>Logga in</h2>
    <form id="login-form">
      <label for="email">E-post</label>
      <input type="email" id="email" required />

      <label for="password">Lösenord</label>
      <input type="password" id="password" required />

      <button type="submit">Logga in</button>
    </form>
    <p id="error-message" class="error"></p>
    <p class="info">Du behöver ha blivit inbjuden som användare för att logga in.</p>
  </div>

  <script>
    // Initiera Supabase
    const supabaseUrl = 'https://vkcefoaqsgumbgatjxwj.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrY2Vmb2Fxc2d1bWJnYXRqeHdqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NTQ5NDIzNiwiZXhwIjoyMDYxMDcwMjM2fQ.HLxnYL9dLXRkpkkXj9K36K2uaLhtH93X5cOSc9o07vE';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    document.getElementById('login-form').addEventListener('submit', async function (e) {
      e.preventDefault();
      const email = document.getElementById('email').value.toLowerCase();
      const password = document.getElementById('password').value;

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (error || !data) {
        document.getElementById('error-message').textContent = 'Fel e-post eller lösenord!';
      } else {
        // Spara inloggad användare i localStorage
        localStorage.setItem('loggedInUser', data.name);
        localStorage.setItem('userTitle', data.role);
        window.location.href = "welcome.html";
      }
    });
  </script>
</body>
</html>
