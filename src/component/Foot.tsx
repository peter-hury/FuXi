import type { JSX } from 'react'

function Foot(): JSX.Element {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>关于系统</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>
        ReactFX 是一个现代化的前端应用框架，采用最新的技术栈构建。
      </p>
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e8e8e8' }}>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#999' }}>版本：v1.0.0</p>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#999' }}>技术栈：React 19 + TypeScript 6 + Vite 8</p>
        <p style={{ margin: '5px 0', fontSize: '14px', color: '#999' }}>版权所有 © 2026 ReactFX</p>
      </div>
    </div>
  )
}

export default Foot
