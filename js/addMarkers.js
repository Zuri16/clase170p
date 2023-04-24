AFRAME.registerComponent("create-markers", {
  init: async function(){
    var escena=document.querySelector("#main-scene")
    var dishes = await this.getDishes()
    dishes.map(dish => {
      var mark = document.createElement("a-marker")
      mark.setAttribute("id", dish.id)
      mark.setAttribute("type", "pattern")
      mark.setAttribute("url", dish.marker_pattern_url)
      mark.setAttribute("cursor", {rayOrigin:"mouse"})
      mark.setAttribute("markerhandler", {})
      escena.appendChild(mark)

      var modelo = document.createElement("a-entity")
      modelo.setAttribute("id", `model-${dish.id}`)
      modelo.setAttribute("position", dish.model_geometry.position)
      modelo.setAttribute("rotation", dish.model_geometry.rotation)
      modelo.setAttribute("scale", dish.model_geometry.scale)
      modelo.setAttribute("gltf-model", `url(${dish.model_url})`)
      modelo.setAttribute("gesture-handler", {})
      escena.appendChild(modelo)

      var ingre_plano = document.createElement("a-plane")
      ingre_plano.setAttribute("id", `main-plane-${dish.id}`)
      ingre_plano.setAttribute("position", {x:0, y:0, z:0})
      ingre_plano.setAttribute("rotation", {x:-90, y:0, z:0})
      ingre_plano.setAttribute("width", 1.7)
      ingre_plano.setAttribute("height", 1.5)
      escena.appendChild(ingre_plano)

      var dish_title = document.createElement("a-plane")
      dish_title.setAttribute("id", `title-plane-${dish.id}`)
      dish_title.setAttribute("position", {x:0, y:0.89, z:0.02})
      dish_title.setAttribute("rotation", {x:0, y:0, z:0})
      dish_title.setAttribute("width", 1.69)
      dish_title.setAttribute("height", 0.3)
      dish_title.setAttribute("material", {color:"#F0C30F"})
      escena.appendChild(dish_title)

      var text_title = document.createElement("a-entity")
      text_title.setAttribute("id", `dich-title-${dish.id}`)
      text_title.setAttribute("position", {x:0, y:0, z:0.1})
      text_title.setAttribute("rotation", {x:0, y:0, z:0})
      text_title.setAttribute("text", {font:"monoid", color:"black", width:1.8, height:1, align:"center", value:`${dish.nombre.toUpperCase()}`})
      escena.appendChild(text_title)

      var text_ingre = document.createElement("a-entity")
      text_ingre.setAttribute("id", `ingredientes-${dish.id}`)
      text_ingre.setAttribute("position", {x:0.3, y:0, z:0.1})
      text_ingre.setAttribute("rotation", {x:0, y:0, z:0})
      text_ingre.setAttribute("text", {font:"monoid", color:"black", width:2, align:"left", value:`${dish.ingredientes.join("\n\n")}`})
      escena.appendChild(text_ingre)
    })
  },
  getDishes: async function(){
    return await firebase
    .firestore()
    .collection("platillos")
    .get()
    .then(snap => {
      return snap.docs.map(doc => doc.data())
    })
  }

  });
