const listHelper = require('../utils/list-helper')

describe('total likes', () => {
  const emptyList = []

  const listWithOneBlog = [
    {
      _id: '1bb5b942352ab868772f87ee',
      title: 'A',
      author: 'B',
      url: 'C',
      likes: 2,
      __v: 0
    }
  ]

  const listWithTwoBlogs = [
    {
      _id: '61a55ec40c300f589473f987',
      title: 'R',
      author: 'T',
      url: 'G',
      likes: 6,
      __v: 0
    },
    {
      _id: 'fda1d22c5e694a857eccc02b',
      title: 'Y',
      author: 'N',
      url: 'U',
      likes: 1,
      __v: 0
    }
  ]

  test('with empty list returns 0', () => {
    expect(listHelper.totalLikes(emptyList)).toBe(0)
  })

  test('with a list of one blog returns likes of that blog', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(2)
  })

  test('with a list of several blogs returns the sum of the likes', () => {
    expect(listHelper.totalLikes(listWithTwoBlogs)).toBe(7)
  })
})