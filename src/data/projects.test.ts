import { projects } from '@/data/projects'

describe('projects data', () => {
  it('should contain at least one project', () => {
    expect(projects.length).toBeGreaterThan(0)
  })

  it('each project should have required fields', () => {
    projects.forEach((project) => {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.role).toBeTruthy()
      expect(project.technologies.length).toBeGreaterThan(0)
      expect(project.image).toBeTruthy()
    })
  })
})
