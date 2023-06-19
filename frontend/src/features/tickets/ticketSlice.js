import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

// Get user from localstorage

const initialState = {
    tickets: [],
    ticket: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createTicket = createAsyncThunk(
    'ticket/createTicket',
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.createTicket(ticketData, token)
        } catch (error) {
            const message = (
                error.response && 
                error.response.data && 
                error.response.data.message
            ) || 
            error.message || 
            error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTickets = createAsyncThunk(
    'ticket/getTickets',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTickets(token)
        } catch (error) {
            const message = (
                error.response && 
                error.response.data && 
                error.response.data.message
            ) || 
            error.message || 
            error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getTicket = createAsyncThunk(
    'ticket/getTicket',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token
            return await ticketService.getTicket(ticketId, token)
        } catch (error) {
            const message = (
                error.response && 
                error.response.data && 
                error.response.data.message
            ) || 
            error.message || 
            error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const closeTicket = createAsyncThunk(
    'tickets/close',
    async (ticketId, thunkAPI) => {
      try {
            const token = thunkAPI.getState().auth.user.token
            console.log('close slice')
            return await ticketService.closeTicket(ticketId, token)
        } catch (error) {
            const message = (
                error.response && 
                error.response.data && 
                error.response.data.message
            ) || 
            error.message || 
            error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.ticket = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // get Tickets
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.tickets = action.payload
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // get Ticket
            .addCase(getTicket.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
            })
            .addCase(getTicket.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            // close Ticket
            .addCase(closeTicket.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false
                state.isSuccess = true
                state.ticket = action.payload
                state.tickets = state.tickets.map((ticket) => (
                    ticket._id === action.payload._id ? action.payload : ticket
                    ))
            })
            .addCase(closeTicket.rejected, (state, action) => {
                state.isError = true
                state.message = action.payload
            })
    }

})

// whenever create an action i export is from ticketSlice.actions
export const { reset } = ticketSlice.actions
export default ticketSlice.reducer