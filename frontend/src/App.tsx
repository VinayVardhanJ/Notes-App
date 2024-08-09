import { Alert } from 'react-bootstrap';
import Header from './components/Header';
import NotesView from './components/NotesView';
import { useEffect, useState } from 'react';

function App() {

  const [view, setView] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setView(false)
    }, 5000)
  }, []);

  return (
    <>
      {view &&
        <Alert>Please do refresh few times if notes did not appear as backend is hosted on a free hosting service it is not up always</Alert>
      }
      <Header />
      <NotesView />
    </>
  );
};

export default App;
