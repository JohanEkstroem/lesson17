import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

// INSECURE! Do not do this. Only for the sake of example
const USERS: Record<string, string> = {
  richard: 'secret',
  marcus: 'sosecret',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const { username, password } = req.body;

    if (USERS[username] && USERS[username] == password) {
      const cookies = new Cookies(req, res);
      cookies.set(
        'session',
        JSON.stringify({
          username: username,
          loggedIn: true,
        })
      );
      res.status(200).end();
    } else {
      res.status(401).end();
    }
    console.log(req.body.username, req.body.password);
  } else {
    return res.status(405).end();
  }
}
