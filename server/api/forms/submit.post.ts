export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    return await $fetch('https://api.wemasy.nl/api/services/websites/v1/forms/submit', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: {
        form_id: body.form_id,
        fields: body.fields,
        url: body.url,
      },
    })
  } catch (err: any) {
    const status = err?.response?.status || 500
    const data = err?.response?.data
    throw createError({
      statusCode: status,
      statusMessage: data?.message || data?.error || 'Form submission failed',
      data,
    })
  }
})