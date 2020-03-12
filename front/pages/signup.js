import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';

// Custom Hook
export const useInput = (initValue = null) => {
  const [value, setter] = useState(initValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);

  return [value, handler];
}

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  // Custom Hook 으로 중복제거
  const [id, setId] = useInput('');
  const [nick, setNick] = useInput('');
  const [password, setPassword] = useInput('');

  // ant v3 -> v4 되면서 onSubmit이 제거됨.
  const onFinish = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }

    if(!term) {
      return setTermError(true);
    }
   
    console.log({
      id,
      nick,
      password,
      passwordCheck,
      term
    });

  }, [password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);
  
  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <Form onFinish={onFinish} style={{ padding: 10 }}>
      <div>
        <label htmlFor="user-id">아이디</label>
        <br/>
        <Input name="user-id" value={id} required onChange={setId} />
      </div>
      <div>
        <label htmlFor="user-nick">닉네임</label>
        <br/>
        <Input name="user-nick" value={nick} required onChange={setNick} />
      </div>
      <div>
        <label htmlFor="user-password">비밀번호</label>
        <br/>
        <Input name="user-password" type="password" value={password} required onChange={setPassword} />
      </div>
      <div>
        <label htmlFor="user-password-chk">비밀번호체크</label>
        <br/>
        <Input name="user-password-chk" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
        {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
      </div>
      <div>
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>제 말을 들을 것을 동의합니다.</Checkbox>
        {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
      </div>
      <div style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit">가입하기</Button>
      </div>
    </Form>
  );
}

export default Signup;
