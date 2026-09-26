export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  try {
    const payload = req.body;
    
    // Server-side forward to Supabase with proper Origin
    const response = await fetch('https://gifabmhvfxqleilpipsz.supabase.co/functions/v1/scholarship-waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'https://truststack.academy'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json().catch(() => ({}));
    
    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: data.message || 'We could not submit your application. Please try again.'
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message || 'Internal error submitting application'
    });
  }
}
