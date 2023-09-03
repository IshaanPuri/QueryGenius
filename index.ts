import express, { Application, Request, Response} from "express"
import cors from "cors"
import OpenAI from 'openai'
const PORT: number = 8000

const app: Application = express()
app.use(cors())
app.use(express.json())

const API_KEY: string = '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';

const ai = new OpenAI({
    apiKey: API_KEY // This is also the default, can be omitted
  })

app.post("/completions", async ( req: Request, res: Response) => {
    try {
        const completion = await ai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": "Create a SQL request to " + req.body.message}],
        })
        res.send(completion.choices[0].message)
    } catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})




app.listen(PORT, () => console.log('Your Server is runninon on port ${PORT}'))