export function shrinkDown(value:string, len:number=5) {
  return `${value.slice(0, len)}...${value.slice(value.length - len)}`;
}