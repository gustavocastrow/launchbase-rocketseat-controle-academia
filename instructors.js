const fs = require('fs')
const data = require("./data.json")

//show

exports.show = function (req, res) {

  const { id } = req.params

  const foundInstructor = data.instructors.find(function(instructor){

    return id == instructor.id 
   

  })

  if (!foundInstructor) return res.send("Instructor not found")

  function age(timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0)
    

  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: "",
  }


  return res.render("instructors/show", { instructor })

}


// create

exports.post = function (req, res) {

  const keys = Object.keys(req.body)
  //["avatar_url","name","birth","gender","services"]

  for (key of keys) {
    //req.body.key == ""
    if (req.body[key] == "") {
      return res.send("Please fill all fields!")
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)



  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error")

    return res.redirect("/instructors")

  })
  //return res.send(req.body)
}
