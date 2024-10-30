import { FormEvent, useState } from 'react';
import logo from '../../assets/logo.svg';
import { Input } from '../../components/Input';
import './styles.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { login }  = useAuth();

    async function handleSubmitLogin(e: FormEvent) {
        e.preventDefault();
        login(email, password).then((_response) => {
            navigate('/dashboard');
        }).catch((_error) => {
            alert('Falha de Autenticação!');
        });
    }

    return (
        <main id="login-page">
            <header>
                <img src={logo} alt="Logo Beprepared" /> 
            </header>
            <form action="" onSubmit={handleSubmitLogin}>
                <Input label='E-mail' name='email' type='email' onChange={(e) => setEmail(e.target.value)} />
                <Input label='Senha' name='password' type='password' onChange={(e) => setPassword(e.target.value)} />

                <a href='/' type="button">Esqueci a senha</a>
                <button type="submit"> Entrar </button>
            </form>    
        </main>
    );
}