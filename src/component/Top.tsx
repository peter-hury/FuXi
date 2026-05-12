import type { JSX } from 'react'

function Top(): JSX.Element {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>首页</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>
        欢迎使用 ReactFX 系统！这是一个基于 React + TypeScript + Vite 的现代化应用。
      </p>
      <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f0f5ff', borderRadius: '4px', border: '1px solid #d6e4ff' }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#1890ff' }}>功能特性</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#666' }}>
          <li>配置式路由管理</li>
          <li>路由守卫与权限控制</li>
          <li>左侧导航菜单</li>
          <li>响应式布局设计</li>
        </ul>
      </div>
    </div>
  )
}

export default Top
