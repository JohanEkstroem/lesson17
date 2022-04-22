import Cookies from 'cookies';
import Iron from '@hapi/iron';
import { GetServerSideProps, NextPage } from 'next';
import { ENC_KEY } from './api/login';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const sessionStr = cookies.get('session');

  if (sessionStr) {
    try {
      const session = await Iron.unseal(sessionStr, ENC_KEY, Iron.defaults);
      if (session.loggedIn) {
        return {
          props: {
            username: session.username,
          },
        };
      }
    } catch (err) {
      //Incorrect enctrypted string
    }
  }

  return {
    notFound: true,
  };
};
type SecretPageProps = {
  username: string;
};
const MyPage: NextPage<SecretPageProps> = ({ username }) => {
  return (
    <div>
      <h1>Mina sidor</h1>
      <h4>Welcome, {username}</h4>
    </div>
  );
};

export default MyPage;
