export default (arr,length,target=[])=>{
  let pre = 0;
  arr.forEach((item,index)=>{
    if(index - pre === length){
      target.push([...arr.slice(pre, index)]);
      pre = index;
    }
  })
  return target
}