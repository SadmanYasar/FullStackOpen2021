import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, prettyDOM, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm>', () => {
  test('calls event handler with right details when new blog created ', () => {
    const Create = jest.fn()
    const component = render(
      <BlogForm Create={Create}/>
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'this title is changed' }
    })

    fireEvent.change(author, {
      target: { value: 'this author is changed' }
    })

    fireEvent.change(url, {
      target: { value: 'https://www.w3.org/Provider/Style/dummy.html' }
    })

    console.log(prettyDOM(component.container))
    fireEvent.submit(form)

    expect(Create.mock.calls).toHaveLength(1)
    expect(Create.mock.calls[0][0].title).toBe('this title is changed')
    expect(Create.mock.calls[0][0].author).toBe('this author is changed')
    expect(Create.mock.calls[0][0].url).toBe('https://www.w3.org/Provider/Style/dummy.html')
  })
})