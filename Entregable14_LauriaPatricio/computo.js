process.on('message', cant =>{
    console.log("HIJO cantidad recidida"+cant)
    let contnueva=+cant-5
    console.log("HIJO cantidad enviada"+contnueva)
    process.send(contnueva)
})
 //const forked = fork('./computo.js')
 /* 
 // forked.send(cant)
  console.log("cantidad envaida"+cant)
  
  forked.on('message', sum => {
    console.log("info recbida en el padre por el hijo"+sum)
    console.log(sum)
  })
*/