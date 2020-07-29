import { Injection, Injectable } from './Base'


export function Service(constructor: any) {
  return Injectable(constructor)
}

export function Resource(vue: Vue, key: string): any {
  return Injection(vue, key)
}