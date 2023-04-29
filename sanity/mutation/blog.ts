export const INC_VIEW_COUNT = (_id: string) => {
  const mutations = [
    {
      patch: {
        id: _id,
        setIfMissing: {
          viewCount: 0,
        },
        inc: {
          viewCount: 1,
        },
      },
    },
  ]

  return mutations
}

export const INC_LIKE_COUNT = (_id: string, val: number) => {
  const mutations = [
    {
      patch: {
        id: _id,
        setIfMissing: {
          likeCount: 0,
        },
        inc: {
          likeCount: val,
        },
      },
    },
  ]

  return mutations
}
