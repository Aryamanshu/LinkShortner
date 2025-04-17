export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  // Redirect to a page that will handle the code
  res.redirect(`/auth/google?code=${code}`);
}
