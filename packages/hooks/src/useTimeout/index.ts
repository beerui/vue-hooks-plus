import { watchEffect, Ref, isRef, unref } from 'vue'

function useTimeout(
  fn: () => void,
  delay: Ref<number | undefined> | number | undefined,
  options?: {
    immediate?: boolean
  },
) {
  const immediate = options?.immediate

  // const fnRef = ref(fn)

  if (immediate) {
    fn()
  }

  watchEffect(onInvalidate => {
    if (isRef(delay)) {
      if (typeof delay.value !== 'number' || delay.value < 0) return
    } else {
      if (typeof delay !== 'number' || delay < 0) return
    }
    const _deply = unref(delay)
    const timer = setTimeout(() => {
      fn()
    }, _deply)
    onInvalidate(() => {
      clearInterval(timer)
    })
  })
}

export default useTimeout
