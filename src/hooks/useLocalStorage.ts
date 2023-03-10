import { useCallback, useEffect, useState } from 'react'

const PREFIX = 'accessit-portal'
const getFullKeyName = (key: string) => `${PREFIX}-${key}`

export default function(key: string, defaultValue = null) {
  const keyName = getFullKeyName(key);
  const [state, setState] = useState(() => {
    const value = window.localStorage.getItem(keyName)
    if (!value) {
      defaultValue &&
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue))
      return defaultValue
    }

    try {
      return JSON.parse(value)
    } catch (error) {
      window.localStorage.removeItem(keyName)
      return defaultValue
    }
  })

  const remove = useCallback(() => {
    localStorage.removeItem(keyName)
    setState(undefined)
  }, [keyName])

  useEffect(() => {
    window.localStorage.setItem(keyName, JSON.stringify(state))
  }, [keyName, state])

  return [state, setState, remove]
}
