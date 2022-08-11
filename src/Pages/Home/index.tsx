import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputGroup from '../../Components/InputGroup';
import { PrimaryButton, SecondaryButton } from '../../Components/StyledButton';
import { IUser } from '../../types';
import './style.scss';
import UserList from './UserList';

const Home = () => {
  const [appUsers, setAppUsers] = useState<IUser[]>([]);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthorized = localStorage.getItem('app-auth');
    if (!isAuthorized || isAuthorized === 'false') {
      navigate('/login');
    }

    const localUsers = localStorage.getItem('app-users');
    if  (localUsers) {
      setAppUsers(JSON.parse(localUsers));
    }
  }, []);

  const handleLogOff = () => {
    localStorage.removeItem('app-auth');
    navigate('/login');
  };

  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilter(e.target.value);
  };

  const filteredUsers = () => {
    return appUsers.filter((item: IUser) => item.email.includes(filter));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className='homeContainer'>
      <div className='homeTitle'>
        User List
      </div>

      <InputGroup
        inputValue={filter}
        title=''
        placeholder='Search for Email'
        setChange={handleFilter}
      />
      <div className='tableContainer'>
        {filteredUsers().length <= 0 
          ? <div className='emptyList'>No Entries Found.</div>
          : <UserList userArray={filteredUsers()} page={page} handleChangePage={handleChangePage} />
        }
      </div>

      <div className='buttonsContainer'>
        <PrimaryButton title='Log Off' submit={handleLogOff} />
        <SecondaryButton title='Create User' submit={() => navigate('/signup')} />
      </div>
    </div>
  );
};

export default Home;
