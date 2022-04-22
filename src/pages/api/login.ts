import { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == 'POST') {
    const cookies = new Cookies(req, res);
    cookies.set('loggedin', 'yes');
    console.log(req.body.username, req.body.password);
    res.status(200).end();
  } else {
    return res.status(405).end();
  }
}
