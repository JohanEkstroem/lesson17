import Cookies from 'cookies';
import { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const sessionStr = cookies.get('session');
  if (sessionStr) {
    const session = JSON.parse(sessionStr);

    if (session.loggedIn) {
      return {
        props: { username: session.username },
      };
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
