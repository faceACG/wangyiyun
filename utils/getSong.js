export default (listArr) => {
   return (listArr.reduce((str, item) => {
     return str + `${item},`
   }, '')).slice(0, -1);
}