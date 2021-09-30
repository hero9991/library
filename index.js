import express from "express"

const app = express()

app.get("/data", (req, res) => {
    res.send({
        firstName: "some",
        lastName: "Mills"
    })
})

app.listen(process.env.PORT || 3003)