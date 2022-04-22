import Cookies from 'cookies';
import { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = new Cookies(context.req, context.res);
  const loggedIn = cookies.get('loggedin');
  if (loggedIn == 'yes') {
    return {
      props: {},
    };
  } else {
    return {
      notFound: true,
    };
  }
};

const MyPage: NextPage = () => {
  return (
    <div>
      <h1>Mina sidor</h1>
    </div>
  );
};

export default MyPage;
