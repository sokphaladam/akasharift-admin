export function CheckValidate(object: any, target: string[]){
  for(const x of target){
    if(!object[x]) return {
      type: x,
      msg: x+" is invalid"
    }
  }

  return null;
}