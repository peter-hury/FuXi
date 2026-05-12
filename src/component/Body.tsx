import type { JSX } from 'react'

function Body(): JSX.Element {
  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
      <h2 style={{ margin: '0 0 16px 0', color: '#333' }}>主体内容</h2>
      <p style={{ color: '#666', lineHeight: '1.6' }}>
        这里是系统的主体业务内容区域。你可以在这里展示数据、表单、图表等各种业务组件。
      </p>
      <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            style={{
              padding: '20px',
              backgroundColor: '#fafafa',
              borderRadius: '4px',
              border: '1px solid #e8e8e8',
            }}
          >
            <h4 style={{ margin: '0 0 8px 0', color: '#333' }}>卡片 {item}</h4>
            <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>这是一个示例卡片内容</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Body
