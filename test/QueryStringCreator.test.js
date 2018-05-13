const assert = require('assert')

const {
  QueryStringCreator,
  generateString
} = require('../helpers/QueryStringCreator')

const queryStringCreator = new QueryStringCreator()

describe('Recoder Class', () => {
  describe('calcWeight()', () => {
    it('should return a horse weight in lb and pounds', () => {
      const base = [532, 123, 0, 99]
      const calc = base.map(queryStringCreator.calcWeight)
      const expected = ['38-0', '8-11', '0-0', '7-1']
      assert.deepEqual(calc, expected)
    })
  })
  describe('makeDraw() valid', () => {
    it('should return a horse draw string in draw=4 format, if > 0', () => {
      const base = [3, 14]
      const calc = base.map(queryStringCreator.makeDraw)
      const expected = ['3', '14']
      assert.deepEqual(calc, expected)
    })
  })
  describe('makeDraw() false', () => {
    it('should return empty if is 0', () => {
      const base = [0, 0]
      const calc = base.map(queryStringCreator.makeDraw)
      const expected = [' ', ' ']
      assert.deepEqual(calc, expected)
    })
  })
  describe('calcForm()', () => {
    it('should return a form string', () => {
      const base = [
        [
          {
            form_figure: '0'
          },
          {
            form_figure: '3'
          },
          {
            form_figure: '6'
          },
          {
            form_figure: '7'
          },
          {
            form_figure: '4'
          },
          {
            form_figure: '4'
          }
        ],
        [
          {
            form_figure: '0'
          },
          {
            form_figure: '3'
          },
          {
            form_figure: '6'
          },
          {
            form_figure: '7'
          },
          {
            form_figure: '4'
          },
          {
            form_figure: '4'
          }
        ]
      ]
      const calc = base.map(queryStringCreator.calcForm)
      const expected = ['447630', '447630']
      assert.deepEqual(calc, expected)
    })
  })
  describe('generateString()', () => {
    it('it should turn a object into a query string', () => {
      const base = { data: 'hello' }
      const calc = generateString(base)
      const expected = '?data=hello'
      assert.equal(calc, expected)
    })
  })
  describe('generateString() encode', () => {
    it('it should turn a object into a query string with URI encoding', () => {
      const base = { data: 'hello £ $ data' }
      const calc = generateString(base)
      const expected = '?data=hello%20%C2%A3%20%24%20data'
      assert.equal(calc, expected)
    })
  })
  describe('parseHtml()', () => {
    it('should parse HTML tags', () => {
      const base = ['<a>Im a string</a>', '<b><p>test</p></b>']
      const calc = base.map(queryStringCreator.parseHtml)
      const expected = ['Im a string', 'test']
      assert.deepEqual(calc, expected)
    })
  })
  describe('baseEncode()', () => {
    it('should base 64 encode', () => {
      const base = ['1234567', 'string with chars']
      const calc = base.map(queryStringCreator.baseEncode)
      const expected = ['MTIzNDU2Nw==', 'c3RyaW5nIHdpdGggY2hhcnM=']
      assert.deepEqual(calc, expected)
    })
  })
})
