var expect = require('expect');

var {generateMessage} = require('./message');

describe('generate Message', ()=>{
    it ('should generate correct message', ()=>{
        var from = 'ehsan';
        var text = 'test message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number')
        expect(message).toEqual(expect.objectContaining({from, text}))
    })
})