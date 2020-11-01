import { v4 } from 'uuid'

export class UUIDHelper {
  generate (): string {
    return v4()
  }
}

export const uuid = new UUIDHelper()
