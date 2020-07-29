import 'reflect-metadata'

const INSTANCES_SYMBOL = Symbol('INSTANCES_SYMBOL')
export const MULTIPLE_SYMBOL = Symbol('MULTIPLE')
const ANNOTATION_SYMBOL = Symbol('ANNOTATION_SYMBOL')

// 获取实例，自动鉴别是否需要单例
export function getInstance(Cls: any): any {
  // 单例就单独生成，不缓存
  const isMultiple: boolean = Reflect.getMetadata(MULTIPLE_SYMBOL, Cls)
  let instance: any = null
  if (!isMultiple) {
    // 单例先找缓存，没有的话才新建，然后缓存
    instance = Reflect.getMetadata(INSTANCES_SYMBOL, Cls)
    if (instance) {
      return instance
    }
  }

  // 找到需要注入的类型
  const paramsTypes = Reflect.getMetadata('design:paramtypes', Cls) || []
  // 根据类型找到类

  // 实例化所有类，然后作为参数，生成这个对象
  const params: any[] = paramsTypes.map((p: any) => getInstance(p))
  instance = new (Cls as any)(...params)

  if (!isMultiple) {
    Reflect.defineMetadata(INSTANCES_SYMBOL, instance, Cls) // 作为单例缓存进去
  }
  return instance
}


// TODO 被装饰的类记录都有哪些注解
// export class AnnotationItem {
//   constructor(public annotation: any, public args: []) {}
// }

// export class AnnotationHelper {
//   public static setAnnotation(cls: any, annotation: any, args: any[] = []) {
//     const annotations = AnnotationHelper.getAnnotation(cls)
//     annotations.set(annotation, args)
//   }
//   public static getAnnotation(cls: any): Map<any, any[]> {
//     return Reflect.getMetadata(ANNOTATION_SYMBOL, cls) || new Map()
//   }
// }
