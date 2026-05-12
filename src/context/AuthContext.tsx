import type { JSX } from 'react'
import { createContext, useContext, useState, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'

// 用户信息接口
export interface UserInfo {
  id: string
  username: string
  roles: string[]
}

// 认证上下文接口
interface AuthContextType {
  user: UserInfo | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
}

// 创建认证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// const navigate = useNavigate()

// 模拟用户数据（实际项目中应该从 API 获取）
const mockUsers: Record<string, { password: string; info: UserInfo }> = {
  admin: {
    password: 'admin123',
    info: {
      id: '1',
      username: 'admin',
      roles: ['admin', 'user'],
    },
  },
  user: {
    password: 'user123',
    info: {
      id: '2',
      username: 'user',
      roles: ['user'],
    },
  },
}
/**
 * 认证提供者组件
 */
export function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [user, setUser] = useState<UserInfo | null>(() => {
    // 从 localStorage 恢复用户信息
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    // TODO: 替换为实际的登录 API 调用
    if(user){
      console.log('hhh');
      
    }else{
        const mockUser = mockUsers[username]

    if (mockUser && mockUser.password === password) {
      setUser(mockUser.info)
      localStorage.setItem('user', JSON.stringify(mockUser.info))
      return true
    }
    }

    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('user')
  }, [])

  const hasRole = useCallback(
    (role: string): boolean => {
      return user?.roles.includes(role) ?? false
    },
    [user]
  )

  const hasAnyRole = useCallback(
    (roles: string[]): boolean => {
      if (!user) return false
      return roles.some((role) => user.roles.includes(role))
    },
    [user]
  )

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    hasRole,
    hasAnyRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * 使用认证上下文的 Hook
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
