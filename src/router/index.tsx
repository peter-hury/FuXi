import type { JSX } from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate, useRoutes } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { appRoutes } from './routes'

// 路由元数据接口
export interface RouteMeta {
  title?: string // 页面标题
  requiresAuth?: boolean // 是否需要认证
  roles?: string[] // 允许访问的角色列表
}

// 扩展的路由配置接口
export interface AppRoute extends Omit<RouteObject, 'children'> {
  meta?: RouteMeta
  children?: AppRoute[]
}

/**
 * 路由守卫组件
 * @param requiresAuth - 是否需要认证
 * @param roles - 允许访问的角色
 * @param children - 子组件
 */
function RouteGuard({
  requiresAuth = false,
  roles,
  children,
}: {
  requiresAuth?: boolean
  roles?: string[]
  children: JSX.Element
}): JSX.Element {
  const { isAuthenticated, hasAnyRole } = useAuth()

  // 检查是否需要认证
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // 检查角色权限
  if (roles && roles.length > 0) {
    const hasPermission = hasAnyRole(roles)
    if (!hasPermission) {
      return <Navigate to="/403" replace />
    }
  }

  return children
}

/**
 * 包装路由元素，添加路由守卫
 * @param route - 路由配置
 * @returns 包装后的元素
 */
function wrapRouteWithGuard(route: AppRoute): RouteObject {
  const { element, meta, children, ...rest } = route

  const wrappedElement = element ? (
    <RouteGuard
      requiresAuth={meta?.requiresAuth ?? false}
      roles={meta?.roles}
    >
      {element as JSX.Element}
    </RouteGuard>
  ) : undefined

  const wrappedChildren = children?.map(wrapRouteWithGuard)

  return {
    ...rest,
    element: wrappedElement,
    ...(wrappedChildren && wrappedChildren.length > 0 && { children: wrappedChildren }),
  } as RouteObject
}

// 包装所有路由，添加守卫
const guardedRoutes = appRoutes.map(wrapRouteWithGuard)

function AppRoutes(): JSX.Element | null {
  return useRoutes(guardedRoutes)
}

export default AppRoutes
export { appRoutes }
