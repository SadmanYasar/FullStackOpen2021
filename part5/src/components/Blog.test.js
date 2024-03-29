import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog>', () => {
  const blog = {
    title: 'This is a title',
    author: 'SY17',
    url: 'www.rickroll.com',
    likes: 10,
    user: {
      username: 'username'
    }
  }

  let component
  let Update
  let Delete

  beforeEach(() => {
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify({ username: 'username' })
    )

    Update = jest.fn()
    Delete = jest.fn()
    component = render(
      <Blog blog={blog} Update={Update} Delete={Delete}/>
    )
  }
  )

  test('shows title and author only initially', () => {
    expect(component.container).toHaveTextContent('This is a title')
    expect(component.container).toHaveTextContent('SY17')

    const div = component.container.querySelector('.togglable')
    expect(div).toHaveStyle('display: none')
  })

  test('shows url and likes after view button clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglable')
    expect(div).not.toHaveStyle('display: none')
    expect(component.container).toHaveTextContent('www.rickroll.com')
    expect(component.container).toHaveTextContent('10')
  })

  test('if liked twice, event handler called twice', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)

    expect(Update.mock.calls).toHaveLength(1)

    fireEvent.click(likeButton)
    expect(Update.mock.calls).toHaveLength(2)
  })
})

afterAll(() => {
  window.localStorage.removeItem('loggedBlogAppUser')
}
)