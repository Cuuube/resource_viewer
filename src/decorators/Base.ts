import 'reflect-metadata'
import { getInstance, MULTIPLE_SYMBOL } from './utils'

const CONSTRUCTOR_ARGS = Symbol('CONSTRUCTOR_ARGS')
const injectableList = new Map<string, any>()


export function Injectable(target: any): any {
  // 定义自己构造器的类型
  const paramsTypes: any[] = Reflect.getMetadata('design:paramtypes', target)
  Reflect.defineMetadata(CONSTRUCTOR_ARGS, paramsTypes, target)

  // 把可注入对象放到里面hub里
  injectableList.set(target.name, target)
  return target
}

export function Injection(cls: any, key: any): any {
  // 获取key的类型
  const attributeType: any = Reflect.getMetadata('design:type', cls, key)
  // 实例化时通过注入
  const proxy: any = getInstance(attributeType)
  return {
    get: () => {
      return proxy
    }
  }
}

export function Multiple(target: any): any {
  Reflect.defineMetadata(MULTIPLE_SYMBOL, true, target)
  return target
}
