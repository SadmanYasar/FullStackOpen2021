import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog>', () => {
  beforeEach(() => {
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify({ username: 'username' })
    )
  }
  )
  test('shows title and author only', () => {
    const blog = {
      title: 'This is a title',
      author: 'SY17',
      url: 'www.rickroll.com',
      likes: 10,
      user: {
        username: 'username'
      }
    }

    const Update = jest.fn()
    const Delete = jest.fn()
    const component = render(
      <Blog blog={blog} Update={Update} Delete={Delete}/>
    )

    const renderedBlog = component.container.querySelector('.blog')
    console.log(prettyDOM(renderedBlog))

    expect(component.container).toHaveTextContent('This is a title')
    expect(component.container).toHaveTextContent('SY17')

    const div = component.container.querySelector('.togglable')
    expect(div).toHaveStyle('display: none')
  })

})

afterAll(() => {
  window.localStorage.removeItem('loggedBlogAppUser')
}
)