import { type size } from '@material-tailwind/react/types/components/dialog'
import { makeAutoObservable } from 'mobx'

interface Modal {
  open: boolean
  body: JSX.Element | null
  size: size
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
    size: 'lg'
  }

  constructor () {
    makeAutoObservable(this)
  }

  openModal = (content: JSX.Element, size?: size) => {
    this.modal.open = true
    this.modal.body = content
    if (size) { this.modal.size = size } else { this.modal.size = 'lg' }
  }

  closeModal = () => {
    this.modal.open = false
    this.modal.body = null
  }
}
