import axios from 'axios'

const API_URL = '/api/tickets/'

// Get all notes
const getNotes = async (ticketId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.get(API_URL + ticketId + '/notes', config)
    return response.data
}

// Create a new note
const createNote = async (ticketId, noteText, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } }
    const response = await axios.post(API_URL + ticketId + '/notes', {
        text: noteText
    }, config)
    console.log(response)
    return response.data
}

const noteService = {
    getNotes,
    createNote,
}

export default noteService