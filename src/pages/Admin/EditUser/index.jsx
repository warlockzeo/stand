import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Row } from 'react-bootstrap';
import { Input } from '../../../components';
import { addUser, updateUser } from '../../../features/users/usersSlice';
import { Wrap } from './styles';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [user, setUser] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [password, setPassword] = useState({});

  const equalPasswords =
    changePassword || !id
      ? password?.password &&
        password?.repassword &&
        password?.password === password?.repassword
      : true;

  const notEmpty = user?.name && user?.login && user?.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const onSubmit = () => {
    if (id) {
      dispatch(updateUser({ ...user, password: password.password }))
        .then(() => navigate('/admin/users'))
        .catch((error) => console.error(error));
    } else {
      dispatch(addUser({ ...user, password: password.password }))
        .then(() => navigate('/admin/users'))
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    if (users) {
      setUser(users.filter((user) => user.id.toString() === id)[0]);
    }
  }, [users, id, dispatch]);

  return (
    <Wrap className='container'>
      <h1>{id ? 'Editar' : 'Criar'} Usuário</h1>
      <Form className='col-12' as={Row} onSubmit={onSubmit}>
        <Input
          className='col-md-6'
          label='Nome'
          onChange={handleChange}
          name='name'
          defaultValue={user?.name}
          required
        />
        <Input
          className='col-md-6'
          label='Login'
          onChange={handleChange}
          name='login'
          defaultValue={user?.login}
          required
        />
        {id ? (
          <Form.Group className='col-md-12' style={{ margin: '10px 0' }}>
            <Form.Check
              type='checkbox'
              name='change-password'
              label='Mudar palavra passe'
              onChange={() => setChangePassword(!changePassword)}
            />
          </Form.Group>
        ) : null}
        {changePassword || !id ? (
          <>
            <Input
              className='col-md-6'
              label='Palavra passe'
              onChange={handleChangePassword}
              name='password'
              type='password'
            />
            <Input
              className='col-md-6'
              label=' Repita a palavra passe'
              onChange={handleChangePassword}
              name='repassword'
              type='password'
            />
            {!equalPasswords ? 'Palavra passe não confere' : null}
          </>
        ) : null}
        <div
          className='form-buttons gap-2'
          style={{ border: 'solid 20px #eee', backgroundColor: '#000' }}
        >
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => navigate('/admin/users')}
          >
            Voltar
          </button>
          <button
            type='button'
            className='btn btn-success'
            onClick={onSubmit}
            disabled={!notEmpty && !equalPasswords}
          >
            Guardar Usuário
          </button>
        </div>
      </Form>
    </Wrap>
  );
};

export default EditUser;
