/**
 * 合并多个类名为一个字符串
 * @param classes 要合并的类名列表
 * @returns 合并后的类名字符串
 */
export function classNames(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
} 