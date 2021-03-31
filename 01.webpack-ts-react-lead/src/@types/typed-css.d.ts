// typed-css.d.ts
// scss模块声明
declare module '*.scss' {
  const content: {[key: string]: any}
  export default content
}
// less模块声明
declare module '*.less' {
  const content: { [key: string]: any }
  export default content
}