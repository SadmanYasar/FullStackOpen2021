import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog>', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'This is a title',
      author: 'SY17',
      url: 'www.rickroll.com',
      likes: 10,
      user: {
        username: 'username'
      }
    }
    window.localStorage.setItem(
      'loggedBlogAppUser', JSON.stringify({ username: 'username' })
    )
    component = render(
      <Blog blog={blog} Update={() => jest.fn()} Delete={() => jest.fn}/>
    )
  }
  )
  test('shows title and author only initially', () => {
    console.log(prettyDOM(component.container))

    expect(component.container).toHaveTextContent('This is a title')
    expect(component.container).toHaveTextContent('SY17')

    const div = component.container.querySelector('.togglable')
    expect(div).toHaveStyle('display: none')
  })

  test('shows url and likes after view button clicked', () => {
    //Make a test which checks that the blog's url and number of likes are shown when the button controlling the shown details has been clicked.

    //SOLUTION
    //get button with value view
    //click it
    //check for url and likes

    const button = component.getByText('View')
    fireEvent.click(button)

    console.log(prettyDOM(component.container))

    const div = component.container.querySelector('.togglable')
    expect(div).not.toHaveStyle('display: none')
    expect(component.container).toHaveTextContent('www.rickroll.com')
    expect(component.container).toHaveTextContent('10')
  })

})

afterAll(() => {
  window.localStorage.removeItem('loggedBlogAppUser')
}
)