import type { JSX } from 'react'
import { useAuth } from '../context/AuthContext'

function Dashboard(): JSX.Element {
  const { user, logout, hasRole } = useAuth()

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h2>仪表盘（受保护页面）</h2>

      <div style={{
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}>
        <h3>用户信息</h3>
        <p><strong>用户名：</strong>{user?.username}</p>
        <p><strong>角色：</strong>{user?.roles.join(', ')}</p>
        <p><strong>是否为管理员：</strong>{hasRole('admin') ? '是' : '否'}</p>
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        退出登录
      </button>
    </div>
  )
}

export default Dashboard
