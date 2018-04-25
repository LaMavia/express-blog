export default <T>(data: T) => new Promise((res) => {
  let copy 
  if(Array.isArray(data)) copy = data.slice()
  else if(typeof data === "object") copy = Object.assign({}, data)
  else copy = data
  return res(copy)
})