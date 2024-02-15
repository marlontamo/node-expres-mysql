import express from 'express'
import { getNotes, getNote, createNote, updateNote , deleteNote} from './database.js'

const app = express()

app.use(express.json())
//get all notes
app.get("/notes", async (req, res) => {
  const notes = await getNotes()
  res.send(notes)
})
//single note
app.get("/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await getNote(id)
  res.send(note)
})
//create note
app.post("/notes", async (req, res) => {
  const { title, contents } = req.body
  const note = await createNote(title, contents)
  res.status(201).send(note)
})
//update note
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id
  const { title,contents} = req.body
  const note = await updateNote(id,title,contents)
  res.send(note)
})
//delete note
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id
  const note = await deleteNote(id)
  res.send(note)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke 💩')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})