// Vercel Serverless Function — Spotify Now Playing
// ─────────────────────────────────────────────────
// SETUP (one-time, ~10 minutes):
//
// 1. Go to https://developer.spotify.com/dashboard → create an app
//    - Redirect URI: https://your-app.vercel.app/callback  (any URL works)
//    - Copy CLIENT_ID and CLIENT_SECRET
//
// 2. Get your refresh token — open this URL in a browser (fill in your CLIENT_ID):
//    https://accounts.spotify.com/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=https://your-app.vercel.app/callback&scope=user-read-currently-playing,user-read-recently-played
//
// 3. After approving, copy the `code` param from the redirect URL, then run:
//    curl -X POST https://accounts.spotify.com/api/token \
//      -H "Content-Type: application/x-www-form-urlencoded" \
//      -u "CLIENT_ID:CLIENT_SECRET" \
//      -d "grant_type=authorization_code&code=YOUR_CODE&redirect_uri=https://your-app.vercel.app/callback"
//    → copy the `refresh_token` from the response
//
// 4. In Vercel project settings → Environment Variables, add:
//    SPOTIFY_CLIENT_ID     = your client id
//    SPOTIFY_CLIENT_SECRET = your client secret
//    SPOTIFY_REFRESH_TOKEN = your refresh token
//
// 5. In your portfolio .env file add:
//    VITE_SPOTIFY_URL=https://your-vercel-app.vercel.app/api/spotify

const TOKEN_URL = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing'

async function getAccessToken() {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=refresh_token&refresh_token=${process.env.SPOTIFY_REFRESH_TOKEN}`,
  })

  const data = await res.json()
  return data.access_token
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache, no-store')

  try {
    const token    = await getAccessToken()
    const response = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.status === 204 || response.status >= 400) {
      return res.json({ isPlaying: false })
    }

    const song = await response.json()

    if (!song?.is_playing || !song?.item) {
      return res.json({ isPlaying: false })
    }

    return res.json({
      isPlaying: true,
      title:    song.item.name,
      artist:   song.item.artists.map(a => a.name).join(', '),
      album:    song.item.album.name,
      albumArt: song.item.album.images[0]?.url ?? null,
      songUrl:  song.item.external_urls.spotify,
    })
  } catch (err) {
    return res.status(500).json({ isPlaying: false, error: err.message })
  }
}
