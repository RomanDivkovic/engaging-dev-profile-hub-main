import { fireEvent, render, screen } from '@testing-library/react'
import ProjectSourceActions from './ProjectSourceActions'

it.each(['Basketball Manager', 'BetBuddys'])('offers an access request for %s', (title) => {
  const onCardClick = jest.fn()
  render(
    <div onClick={onCardClick}>
      <ProjectSourceActions title={title} privateSource />
    </div>
  )
  fireEvent.click(screen.getByRole('button', { name: 'Request Code Access' }))
  expect(screen.getByRole('dialog')).toBeInTheDocument()
  const requestUrl = screen
    .getByRole('link', { name: 'Request Access by Email' })
    .getAttribute('href')!
  expect(decodeURIComponent(requestUrl)).toContain(`Request access to ${title}`)
  expect(decodeURIComponent(requestUrl)).toContain('My GitHub username:')
  expect(onCardClick).not.toHaveBeenCalled()
  fireEvent.click(screen.getByRole('button', { name: 'Close' }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

it('keeps the public backend available alongside the private source request', () => {
  const backendUrl = 'https://github.com/RomanDivkovic/BetBuddysProject'
  render(<ProjectSourceActions title="BetBuddys" privateSource backendUrl={backendUrl} />)
  expect(screen.getByRole('link', { name: 'C# Backend' })).toHaveAttribute('href', backendUrl)
  fireEvent.click(screen.getByRole('button', { name: 'Request Code Access' }))
  expect(screen.getByRole('link', { name: 'View C# Backend' })).toHaveAttribute('href', backendUrl)
})
