import { NextApiRequest, NextApiResponse } from 'next';
import Iron from '@hapi/iron';
import Cookies from 'cookies';

// INSECURE! Do not do this. Only for the sake of example
const USERS: Record<string, string> = {
  richard: 'secret',
  marcus: 'sosecret',
};

export const ENC_KEY =
  "C&#]F-?)3yvcK`^FKf(H[vL.#cDLm;yC9u?fcL^3{>@vVzg'@Dz%SM3k;<7!uc<G";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const { username, password } = req.body;

    if (USERS[username] && USERS[username] == password) {
      const cookies = new Cookies(req, res);
      cookies.set(
        'session',
        await Iron.seal(
          { username: username, loggedIn: true },
          ENC_KEY,
          Iron.defaults
        )
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
