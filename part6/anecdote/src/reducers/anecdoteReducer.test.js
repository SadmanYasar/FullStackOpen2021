import deepFreeze from 'deep-freeze';
import anecdoteReducer from './anecdoteReducer';

describe('Anecdote reducer', () => {
    test('sets undefined state to initialstate', () => {
        const action = {
            type: 'SOME ACTION',
            data: {}
        }

        const newState = anecdoteReducer(undefined, action)
        expect(newState).toHaveLength(6)
        expect(newState[0].content).toContain('If it hurts, do it more often')
    });

    test('can vote', () => {
        const state = [
            {
                content: 'first anecdote',
                id: 1,
                votes: 0
            },
            {
                content: 'second anecdote',
                id: 2,
                votes: 0
            }
        ]
        const action = {
            type: 'VOTE',
            data: {
                id: 1
            }
        }

        deepFreeze(state)
        const newState = anecdoteReducer(state, action)
        expect(newState[0].votes).toBe(1)
    });
});
