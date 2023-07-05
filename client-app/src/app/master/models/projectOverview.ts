export interface ProjectOverview {
  id: string
  projectName: string
  projectLocation: string
  natureProject: string
  startDate: Date | null
  endDate: Date | null
  client: string
  personnel: number
  creationDate: Date | null
}

export class ProjectOverview implements ProjectOverview {
  constructor (init?: ProjectOverviewFormValues) {
    Object.assign(this, init)
  }
}

export class ProjectOverviewFormValues {
  id?: string = undefined
  projectName: string = ''
  projectLocation: string = ''
  natureProject: string = ''
  startDate: Date | null = null
  endDate: Date | null = null
  client: string = ''
  personnel: number = 0

  constructor (projectOverview?: ProjectOverviewFormValues) {
    if (projectOverview) {
      this.id = projectOverview.id
      this.projectName = projectOverview.projectName
      this.projectLocation = projectOverview.projectLocation
      this.natureProject = projectOverview.natureProject
      this.startDate = projectOverview.startDate
      this.endDate = projectOverview.endDate
      this.client = projectOverview.client
      this.personnel = projectOverview.personnel
    }
  }
}
