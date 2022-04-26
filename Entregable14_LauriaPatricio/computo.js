process.on('message', cant => {
  let objeto = {}
  for (let i = 0; i < cant; i++) {

    let numAle = Math.floor(Math.random() * (1000 - 1) + 1)
    objeto[numAle] = (objeto[numAle] + 1) || 1

  }
  process.send(objeto)
})
