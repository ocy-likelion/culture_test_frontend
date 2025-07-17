//  TypeScript는 .svg 파일을 JS/TS 모듈로 인식하지 않기 때문에 import spinner from "./spinner.svg"처럼 가져오려면 타입을 알려주는 .d.ts 파일이 필요
// 'd.ts' 확장자: TypeScript 타입 선언으로 인식
declare module "*.svg" {
  const content: string;
  export default content;
}
