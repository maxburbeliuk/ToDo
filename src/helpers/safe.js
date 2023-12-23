function handleError(errorFromCatch, customError) {
  if (customError !== undefined) {
    return { success: false, error: customError }
  }

  if (errorFromCatch instanceof Error) {
    return { success: false, error: errorFromCatch.message }
  }
  return { success: false, error: 'Something went wrong' }
}

function safe(promiseOrFunc, err) {
  if (promiseOrFunc instanceof Promise) {
    return safeAsync(promiseOrFunc, err)
  }
  return safeSync(promiseOrFunc, err)
}

async function safeAsync(promise, err) {
  try {
    const data = await promise
    return { data, success: true }
  } catch (e) {
    return handleError(e, err)
  }
}

function safeSync(func, err) {
  try {
    const data = func?.()
    return { data, success: true }
  } catch (e) {
    return handleError(e, err)
  }
}

export default safe
