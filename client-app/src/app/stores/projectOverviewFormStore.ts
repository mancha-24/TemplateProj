import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { type Pagination, PagingParams } from '../master/models/pagination'
import { type ProjectOverviewFormValues, type ProjectOverview } from '../master/models/projectOverview'
import agent from '../api/agent'
import { format } from 'date-fns'

export default class ProjectOverviewFormStore {
  pagingParams = new PagingParams()
  predicate = new Map().set('all', true)
  projectOverviewRegistry = new Map<string, ProjectOverview>()
  selectedProjectOverview: ProjectOverview | undefined = undefined
  loadingScreen = false
  pagination: Pagination | null = null

  constructor () {
    makeAutoObservable(this)
    reaction(
      () => this.predicate.keys(),
      () => {
        this.pagingParams = new PagingParams()
        void this.loadProjectOverviews()
      }
    )
  }

  loadProjectOverviews = async () => {
    this.setLoadingScreen(true)
    try {
      const result = await agent.CompanyService.listProjectOverviews(this.axiosParams)
      result.data.forEach(projectOverview => {
        this.setProjectOverview(projectOverview)
      })
      this.setPagination(result.pagination)
      console.log('pasa')
      this.setLoadingScreen(false)
    } catch (error) {
      this.setLoadingScreen(false)
      console.log(error)
    }
  }

  loadProjectOverview = async (id: string) => {
    const record = this.getProjectOverview(id)
    if (record) {
      this.selectedProjectOverview = record
      return record
    }
  }

  setLoadingScreen = (state: boolean) => {
    this.loadingScreen = state
  }

  get axiosParams () {
    const params = new URLSearchParams()
    params.append('pageNumber', this.pagingParams.pageNumber.toString())
    params.append('pageSize', this.pagingParams.pageSize.toString())
    this.predicate.forEach((value, key) => {
      if (key === 'startDate') {
        params.append(key, (value as Date).toISOString())
      } else {
        params.append(key, value)
      }
    })
    return params
  }

  setPagination = (pagination: Pagination) => {
    this.pagination = pagination
  }

  private readonly setProjectOverview = (projectOverview: ProjectOverview) => {
    projectOverview.creationDate = new Date(projectOverview.creationDate!)
    projectOverview.startDate = new Date(projectOverview.startDate!)
    projectOverview.endDate = new Date(projectOverview.endDate!)
    this.projectOverviewRegistry.set(projectOverview.id, projectOverview)
  }

  getProjectOverview = (id: string) => {
    return this.projectOverviewRegistry.get(id)
  }

  clearProjectOverviewRegistry = () => {
    this.projectOverviewRegistry = new Map<string, ProjectOverview>()
  }

  get groupedProjectOverviews () {
    return Object.entries(
      this.projectOverviewsByDate.reduce<Record<string, ProjectOverview[]>>((projectOverviews, projectOverview) => {
        const date = format(projectOverview.creationDate!, 'dd MMM yyyy')
        projectOverviews[date] = projectOverviews[date] ? [...projectOverviews[date], projectOverview] : [projectOverview]
        return projectOverviews
      }, {})
    )
  }

  get projectOverviewsByDate () {
    return Array.from(this.projectOverviewRegistry.values()).sort((a, b) => b.creationDate!.getTime() - a.creationDate!.getTime())
  }

  createProjectOverview = async (subContractor: ProjectOverviewFormValues) => {
    try {
      this.setLoadingScreen(true)
      await agent.CompanyService.createProjectOverview(subContractor)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.setLoadingScreen(false)
      })
    }
  }

  updateProjectOverview = async (projectOverview: ProjectOverviewFormValues) => {
    try {
      this.setLoadingScreen(true)
      await agent.CompanyService.updateProjectOverview(projectOverview)
      if (projectOverview.id) {
        const updatedProjectOverview = { ...this.getProjectOverview(projectOverview.id), ...projectOverview }
        this.projectOverviewRegistry.set(projectOverview.id, updatedProjectOverview as ProjectOverview)
      }
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.setLoadingScreen(false)
      })
    }
  }

  deleteProjectOverview = async (id: string) => {
    this.loadingScreen = true
    try {
      await agent.CompanyService.deleteProjectOverview(id)
      runInAction(() => {
        this.projectOverviewRegistry.delete(id)
        this.loadingScreen = false
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.loadingScreen = false
      })
    }
  }
}
