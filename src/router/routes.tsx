import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import Body from '../component/Body'
import Foot from '../component/Foot'
import Top from '../component/Top'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import SystemLayout from '../layouts/SystemLayout'
import type { AppRoute, RouteMeta } from './index'

/**
 * 创建路由配置的辅助函数
 * @param path - 路由路径
 * @param element - 路由组件
 * @param meta - 路由元数据
 * @param children - 子路由
 * @returns 路由配置对象
 */
export function createRoute(
  path: string,
  element?: JSX.Element,
  meta?: RouteMeta,
  children?: AppRoute[]
): AppRoute {
  return {
    path,
    element,
    meta,
    ...(children && { children }),
  }
}

/**
 * 创建重定向路由
 * @param from - 源路径
 * @param to - 目标路径
 * @returns 路由配置对象
 */
export function createRedirectRoute(from: string, to: string): AppRoute {
  return {
    path: from,
    element: <Navigate to={to} replace />,
  }
}

/**
 * 所有路由配置
 * 在此处集中管理所有路由
 */
export const appRoutes: AppRoute[] = [
  // 登录页面（公开，不使用布局）
  createRoute(
    '/login',
    <Login />,
    {
      title: '登录',
      requiresAuth: false,
    }
  ),

  // 系统主布局（包含侧边栏和内容区）
  createRoute(
    '/',
    <SystemLayout />,
    {
      title: '系统',
      requiresAuth: true,
    },
    [
      // 根路径重定向
      createRedirectRoute('', '/top'),

      // 公开路由（在布局内）
      createRoute(
        'top',
        <Top />,
        {
          title: '顶部页面',
          requiresAuth: false,
        }
      ),

      createRoute(
        'body',
        <Body />,
        {
          title: '主体页面',
          requiresAuth: false,
        }
      ),

      createRoute(
        'foot',
        <Foot />,
        {
          title: '底部页面',
          requiresAuth: false,
        }
      ),

      // 需要认证的路由示例
      createRoute(
        'dashboard',
        <Dashboard />,
        {
          title: '仪表盘',
          requiresAuth: true,
          roles: ['admin', 'user'],
        }
      ),

      // 仅管理员可访问的路由示例
      // createRoute(
      //   'admin',
      //   <AdminPanel />,
      //   {
      //     title: '管理面板',
      //     requiresAuth: true,
      //     roles: ['admin'],
      //   }
      // ),
    ]
  ),

  // 错误页面（不使用布局）
  createRoute('/403', <div><h2>403 - 无权限访问</h2></div>),
  createRoute('*', <div><h2>404 - 页面不存在</h2></div>),
]

/**
 * 获取扁平化的路由列表（用于菜单生成等）
 * @param routes - 路由配置数组
 * @param parentPath - 父路径
 * @returns 扁平化的路由列表
 */
export function flattenRoutes(
  routes: AppRoute[],
  parentPath = ''
): Array<{ path: string; meta?: RouteMeta }> {
  return routes.reduce<Array<{ path: string; meta?: RouteMeta }>>(
    (acc, route) => {
      if (!route.path || route.path === '*') return acc

      const fullPath = parentPath + route.path
      acc.push({
        path: fullPath,
        meta: route.meta,
      })

      // 递归处理子路由
      if (route.children) {
        acc.push(...flattenRoutes(route.children, fullPath.endsWith('/') ? fullPath : fullPath + '/'))
      }

      return acc
    },
    []
  )
}
