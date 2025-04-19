import { BASE_URL } from '../../../../source';

export default async function handler(req, res) {
  const { code } = req.query;

  // Log detailed information for debugging
  console.log('GitHub callback handler:', {
    code: code ? 'Present' : 'Missing',
    BASE_URL,
    'process.env.NEXT_PUBLIC_BASE_URL': process.env.NEXT_PUBLIC_BASE_URL,
    'req.headers.host': req.headers.host,
    'req.headers.referer': req.headers.referer,
    'Full URL': `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host}${req.url}`
  });

  if (!code) {
    return res.status(400).send('No code provided');
  }

  // Redirect to a page that will handle the code
  res.redirect(`/auth/github?code=${code}`);
}
