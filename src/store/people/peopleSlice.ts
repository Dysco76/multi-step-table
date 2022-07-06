import { createSlice } from '@reduxjs/toolkit';
import { dummyPeople } from '../../dummyData';
import { v4 as uuidv4 } from 'uuid';

export const peopleSlice = createSlice({
  name: 'people',
  initialState: dummyPeople,
  reducers: {
    addPerson(state, action) {
      return [...state, { ...action.payload, id: uuidv4() }];
    },
    removePerson(state, action) {
      return state.filter((person) => person.id !== action.payload.id);
    },
  },
});
