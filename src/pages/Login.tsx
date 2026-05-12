import type { JSX } from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login(): JSX.Element {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    // 如果已经登录，重定向到首页
    useEffect(() => {
        if (isAuthenticated) navigate('/top')
    }, [isAuthenticated])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        // 去除用户名和密码的前后空格
        const trimmedUsername = username.trim()
        const trimmedPassword = password.trim()

        try {
            const success = await login(trimmedUsername, trimmedPassword)
            if (success) {
                navigate('/top')
            } else {
                setError('用户名或密码错误')
            }
        } catch (err) {
            setError('登录失败，请稍后重试')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f0f2f5',
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}>
            <div style={{
                width: '400px',
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>系统登录</h2>

                {error && (
                    <div style={{
                        padding: '10px',
                        marginBottom: '20px',
                        backgroundColor: '#ffebee',
                        color: '#c62828',
                        borderRadius: '4px',
                        border: '1px solid #ffcdd2',
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                            用户名
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value.replace(/\s/g, ''))}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                fontSize: '14px',
                                transition: 'border-color 0.3s',
                            }}
                            placeholder="请输入用户名"
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>
                            密码
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value.replace(/\s/g, ''))}
                            style={{
                                width: '100%',
                                padding: '10px 12px',
                                border: '1px solid #d9d9d9',
                                borderRadius: '4px',
                                boxSizing: 'border-box',
                                fontSize: '14px',
                                transition: 'border-color 0.3s',
                            }}
                            placeholder="请输入密码"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: loading ? '#ccc' : '#1890ff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '16px',
                            transition: 'background-color 0.3s',
                        }}
                    >
                        {loading ? '登录中...' : '登录'}
                    </button>
                </form>

                <div style={{
                    marginTop: '20px',
                    padding: '15px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    fontSize: '13px',
                    color: '#666',
                }}>
                    <p style={{ margin: '5px 0', fontWeight: '500' }}>测试账号：</p>
                    <p style={{ margin: '5px 0' }}>管理员：admin / admin123</p>
                    <p style={{ margin: '5px 0' }}>普通用户：user / user123</p>
                </div>
            </div>
        </div>
    )
}

export default Login
