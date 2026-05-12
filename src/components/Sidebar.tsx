import type { JSX } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { flattenRoutes } from '../router/routes'
import { appRoutes } from '../router'

interface MenuItem {
  path: string
  title: string
  icon?: string
  requiresAuth?: boolean
}

function Sidebar(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()

  // 获取所有路由并转换为菜单项
  const flatRoutes = flattenRoutes(appRoutes)

  // 过滤出需要显示的菜单项（排除登录页、错误页等）
  const menuItems: MenuItem[] = flatRoutes
    .filter((route) => {
      // 排除的路径
      const excludedPaths = ['/', '/login', '/403', '*']
      return !excludedPaths.includes(route.path)
    })
    .map((route) => ({
      path: route.path,
      title: route.meta?.title || route.path,
      requiresAuth: route.meta?.requiresAuth,
    }))

  const handleMenuClick = (path: string) => {
    navigate(path)
  }

  return (
    <div
      style={{
        width: '240px',
        height: '100vh',
        backgroundColor: '#001529',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        overflowY: 'auto',
      }}
    >
      {/* Logo / 标题 */}
      <div
        style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '20px' }}>ReactFX 系统</h2>
      </div>

      {/* 用户信息 */}
      {user && (
        <div
          style={{
            padding: '15px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <div style={{ fontSize: '14px', opacity: 0.8 }}>欢迎，{user.username}</div>
          <div style={{ fontSize: '12px', opacity: 0.6, marginTop: '5px' }}>
            角色：{user.roles.join(', ')}
          </div>
        </div>
      )}

      {/* 菜单列表 */}
      <nav style={{ flex: 1, padding: '10px 0' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <div
              key={item.path}
              onClick={() => handleMenuClick(item.path)}
              style={{
                padding: '12px 20px',
                cursor: 'pointer',
                backgroundColor: isActive ? '#1890ff' : 'transparent',
                borderLeft: isActive ? '3px solid #1890ff' : '3px solid transparent',
                transition: 'all 0.3s',
                marginBottom: '2px',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.1)'
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                }
              }}
            >
              <span style={{ fontSize: '14px' }}>{item.title}</span>
            </div>
          )
        })}
      </nav>

      {/* 底部退出按钮 */}
      <div
        style={{
          padding: '15px 20px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <button
          onClick={logout}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,77,79,0.8)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'
          }}
        >
          退出登录
        </button>
      </div>
    </div>
  )
}

export default Sidebar
