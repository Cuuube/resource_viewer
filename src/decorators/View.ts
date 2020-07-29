import { componentFactory } from 'vue-class-component/lib/component'
import { Injectable } from './Base'


export class ViewBuffer {
  private static routesByDecorator: any = [];
  
  public static addRoute(name: string, path: string, component: any) {
    ViewBuffer.routesByDecorator.push({
      path: path.startsWith('/') ? path.substr(1) : path,
      name,
      component
    })
  }

  public static getRoutes(): any[] {
    return ViewBuffer.routesByDecorator
  }
}

export function View(options: Dict<any>) {
  const { name, path } = options
  delete options[name]
  delete options[path]
  return (constructor: any) => {
    constructor = Injectable(constructor)
    const component = componentFactory(constructor, options)

    // 加到route里
    if (path) {
      ViewBuffer.addRoute(name, path, component)
    }
    return <any>component
  }
}
