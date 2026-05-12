import type { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

function SystemLayout(): JSX.Element {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      {/* 左侧侧边栏 */}
      <Sidebar />

      {/* 右侧内容区域 */}
      <main
        style={{
          flex: 1,
          marginLeft: '240px',
          padding: '24px',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default SystemLayout
