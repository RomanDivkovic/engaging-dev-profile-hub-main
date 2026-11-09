import { projects } from '@/data/projects'

describe('projects data', () => {
  it('links to the Travel Agency demo and its public source code', () => {
    const travelAgency = projects.find((project) => project.id === 'travel-agency')

    expect(travelAgency?.demoUrl).toBe('https://travel-agency-nine-beta.vercel.app/')
    expect(travelAgency?.githubUrl).toBe('https://github.com/RomanDivkovic/travel-agency')
    expect(travelAgency?.privateSource).not.toBe(true)
  })

  it('keeps calendar V2 without listing calendar V1', () => {
    expect(projects.some((project) => project.id === 'calender-system-v2')).toBe(true)
    expect(projects.some((project) => project.id === 'calender-system')).toBe(false)
    expect(projects.some((project) => project.demoUrl?.includes('bookingsystems.vercel.app'))).toBe(
      false
    )
  })

  it('links to the Expo basketball app and describes its current stack', () => {
    const basketball = projects.find((project) => project.id === 'basketball-manager')

    expect(basketball?.demoUrl).toBe('https://basketballmaneger.expo.app')
    expect(basketball?.technologies).toEqual(['React Native', 'Expo', 'TypeScript', 'AsyncStorage'])
  })

  it('should contain at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('each project should have required fields', () => {
    projects.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.role).toBeDefined()
      expect(typeof project.role).toBe('string')
      expect(project.technologies.length).toBeGreaterThan(0)
      expect(project.image).toBeTruthy()
    })
  })
})
