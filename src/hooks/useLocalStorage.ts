import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { LOCAL_STORAGE_PREFIX } from '@/config'

const getFullKeyName = (key: string) => `${LOCAL_STORAGE_PREFIX}-${key}`

const datePattern =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

const useLocalStorage = <T>(
  key: string,
  defaultValue?: T
): [T | null, Dispatch<SetStateAction<T>>, () => void] => {
  const keyName = getFullKeyName(key)
  const [state, setState] = useState(() => {
    const value = window.localStorage.getItem(keyName)

    if (!value) {
      defaultValue &&
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
      return defaultValue
    }

    try {
      return JSON.parse(value, reviver)
    } catch (error) {
      console.error('Issue during parsing: ', error)
      window.localStorage.removeItem(keyName)
      return defaultValue
    }
  })

  const remove = useCallback(() => {
    localStorage.removeItem(keyName)
    setState(null)
  }, [keyName])

  useEffect(() => {
    if (!state) return

    window.localStorage.setItem(keyName, JSON.stringify(state))
  }, [keyName, state])

  return [state, setState, remove]
}

function reviver(_: string, value: unknown) {
  if (typeof value === 'string' && datePattern.test(value)) {
    return new Date(value)
  }

  return value
}

export default useLocalStorage
