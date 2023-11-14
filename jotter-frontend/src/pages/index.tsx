import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import TextEditor from '@/components/TextEditor/TextEditor';
import { baseURL } from '@/components/config/config';
import TopBar from '@/components/TopBar/TopBar';

export default function Home() {
  const router = useRouter();
  const [savedState, setSavedState] = useState('');
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      axios.get(
        `${baseURL}/users`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      ).then((res) => {
        if (!res.data.email) {
          localStorage.removeItem('access_token');
          setSavedState('');
          router.push('/');
        }

        if (res.data.email) {
          setAuth(true);
          setSavedState(res.data.saved_state);
          const elem = document.getElementById('text-editor');
          if (elem) {
            elem.innerHTML = res.data.saved_state;
          }
        }
      })
        .catch(() => {
          localStorage.removeItem('access_token');
          setSavedState('');
          router.push('/');
        });
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Jotter</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" />
      </Head>
      <TopBar auth={auth} setAuth={setAuth} />
      <TextEditor savedState={savedState} setSavedState={setSavedState} />
    </div>
  );
}
